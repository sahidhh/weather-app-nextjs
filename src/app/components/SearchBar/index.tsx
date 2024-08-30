"use client";

import { useEffect, useState, KeyboardEvent, useRef } from "react";
import localities from "../../localities.json";

interface Result {
  cityName: string;
  localityName: string;
  localityId: string;
  latitude: number;
  longitude: number;
  device_type: string;
}

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<Result[]>(localities);
  const [results, setResults] = useState<Result[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    search(value);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (results.length > 0) {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => {
          const nextIndex = Math.min(prev + 1, results.length - 1);
          setSearchTerm(
            `${results[nextIndex].localityName}, ${results[nextIndex].cityName}`,
          );
          return nextIndex;
        });
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => {
          const prevIndex = Math.max(prev - 1, 0);
          setSearchTerm(
            `${results[prevIndex].localityName}, ${results[prevIndex].cityName}`,
          );
          return prevIndex;
        });
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        window.location.href = `http://localhost:3000/dashboard?localityId=${results[selectedIndex].localityId}`;
      }
    }
  };

  const search = (term: string) => {
    const filteredResults = data.filter(({ localityName, cityName }) =>
      `${localityName}, ${cityName}`.toLowerCase().includes(term.toLowerCase()),
    );
    setResults(filteredResults);
  };

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedItem = listRef.current.children[selectedIndex];
      selectedItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <div className="relative">
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="w-full border p-2"
        />
      </div>
      {results.length > 0 && (
        <div
          ref={listRef}
          className="absolute z-10 max-h-60 w-full overflow-y-auto bg-white shadow-lg"
        >
          {results.map(({ localityName, cityName }, index) => (
            <div
              key={index}
              className={`block cursor-pointer text-wrap p-2 ${
                selectedIndex === index
                  ? "bg-slate-500 text-white"
                  : "bg-gray-100 hover:bg-slate-400"
              }`}
              onMouseOver={() => setSelectedIndex(index)}
              onMouseOut={() => setSelectedIndex(-1)}
              onClick={() => setSearchTerm(`${localityName}, ${cityName}`)}
            >
              {`${localityName}, ${cityName}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
