import { Variable, interval, bind } from "astal";
import Gtk from "gi://Gtk?version=3.0";

let hours = new Variable("");
let minutes = new Variable("");
let seconds = new Variable("");
function UpdateTime() {
  const date = new Date();
  hours.set(date.getHours().toString().padStart(2, "0"));
  minutes.set(date.getMinutes().toString().padStart(2, "0"));
  seconds.set(date.getSeconds().toString().padStart(2, "0"));
}
interval(1000, UpdateTime);
export function Clock() {
  return (
    <box className="Clock" vertical={true}>
      <label halign={Gtk.Align.CENTER}>{bind(hours)}</label>
      <label halign={Gtk.Align.CENTER}>{bind(minutes)}</label>
    </box>
  );
}
