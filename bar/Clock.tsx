import { Variable, bind, interval } from "astal";
import Gtk from "gi://Gtk?version=3.0";

let hours = new Variable("");
let minutes = new Variable("");
let seconds = new Variable("");
let dayMonth = new Variable("");

function UpdateTime() {
  const date = new Date();
  hours.set((date.getHours() % 12 || 12).toString().padStart(2, "0"));
  minutes.set(date.getMinutes().toString().padStart(2, "0"));
  seconds.set(date.getSeconds().toString().padStart(2, "0"));
  dayMonth.set(
    date.toLocaleString("default", { month: "short", day: "numeric" }),
  );
}
interval(1000, UpdateTime);
export function Clock() {
  return (
    <box hexpand={true} className="Clock" vertical={true}>
      <label className="ClockTop" halign={Gtk.Align.CENTER}>
        {bind(hours)}
      </label>
      <label className="ClockBottom" halign={Gtk.Align.CENTER}>
        {bind(minutes)}
      </label>
      <label className="Date">{bind(dayMonth)}</label>
    </box>
  );
}
