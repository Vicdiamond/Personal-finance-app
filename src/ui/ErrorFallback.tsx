interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}
function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <>
      <main className="h-screen bg-gray-50 flex items-center justify-center p-12">
        <div className="bg-white border border-gray-100 rounded-md p-12 text-center max-w-4xl">
          <h1 className="mb-4">Something went wrong</h1>
          <p className="font-sono mb-8 text-gray-500">{error.message}</p>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      </main>
    </>
  );
}

export default ErrorFallback;
