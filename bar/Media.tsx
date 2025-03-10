import { bind } from "astal";
import Mpris from "gi://AstalMpris?version=0.1";
import Gtk from "gi://Gtk?version=3.0";

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
            onClicked={() => {
              player.previous();
            }}
          >
            <box halign={Gtk.Align.CENTER} className="icon">
              skip_previous
            </box>
          </button>
          <button
            onClicked={() => {
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
            onClicked={() => {
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
export function Media() {
  const mpris = Mpris.get_default();

  return (
    <box className="Media" vertical={true}>
      {bind(mpris, "players").as((ps) => ps.map((player) => Player(player)))}
    </box>
  );
}
