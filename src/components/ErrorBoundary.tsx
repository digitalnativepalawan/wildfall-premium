import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
          <div className="max-w-md p-8 border border-gold/30 bg-gold/5">
            <h1 className="text-2xl font-serif text-gold mb-4 uppercase tracking-widest">System Error</h1>
            <p className="text-white/60 font-serif italic mb-6">
              An unexpected error has occurred in the simulation.
            </p>
            <pre className="text-[10px] font-mono text-red-500/80 bg-black p-4 overflow-auto text-left mb-6">
              {this.state.error?.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gold text-black font-mono text-[10px] font-bold tracking-widest uppercase"
            >
              RESTART SIMULATION
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
