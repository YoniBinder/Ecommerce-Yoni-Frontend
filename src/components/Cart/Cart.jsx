import React, { Component } from 'react'
import './Cart.css'
import Item from './Item'
import {Link} from "react-router-dom"
import CartEmpty from '../../pictures/cartEmpty.png'
// import {db} from '../../firebase'
import axios from 'axios'
export default class Cart extends Component {
    constructor(){
        super()
        this.state={
            arrProd:JSON.parse(localStorage.getItem('products')) || [],
            country:"Israel",
            myProducts:[]
        }
        
    }
    componentDidMount(){
        axios.get(`${process.env.REACT_APP_PROXY}/products`).then((response)=>{
            this.setState({myProducts:response.data})
        })
        // db.ref('products').on('value', (snapshot)=>{
        //     if(snapshot.val()!=null){
        //     let arrProducts = []
        //     for (let obj in snapshot.val()) {
        //         arrProducts.push(snapshot.val()[obj])
        //     }
        //     this.setState({
        //       myProducts: arrProducts,
        //     })
        // }})
    }

    priceCalculation(){
        let totalsum=0;
        for(let i=0;i<this.state.arrProd.length;i++)
            for(let j=0;j<this.state.myProducts.length;j++)
                if(this.state.arrProd[i].title===this.state.myProducts[j].title)
                    totalsum+=this.state.myProducts[j].onsale*this.state.arrProd[i].item
    return totalsum

    }
  
    render() {
        return (
            <div className="container-fluid">
            {!this.state.arrProd.length ? (
                <div className="container">
                    <br/>
                    <h1 className="text-center">No products have been added to cart</h1><br/>
                    <img src={CartEmpty} alt="..." className="d-flex mx-auto"></img>
                    <br/><br/>
                </div>
            ) : (
                <div className="row">
                <div className="col-9">
                {
                    this.state.arrProd.map((card) =>
                        <Item key={card.title} title={card.title} item={card.item}/>
                    )
                }
                <br/>   
                </div>
                <div className="col-3">
                        {/* <br/> */}
                        {/* <div style={{fontSize:"20px"}}><b>Country:</b></div> */}
                    {/* <select className="form-select form-select-lg mb-3" aria-label="Default select example">
                        <option >Israel</option>
                        <option value="1">China</option>
                        <option value="2">USA</option>
                        <option value="3">Spain</option>
                        <option value="4">Mexico</option>
                        <option value="5">Italy</option>
                    </select> */}

                    <br/>
                    <div id="checkout" className="container-fluid">
                    <br/><p style={{fontSize:"20px",fontWeight:"bold"}}>How you'll pay</p>
                    <form className="btn-group-vertical">
                    <p className="radioP">
                        <input type="radio" name="name" id="r1" required />
                        <label htmlFor="r1">
                            <span className="radioButtonGraph"></span>
                            <i className="fab fa-cc-mastercard" style={{color:"red"}}></i>
                            <i className="fab fa-cc-amex" style={{color:"blue"}}></i>
                            <i className="fab fa-cc-visa" style={{color:"grey"}}></i>
                        </label>
                        </p>
                        <p className="radioP">
                        <input type="radio" name="name" id="r2" required defaultChecked/>
                        <label htmlFor="r2">
                            <span className="radioButtonGraph"></span>
                            <i className="fab fa-cc-paypal" style={{color:"blue"}}></i>
                            
                        </label>
                        </p>
                        <p className="radioP">
                        <input type="radio" name="name" id="r3" required/>
                        <label htmlFor="r3">
                            <span className="radioButtonGraph"></span>
                            <i className="fab fa-bitcoin" style={{color:"orange"}}></i>
                        </label>
                        </p>
                    </form>
                    <p>Item(s) total: <span className="text-end">${this.priceCalculation()} </span></p>
                    <hr/>
                    <p style={{fontWeight:"bold"}}>Total ({this.state.arrProd.length} items) <span className="text-end">${this.priceCalculation()}</span></p>
                    <Link id="checkoutBtn" className="btn d-block mx-auto" to='/checkout/' style={{color:"white",padding:"15px 0px"}}>Proceed to checkout</Link>
                    <br/>
                    <input type="text" placeholder="Coupon Code" style={{width:"120px"}}/>
                    <i className="fas fa-tag"></i>
                    <button id="couponBtn" className="d-block mx-auto">Activate Coupon</button>
                    <br/>
                </div>
            </div>

            </div>




            )}


                
        </div>
        )
    }
}
