import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JobSelection } from "./components/modules/JobSelection";
import { RoutingDetails } from "./components/modules/RoutingDetails";
import { JobProvider } from "./context/JobContext";
import { MainContext, MainProvider } from "./context/MainContext";
import { useContext } from "react";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <MainProvider>
        <AppContent />
      </MainProvider>
    </QueryClientProvider>
  );
}

export default App;
