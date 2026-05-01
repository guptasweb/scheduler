export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-coral/10 border border-coral/20 rounded-xl">
      <div className="w-8 h-8 bg-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-coral text-sm font-body">{message}</p>
        {message?.includes("ECONNREFUSED") || message?.includes("Network") ? (
          <p className="text-coral/50 text-xs font-mono mt-0.5">
            Is your Rails API running on port 3000?
          </p>
        ) : null}
      </div>
      {onRetry && (
        <button onClick={onRetry} className="text-coral/60 hover:text-coral text-xs font-mono transition-colors flex-shrink-0">
          Retry
        </button>
      )}
    </div>
  );
}
