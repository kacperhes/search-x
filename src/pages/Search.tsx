import { useEffect } from "react";
import Autocomplete from "../components/Autocomplete";
import { useSearchContext } from "../contexts/SearchContext";

export default function Search() {
  const { results, query, setShowSuggestions } = useSearchContext();

  useEffect(() => {
    setShowSuggestions(false);
  }, [query, setShowSuggestions]);

  return (
    <div style={{ marginTop: 0 }}>
      <h2 style={{ textAlign: "left" }}>Search X</h2>
      <Autocomplete />
      <div style={{ display: "flex", minWidth: "100%" }}>
        <div style={{ padding: "20px", textAlign: "left" }}>
          {results.length > 0 ? (
            <>
              <small style={{ fontSize: "12px", color: "#666" }}>
                {results.length} results found
              </small>
              {results.map((result) => (
                <div
                  key={result.id}
                  style={{
                    marginBottom: "20px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <a
                    href={result.link}
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    <p>{result.title}</p>
                  </a>
                  <p>{result.description.substring(0, 100)}...</p>
                </div>
              ))}
            </>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
}
