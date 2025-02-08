import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable, bind } from "astal";
import Hyprland from "gi://AstalHyprland";
const hyprland = Hyprland.get_default();

const time = Variable("").poll(1000, "date");

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
      className="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | BOTTOM}
      application={App}
    >
      <box vertical={true}>
        <Workspaces />
        <button onClicked="echo hello" halign={Gtk.Align.CENTER}>
          Welcome to AGS!
        </button>
        <box />
        <button onClicked={() => print("hello")} halign={Gtk.Align.CENTER}>
          <label label={time()} />
        </button>
      </box>
    </window>
  );
}
