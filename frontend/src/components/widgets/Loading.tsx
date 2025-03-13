export function Loading() {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    </div>
  );
}
