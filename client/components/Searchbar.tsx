import React from "react";

function Searchbar({
  search,
  setSearch,
}: {
  search: string | null;
  setSearch: (query: string) => void;
}) {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for movies"
        className="w-1/4 h-12 px-4 text-white bg-primary rounded-lg mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onChange={handleSearch}
        value={search ?? ""}
      />
    </div>
  );
}

export default Searchbar;
