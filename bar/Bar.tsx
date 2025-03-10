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

function Actions() {
  return (
    <box vertical={true} className="Actions">
      <button>
        <box className="icon">colorize</box>
      </button>
      <button>
        <box className="icon">schedule</box>
      </button>
      <button>
        <box className="icon">brightness_7</box>
      </button>
      <button>
        <box className="icon">volume_up</box>
      </button>
      <button>
        <box className="icon">wifi</box>
      </button>
      <button>
        <box className="icon">bluetooth</box>
      </button>
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
          <Actions />
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
