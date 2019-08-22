import React, { Component } from 'react'
import Script from 'react-load-script'

class LoginPage extends Component {
    render() {
        console.log('rendered');
        const {loginStatus} = this.props;
        return (
            <div id="result" className="login_n">
                <Script url= "https://js.jotform.com/JotForm.js" onLoad={(e) =>{
                     window.JF.login(()=>{ 
                         loginStatus(window.JF.getAPIKey());});
                }}/>
                {console.log("login-rendera girdi ")}
            </div>
        );
    }
}
export default LoginPage;