import { useContext } from "react";
import { JobSelection } from "./components/modules/JobSelection";
import { JobContext, JobProvider } from "./context/JobContext";
import { RoutingDetails } from "./components/modules/RoutingDetails";

function App() {
  return (
    <div className="max-w-4xl mx-auto my-2 p-4 rounded bg-white">
      <JobProvider>
        <JobSelection />
        <RoutingDetails />
      </JobProvider>
    </div>
  );
}

export default App;
