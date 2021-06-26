import React, { Component } from 'react'
import './Cart.css'
import Item from './Item'
import {Link} from "react-router-dom"
import CartEmpty from '../../pictures/cartEmpty.png'
import axios from 'axios'
export default class Cart extends Component {
    constructor(){
        super()
        this.state={
            arrProd:JSON.parse(localStorage.getItem('products')) || [],
            country:"Israel",
            myProducts:[],
            coupon:false
        }
        this.myRef=React.createRef();
    }
    componentDidMount(){
        axios.get(`${process.env.REACT_APP_PROXY}/products`).then((response)=>{
            this.setState({myProducts:response.data})
        })
    }
    changeCoupon(e){
        this.setState({coupon:e.target.value})
    }
    codeCoupon(e){
        e.preventDefault()
        
        if(this.state.coupon==="1234")
            this.setState({coupon:true})
        else
            this.setState({coupon:false})
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
                    <br/>
                    <div id="checkout" className="container-fluid">
                    <br/><p style={{fontSize:"20px",fontWeight:"bold"}}>How you'll pay</p>
                    <form className="btn-group-vertical">
                    <p className="radioP">
                        <input type="radio" name="name" id="r1" required defaultChecked/>
                        <label htmlFor="r1">
                            <span className="radioButtonGraph"></span>
                            <span style={{color:'green',fontWeight:'bold'}}>CASH $</span>
                            
                        </label>
                        </p>
                    
                       
                        <p className="radioP">
                        <input type="radio" name="name" id="r2" required/>
                        <label htmlFor="r2">
                            <span className="radioButtonGraph"></span>
                            <i className="fab fa-cc-paypal" style={{color:"blue"}}></i>
                            
                        </label>
                        </p>
                        <p className="radioP">
                        <input type="radio" name="name" id="r3" disabled />
                        <label htmlFor="r3">
                            <span className="radioButtonGraph"></span>
                            <i className="fab fa-cc-mastercard" style={{color:"red"}}></i>
                            <i className="fab fa-cc-amex" style={{color:"blue"}}></i>
                            <i className="fab fa-cc-visa" style={{color:"grey"}}></i>
                        </label>
                        </p>
                        <p className="radioP">
                        <input type="radio" name="name" id="r4" disabled/>
                        <label htmlFor="r4">
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
                    <input onChange={(e)=>this.changeCoupon(e)} ref={this.textInput} type="text" placeholder="Coupon Code" style={{width:"120px"}}/>
                    <i className="fas fa-tag"></i>
                    {this.state.coupon && <span style={{color:'green'}}>  10$ discount!</span>}
                    {!this.state.coupon && <span style={{color:'red'}}>  Wrong code</span>}
                    <button disabled={this.state.coupon} onClick={(e)=>this.codeCoupon(e)} id="couponBtn" className="d-block mx-auto">Activate Coupon</button>
                    <br/>
                </div>
            </div>

            </div>
            )}
              
        </div>
        )
    }
}
