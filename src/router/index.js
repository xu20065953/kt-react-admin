import React, {Component} from "react";
import App from "../App";

import {
    HashRouter,
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default class ERouter extends Component{
    render() {
        return (
            <HashRouter>
                <App>

                </App>
            </HashRouter>
        )
    }
}
