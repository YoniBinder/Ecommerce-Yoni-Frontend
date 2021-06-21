import React from 'react'
import './Cards.css';
import Rating from '../Catalog/Rating';
import {Link} from "react-router-dom";

export default function Cards(props) {

    return (
    <div className="ml-3 card" >
        <Link to={`/product/${props.title}`}>
            <div style={{position:"relative",width:"200px",height:"320px"}} className="text-dark text-center  border border-dark rounded p-3">  
                <img src={props.image} alt="..." className="catalog alignCenter cursor"/>
                <b>{props.title}</b>
              
                <div style={{position:"absolute", top:"250px", left:"50px"}}>
                    {
                    (props.price===props.onsale)?
                    (<div><b>${props.price}</b></div>):
                    (<div><b><span className="onsale">${props.price}</span>
                    &nbsp;&nbsp;${props.onsale}</b></div>)
                    }
                    <Rating rating={props.rating}/>
                </div>
            </div>
    
        </Link>
    </div>
    )
}
