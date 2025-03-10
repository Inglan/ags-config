import { App } from "astal/gtk3";
import { Astal, Gdk } from "astal/gtk3";
import { SysTray } from "./SysTray";
import { BatteryWidget } from "./BatteryWidget";
import { Workspaces } from "./Workspaces";
import { Clock } from "./Clock";
import { Media } from "./Media";
import { SystemInfo } from "./SystemInfo";
import giCairo from "cairo";

import { Audio } from "./Audio";

function RoundedCorners() {
  return (
    <box vertical={true} className="Corners">
      <drawingarea
        width_request={30}
        height_request={30}
        setup={(area) => {
          area.connect("draw", (area, cr: giCairo.Context) => {
            cr.arc(30, 30, 30, Math.PI, (3 * Math.PI) / 2);
            cr.lineTo(0, 0);
            cr.setSourceRGB(
              0.11764705882352941,
              0.11764705882352941,
              0.1803921568627451,
            );
            cr.fill();
          });
        }}
      />
      <box vexpand={true}></box>
      <drawingarea
        width_request={30}
        height_request={30}
        setup={(area) => {
          area.connect("draw", (area, cr: giCairo.Context) => {
            cr.arc(30, 0, 30, Math.PI / 2, Math.PI);
            cr.lineTo(0, 30);
            cr.setSourceRGB(
              0.11764705882352941,
              0.11764705882352941,
              0.1803921568627451,
            );
            cr.fill();
          });
        }}
      />
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
      <box>
        <box vertical={true} className="MainBar">
          <Workspaces />
          <box vexpand={true} />
          <Audio />
          <Media />
          <SystemInfo />
          <SysTray />
          <BatteryWidget />
          <Clock />
        </box>
      </box>
    </window>
  );
}
