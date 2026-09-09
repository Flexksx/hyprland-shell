import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"

const TIME_FORMAT = "date '+%H:%M'"
const DATE_FORMAT = "date '+%a %b %d'"
const POLL_INTERVAL_MS = 1000

export default function Clock() {
  const time = createPoll("", POLL_INTERVAL_MS, TIME_FORMAT)
  const date = createPoll("", 60000, DATE_FORMAT)

  return (
    <menubutton name="clock" tooltipText={date}>
      <label label={time} />
      <popover>
        <Gtk.Calendar />
      </popover>
    </menubutton>
  )
}
