import React, { Component } from 'react'
import '../App.css';
import Multiselect from '../Multiselect.js';
import GenerateForm from './GenerateForm';
import {data} from '../constants';

 class PaymentType extends Component {
     constructor(props){
         super(props);
         this.state={
            selectedPayment: [],
            paymentList: data,
            isFormGenerated: false
        }
        this.result = this.result.bind(this);
     }
    result(params) {
        this.setState({
            selectedPayment : params
        })
      }
    handleClick= () =>  {
    this.setState({isFormGenerated: true});
    }
    render() {
        return (
            <div>
                <h2>Choose Payment Types</h2>
                <Multiselect options={data} onSelectOptions={this.result} />
                <button type="button" onClick={this.handleClick} className="btn btn-outline-warning">Generate</button>
                {this.state.isFormGenerated ?<GenerateForm apiKey={this.props.apiKey} selected={this.state.selectedPayment} list={this.state.paymentList}/> : null}
            </div>
        )
    }
}
export default PaymentType;


