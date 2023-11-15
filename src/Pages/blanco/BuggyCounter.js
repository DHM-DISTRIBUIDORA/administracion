import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SPage, SText } from 'servisofts-component';
import Model from '../../Model';
import SList from 'servisofts-component/Component/SList2';
import { Container } from '../../Components';

class BuggyCounter extends React.Component {
    constructor(props) {
      super(props);
      this.state = { counter: 0 };
      this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
      this.setState(({counter}) => ({
        counter: counter + 1
      }));
    }
    
    render() {
      if (this.state.counter === 5) {
        // Simulate a JS error
        throw new Error('ME QUEBRÉ!!!!');
      }
      return <SText onClick={this.handleClick}>{this.state.counter}</SText>;
    }
  }
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BuggyCounter);