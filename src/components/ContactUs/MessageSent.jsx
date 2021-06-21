import React from 'react'
import MessagePic from '../../pictures/message-sent.jpg'
import {Link} from "react-router-dom"; 
import './MessageSent.css'

export default function MessageSent() {
    return (
        <div id='body' className="container text-center">
        <h1> Your message has been sent successfully!</h1>
         <h3>We will contact you shortly</h3>
         <img alt="..." src={MessagePic} style={{height:"250px",width:"250px"}}/>
         <br/><br/><Link to="/"><button id="shopBtn" >Go back to Home page</button></Link>
     </div>
    )
}
