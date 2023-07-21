import { Search } from "lucide-react";
import { Input } from "./Input";

interface SearchBarProps {
  onSearch: (e: any) => void;
  placeholder?: string;
}

const Searchbar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  return (
    <div className="relative block">
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <Search size={20} />
      </span>
      <Input
        className="placeholder:italic py-2 pl-9 pr-3 placeholder:text-slate-400 block w-64 focus-visible:ring-transparent text-sm focus:outline-none border-b-2 border-accent"
        type="search"
        name="search"
        placeholder={placeholder || "Search songs, playlist & artist"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e)}
      />
      {/* <button type="submit" className="absolute right-0 top-0 mr-8 mt-6"> */}

      {/* </button> */}
    </div>
  );
};

export default Searchbar;
