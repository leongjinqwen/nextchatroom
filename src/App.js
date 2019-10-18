import React, { Component } from 'react';
import './App.css';
import { Layout } from 'antd';
import Chatbox from './Chatbox'
import Conversation from './Conversation';
import Userlist from './Userlist';
import Socket from './utils/socket'

const {Header, Content, Sider} = Layout;

class App extends Component {
    state = {
        messages: '',
        myUser:{},
        userList: [],
        conver:[],
        emojiShown:false
    }


    handleChange=(e)=> { 
      this.setState({ 
          messages : e.target.value
      });
    }

    handleKeyPress=(e)=>{
      // debugger
      if  (e.charCode === 13 && !e.shiftKey){ //e.key==='Enter' or e.which===13
        e.preventDefault()
        this.handleSubmit(e)
      }
    }

    handleSubmit=(e)=> {
      
          e.preventDefault()
          let time = Date.now()
          const newMessage = {username:this.state.myUser.username, message:this.state.messages.trim(),timestamp:time}
          Socket.emit('BROADCAST_MESSAGE', newMessage)
          this.setState({messages:''})   
    
    }
    
    componentDidMount() {
      Socket.emit('NEW_USER')
      Socket.on('GET_CURRENT_USER', user => {
        this.setState({myUser:user})
      })
      Socket.on('UPDATE_USER_LIST', users => {
        this.setState({userList:users})
      })
      Socket.on('RECEIVE_BROADCAST', data =>{
        const conversation = [...this.state.conver]
        conversation.push(data)
        this.setState({
          conver: conversation
        })
      }) 
    }

    
    render() {
        const {myUser,userList,messages,conver,handleSubmit} = this.state
        return (
          <Layout>
            <Sider style={{background:'#69c0ff' ,overflow: 'auto', height: '100vh', position:'fixed', left: 0}}>
                <Userlist myUser={myUser} userList={userList} />
            </Sider>
            <Layout style={{height: '100vh',marginLeft: 200 }}>
              <Header className='border w-100 rounded shadow-sm' style={{ height:45, background:'#69c0ff', textAlign: 'center',padding: 1 }}>
                <div style={{ margin: '5px 16px 0'}}>
                  <h2 style={{fontFamily:'Georgia'}} >Next Chat</h2>
                </div>
              </Header>
              <Content className="border rounded" style={{ background:'#ffffff',margin: '5px 5px 0'}}>  
                <Conversation conver={conver} myUser={myUser} />
                <Chatbox messages={messages} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress} handleSubmit={handleSubmit} />
              </Content>
              <small className='text-muted' style={{height:20,padding:0,textAlign: 'center'}}>
                © 2017 NEXT Academy. All rights reserved.
              </small>
            </Layout>
          </Layout>
    );
    }
}

export default App;
