import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getSongs,
  searchSongs,
  setCurrentSong,
  setIsPlaying,
} from "../../features/songSlice";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

import Searchbar from "@/components/ui/Searchbar";
import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/Button";
import SongCard from "@/components/ui/SongCard";


function Home() {
  const songList = useAppSelector((state) => state.song.songs);
  const { isPlaying, currentSong, loading } = useSelector(
    (state: RootState) => state.song
  );
  const dispatch = useAppDispatch();
  const [offset, setOffset] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>();

  const MAX_OFFSET = 15;

  useEffect(() => {
   dispatch(getSongs(offset));
  }, [offset]);

  useEffect(() => {
    if (currentSong) {
      if (audioRef.current) audioRef.current.src = currentSong.songUrl;
    }
  }, [currentSong]);

  const searchDebounce = debounce((searchValue: string) => {
    dispatch(searchSongs(searchValue));
  }, 400);

  const handleSearchSong = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    searchDebounce(searchValue);
  };


  return (
    <>
      <div className="hidden md:flex lg:flex ml-10 pt-2 py-8 justify-center fixed z-10">
        <Searchbar onSearch={handleSearchSong} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          
          <div className="grid mt-20 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 ml-5 mr-5">

          
            {songList.map((item: any, index: any) => {
              return (
                <SongCard
                  song={item}
                  key={index}
                  isPlaying={isPlaying}
                  currentSong={currentSong}
                  audioRef={audioRef}
                  handlePause={() => {
                    audioRef.current?.pause();
                    dispatch(setIsPlaying(false));
                  }}
                  handlePlay={() => {
                    audioRef.current?.play();
                    dispatch(setCurrentSong(item));
                    dispatch(setIsPlaying(true));
                  }}
                />
              );
            })}
          </div>
        </>
      )}
      {songList.length ? 
      <div className="flex justify-center mt-5 mb-1">
            {offset < MAX_OFFSET ? (
              <Button
                variant="outline"
                onClick={() => setOffset((prev) => prev + 1)}
              >
                Load More
              </Button>
            ) : (
              <Button variant="outline" onClick={() => window.scrollTo(0, 0)}>
                Scroll to Top
              </Button>
            )}
          </div>:<div className="flex justify-center mt-5 mb-1">No results found</div>}
    </>
  );
}

export default Home;
