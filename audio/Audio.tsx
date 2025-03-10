import { App } from "astal/gtk3";
import { Astal, Gdk, Gtk } from "astal/gtk3";
import { bind } from "astal";
import Wp from "gi://AstalWp?version=0.1";
import { subprocess } from "astal/process";

const speaker = Wp.get_default()?.audio.defaultSpeaker!;
const wp = Wp.get_default()?.audio!;

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { LEFT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      visible={false}
      name="Audio"
      className="AudioWindow"
      gdkmonitor={gdkmonitor}
      anchor={BOTTOM | LEFT}
      application={App}
    >
      <box vertical={true}>
        <label hexpand={false} halign={Gtk.Align.START} className="heading">
          Audio
        </label>
        <label hexpand={false} halign={Gtk.Align.START} className="subheading">
          Output
        </label>
        <box vertical={true} className="speakers">
          {bind(wp, "speakers").as((speakers) => {
            return speakers.map((speaker) => (
              <box
                vertical={true}
                className={bind(speaker, "is_default").as(
                  (isDefault: boolean) => {
                    return isDefault ? "speaker selected" : "speaker";
                  },
                )}
              >
                <button
                  hexpand={true}
                  onClicked={() => {
                    speaker.set_is_default(true);
                  }}
                >
                  <box>
                    <box className="icon">
                      {speaker.get_icon().includes("bluetooth")
                        ? "bluetooth"
                        : "volume_up"}
                    </box>
                    {speaker.get_description()}
                  </box>
                </button>
                <slider
                  hexpand={true}
                  value={bind(speaker, "volume").as((volume) => volume)}
                  onDragged={(slider) => {
                    speaker.set_volume(slider.value);
                  }}
                />
              </box>
            ));
          })}
        </box>
        <button
          onClicked={() => {
            App.toggle_window("Audio");
            subprocess("qpwgraph");
          }}
        >
          Patchbay
        </button>
      </box>
    </window>
  );
}
