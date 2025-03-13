import { Button } from "../ui/button";

interface ErrorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  retry: () => void;
  goBack: () => void;
}

export function Error({ error, retry, goBack }: ErrorProps) {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="flex flex-col items-center gap-4 p-6 bg-red-50 rounded-lg">
        <div className="text-red-600 text-xl font-semibold">Error</div>
        <div className="text-gray-600">
          {error?.message || "Failed to load routing details"}
        </div>
        <div className="flex gap-3">
          {retry && (
            <Button
              onClick={() => retry()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </Button>
          )}
          {goBack && (
            <Button
              onClick={() => goBack()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Go Back
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
