import { useRef } from "react";
import { useKey } from "../Hooks/useKey";

export default function Search({ query, setQuery }) {
  const serachInputElement = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === serachInputElement.current) return;

    serachInputElement.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={serachInputElement}
    />
  );
}
