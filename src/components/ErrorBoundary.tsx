import React from 'react';

export default class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null, info: any}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    this.setState({ info });
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 bg-white min-h-screen text-slate-800 relative z-50">
          <h1 className="text-3xl font-bold text-red-500 mb-4">Application Error</h1>
          <p className="mb-4">Something went wrong while rendering this page.</p>
          <div className="bg-slate-100 p-4 rounded overflow-auto text-sm font-mono text-red-600 mb-4">
            {this.state.error?.toString()}
          </div>
          <div className="bg-slate-100 p-4 rounded overflow-auto text-xs font-mono text-slate-600">
            {this.state.info?.componentStack}
          </div>
          <button 
            onClick={() => { localStorage.clear(); window.location.href = '/'; }} 
            className="mt-6 px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800"
          >
            Clear Local Storage & Go Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
