import { Gtk } from "ags/gtk4"
import Mpris from "gi://AstalMpris"
import Pango from "gi://Pango"
import { createBinding } from "ags"

export default function NowPlaying() {
  const mpris = Mpris.get_default()
  const players = createBinding(mpris, "players")

  return (
    <box name="now-playing" orientation={Gtk.Orientation.VERTICAL} visible={players.as((p) => p.length > 0)}>
      {players.as((list) => {
        const player = list[0]
        if (!player) return <box />

        const title = createBinding(player, "title")
        const artist = createBinding(player, "artist")
        const playbackStatus = createBinding(player, "playbackStatus")
        const canGoNext = createBinding(player, "canGoNext")
        const canGoPrevious = createBinding(player, "canGoPrevious")

        return (
          <box orientation={Gtk.Orientation.VERTICAL} name="now-playing-card" spacing={8}>
            <box spacing={8}>
              <image iconName="applications-multimedia-symbolic" name="now-playing-icon" />
              <box orientation={Gtk.Orientation.VERTICAL} hexpand>
                <label
                  label={title.as((t) => t || "Unknown")}
                  halign={Gtk.Align.START}
                  ellipsize={Pango.EllipsizeMode.END}
                  maxWidthChars={24}
                  name="now-playing-title"
                />
                <label
                  label={artist.as((a) => a || "Unknown Artist")}
                  halign={Gtk.Align.START}
                  ellipsize={Pango.EllipsizeMode.END}
                  maxWidthChars={24}
                  name="now-playing-artist"
                />
              </box>
            </box>
            <box halign={Gtk.Align.CENTER} spacing={4}>
              <button
                name="media-button"
                sensitive={canGoPrevious}
                onClicked={() => player.previous()}
              >
                <image iconName="media-skip-backward-symbolic" />
              </button>
              <button name="media-button" onClicked={() => player.play_pause()}>
                <image
                  iconName={playbackStatus.as((s) =>
                    s === Mpris.PlaybackStatus.PLAYING
                      ? "media-playback-pause-symbolic"
                      : "media-playback-start-symbolic",
                  )}
                />
              </button>
              <button name="media-button" sensitive={canGoNext} onClicked={() => player.next()}>
                <image iconName="media-skip-forward-symbolic" />
              </button>
            </box>
          </box>
        )
      })}
    </box>
  )
}
