import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable, bind } from "astal";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | BOTTOM}
      application={App}
    >
      <eventbox>
        <box vertical={true}>Test</box>
      </eventbox>
    </window>
  );
}
