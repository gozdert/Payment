import React, {Component} from 'react'
import {global_variables} from '../constants'

class IframeForm extends Component {
    constructor(props){
        super(props);
        this.state = { dum: null};
    }
   //clone=()=>{

 

    componentDidMount(){
        
    }
    
    render() {
            
        fetch(`https://api.jotform.com/form?apiKey=${localStorage.getItem("apiKey")}`,{
            body: JSON.stringify({
                questions: [
                    {
                        type: 'control_head',
                        text: 'Payment Options'
                    }
                ],
                properties:
                {title:'Payment Options bu mu evet son' }
             }),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                method: "PUT"
            }).then(res=>
            res.json()
        ).then(response =>{
            //global_variables.dum.push(response.content.id)
            //console.log(global_variables.dum,"bu dum ")
            //console.log("inside the clone",global_variables.selected.length);
        for(let a=0 ; a<global_variables.id.length  ; a++)
        {
            console.log("clone function for loop",a)
            fetch(`https://api.jotform.com/form/${response.content.id}/questions?apiKey=${localStorage.getItem("apiKey")}`, 
            {
                method: "PUT",
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
                            //url:' https://www.jotform.com/build/92333806841963',
                            url:` https://www.jotform.com/build/${global_variables.id[a]}`,
                            transparent: 'No',
                            order: '2',
                            name: 'typeA11',
                            v4: '1'
                            //widgetType:'field',
                        }
                    ],
                    v4: '1',
                    headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                }
              })})
        }
         




        })
        console.log("before the clone");

        return (
            <div>
                
            </div>
        )
    }
}


export default IframeForm;