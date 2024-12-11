import Autocomplete from "../components/Autocomplete";

export default function Home() {
  return (
    <div
      className="home"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: "0 auto",
      }}
    >
      <h1>Search X</h1>
      <Autocomplete />
    </div>
  );
}
