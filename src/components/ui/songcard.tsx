
import { Card, CardContent, CardDescription } from "./Card";
import { PlayPause } from "./PlayPause";

interface AudioProps {
  song: Song;
  isPlaying: boolean;
  currentSong: Song | null;
  handlePlay: () => void;
  handlePause: () => void;
  audioRef: any;
}

const SongCard = (props: AudioProps) => {
  const { isPlaying, handlePlay, handlePause, currentSong, song } =
  props;
  const { imageUrl, trackName, artistName } = song;


  return (
    <Card className="bg-card transition-transform transform hover:scale-110">
      <CardContent className="shadow-lg rounded p-2 h-full">
        <div className="group relative">
          <img className="rounded w-full h-[16rem]" src={imageUrl} alt="Song cover" />
          <div className="absolute rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
            <button
              className="bg-red hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition"
            >
              <PlayPause
                isPlaying={isPlaying}
                currentSong={currentSong}
                handlePause={handlePause}
                handlePlay={handlePlay}
                song={song}
              />
            </button>
          </div>
        </div>
        <CardDescription>
         <div className="mt-3 -mb-5 text-base text-accent italic"> {trackName}</div> <br />
          {artistName}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default SongCard;
