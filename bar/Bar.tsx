import { App } from "astal/gtk3";
import { Variable, GLib, bind } from "astal";
import { Astal, Gtk, Gdk } from "astal/gtk3";
import Hyprland from "gi://AstalHyprland";
import Mpris from "gi://AstalMpris";
import Battery from "gi://AstalBattery";
import Wp from "gi://AstalWp";
import Network from "gi://AstalNetwork";
import Tray from "gi://AstalTray";
import PowerProfiles from "gi://AstalPowerProfiles";

function SysTray() {
  const tray = Tray.get_default();

  return (
    <box className="SysTray">
      {bind(tray, "items").as((items) =>
        items.map((item) => (
          <menubutton
            tooltipMarkup={bind(item, "tooltipMarkup")}
            usePopover={false}
            actionGroup={bind(item, "actionGroup").as((ag) => ["dbusmenu", ag])}
            menuModel={bind(item, "menuModel")}
          >
            <icon gicon={bind(item, "gicon")} />
          </menubutton>
        ))
      )}
    </box>
  );
}

function BatteryWidget() {
  const powerprofiles = PowerProfiles.get_default();
  const battery = Battery.get_default();

  return (
    <button
      className="Battery"
      onClicked={() => {
        if (powerprofiles.activeProfile === "balanced") {
          powerprofiles.set_active_profile("performance");
        } else if (powerprofiles.activeProfile === "performance") {
          powerprofiles.set_active_profile("power-saver");
        } else {
          powerprofiles.set_active_profile("balanced");
        }
      }}
    >
      <box vertical={true}>
        <box halign={Gtk.Align.CENTER} className="icon">
          {bind(powerprofiles, "activeProfile").as((s) => {
            if (s === "balanced") return "battery_full";
            if (s === "performance") return "speed";
            if (s === "power-saver") return "battery_plus";
            return s;
          })}
        </box>
        <box halign={Gtk.Align.CENTER}>
          {bind(battery, "percentage").as((p) => Math.round(p * 100) + "%")}
        </box>
      </box>
    </button>
  );
}

function Workspaces() {
  const hypr = Hyprland.get_default();

  return (
    <box className="Workspaces" vertical={true}>
      {bind(hypr, "workspaces").as((wss) =>
        wss
          .filter((ws) => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
          .sort((a, b) => a.id - b.id)
          .map((ws) => (
            <button
              className={bind(hypr, "focusedWorkspace").as((fw) =>
                ws === fw ? "focused" : ""
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
      className="Bar"
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
