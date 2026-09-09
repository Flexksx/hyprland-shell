import { Gtk } from "ags/gtk4"
import Mpris from "gi://AstalMpris"
import Pango from "gi://Pango"
import { createBinding } from "ags"

export default function NowPlaying() {
  const mpris = Mpris.get_default()
  const players = createBinding(mpris, "players")

  return (
    <box cssName="now-playing" vertical visible={players.as((p) => p.length > 0)}>
      {players.as((list) => {
        const player = list[0]
        if (!player) return <box />

        const title = createBinding(player, "title")
        const artist = createBinding(player, "artist")
        const playbackStatus = createBinding(player, "playbackStatus")
        const canGoNext = createBinding(player, "canGoNext")
        const canGoPrevious = createBinding(player, "canGoPrevious")

        return (
          <box vertical cssName="now-playing-card" spacing={8}>
            <box spacing={8}>
              <image iconName="applications-multimedia-symbolic" cssName="now-playing-icon" />
              <box vertical hexpand>
                <label
                  label={title.as((t) => t || "Unknown")}
                  halign={Gtk.Align.START}
                  ellipsize={Pango.EllipsizeMode.END}
                  maxWidthChars={24}
                  cssName="now-playing-title"
                />
                <label
                  label={artist.as((a) => a || "Unknown Artist")}
                  halign={Gtk.Align.START}
                  ellipsize={Pango.EllipsizeMode.END}
                  maxWidthChars={24}
                  cssName="now-playing-artist"
                />
              </box>
            </box>
            <box halign={Gtk.Align.CENTER} spacing={4}>
              <button
                cssName="media-button"
                sensitive={canGoPrevious}
                onClicked={() => player.previous()}
              >
                <image iconName="media-skip-backward-symbolic" />
              </button>
              <button cssName="media-button" onClicked={() => player.play_pause()}>
                <image
                  iconName={playbackStatus.as((s) =>
                    s === Mpris.PlaybackStatus.PLAYING
                      ? "media-playback-pause-symbolic"
                      : "media-playback-start-symbolic",
                  )}
                />
              </button>
              <button cssName="media-button" sensitive={canGoNext} onClicked={() => player.next()}>
                <image iconName="media-skip-forward-symbolic" />
              </button>
            </box>
          </box>
        )
      })}
    </box>
  )
}
