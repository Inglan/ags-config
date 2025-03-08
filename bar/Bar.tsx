import { App } from "astal/gtk3";
import { Astal, Gdk } from "astal/gtk3";
import { SysTray } from "./SysTray";
import { BatteryWidget } from "./BatteryWidget";
import { Workspaces } from "./Workspaces";
import { Clock } from "./Clock";
import { Media } from "./Media";
import { Variable } from "astal";
import { bind } from "astal";

let cpuUsage = Variable(0).poll(
  5000,
  ["bash", "-c", "top -bn1 | grep Cpu | sed 's/\\,/\\./g' | awk '{print $2}'"],
  (out: string, prev: number) => parseInt(out),
);

let memUsage = Variable(0).poll(
  5000,
  ["bash", "-c", "free | grep Mem | awk '{print ($3/$2)*100}'"],
  (out: string, prev: number) => parseInt(out),
);

function SystemInfo() {
  return (
    <box vertical={true} className="SystemInfo">
      <box>
        <box className="icon">memory</box>
        {bind(cpuUsage)}%
      </box>
      <box>
        <box className="icon">memory_alt</box>
        {bind(memUsage)}%
      </box>
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
        <Media />
        <SystemInfo />
        <SysTray />
        <BatteryWidget />
        <Clock />
      </box>
    </window>
  );
}
