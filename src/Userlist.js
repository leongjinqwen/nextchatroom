import React from 'react'
import { Menu} from 'antd';

 const Userlist = ({myUser,userList})=> (        
    <Menu style={{background:'#69c0ff'}} mode="inline">
    <h3 className='pt-2' style={{textAlign:'center'}}>Online users : {userList.length} </h3>
        <ul>                 
            {
            userList.map((list,index) => (
                <div style={{background:myUser.username===list.username ? '#e6f7ff':null}}  key={index}>
                    <Menu.Item>
                        <img width="30" height="30" className="m-2 border rounded-circle" src={`https://api.adorable.io/avatars/40/${list.username}.png`} alt="profilepic" />
                        <span>{list.username}</span>
                    </Menu.Item>    
                </div>
            )    
            )}
        </ul> 
    </Menu>   
)
export default Userlist