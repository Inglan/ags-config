import { Variable, bind } from "astal";
import Gtk from "gi://Gtk?version=3.0";

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
export function SystemInfo() {
  return (
    <box vertical={true} className="SystemInfo">
      <box halign={Gtk.Align.CENTER}>
        <box className="icon">memory</box>
        {bind(cpuUsage)}%
      </box>
      <box halign={Gtk.Align.CENTER}>
        <box className="icon">memory_alt</box>
        {bind(memUsage)}%
      </box>
    </box>
  );
}
