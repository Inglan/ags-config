import { App } from "astal/gtk3";
import { Astal, Gdk } from "astal/gtk3";
import { SysTray } from "./SysTray";
import { BatteryWidget } from "./BatteryWidget";
import { Workspaces } from "./Workspaces";
import { Clock } from "./Clock";
import { Media } from "./Media";
import { SystemInfo } from "./SystemInfo";
import { bind } from "astal";

import Wp from "gi://AstalWp";

function Audio() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;
  return (
    <box vertical={true} className="Audio">
      <slider
        vertical={true}
        heightRequest={200}
        inverted={true}
        onDragged={({ value }) => (speaker.volume = value)}
        value={bind(speaker, "volume")}
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
      <box vertical={true}>
        <Workspaces />
        <box vexpand={true} />
        <Audio />
        <Media />
        <SystemInfo />
        <SysTray />
        <BatteryWidget />
        <Clock />
      </box>
    </window>
  );
}
