import React, { Component } from 'react'
import Script from 'react-load-script'

class LoginPage extends Component {
    render() {
        const {loginStatus} = this.props;
        return (
            <div id="result" className="login">
                <Script url= "https://js.jotform.com/JotForm.js" onLoad={(e) =>{
                    window.JF.initialize({ accessType: 'full' });
                    window.JF.login(()=>{ 
                        localStorage.setItem("apiKey", window.JF.getAPIKey());
                        loginStatus(localStorage.getItem("apiKey"));});    
                }}/>
            </div>
        );
    }
}
export default LoginPage;