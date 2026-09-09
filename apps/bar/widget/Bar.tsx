import { Astal, type Gdk, Gtk } from "ags/gtk4"
import app from "ags/gtk4/app"
import ActiveWindow from "./active-window/ActiveWindow"
import Battery from "./battery/Battery"
import Clock from "./clock/Clock"
import Resources from "./resources/Resources"
import StatusIndicators from "./status-indicators/StatusIndicators"
import Tray from "./tray/Tray"
import Workspaces from "./workspaces/Workspaces"

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox name="centerbox">
        <box $type="start" hexpand halign={Gtk.Align.START} spacing={4}>
          <ActiveWindow />
        </box>
        <box $type="center">
          <Workspaces />
        </box>
        <box $type="end" hexpand halign={Gtk.Align.END} spacing={4}>
          <Resources />
          <Tray />
          <StatusIndicators />
          <Battery />
          <Clock />
        </box>
      </centerbox>
    </window>
  )
}
