import { createPoll } from "ags/time"

const POLL_INTERVAL_MS = 2000

const CPU_CMD = "awk '/^cpu /{u=$2+$4; t=$2+$3+$4+$5+$6+$7+$8; print int(u*100/t)}' /proc/stat"

const MEM_CMD = "free -m | awk '/^Mem:/{printf \"%dM\", $3}'"

export default function Resources() {
  const cpu = createPoll("", POLL_INTERVAL_MS, ["bash", "-c", CPU_CMD])
  const mem = createPoll("", POLL_INTERVAL_MS, ["bash", "-c", MEM_CMD])

  return (
    <box cssName="resources" spacing={8}>
      <box spacing={4}>
        <image iconName="utilities-system-monitor-symbolic" />
        <label label={cpu} />
      </box>
      <box spacing={4}>
        <image iconName="drive-harddisk-symbolic" />
        <label label={mem} />
      </box>
    </box>
  )
}
