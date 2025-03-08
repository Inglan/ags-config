import { bind } from "astal";
import Wp from "gi://AstalWp?version=0.1";

export function Audio() {
  const speaker = Wp.get_default()?.audio.defaultSpeaker!;
  return (
    <box vertical={true} className="Audio">
      <slider
        vertical={true}
        heightRequest={200}
        inverted={true}
        onDragged={({ value }) => (speaker.volume = value)}
        value={bind(speaker, "volume")}
      />
    </box>
  );
}
