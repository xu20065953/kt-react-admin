import React from 'react';
import {Button} from "antd";
import Router from "./router";

function App(props) {
    console.log(props);
    return (
    <div className="App">
        <Router />
    </div>
  );
}

export default App;
