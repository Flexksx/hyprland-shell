import Wp from "gi://AstalWp"
import { createBinding } from "ags"

export default function Volume() {
  const wp = Wp.get_default()!
  const audio = wp.get_audio()!
  const speaker = audio.get_default_speaker()!

  const volumeIcon = createBinding(speaker, "volumeIcon")
  const volume = createBinding(speaker, "volume")

  return (
    <box cssName="volume" tooltipText={volume.as((v) => `${Math.round(v * 100)}%`)}>
      <image iconName={volumeIcon} />
      <label label={volume.as((v) => `${Math.round(v * 100)}%`)} />
    </box>
  )
}
