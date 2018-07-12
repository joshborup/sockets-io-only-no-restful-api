import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

export default class Chat extends Component {
    constructor(props){
        super(props)
        this.state = {
          messages: [],
          message:'',
          room: '',
          user:'',
        }


        this.props.socket.emit('get_user', 'getting user')
        this.props.socket.on('check_user', (user) =>{
            console.log('user', user)
            this.setState({
                user: user
            })
        })


        console.log(this.props)
        this.props.socket.on('message', (messageObj) => {
          const {message, user} = messageObj;
            console.log(messageObj);
          //set state with the old message array with the new message added to the end
          this.setState({
              messages: [...this.state.messages, {message: message, user: user, id: messageObj.id}]
          });
        })
      }

    
      messageChangeHandler = (val) => {
        this.setState({
          message: val
        })
      }


    
      submitMessage = () => {
        if(this.state.message){
            this.props.socket.emit("message", {message: this.state.message}) 
            console.log(this.state.message);
            this.setState({
              message: ''
            })
        }
    }


    logout = () => {
        this.props.socket.emit("logout", '')
        this.setState({user: ''})
    }
    
    render() {
        let messages = this.state.messages.map(message => {
            return <div key={message.id}>{message.user.username} : {message.message}</div>
        })

        console.log(this.state.user);
        return (
            <div>
                { this.state.user ?
                <div>
                {messages}
                Write a message:
                <input onChange={(e) => this.messageChangeHandler(e.target.value)} value={this.state.message}/>
                <button onClick={() => this.submitMessage()}>Submit</button>
                <button onClick={()=> this.logout()}>logout</button>
                <Link to='/sessioncheck'><button>sessionChecker Component</button></Link>
                </div>
                :
                <div>
                    you must be logged in to chat
                     <Link to='/'><button>login</button></Link>
                </div>
                }
            </div>
        );
    }
}