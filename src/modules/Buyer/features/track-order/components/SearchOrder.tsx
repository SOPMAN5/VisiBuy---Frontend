

import { useState } from "react";

interface SearchOrderProps {
  onSearch: (query: string) => void;
}

const SearchOrder: React.FC<SearchOrderProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search order"
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default SearchOrder;
