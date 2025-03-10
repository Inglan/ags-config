import { App } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./bar/Bar";
import RoundedCorners from "./roundedcorners/RoundedCorners";
import OSD from "./osd/OSD";

App.start({
  css: style,
  main() {
    Bar(App.get_monitors()[0]);
    RoundedCorners(App.get_monitors()[0]);
    OSD(App.get_monitors()[0]);
  },
});
