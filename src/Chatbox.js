import React from 'react';
import { Input,Form } from 'reactstrap';


    
const Chatbox = ({messages,handleChange,handleSubmit,handleKeyPress})=>(
    <Form  onSubmit={handleSubmit} >
        { messages.length===500 ? <small>Your message can not more than 500 characters.</small> : null}
        <Input onKeyPress={handleKeyPress} type='textarea' rows="2" maxLength="500" placeholder="Type a message..." onChange={handleChange} value={messages} />
        
    </Form>
)
export default Chatbox