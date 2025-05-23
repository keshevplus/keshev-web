import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  componentStack?: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Capture additional error information
    this.setState({
      errorInfo,
      componentStack: errorInfo.componentStack || ''
    });
    
    // Log the error to console with detailed information
    console.error('=== ERROR CAUGHT BY ERROR BOUNDARY ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Component stack:', errorInfo.componentStack);
    console.error('=======================================');
    
    // You could also send to an error reporting service here
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 rtl">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">אופס! משהו השתבש</h2>
            <p className="text-gray-700 mb-4 text-center">אנו מתנצלים על אי הנוחות. אנא נסו שוב מאוחר יותר.</p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-4 p-4 bg-gray-100 rounded text-left overflow-auto max-h-64 text-xs font-mono">
                <p className="font-bold mb-2">Error: {this.state.error.toString()}</p>
                {this.state.componentStack && (
                  <pre className="whitespace-pre-wrap">{this.state.componentStack}</pre>
                )}
              </div>
            )}
            
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors mr-2"
                onClick={() => window.location.href = '/'}
              >
                חזרה לדף הבית
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                onClick={() => window.location.reload()}
              >
                טען מחדש את הדף
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
