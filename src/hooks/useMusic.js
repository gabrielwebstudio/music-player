import { useState } from "react";

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
        title: "I don't care",
        artist: "Gabriel",
        url: "/songs/I don't care.mp3",
        duration: "1:45",
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
]

export default function useMusic() {

    const [allSongs, setAllSongs] = useState(songs);
    const [currentTrack, setCurrentTrack] = useState(songs[0]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    function handlePlaySong(song, index) {
        setCurrentTrack(song);
        setCurrentTrackIndex(index);
    }

    function nextTrack() {
        setCurrentTrackIndex((prev) => {
            const nextIndex = (prev + 1) % allSongs.length;
            setCurrentTrack(allSongs[nextIndex]);
            return nextIndex
            
        } )
        setIsPlaying(false);
    }

    function prevTrack() {
        setCurrentTrackIndex((prev) => {
            const nextIndex = prev === 0 ? allSongs.length - 1 : prev - 1;
            setCurrentTrack(allSongs[nextIndex]);
            return nextIndex
            
        } )
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

    return {
        allSongs,
        handlePlaySong,
        currentTrack,
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
    };
}