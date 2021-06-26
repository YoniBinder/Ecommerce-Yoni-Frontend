import React from 'react'
import "./Home.css"
import {Link} from "react-router-dom";
import Carousela from "./Carousela"


export default function Home() {
 
        return (
            <div>
            <div className="container-fluid shopping bg-warning text-center">
                <br/>
                <h1 className="banner">Crypto Hardware wallets and Accessories</h1><br/>
                <h2 className="banner">Because like in real life, your money must be secured</h2><br/>
                <h2 className="banner font-weight-bold">Order now and don't be concerned!</h2>
                <br/>
                <Link to="/catalog" className="btn btn-visit d-block mx-auto" style={{width:"200px",color:"orange",backgroundColor:"black", fontSize:"20px"}}>Visit Shop</Link>
                <div id="comment">This website developed by MERN technology stack</div>
            </div>
            <h3 className="pl-5 banner bg-light pt-3 pb-3">Best sellers</h3>
            <div className="container-fluid bg-light d-flex justify-content-center"> 
                <Carousela title="bestSeller"/>
            </div>
            <h3 className="pl-5 banner pt-3 pb-3" style={{backgroundColor:"#c3c3c5"}}>New products</h3>
            <div className="container-fluid d-flex justify-content-center" style={{backgroundColor:"#c3c3c5"}}> 
                <Carousela title="newProducts"/>
            </div>
            <h3 className="pl-5 banner bg-light pt-3 pb-3">On sale</h3>
            <div className="container-fluid  bg-light d-flex justify-content-center">
                <Carousela title="onSale"/>
            </div>

            </div>
        )
    
}
