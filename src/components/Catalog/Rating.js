
import React from 'react'
import './Rating.css';

export default function Product(props) {
        if (props.rating===5)
                return(<div className="stars">★★★★★</div>)
        else if (props.ratingS===4)
                return (<div className="cursor"><span className="stars">★★★★</span><span className="starsNot">★</span></div> )
        else if (props.rating===3)
                return (<div className="cursor"><span className="stars">★★★</span><span className="starsNot">★★</span></div>)
        else if (props.rating===2)
                return (<div className="cursor"><span className="stars">★★</span><span className="starsNot">★★★</span></div>)
        else if (props.rating===1)
                return (<div className="cursor"><span className="stars">★</span><span className="starsNot">★★★★</span></div>)
        else
                return(<div className="cursor"><span className="stars">★★★★★</span></div>)
        
}
