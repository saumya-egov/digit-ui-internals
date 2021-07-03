import React from "react"
import js_function from "./jsFunction";
class ReactWrapper extends React.Component {
    constructor(props){         
        super(props);
    };
    _js(){
        js_function()
    }
    
    componentDidMount(){
        // debugger
    }

}

export default new ReactWrapper()