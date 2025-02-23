import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { timeout } from "astal/time";
import Variable from "astal/variable";
import Brightness from "./brightness";
import Wp from "gi://AstalWp";

function Progress({ visible }: { visible: Variable<boolean> }) {
  const brightness = Brightness.get_default();
  const speaker = Wp.get_default()!.get_default_speaker();

  const value = Variable(0);

  let count = 0;
  function show(v: number) {
    visible.set(true);
    value.set(v);
    count++;
    timeout(2000, () => {
      count--;
      if (count === 0) visible.set(false);
    });
  }

  return (
    <revealer
      setup={(self) => {
        self.hook(brightness, "notify::screen", () => show(brightness.screen));

        if (speaker) {
          self.hook(speaker, "notify::volume", () => show(speaker.volume));
        }
      }}
      revealChild={visible()}
      transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
    >
      <box className="OSD" vertical={true}>
        <levelbar
          orientation={Gtk.Orientation.VERTICAL}
          inverted={true}
          valign={Gtk.Align.CENTER}
          heightRequest={200}
          value={value()}
        />
        <label label={value((v) => `${Math.floor(v * 100)}%`)} />
      </box>
    </revealer>
  );
}

export default function OSD(monitor: Gdk.Monitor) {
  const visible = Variable(false);

  const { LEFT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      gdkmonitor={monitor}
      className="OSD"
      namespace="osd"
      application={App}
      layer={Astal.Layer.OVERLAY}
      keymode={Astal.Keymode.ON_DEMAND}
      anchor={LEFT | BOTTOM}
    >
      <box>
        <Progress visible={visible} />
      </box>
    </window>
  );
}
