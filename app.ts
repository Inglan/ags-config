import { App } from "astal/gtk3";
import style from "./style.scss";
import Bar from "./widget/Bar/Bar";

App.start({
  css: style,
  main() {
    Bar(App.get_monitors()[0]);
  },
});
