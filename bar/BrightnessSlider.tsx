import { bind } from "astal";
import { Gtk, App } from "astal/gtk3";
import Brightness from "./brightness";

export function BrightnessSlider() {
  const brightness = Brightness.get_default();

  return (
    <box vertical={true} className="Audio">
      <slider
        vertical={true}
        heightRequest={200}
        inverted={true}
        onDragged={({ value }) => (brightness.screen = value)}
        value={bind(brightness, "screen")}
      />
      <button
        onClicked={() => {
          App.toggle_window("Audio");
        }}
      >
        <box className="icon" halign={Gtk.Align.CENTER}>
          brightness_7
        </box>
      </button>
    </box>
  );
}
