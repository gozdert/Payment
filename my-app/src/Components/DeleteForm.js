import React, { Component } from 'react'
import {global_variables} from '../constants'

class DeleteForm extends Component {
    constructor(props){
        super(props);
        this.state = { error: null};
    }
    delete=async()=>{
        for(let i=0;i<global_variables.id.length;i++)
        {
            await fetch(`https://api.jotform.com/form/${global_variables.id[i]}?apiKey=${localStorage.getItem("apiKey")}`, {
                method: "DELETE"
            }).catch((error)=>{this.setState({error});})
        }
        fetch(`https://api.jotform.com/form/${global_variables.dum}?apiKey=${localStorage.getItem("apiKey")}`, {
                method: "DELETE"
            })
        global_variables.dum=[];
        global_variables.selected=[];
        global_variables.id=[];

    }
    componentDidMount() {
        const {turn}=this.props;
        if (this.props.display){ turn();}
     }
    render() {
        if(this.props.display){ console.log("Delete Form render create :",this.props.display); this.delete();}
        return (
            <div>
                {this.state.error? null:<p> Deleted <span className="glyphicon glyphicon-ok"/></p>}
            </div>
        )
    }
}

export default DeleteForm;