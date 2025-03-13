import { JobSelection } from "./components/modules/JobSelection";
import { RoutingDetails } from "./components/modules/RoutingDetails";
import { JobProvider } from "./context/JobContext";
import { MainContext, MainProvider } from "./context/MainContext";
import { useContext } from "react";

function AppContent() {
  const { step } = useContext(MainContext).state;

  return (
    <div className="max-w-4xl mx-auto my-2 p-4 rounded bg-white">
      {step === "JOB_SELECTION" && (
        <JobProvider>
          <JobSelection />
        </JobProvider>
      )}

      {step === "ROUTING_DETAILS" && <RoutingDetails />}
    </div>
  );
}

function App() {
  return (
    <MainProvider>
      <AppContent />
    </MainProvider>
  );
}

export default App;
