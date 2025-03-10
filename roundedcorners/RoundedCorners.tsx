import giCairo from "cairo";
import { Astal, Gdk, App } from "astal/gtk3";

export default function RoundedCorners(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor;

  return (
    <window
      gdkmonitor={gdkmonitor}
      anchor={TOP | LEFT | BOTTOM}
      application={App}
      className="CornersWindow"
    >
      <box vertical={true} className="Corners">
        <drawingarea
          width_request={30}
          height_request={30}
          setup={(area) => {
            area.connect("draw", (area, cr: giCairo.Context) => {
              cr.arc(30, 30, 30, Math.PI, (3 * Math.PI) / 2);
              cr.lineTo(0, 0);
              cr.setSourceRGB(
                0.11764705882352941,
                0.11764705882352941,
                0.1803921568627451,
              );
              cr.fill();
            });
          }}
        />
        <box vexpand={true}></box>
        <drawingarea
          width_request={30}
          height_request={30}
          setup={(area) => {
            area.connect("draw", (area, cr: giCairo.Context) => {
              cr.arc(30, 0, 30, Math.PI / 2, Math.PI);
              cr.lineTo(0, 30);
              cr.setSourceRGB(
                0.11764705882352941,
                0.11764705882352941,
                0.1803921568627451,
              );
              cr.fill();
            });
          }}
        />
      </box>
    </window>
  );
}
