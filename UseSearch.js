import { useState } from "react";

export function useSearch(data) {
  const [query, setQuery] = useState("");

  const filtered = data.filter(item =>
    item.text.toLowerCase().includes(query.toLowerCase())
  );

  return { query, setQuery, filtered };
}
