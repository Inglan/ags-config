import { subprocess } from "astal";
import Gtk from "gi://Gtk?version=3.0";

export function Actions() {
  return (
    <box vertical={true} className="Actions">
      <button
        halign={Gtk.Align.CENTER}
        onClicked={() => {
          subprocess("hyprpicker -a");
        }}
      >
        <box className="icon">colorize</box>
      </button>
      <button
        halign={Gtk.Align.CENTER}
        onClicked={() => {
          subprocess("nwg-displays");
        }}
      >
        <box className="icon">desktop_windows</box>
      </button>
      <button
        halign={Gtk.Align.CENTER}
        onClicked={() => {
          subprocess("swaync-client -t");
        }}
      >
        <box className="icon">notifications</box>
      </button>
    </box>
  );
}
