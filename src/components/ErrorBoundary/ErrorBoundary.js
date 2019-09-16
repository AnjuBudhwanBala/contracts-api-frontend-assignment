import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="ErrorImageOverlay">
          <div className="ErrorImageContainer" />
          <div className="ErrorImageText">Sorry this page is broken</div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
