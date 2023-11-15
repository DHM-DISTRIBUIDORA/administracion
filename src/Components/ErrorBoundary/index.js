import React, { Component } from 'react';
import ErrorWindow from './ErrorWindow';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      return <ErrorWindow {...this.state} />
    }
    return this.props.children;
  }
}
export default ErrorBoundary;