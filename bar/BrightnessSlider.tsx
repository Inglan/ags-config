import { bind } from "astal";
import { Gtk } from "astal/gtk3";
import Brightness from "./brightness";

export function BrightnessSlider() {
  const brightness = Brightness.get_default();

  return (
    <box vertical={true} className="Brightness">
      <slider
        vertical={true}
        heightRequest={150}
        inverted={true}
        onDragged={({ value }) => (brightness.screen = value)}
        value={bind(brightness, "screen")}
      />
      <button onClicked={() => {}}>
        <box className="icon" halign={Gtk.Align.CENTER}>
          brightness_7
        </box>
      </button>
    </box>
  );
}
