import React, { Component } from 'react';
import ErrorWindow from './ErrorWindow';
import { View } from 'react-native';
import { SNavigation } from 'servisofts-component';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    let data = {
      error: {
        message: error.toString(),
        stack: error.stack
      },
      errorInfo: errorInfo
    }
    const nav = SNavigation.lastRoute;
    if (nav?.route) {
      data.route = {
        name: nav?.route.name,
        params: nav?.route.params
      }
    }
    this.setState({ ...data })
  }

  render() {
    if (this.state.errorInfo) {
      return <View style={{
        flex: 1,
        height: "100%"

      }}>
        <ErrorWindow {...this.state} />
      </View>
    }
    return this.props.children;
  }
}
export default ErrorBoundary;