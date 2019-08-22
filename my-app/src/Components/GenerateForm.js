import React, {Component} from 'react'    
class GenerateForm extends Component {
    constructor(props){
        super(props);
        this.state = { error: null };
    }
    render() {
        fetch(`https://api.jotform.com/form?apiKey=${this.props.apiKey}`, {
                        body: JSON.stringify({
                            questions: [
                                {
                                    type: 'control_widget',
                                    qid:'8',
                                    text: 'payment',
                                   url:'https://www.jotform.com/build/92302135176955'
                                }
                            ],
                            properties:
                                {title:'Payment Options deneme'}
                            
                        }),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        method: "PUT"
                    }).catch((error1)=> {
                        this.setState({ error1 });
                        
                      })
        
        const {selected} = this.props;
        const {list} = this.props;
        console.log("Selected", selected);
        console.log("List", list);
        for (let x=0 ; x < list.length ; x++) {
            for (let y=0 ; y < selected.length ; y++) {
                if (list[x].name===selected[y]) {
                    console.log("type:",list[x].name,"selected:",selected[y]); 
                    fetch("https://api.jotform.com/form?apiKey=bd37a99da0b0dd49ae325b99ceaa234c", {
                        body: JSON.stringify({
                            questions: [
                                {
                                    type: 'control_head',
                                    text: list[x].name,
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
                    }).catch((error)=> {
                        this.setState({ error });
                      })
                }
            }
            //{this.state.error1 ?<p>errorr</p> : <p>done</p>}
        }
        return (
            <div>
                
                {this.state.error?null:<p>Thank You! Your Submission Has Been Received.  <span className="glyphicon glyphicon-ok"/></p>}
                
            </div>
        )
    }
}
export default GenerateForm;
