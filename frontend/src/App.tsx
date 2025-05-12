import "./App.css";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import Welcome from "./components/welcome";

function App() {
  return (
    <div className="bg-background min-h-screen min-w-screen">
      <div className="max-w-5xl mx-auto px-2 py-8 flex flex-col gap-4">
        <Navbar />
        <Welcome />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
