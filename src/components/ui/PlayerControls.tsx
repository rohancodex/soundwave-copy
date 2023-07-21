import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

interface PlayerControlProps {
  isPlaying: boolean;
  currentSong: Song | null;
  handlePlayPause: () => void;
  handlePrevSong: () => void;
  handleNextSong: () => void;
}

export const PlayerControls = (props: PlayerControlProps) => {
  const {
    isPlaying,
    currentSong,
    handlePlayPause,
    handlePrevSong,
    handleNextSong,
  } = props;
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80 cursor-pointer">
        {currentSong ? <SkipBack color="white" strokeWidth={1} size={30} onClick={handlePrevSong} />: null}
        {isPlaying ? (
          <Pause color="white" strokeWidth={1} size={45} onClick={handlePlayPause} />
        ) : (
          <Play color="white" strokeWidth={1} size={45} onClick={handlePlayPause} />
        )}
        {currentSong ? <SkipForward color="white" strokeWidth={1} size={30} onClick={handleNextSong} />:null}
      </div>
    </div>
  );
};
