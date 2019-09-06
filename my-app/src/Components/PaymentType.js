import React, { Component } from 'react'
import '../App.css';
import Multiselect from '../Multiselect.js';
import GenerateForm from './GenerateForm';
import {data} from '../constants';
//import {global_variables} from '../constants'
import DeleteForm from './DeleteForm';
//import {removeChip} from '../Multiselect'
 class PaymentType extends Component {
     constructor(props){
         super(props);
         this.state={
            selectedPayment: [],
            paymentList: data,
            isFormGenerated: false,
            isCanceled:false,
            deleteflag:false
        }
        this.result = this.result.bind(this);
        this.delete = this.delete.bind(this);
     }
    result(params) { this.setState({ selectedPayment : params } ) }
    handleClick= () => { this.setState((state) => { return { isFormGenerated: !state.isFormGenerated} } ) }
    delete=(params)=>{ this.setState( { deleteflag:params } ) }
    cancelClick=()=>{ this.setState( { isCanceled: !this.state.isCanceled } ) }
    render() {
        return (
            <div>
                <h2>Choose Payment Types</h2>
                <Multiselect options={data} generate={this.state.deleteflag} turn={this.delete} turn2={this.cancelClick} cancel={this.state.isCanceled} onSelectOptions={this.result} />
                <button type="button" onClick={this.handleClick} className="btn btn-outline-warning">Generate</button>
                <button type="button" onClick={this.cancelClick} className="btn btn-outline-warning"><i className="fas fa-eraser"></i> Delete Form</button>
                {this.state.isFormGenerated ? <GenerateForm display={this.state.isFormGenerated} deletelist={this.delete} turn={this.handleClick} apiKey={this.props.apiKey} selectedlist={this.state.selectedPayment} list={this.state.paymentList}/>:null}
                {this.state.isCanceled ? <DeleteForm turn={this.cancelClick} display={this.state.isCanceled}/>:null}
            </div>
        )
    }
}
export default PaymentType;


