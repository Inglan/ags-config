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
    <box>
      <box
        className="Cover"
        css={bind(player, "coverArt").as(
          (cover) =>
            `background-image: url('${cover}');min-width: 100px;min-height: 100px; background-size: cover; background-position: center;`,
        )}
      />
      <button
        onClickRelease={() => {
          player.play_pause();
        }}
      >
        <box className="icon">
          {bind(player, "playback_status").as((status) =>
            status == 1 ? "play_arrow" : "pause",
          )}
        </box>
      </button>
    </box>
  );
}

function Media() {
  const mpris = Mpris.get_default();

  return (
    <box className="Media">
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
