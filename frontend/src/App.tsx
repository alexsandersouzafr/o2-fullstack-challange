import "./App.css";
import Dashboard from "./features/dashboard/dashboard";
import Navbar from "./components/navbar";
import Welcome from "./components/welcome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="bg-background min-h-screen min-w-screen">
      <div className="max-w-6xl mx-auto px-2 py-8 flex flex-col gap-4">
        <QueryClientProvider client={queryClient}>
          <Welcome />
          <div className="flex gap-8 justify-between">
            <h1 className="text-5xl font-bold">DASHBOARD</h1>
            <Navbar />
          </div>
          <Dashboard />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
