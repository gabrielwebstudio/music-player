import { createContext, useContext, useState, useEffect } from "react";

const songs = [
    {
        id: 1,
        title: "Forever",
        artist: "Gabriel",
        url: "/songs/Forever.mp3",
        duration: "0:56",
    },
    {
        id: 2,
        title: "Piano",
        artist: "Gabriel",
        url: "/songs/Piano.mp3",
        duration: "3:36",
    },
    {
        id: 3,
        title: "LoFi",
        artist: "Gabriel",
        url: "/songs/LoFi.mp3",
        duration: "2:41",
    },
    {
        id: 4,
        title: "Trap",
        artist: "Gabriel",
        url: "/songs/Trap.mp3",
        duration: "7:12",
    },
    {
        id: 5,
        title: "LoFi2",
        artist: "Gabriel",
        url: "/songs/LoFi2.mp3",
        duration: "2:26",
    },
]

export const MusicContext = createContext();

export default function MusicProvider({ children }) {
    const [allSongs, setAllSongs] = useState(songs);
    const [currentTrack, setCurrentTrack] = useState(songs[0]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const storedPlaylists = localStorage.getItem("musicPlayerPlaylists");

        if(storedPlaylists) {
            setPlaylists(JSON.parse(storedPlaylists));
        }
    }, [])

    useEffect(() => {
        if (playlists.length > 0) {
            localStorage.setItem("musicPlayerPlaylists", JSON.stringify(playlists))
        } else {
            localStorage.removeItem("musicPlayerPlaylists");
        }
    }, [playlists]);

    function handlePlaySong(song, index) {
        setCurrentTrack(song);
        setCurrentTrackIndex(index);
        setIsPlaying(false);
    }

    function nextTrack() {
        setCurrentTrackIndex((prev) => {
            const nextIndex = (prev + 1) % allSongs.length;
            setCurrentTrack(allSongs[nextIndex]);
            return nextIndex

        })
        setIsPlaying(false);
    }

    function prevTrack() {
        setCurrentTrackIndex((prev) => {
            const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
            setCurrentTrack(allSongs[nextIndex]);
            return nextIndex

        })
        setIsPlaying(false);
    }

    function play() {
        setIsPlaying(true);
    }

    function pause() {
        setIsPlaying(false);
    }

    function formatTime(time) {
        if (isNaN(time) || time == undefined) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    function createPlaylist(name) {
        const newPlaylist = {
            id: Date.now(),
            name,
            songs: []
        };

        setPlaylists((prev) => [...prev, newPlaylist]);
    }

    function deletePlaylist(playlistId) {
        setPlaylists((prev) => prev.filter((playlist) => playlist.id !== playlistId));
    }

    function addSongToPlaylist(playlistId, song) {
        setPlaylists((prev) => prev.map((playlist) => {
            if(playlist.id === playlistId) {
                return {...playlist, songs: [...playlist.songs, song]}
            } else {
                return playlist;
            }
        }))
    }

    return (
        <MusicContext.Provider value={{
            allSongs,
            handlePlaySong,
            currentTrack,
            setCurrentTrack,
            currentTrackIndex,
            currentTime,
            setCurrentTime,
            formatTime,
            duration,
            setDuration,
            nextTrack,
            prevTrack,
            play,
            pause,
            isPlaying,
            volume,
            setVolume,
            createPlaylist,
            playlists,
            addSongToPlaylist,
            deletePlaylist,
        }}>
            {children}
        </MusicContext.Provider>
    )
}

export function useMusic() {
    const contextValue = useContext(MusicContext);
    if (!contextValue) {
        throw new Error("useMusic must be used inside of MusicProvider")
    }

    return contextValue;
}