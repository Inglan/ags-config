import { App } from "astal/gtk3";
import { Astal, Gdk, Gtk } from "astal/gtk3";
import { SysTray } from "./SysTray";
import { BatteryWidget } from "./BatteryWidget";
import { Workspaces } from "./Workspaces";
import { Clock } from "./Clock";
import { bind } from "astal";
import Mpris from "gi://AstalMpris";

function Player(player: Mpris.Player) {
  return (
    <box vertical={true} className="Player">
      <eventbox
        onClickRelease={() => {
          player.raise();
        }}
      >
        <box
          className="Cover"
          heightRequest={70}
          widthRequest={70}
          css={bind(player, "coverArt").as(
            (cover) =>
              `background-image: url('${cover}');background-size: cover; background-position: center;`,
          )}
        />
      </eventbox>
      <box>
        <box className="Controls" vertical={true}>
          <button
            onClickRelease={() => {
              player.previous();
            }}
          >
            <box halign={Gtk.Align.CENTER} className="icon">
              skip_previous
            </box>
          </button>
          <button
            onClickRelease={() => {
              player.play_pause();
            }}
          >
            <box halign={Gtk.Align.CENTER} className="icon">
              {bind(player, "playback_status").as((status) =>
                status == 1 ? "play_arrow" : "pause",
              )}
            </box>
          </button>
          <button
            onClickRelease={() => {
              player.next();
            }}
          >
            <box halign={Gtk.Align.CENTER} className="icon">
              skip_next
            </box>
          </button>
        </box>
        <slider
          className="SeekBar"
          vertical={true}
          max={bind(player, "length")}
          value={bind(player, "position")}
          onDragged={(slider) => {
            player.position = slider.value;
          }}
        />
      </box>
    </box>
  );
}

function Media() {
  const mpris = Mpris.get_default();

  return (
    <box className="Media" vertical={true}>
      {bind(mpris, "players").as((ps) => ps.map((player) => Player(player)))}
    </box>
  );
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      visible
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | BOTTOM}
      application={App}
    >
      <box vertical={true}>
        <Workspaces />
        <box vexpand={true} />
        <Media />
        <SysTray />
        <BatteryWidget />
        <Clock />
      </box>
    </window>
  );
}
