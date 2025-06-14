<<<<<<< HEAD
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
=======
import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
  hasError: boolean;
  error: Error | null;
}

<<<<<<< HEAD
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Component Error</h2>
          <p className="text-red-700 mb-4">
            This component encountered an error and has been temporarily disabled to prevent affecting other parts of the site.
          </p>
          <details className="text-sm text-gray-700 bg-white p-2 rounded border">
            <summary>Technical Details</summary>
            <p className="mt-2 font-mono text-xs overflow-auto p-2 bg-gray-100 rounded">
              {this.state.error?.toString()}
            </p>
          </details>
=======
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600">
              Something went wrong.
            </h1>
            <p className="text-gray-700 mt-4">{this.state.error?.message}</p>
          </div>
>>>>>>> 430a8d2625f8bfe902f04811e3d440f6634a849c
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
