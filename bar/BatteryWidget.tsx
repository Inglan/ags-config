import { bind } from "astal";
import Battery from "gi://AstalBattery?version=0.1";
import PowerProfiles from "gi://AstalPowerProfiles?version=0.1";
import Gtk from "gi://Gtk?version=3.0";

export function BatteryWidget() {
  const powerprofiles = PowerProfiles.get_default();
  const battery = Battery.get_default();

  return (
    <box>
      <button
        hexpand={true}
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
          <box
            halign={Gtk.Align.CENTER}
            className={bind(battery, "percentage").as((percent) => {
              if (percent < 0.15) return "icon red_text";
              else return "icon";
            })}
          >
            {bind(battery, "charging").as((c) => {
              if (c) return "battery_charging_full";
              return "battery_full";
            })}

            {bind(powerprofiles, "activeProfile").as((s) => {
              if (s === "balanced") return "";
              if (s === "performance") return "speed";
              if (s === "power-saver") return "add";
              return s;
            })}
          </box>
          <box className="BatteryPercent" halign={Gtk.Align.CENTER}>
            {bind(battery, "percentage").as((p) => Math.round(p * 100) + "%")}
          </box>
        </box>
      </button>
    </box>
  );
}
