import React from 'react'
import './Cards.css';
import Rating from '../Catalog/Rating';
import {Link} from "react-router-dom";

export default function Cards(props) {

    return (
    <div className="ml-5 cards" >
        <Link to={`/product/${props.title}`}>
            <div style={{position:"relative",width:"200px",height:"320px"}} className="text-dark text-center border border-dark rounded ca">  
                <img src={props.image} alt="..." className="ca alignCenter cursor"/>
                <div className="title">{props.title}</div>
              
                <div className="inside">
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
