import React, { Component } from 'react'
import { global_variables} from '../constants';

class GenerateForm extends Component {
    constructor(props) {
        super(props);
        this.state = { error: false, isRendered: false };
    }
    create = async (props) => {
        const { selectedlist } = props;
        const { list } = props;
        const questionsarr= [];
        let num=0;
        fetch(`https://api.jotform.com/form?apiKey=${localStorage.getItem("apiKey")}`, {
            body: JSON.stringify({
                questions: [{ type: 'control_head', text: 'Payment Options'}],
                properties:{ title: 'Payment Options' } }),
            headers:{ "Content-Type": "application/x-www-form-urlencoded" },
            method: "PUT"
        }).then(res =>
            res.json()
        ).then(mainform => {
            global_variables.dum.push(mainform.content.id); console.log("mainform:",mainform.content.id);
            for (let x = 0; x < list.length; x++) {
                for (let y = 0; y < selectedlist.length; y++) {
                    if (list[x].name === selectedlist[y]) {
                        fetch(`https://api.jotform.com/form?apiKey=${localStorage.getItem("apiKey")}`, {
                            body: JSON.stringify({
                                questions: [{ type: 'control_head', text: list[x].name}, { type: list[x].paymentDataType, text: list[x].value }],
                                properties: { title: list[x].name }
                            }),
                            headers: { "Content-Type": "application/x-www-form-urlencoded"},
                            method: "PUT"
                        }).then(res =>
                            res.json()
                        ).then(paymentform => {
                            global_variables.selected.push(paymentform.content.url); global_variables.id.push(paymentform.content.id);
                            let sy=1;
                            console.log("Payment Form:" , paymentform.content.id);
                            questionsarr.push({
                                qid: y+3,
                                cfname: 'Iframe Embed',
                                maxWidth: '587',
                                widgetType: 'field',
                                builderDescription: null,
                                static: 'Yes',
                                boxAlign: 'Left',
                                text: 'Type a question',
                                label: 'Yes',
                                labelAlign: 'Auto',
                                settingNames: 'url,transparent,customCSS',
                                settingNamesCSS: null,
                                widgetTabs: [["general", "settingNames"], ["customcss", "settingNamesCSS"]],
                                paramChunks: null,
                                customCSS: null,
                                frameWidth: '560',
                                frameHeight: '400',
                                frameSrc: 'http://widgets.jotform.io/iframeEmbed/',
                                finalSrc: 'http://widgets.jotform.io/iframeEmbed/',
                                required: 'No',
                                inlieEditDefaultValue: 'Type a question',
                                type: 'control_widget',
                                selectedField: '5295629cba137d764f000004',
                                fieldParameters: [
                                    {
                                        name: 'url',
                                        readable: ' Frame url',
                                        type: 'text',
                                        default: null,
                                        tip: 'Enter the iframe url. It is recommended to use a HTTPS url.',
                                        paramStatus: 'enabled'
                                    },
                                    {
                                        name: 'transparent',
                                        readable: 'Transparent frame',
                                        type: 'dropdown',
                                        default: 'No',
                                        options: 'No,Yes',
                                        tip: ' Whether to make the iframe transparent or not.',
                                        paramStatus: 'enabled'
                                    }],
                                //url:' https://www.jotform.com/build/92333806841963',
                                url: ` https://www.jotform.com/build/${paymentform.content.id}`,
                                transparent: 'No',
                                order: `${sy+1}`,
                                name: 'typeA11',
                                v4: '1'
                                //widgetType:'field',
                            })
                        }).then(()=>{
                            num++;
                            if(num===selectedlist.length){
                                fetch(`https://api.jotform.com/form/${global_variables.dum}/questions?apiKey=${localStorage.getItem("apiKey")}`,
                                {
                                    method: "PUT",
                                    body:JSON.stringify({questions: questionsarr}),
                                    headers: { "Content-Type": "application/json",'Accept': 'application/json'}
                                }).then(()=>{
                                    const { deletelist } = this.props;
                                    deletelist(true);
                                }).catch(err => {console.log(err)})
                            }   
                        })
                    }
                }
            }
        })
    }
    componentDidMount() {
        const { turn } = this.props;
        if (this.props.display) { turn(); }
    }
    render() {
        if (this.props.display) { console.log("Generate Form render create :", this.props.display); this.create(this.props); }
        const renderMessage = this.props.display ? (<div> {this.state.error ? null : <p>Thank You! Your Submission Has Been Received. < span className="glyphicon glyphicon-ok" /></p>} </div>) : null;
        return (
            <>
                {renderMessage}
            </>
        )
    }
}
export default GenerateForm;
