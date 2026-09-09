import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"

const CLOCK_FORMAT = "date '+%H:%M'"
const POLL_INTERVAL_MS = 1000

export default function Clock() {
  const time = createPoll("", POLL_INTERVAL_MS, CLOCK_FORMAT)

  return (
    <menubutton cssName="clock">
      <label label={time} />
      <popover>
        <Gtk.Calendar />
      </popover>
    </menubutton>
  )
}
