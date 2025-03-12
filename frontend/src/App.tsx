import { JobSelection } from "./components/modules/JobSelection";
import { JobProvider } from "./context/JobContext";

function App() {
  return (
    <div className="bg-slate-900">
      <div className="max-w-4xl mx-auto p-4 bg-white">
        <JobProvider>
          <JobSelection />
        </JobProvider>
      </div>
    </div>
  );
}

export default App;
