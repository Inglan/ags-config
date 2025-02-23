import { App } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./widget/Bar/Bar";
import OSD from "./widget/osd/OSD";

App.start({
  css: style,
  main() {
    Bar(App.get_monitors()[0]);
    OSD(App.get_monitors()[0]);
  },
});
