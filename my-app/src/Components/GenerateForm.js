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
                            qid: '11',
                            cfname:'Iframe Embed',
                            maxWidth: '587',
                            widgetType: 'field',
                            builderDescription:null ,
                            static: 'Yes',
                            boxAlign: 'Left',
                            text: 'Type a question',
                            label: 'Yes',
                            labelAlign: 'Auto',
                            settingNames: 'url,transparent,customCSS',
                            settingNamesCSS: null,
                            widgetTabs: [["general", "settingNames"], ["customcss", "settingNamesCSS"]],
                            paramChunks:null ,
                            customCSS:null ,
                            frameWidth: '560',
                            frameHeight: '400',
                            frameSrc: 'http://widgets.jotform.io/iframeEmbed/',
                            finalSrc:'http://widgets.jotform.io/iframeEmbed/' ,
                            required: 'No',
                            inlieEditDefaultValue: 'Type a question',
                            type: 'control_widget',
                            selectedField: '5295629cba137d764f000004',
                            fieldParameters: [
                            {
                                name: 'url',
                                readable:' Frame url',
                                type: 'text',
                                default: null,
                                tip: 'Enter the iframe url. It is recommended to use a HTTPS url.',
                                paramStatus: 'enabled'
                            } ,
                            {
                                name:  'transparent',
                                readable: 'Transparent frame',
                                type: 'dropdown',
                                default: 'No' ,
                                options: 'No,Yes',
                                tip:' Whether to make the iframe transparent or not.',
                                paramStatus: 'enabled'
                            } ],
                            url:' https://www.jotform.com/build/92333806841963',
                            transparent: 'No',
                            order: '2',
                            name: 'typeA11',
                            v4: 1
                            //widgetType:'field',
                        }
                    ],
                    v4: '1',
                    properties:
                        {title:'Payment Options bu mu evet son'}
                                
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
                    fetch(`https://api.jotform.com/form?apiKey=${this.props.apiKey}`, {
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
                    }).then((success)=>{
                        console.log("success:",success.json());
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
