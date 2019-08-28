import React, {Component} from 'react'
import {global_variables} from '../constants';
import IframeForm from './IframeForm';

class GenerateForm extends Component {
    constructor(props){
        super(props);
        this.state = { error: false, isRendered:false};
    }

    componentDidMount() {
        const {turn}=this.props;
        if (this.props.display){
            turn();
        }
    }

    render() {

        if(this.props.display){
            console.log()
            const {selected} = this.props;
            const {list} = this.props;
            console.log("Selected", selected);
            console.log("List", list);
            for (let x=0 ; x < list.length ; x++) {
                for (let y=0 ; y < selected.length ; y++) {
                    if (list[x].name===selected[y]) {
                        console.log("type:",list[x].name,"selected:",selected[y]);
                            fetch(`https://api.jotform.com/form?apiKey=${this.props.apiKey}`, {
                                body: JSON.stringify({
                                    questions: [
                                        {
                                            type: 'control_head',
                                            text: list[x].name
                                        },
                                        { 
                                            type: list[x].paymentDataType,
                                            text: list[x].value
                                        }
                                    ],
                                    properties:
                                        {title:list[x].name}   
                                }),
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                method: "PUT"
                            }).then(res=>
                                res.json()
                            ).then(response =>{
                                //console.log(response.content.url)
                                global_variables.selected.push(response.content.url)
                                global_variables.id.push(response.content.id)
                                console.log(global_variables.selected, "here is my variable !!!")
                                this.setState({isRendered:true})
                            }).catch((error)=> {
                                this.setState({ error: true });
                            })   
                        }
                    }
                }
        }

    const renderMessage = this.props.display ? (<div>
        {this.state.error ? <p>Errorrrrr</p> : <p>Thank You! Your Submission Has Been Received.  <span className="glyphicon glyphicon-ok"/></p>}   
        {console.log("burdaaaaaaaaaa",global_variables.selected.length)}
        {this.state.isRendered ? null: <IframeForm/>}
    </div>) : null;

    return (
        <>
        {renderMessage}
        </>
        )
    }
}
export default GenerateForm;
