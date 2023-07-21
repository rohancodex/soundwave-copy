import { Play, Pause } from "lucide-react";

interface PlayPauseProps{
    isPlaying:boolean;
    currentSong: Song | null;
    song: Song | null;
    handlePause:()=> void;
    handlePlay:()=>void
}
export const PlayPause = (props: PlayPauseProps) => {
    const {isPlaying, currentSong, handlePause, handlePlay, song} = props;
  return (
    <>{isPlaying && currentSong?.id === song?.id ? <Pause size={44} onClick={handlePause}/>:<Play size={44} onClick={handlePlay}/>}
    </>
  )
}
