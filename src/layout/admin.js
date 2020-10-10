import React, { Component } from "react";


class Admin extends Component{
    render() {
        return (
            <div>
                <div>Header</div>
                <div>NavLeft</div>
                {this.props.children}
            </div>
        )
    }
}

export default Admin;
