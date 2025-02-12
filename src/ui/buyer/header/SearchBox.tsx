import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchBox = ({
  placeholder,
  onSearch,
  
}: {
  placeholder: string;
  onSearch?: (query: string) => void;
  
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      if (onSearch) onSearch(query); // Call the callback if provided
    }
  };

  return (
    <div
      className={`flex items-center bg-blue-200 p-2 rounded-md  w-[290px]`}
    >
      <FaSearch
        className="text-blue mx-2 cursor-pointer"
        onClick={handleSearch}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="w-full bg-transparent focus:outline-none placeholder-blue font-semibold"
      />
    </div>
  );
};

export default SearchBox;
