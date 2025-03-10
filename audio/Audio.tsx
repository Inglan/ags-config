import { App } from "astal/gtk3";
import { Astal, Gdk } from "astal/gtk3";
import { bind } from "astal";
import Wp from "gi://AstalWp?version=0.1";

const speaker = Wp.get_default()?.audio.defaultSpeaker!;
const wp = Wp.get_default()?.audio!;

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { LEFT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      visible
      name="Audio"
      className="AudioWindow"
      gdkmonitor={gdkmonitor}
      anchor={BOTTOM | LEFT}
      application={App}
    >
      <box vertical={true}>
        <box vertical={true} className="speakers">
          {bind(wp, "speakers").as((speakers) => {
            return speakers.map((speaker) => (
              <button
                onClick={() => {
                  speaker.set_is_default(true);
                }}
                className={bind(speaker, "is_default").as(
                  (isDefault: boolean) => {
                    return isDefault ? "selected" : "";
                  },
                )}
              >
                {speaker.get_description()}
              </button>
            ));
          })}
        </box>
        <label className="heading">Audio</label>
        <label className="subheading">Volume</label>
      </box>
    </window>
  );
}
