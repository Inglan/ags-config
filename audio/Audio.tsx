import { App } from "astal/gtk3";
import { Astal, Gdk } from "astal/gtk3";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { LEFT } = Astal.WindowAnchor;

  return (
    <window
      visible
      name="Audio"
      className="AudioWindow"
      gdkmonitor={gdkmonitor}
      anchor={LEFT}
      application={App}
    >
      <box>
        <label className="heading">Audio</label>
        <label className="subheading">Volume</label>
      </box>
    </window>
  );
}
