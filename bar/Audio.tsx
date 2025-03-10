import { bind } from "astal";
import { App, Gtk } from "astal/gtk3";
import Wp from "gi://AstalWp?version=0.1";

export function Audio() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;
  return (
    <box vertical={true} className="Audio">
      <slider
        vertical={true}
        heightRequest={150}
        inverted={true}
        onDragged={({ value }) => (speaker.volume = value)}
        value={bind(speaker, "volume")}
      />
      <button
        onClicked={() => {
          App.toggle_window("Audio");
        }}
      >
        <box className="icon" halign={Gtk.Align.CENTER}>
          {bind(speaker, "mute").as((mute) => {
            return mute ? "volume_off" : "volume_up";
          })}
        </box>
      </button>
    </box>
  );
}
