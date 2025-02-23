import { App, Astal, Gdk, Gtk } from "astal/gtk3";
import { timeout } from "astal/time";
import Variable from "astal/variable";
import Brightness from "./brightness";
import Wp from "gi://AstalWp";

function OSDVolume({ visible }: { visible: Variable<boolean> }) {
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
        if (speaker) {
          self.hook(speaker, "notify::volume", () => show(speaker.volume));
          if (speaker.volume > 1) speaker.volume = 1;
        }
      }}
      revealChild={visible()}
      transitionType={Gtk.RevealerTransitionType.CROSSFADE}
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

function OSDBrightness({ visible }: { visible: Variable<boolean> }) {
  const brightness = Brightness.get_default();

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
      }}
      revealChild={visible()}
      transitionType={Gtk.RevealerTransitionType.CROSSFADE}
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
  const volumeVisible = Variable(false);
  const brightnessVisible = Variable(false);

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
        <OSDVolume visible={volumeVisible} />
        <OSDBrightness visible={brightnessVisible} />
      </box>
    </window>
  );
}
