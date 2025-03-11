import { App, Astal, Gdk } from "astal/gtk3";
import { Actions } from "./Actions";
import { Audio } from "./Audio";
import { BatteryWidget } from "./BatteryWidget";
import { BrightnessSlider } from "./BrightnessSlider";
import { Clock } from "./Clock";
import { Media } from "./Media";
import { SystemInfo } from "./SystemInfo";
import { SysTray } from "./SysTray";
import { Workspaces } from "./Workspaces";

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
          <Actions />
          <Clock />
        </box>
      </box>
    </window>
  );
}
