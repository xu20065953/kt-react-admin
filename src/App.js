import React from 'react';
import Router from "./router";
import { Provider } from 'react-redux';
import store from './store'

function App(props) {
    return (
        <Provider store={store}>
            <div className="App">
                <Router />
            </div>
        </Provider>
    );
}

export default App;
