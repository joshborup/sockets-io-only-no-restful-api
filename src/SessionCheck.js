import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SessionCheck extends Component {
    constructor(props){
        super(props)
        this.state = {
            user:'',
            test:''
        }
        this.props.socket.emit('get_user', 'getting user')
        this.props.socket.on('check_user', (user) =>{
            this.setState({
                user: user
            })
        })
    }

   
    addToSession = () => {
        this.props.socket.emit('update_session', this.state.test)
    }

    render() {
        return (
            <div>
                { this.state.user ?
                <div>
                    {JSON.stringify(this.state.user)}
                    <input onChange={(e)=>this.setState({test:e.target.value})} value={this.state.test}/>
                    <button onClick={()=> this.addToSession()}>submit</button>
                    <Link to='/chat/chatroom'><button>back to chat</button></Link>
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



