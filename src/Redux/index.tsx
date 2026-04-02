import React from 'react';
import Reducer from './Reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider as ProviderRedux } from 'react-redux';
import reduxThunk from 'redux-thunk';
import Model from '../Model';

export const store = createStore(
    combineReducers(Model._events.combineReducers(Reducer)),
    {},
    applyMiddleware(reduxThunk),
);

Model._events.setStore(store)

const ReduxProvider = ProviderRedux as React.ComponentType<React.PropsWithChildren<{ store: typeof store }>>;

const Redux = (props:any) => {
    return (<ReduxProvider store={store} >
        {props.children}
    </ReduxProvider>)
}
export default Redux;