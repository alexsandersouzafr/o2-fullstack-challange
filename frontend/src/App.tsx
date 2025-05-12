import "./App.css";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="bg-background min-h-screen min-w-screen">
      <div className="max-w-5xl mx-auto p-2 flex flex-col gap-4">
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
