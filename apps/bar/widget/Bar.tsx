import { Astal, type Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import ActiveWindow from "./active-window/ActiveWindow"
import Clock from "./clock/Clock"
import Workspaces from "./workspaces/Workspaces"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      cssName="bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox cssName="centerbox">
        <box $type="start" hexpand halign={Gtk.Align.CENTER}>
          <ActiveWindow />
        </box>
        <box $type="center">
          <Workspaces />
        </box>
        <box $type="end" hexpand halign={Gtk.Align.CENTER}>
          <Clock />
        </box>
      </centerbox>
    </window>
  )
}
