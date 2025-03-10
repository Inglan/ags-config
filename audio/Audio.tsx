import { App } from "astal/gtk3";
import { Astal, Gdk } from "astal/gtk3";

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { LEFT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      visible
      name="Audio"
      className="AudioWindow"
      gdkmonitor={gdkmonitor}
      anchor={BOTTOM | LEFT}
      application={App}
    >
      <box vertical={true}>
        <label className="heading">Audio</label>
        <label className="subheading">Volume</label>
      </box>
    </window>
  );
}
