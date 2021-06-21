import React from 'react'
import './Prod.css';
import Rating from './Rating';
import {Link} from "react-router-dom";
import Modals from './Modals';



const align={
    width:"210px",
    margin:"10px 10px",
    padding:"10px",
    border:"1px lightgrey solid",
    height:"380px",
    position:"relative"
}

export default function Product(props) {

        return (
            <div style={align} className="text-center align-content-center">  
                <Link to={`/product/${props.title}`}><img src={props.image} alt="..." className="catalog alignCenter cursor"/>
                <div style={{color:'black'}}><b>{props.title}</b></div><br/>
                </Link>
                
                <div style={{position:"absolute", top:"220px", left:"25px"}}>
                {
                    (props.price===props.onsale)?
                    (<div><span>{(props.price/props.priceBTC).toFixed(6)} BTC <b>(${props.price})</b></span></div>):
                    (<div><span className="onsale">{(props.price/props.priceBTC).toFixed(6)} BTC <b>(${props.price})</b></span>
                    <br/><span>{(props.onsale/props.priceBTC).toFixed(6)} BTC <b>(${props.onsale})</b></span></div>)
                }
                </div>
                 <div style={{position:"absolute", top:"280px", left:"60px"}}>
                <Rating rating={props.rating}/>
                <Modals id={props.id} image={props.image} title={props.title} desc={props.desc}/>
                </div>
            </div>
        )
    
}


