import React from 'react';


export default class Conversation extends React.Component {
    
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView();
    }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render(){
        const {myUser,conver} = this.props
        
        return(
            <div className= 'w-100' style={{ overflowY: 'scroll', height:'80vh' }}>
                <div style={{textAlign:'center',padding:'10px'}} >
                    <h3>Messages : {conver.length}</h3>
                </div>
                
                <ul style={{marginRight:'5px'}} >                 
                    {
                        conver.map((chat,index) => (
                            <div style={{textAlign: myUser.username===chat.username ? 'right':'left' }} key={index}>
                                <div style={{marginBottom:'20px' }}> 
                                    <div className="text-primary mb-1"><img width="30" height="30" className="d-inline border rounded-circle" src={`https://api.adorable.io/avatars/40/${chat.username}.png`} alt="profilepic" />{chat.username}</div>
                                    <div className="d-inline-block border rounded"><pre style={{border:'#e8e8e8',background:'#e6f7ff',fontFamily:'Roboto',fontSize:'18px' ,padding:2,whiteSpace:'pre-wrap',wordBreak:'break-word' ,marginBottom:0}} >{chat.message}</pre></div>             
                                    <small className="d-block text-muted">{chat.timestamp}</small>
                                </div>
                            </div>
                        )    
                    )}
                </ul>
                <div ref={(e) => { this.messagesEnd = e; }}></div>
            </div>
        )
    }
}