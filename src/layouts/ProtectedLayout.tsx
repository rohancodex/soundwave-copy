import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/player/Player";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {

  const {currentSong} = useAppSelector(
    (state: RootState) => state.song
  );
  return (
    <>
    <main className="h-screen">
      <div className="md:flex">
        <div className="md:basis-1/6 z-10 relative">
          <Sidebar />
        </div>
        <div className="basis-full mt-4 z-1">
          <Outlet />
          <div className={`sticky bottom-0 ${currentSong ? "block" : "hidden"}`}>
          <Player/> 
          </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default ProtectedLayout;
