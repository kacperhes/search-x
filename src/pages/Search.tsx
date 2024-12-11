import { useSearchContext } from "../contexts/SearchContext";

export default function Search() {
  const { results } = useSearchContext();

  return (
    <div style={{ display: "flex", minWidth: "100%" }}>
      <div style={{ padding: "20px", textAlign: "left" }}>
        {results.length > 0 ? (
          results.map((result) => (
            <div
              key={result.id}
              style={{ marginBottom: "20px", borderBottom: "1px solid #ccc" }}
            >
              <a
                href={result.link}
                style={{ color: "blue", textDecoration: "underline" }}
              >
                <p>{result.title}</p>
              </a>
              <p>{result.description}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
