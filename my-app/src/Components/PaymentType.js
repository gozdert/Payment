import React, { Component } from 'react'
import '../App.css';
import Multiselect from '../Multiselect.js';
import GenerateForm from './GenerateForm';
import {data} from '../constants';
//import {global_variables} from '../constants'
import DeleteForm from './DeleteForm';

 class PaymentType extends Component {
     constructor(props){
         super(props);
         this.state={
            selectedPayment: [],
            paymentList: data,
            isFormGenerated: false,
            isCanceled:false
        }
        this.result = this.result.bind(this);
     }
    result(params) {
        this.setState({
            selectedPayment : params
        })
      }
    handleClick= () =>  {
    //this.setState({isFormGenerated: true});
    // this.setState( {
    //     isFormGenerated: !this.state.isFormGenerated
    //   })
    this.setState((state) => {
        return { isFormGenerated: !state.isFormGenerated}
    })
    }
    cancelClick=()=>{
    this.setState( {
        isCanceled: !this.state.isCanceled
      })   
    }
    render() {
        return (
            <div>
                <h2>Choose Payment Types</h2>
                <Multiselect options={data} onSelectOptions={this.result} />
                <button type="button" onClick={this.handleClick} className="btn btn-outline-warning">Generate</button>
                <button type="button" onClick={this.cancelClick} className="btn btn-outline-warning"><i className="fas fa-eraser"></i> Cancel</button>
                {<GenerateForm display={this.state.isFormGenerated} turn={this.handleClick} apiKey={this.props.apiKey} selected={this.state.selectedPayment} list={this.state.paymentList}/>}
                {this.state.isCanceled ? <DeleteForm turn={this.cancelClick}/>:null}
            </div>
        )
    }
}
export default PaymentType;


