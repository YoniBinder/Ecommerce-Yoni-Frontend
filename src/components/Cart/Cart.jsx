import React, {useState,useEffect } from 'react'
import './Cart.css'
import Item from './Item'
import {Link} from "react-router-dom"
import CartEmpty from '../../pictures/cartEmpty.png'
import axios from 'axios'
import {useAuth} from '../../context/AuthShopContext'

let arrProd=JSON.parse(localStorage.getItem('products')) || []

export default function Cart() {

    const {currentUser}=useAuth()
    
    const [myProducts,setMyProducts]=useState([])
    const [coupon,setCoupon]=useState(null)
    const [couponValue,setCouponValue]=useState(null)
    const [couponButton,setCouponButton]=useState(false)
    const [payment,setPayment]=useState("cash")
           
       
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_PROXY}/products`).then((response)=>{
            setMyProducts(response.data)
        })
    })

    function changePayment(e){
        setPayment(e.target.value)
    }

    function changeCoupon(e){
        setCouponValue(e.target.value)
    }
    
    function codeCoupon(e){
        e.preventDefault()
        
        if(couponValue==="1234"){
            setCouponButton(true)
            setCoupon(true)
        }
           
        else
            setCoupon(false)
    }

    function priceCalculation(){
        let totalsum=0;
        for(let i=0;i<arrProd.length;i++)
            for(let j=0;j<myProducts.length;j++)
                if(arrProd[i].title===myProducts[j].title)
                    totalsum+=myProducts[j].onsale*arrProd[i].item
    return totalsum

    }
  

     return (
            <div className="container-fluid">
            {!arrProd.length ? (
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
                    arrProd.map((card) =>
                        <Item key={card.title} title={card.title} item={card.item}/>
                    )
                }
                <br/>   
                </div>
                <div className="col-3">
                    <br/>
                    <div id="checkout" className="container-fluid">
                    <br/>
                    <p style={{fontSize:"20px",fontWeight:"bold"}}>How you'll pay</p>
                    <form className="btn-group-vertical"  onChange={(e)=>changePayment(e)}>
                        <p className="radioP">
                            <input type="radio" name="payment" id="r1" value="cash" required defaultChecked/>
                            <label htmlFor="r1">
                                <span className="radioButtonGraph"></span>
                                <span >Cash <i style={{color:'green'}} className="fas fa-money-bill-wave"></i></span>
                                
                            </label>
                        </p>
                       
                        <p className="radioP">
                            <input type="radio" name="payment" id="r2" value="paypal" required/>
                            <label htmlFor="r2">
                                <span className="radioButtonGraph"></span>
                                Paypal <i className="fab fa-cc-paypal" style={{color:"blue"}}></i>
                                
                            </label>
                        </p>
                        <p className="radioP">
                            <input type="radio" name="payment" id="r3" disabled />
                            <label htmlFor="r3">
                                <span className="radioButtonGraph"></span>
                                Credit Card
                                <i className="fab fa-cc-mastercard" style={{color:"red"}}></i>
                                <i className="fab fa-cc-amex" style={{color:"blue"}}></i>
                                <i className="fab fa-cc-visa" style={{color:"grey"}}></i>
                            </label>
                        </p>
                            <p className="radioP">
                            <input type="radio" name="payment" id="r4" value="bitcoin" required/>
                            <label htmlFor="r4">
                                <span className="radioButtonGraph"></span>
                                Bitcoin
                                <i className="fab fa-bitcoin" style={{color:"orange"}}></i>
                            </label>
                        </p>
                    </form>
                    <p>Item(s) total: <span className="text-end">${priceCalculation()} </span></p>
                    <hr/>
                    <p style={{fontWeight:"bold"}}>Total ({arrProd.length} items) <span className="text-end">${priceCalculation()}</span></p>
                    {currentUser && <Link id="checkoutBtn" className="btn d-block mx-auto" to={`/checkout/${coupon}/${payment}`} style={{color:"white",padding:"15px 0px"}}>Proceed to checkout</Link>}
                    {!currentUser && <Link id="checkoutBtn" className="btn d-block mx-auto" to={`/login`} style={{color:"white",padding:"15px 0px"}}>Login before checkout</Link>}
                    <br/>
                    <input  onChange={(e)=>changeCoupon(e)} type="text" placeholder="Coupon Code" style={{width:"120px"}}/>
                    <i className="fas fa-tag"></i>
                    {coupon && <span style={{color:'green'}}>  10% discount!</span>}
                    {coupon===false && <span style={{color:'red'}}>  Wrong code</span>}
                    <button disabled={couponButton} onClick={(e)=>codeCoupon(e)} id="couponBtn" className="d-block mx-auto">Activate Coupon</button>
                    <br/>
                </div>
            </div>

            </div>
            )}
              
        </div>
        )
    }

