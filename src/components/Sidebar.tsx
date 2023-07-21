import { useNavigate } from "react-router-dom";
import { Menu, Power } from "lucide-react";
import Cookies from "js-cookie";
import Logo from "@/assets/Logo/Logo";
import { Button } from "./ui/Button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/Sheet";
import Searchbar from "@/components/ui/Searchbar";
import { debounce } from "lodash";
import { useAppDispatch } from "@/app/hooks";
import { searchSongs } from "@/features/songSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    Cookies.remove("authUser");
    //Reloads page
    navigate(0);
  };
  const dispatch = useAppDispatch();

  const searchDebounce = debounce((searchValue: string) => {
    dispatch(searchSongs(searchValue));
  }, 400);

  const handleSearchSong = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    searchDebounce(searchValue);
  };

  return (
    <header className="sticky top-0">
      <div className="md:flex hidden flex-col w-[200px] min-h-screen py-10 px-4 bg-card justify-between">
        <Logo />

        <div>
          {" "}
          <Button
            variant={"outline"}
            className="flex gap-2"
            onClick={() => logoutHandler()}
          >
            <Power size={20} />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      <Sheet>
        <div className="container -mt-14 py-2 flex justify-between items-center md:hidden fixed">
          <Searchbar onSearch={handleSearchSong} />
          <SheetTrigger className="">
            <Menu />
          </SheetTrigger>
        </div>
        <SheetContent side={"bottom"}>
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
            <SheetDescription className="flex justify-center">
              <Button
                variant={"outline"}
                className="flex gap-2"
                onClick={() => logoutHandler()}
              >
                <Power size={20} />
                <span>Logout</span>
              </Button>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Sidebar;
