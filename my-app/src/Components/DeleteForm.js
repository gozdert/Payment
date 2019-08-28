import React, { Component } from 'react'
import {global_variables} from '../constants'

class DeleteForm extends Component {
    constructor(props){
        super(props);
        this.state = { error: null};
    }
    delete=()=>{
        for(let i=0;i<global_variables.id.length;i++)
        {
            fetch(`https://api.jotform.com/form/${global_variables.id[i]}?apiKey=${localStorage.getItem("apiKey")}`, {
                method: "DELETE"
            }).catch((error)=>{this.setState({error});})
        }
        global_variables.selected=[];
    }
    
    render() {
        const {turn}=this.props;
        this.delete();
        turn();
        return (
            <div>
                {this.state.error? null:<p> deleted <span className="glyphicon glyphicon-ok"/></p>}
            </div>
        )
    }
}

export default DeleteForm;