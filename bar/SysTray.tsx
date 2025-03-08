import { bind } from "astal";
import Tray from "gi://AstalTray?version=0.1";

export function SysTray() {
  const tray = Tray.get_default();

  return (
    <box className="SysTray" vertical={true}>
      {bind(tray, "items").as((items) =>
        items.map((item) => (
          <menubutton
            className="TrayButton"
            tooltipMarkup={bind(item, "tooltipMarkup")}
            usePopover={false}
            actionGroup={bind(item, "actionGroup").as((ag) => ["dbusmenu", ag])}
            menuModel={bind(item, "menuModel")}
          >
            <icon gicon={bind(item, "gicon")} />
          </menubutton>
        )),
      )}
    </box>
  );
}
