import { App } from "astal/gtk3";
import { Astal, Gdk } from "astal/gtk3";
import { SysTray } from "./SysTray";
import { BatteryWidget } from "./BatteryWidget";
import { Workspaces } from "./Workspaces";
import { Clock } from "./Clock";
import { Media } from "./Media";
import { SystemInfo } from "./SystemInfo";
import { Audio } from "./Audio";
import { BrightnessSlider } from "./BrightnessSlider";

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
          <SystemInfo />
          <BrightnessSlider />
          <Audio />
          <Media />
          <SysTray />
          <BatteryWidget />
          <Clock />
        </box>
      </box>
    </window>
  );
}
