import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { adminIsolationService } from '../../utils/adminIsolation';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  componentStack?: string;
}

/**
 * AdminErrorBoundary - A specialized error boundary for admin routes
 * This catches errors in the admin section without affecting the public site
 */
class AdminErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Capture additional error information
    this.setState({
      errorInfo,
      componentStack: errorInfo.componentStack || ''
    });

    // Use the isolation service to log the error safely
    adminIsolationService.logError(error, 'AdminErrorBoundary');

    // Log admin-specific errors with a special tag
    console.error('=== ADMIN ERROR BOUNDARY CAUGHT AN ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Component stack:', errorInfo.componentStack);
    console.error('============================================');

    // Automatically disable problematic features based on error patterns
    if (error.message.includes('messages') || errorInfo.componentStack?.includes('MessagesManager')) {
      adminIsolationService.disableFeature('messages');
    }

    // Here you could add admin-specific error reporting to an external service
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Admin-specific error UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4 ltr text-white">
          <div className="max-w-lg w-full bg-gray-900 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-red-500 mb-4 text-center">Admin Dashboard Error</h2>
            <p className="text-gray-300 mb-4 text-center">There was a problem with the admin dashboard. This error has been logged.</p>

            {/* Always show error details for admin users */}
            <div className="mt-4 p-4 bg-gray-800 rounded text-left overflow-auto max-h-64 text-xs font-mono border border-gray-700">
              <p className="font-bold mb-2 text-red-400">Error: {this.state.error?.toString()}</p>
              {this.state.componentStack && (
                <pre className="whitespace-pre-wrap text-gray-400">{this.state.componentStack}</pre>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <Link
                to="/"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mr-2"
              >
                Go to Home Page
              </Link>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                onClick={() => window.location.reload()}
              >
                Reload Admin Dashboard
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AdminErrorBoundary;
