import React, { Component } from 'react';
import ErrorWindow from './ErrorWindow';
import ReportButtom from './ReportButtom';
import { SView } from 'servisofts-component';
import { View } from 'react-native';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: {
        message: error.toString(),
        stack: error.stack
      },
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      return <View style={{
        flex: 1,
        height: "100%"

      }}>
        <ReportButtom {...this.state} />
        <ErrorWindow {...this.state} />
      </View>
    }
    return this.props.children;
  }
}
export default ErrorBoundary;