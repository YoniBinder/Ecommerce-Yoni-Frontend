import React from 'react'
import './Item.css'
import {useAuth} from '../../context/AuthShopContext'

export default function Cards(props) {
    const {products}=useAuth()

    let choosen=props.title;
    let result = products.filter(function (obj) {
        return obj.title === choosen;
    })[0];
    

    const addReduceItems = (e) => {

        let arrProd = JSON.parse(localStorage.getItem('products'));
        for (let i = arrProd.length - 1; i >= 0; i--)
            if (arrProd[i]["title"]===result.title){
                if(e.target.id==="add")
                    arrProd[i]["item"]++;
                if(e.target.id==="subtract")
                    arrProd[i]["item"]--;
            }
        localStorage.removeItem("products");
        localStorage.setItem("products", JSON.stringify(arrProd));
        window.location.reload()
    };

    const RemoveProd = (e) => {

        let arrProd = JSON.parse(localStorage.getItem('products'));
        for (let i = arrProd.length - 1; i >= 0; i--)
            if (arrProd[i]["title"]===result.title)
                arrProd.splice(i, 1);
        localStorage.removeItem("products");
        localStorage.setItem("products", JSON.stringify(arrProd));
        window.location.reload()
    };
    
        return (
            <div className="container-fluid border mt-3" style={{borderRadius:"30px"}}>
                <div className="row">
                    <div className="col-3">
                        <img className="cardImg" src={result && result.image} alt="..."/>
                    </div>
                    <div className="col-5">
                    <br/><br/>
                    <div className="fw-bold">{result && result.title}</div> 
                    <div>{result && result.description}</div>   
                    <br/> 
                    <div id={result && result.id} className="cursor fw-bold text-center" onClick={(e)=>RemoveProd(e)}>Remove</div>
                    </div>
                    <div className="col-4">
                        <br/><br/><br/>
                        <div style={{margin:"0 auto"}}>
                            <input id="subtract" onClick={(e)=>addReduceItems(e)} type="button" className="btnQty" value="-"/>
                            &nbsp; {props.item} &nbsp;
                            <input id="add" onClick={(e)=>addReduceItems(e)} type="button" className="btnQty" value="+"/>
                        </div>
                        <br/>
                        <div className="text-center fw-bold">Price: ${ result && (props.item*result.onsale)}</div>
                        {props.item>1 && <div className="text-center">(${result && result.onsale}) each</div>}
                    </div>
                </div>  
            </div>
        )
}
