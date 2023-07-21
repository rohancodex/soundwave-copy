import { Volume1, Volume2, VolumeX } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { PlayerControls } from "../ui/PlayerControls";
import { setCurrentSong, setIsPlaying } from "../../features/songSlice";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "./helper";

const Player = () => {
  const [volume, setVolume] = useState(0.3);
  const [currentTime, setCurrentTime] = useState(0);
  const [sleekTime, setSleekTime] = useState(0);

  const audioRef = useRef<any>();
  const { isPlaying, currentSong, songs } = useAppSelector(
    (state: RootState) => state.song
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current.play();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      dispatch(setIsPlaying(false));
    } else {
      audioRef.current?.play();
      dispatch(setCurrentSong(currentSong!));
      dispatch(setIsPlaying(true));
    }
  };

  const handlePrevSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    const previousIndex =
      currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    const previousSong = songs[previousIndex];
    dispatch(setCurrentSong(previousSong));
    dispatch(setIsPlaying(true));
  };

  const handleNextSong = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong?.id);
    const nextIndex = currentIndex + 1;
    // looped index to loop the array if it reaches to length
    const loopedIndex = nextIndex >= songs.length ? 0 : nextIndex;
    const nextSong = songs[loopedIndex];
    dispatch(setCurrentSong(nextSong));
    dispatch(setIsPlaying(true));
  };

  useEffect(() => {
    if (currentSong) {
      if (audioRef.current) audioRef.current.src = currentSong.songUrl;
    }
  }, [currentSong]);

  return (
    <div className="sm:px-12 px-8 w-full flex items-center justify-between rounded-lg md:justify-around bg-gradient-to-r from-accent to-black h-20">
      <div className="flex gap-5">
        <img
          src={currentSong?.imageUrl}
          alt="song"
          className={`mt-8 md:mt-1 h-14 w-14 rounded-full border-4 ${isPlaying ? "animate-spin duration-1000" : ""}`}
        />
        
        <div className="text-white">
          <h6>{currentSong?.trackName}</h6>
          <h6>{currentSong?.artistName}</h6>
        </div>
      </div>
      <div>
        {/* seekbar */}
        <div className="flex flex-row items-center">
          <p className="text-white">{formatTime(currentTime)}</p>
          <input
            type="range"
            value={currentTime}
            onChange={(e) => {
              audioRef.current.currentTime = parseFloat(e.target.value);
              setCurrentTime(parseFloat(e.target.value));
            }}
            min={0}
            max={sleekTime}
            className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
          />
          <p className="text-white">{formatTime(sleekTime)} </p>
        </div>

        <PlayerControls
          isPlaying={isPlaying}
          currentSong={currentSong}
          handlePlayPause={handlePlayPause}
          handleNextSong={handleNextSong}
          handlePrevSong={handlePrevSong}
        />
      </div>

      <audio
        id="audio1"
        src={currentSong?.songUrl}
        ref={audioRef}
        autoPlay
        onTimeUpdate={() => setCurrentTime(audioRef?.current?.currentTime)}
        onDurationChange={() => setSleekTime(audioRef.current.duration)}
        onEnded={() => {
          setCurrentTime(audioRef?.current?.duration);
          dispatch(setIsPlaying(false));
        }}
      />

      <div>
        <div className="hidden md:flex flex-1 items-center justify-en">
          {volume <= 1 && volume > 0.5 ? (
            <Volume2 color="white" size={25} onClick={() => setVolume(0.5)} />
          ) : null}
          {volume <= 0.5 && volume > 0 ? (
            <Volume1 color="white" size={25} onClick={() => setVolume(1)} />
          ) : null}
          {!volume ? (
            <VolumeX color="white" size={25} onClick={() => setVolume(0)} />
          ) : null}
          <input
            type="range"
            step="any"
            value={volume}
            min={0}
            max={1}
            onChange={(event) => {
              audioRef.current.volume = event.target.value;
              setVolume(Number(event.target.value));
            }}
            className="2xl:w-40 lg:w-32 md:w-32 h-1 ml-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
