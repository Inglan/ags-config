import { App } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./widget/Bar";
import NotificationPopups from "./widget/NotificationPopups";

App.start({
  css: style,
  main() {
    Bar(App.get_monitors()[0]);
    NotificationPopups(App.get_monitors()[0]);
  },
});
