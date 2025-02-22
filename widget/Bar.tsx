import { App, Astal, Gtk, Gdk } from "astal/gtk4";
import { Variable, bind } from "astal";
import Hyprland from "gi://AstalHyprland";
import Tray from "gi://AstalTray";
import Battery from "gi://AstalBattery";

const battery = Battery.get_default();
const hyprland = Hyprland.get_default();

const time = Variable("").poll(1000, "date");

function SysTray() {
  const tray = Tray.get_default();

  return (
    <box cssClasses={["SysTray"]} vertical={true}>
      {bind(tray, "items").as((items) =>
        items.map((item) => (
          <button>
            <image gicon={bind(item, "gicon")} />
          </button>
        ))
      )}
    </box>
  );
}

function BatteryWidget() {
  return (
    <box cssClasses={["Battery"]} vertical={true}>
      <box cssClasses={["icon"]} halign={Gtk.Align.CENTER}>
        battery_full
      </box>
      <box halign={Gtk.Align.CENTER}>
        {bind(battery, "percentage").as((p) => p * 100 + "%")}
      </box>
    </box>
  );
}

function Workspaces() {
  const hypr = Hyprland.get_default();

  return (
    <box cssClasses={["Workspaces"]} vertical={true}>
      {bind(hypr, "workspaces").as((wss) =>
        wss
          .filter((ws) => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
          .sort((a, b) => a.id - b.id)
          .map((ws) => (
            <button
              cssClasses={bind(hypr, "focusedWorkspace").as((fw) =>
                ws === fw ? ["focused"] : [""]
              )}
              onClicked={() => ws.focus()}
            >
              {ws.id}
            </button>
          ))
      )}
    </box>
  );
}

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      visible
      cssClasses={["Bar"]}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | BOTTOM}
      application={App}
    >
      <box vertical={true}>
        <Workspaces />
        <box vexpand={true} />
        <SysTray />
        <BatteryWidget />
      </box>
    </window>
  );
}
