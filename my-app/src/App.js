import React,{Component} from 'react';
import logo from './logo.png';
import './App.css';
import PaymentType from './Components/PaymentType';
import LoginPage from './Components/LoginPage';

class App extends Component {
 constructor(props){
    super(props);
    this.state = { isLogin: true, apiKey:null };
  }
  loginStatus =(apiKey) =>{
    this.setState({isLogin: false,apiKey:apiKey});
    console.log("login funtiona girdi api:",apiKey)
  }
  result(params) {
    console.log(params);
  }
  render() {
    const {isLogin, apiKey}=this.state;
    const PaymentTypex=(
      <>
        <img src={logo} alt="Logo"/>
        <PaymentType apiKey={apiKey}/>
      </>)
    return (
      <div className="App">
        {isLogin ? <LoginPage loginStatus={this.loginStatus}/>: PaymentTypex}
      </div>
    );
  }
}
export default App;