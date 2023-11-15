import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SLoad, SPage, SText, SView } from 'servisofts-component';
import Model from '../../Model';
import SList from 'servisofts-component/Component/SList2';
import { Container } from '../../Components';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    
    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
          <SView>
            <SText>ALGO MALO PASA</SText>
            <SText >
              {this.state.error && this.state.error.toString()}
              <SHr />
              {this.state.errorInfo.componentStack}
            </SText>
          </SView>
        );
      }
      // Normally, just render 
      return this.props.children;
    }  
  }
export default ErrorBoundary;