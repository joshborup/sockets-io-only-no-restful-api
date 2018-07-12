import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
          typedUsername: '',
          submittedUsername: '',
        }
        console.log(this.props)
        
      }
    
      usernameChangeHandler = (val) => {
        this.setState({
          typedUsername: val
        })
      }
    
      submitLogin = () => {
        this.props.socket.emit('login', {username: this.state.typedUsername})
        
      }
    
    render() {
        return (
            <div>
                Login:
                <input onChange={(e)=> this.usernameChangeHandler(e.target.value)}/>
                
                
                   <Link to='/chat/chatroom'> <button onClick={() => {
                        this.submitLogin()
                        
                        }}>Submit</button></Link>
                
            </div>
        );
    }
}