import { App } from "astal/gtk3";
import { Astal, Gdk } from "astal/gtk3";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { LEFT } = Astal.WindowAnchor;

  return (
    <window
      visible
      name="Audio"
      gdkmonitor={gdkmonitor}
      anchor={LEFT}
      application={App}
    >
      <box>a</box>
    </window>
  );
}
