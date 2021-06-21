import React from 'react'
import SuccessImg from '../../pictures/ordersuccess.jpg'
import {Link} from "react-router-dom"; 


export default function Success(props) {

    return (
        <div className="container text-center">
           <h1> Thank you for your purchase!</h1>
           <h1> Your order number is {props.match.params.ref}</h1> 
            <h3>You recieved all purchase details in your mailbox</h3><br/>
            <img alt="..." src={SuccessImg} style={{height:"250px",width:"250px"}}/>
            <br/><br/><Link to="/"><button id="shopBtn" >Go back to Home page</button></Link>
        </div>
    )
}
