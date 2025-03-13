import { JobSelection } from "./components/modules/JobSelection";
import { JobProvider } from "./context/JobContext";

function App() {
  return (
    <div className="max-w-4xl mx-auto my-2 p-4 rounded bg-white">
      <JobProvider>
        <JobSelection />
      </JobProvider>
    </div>
  );
}

export default App;
