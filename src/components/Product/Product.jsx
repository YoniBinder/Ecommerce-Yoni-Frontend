import React, { useEffect,useState } from 'react'
import './Product.css'
import {Link,useHistory} from "react-router-dom"
import T1 from '../../pictures/T1.png'
import T1_scale2 from '../../pictures/T1_scale2.jpg'
import T1_scale3 from '../../pictures/T1_scale3.jpg'
import T1_scale4 from '../../pictures/T1_scale4.jpg'
import Rating from '../Catalog/Rating'
import axios from 'axios'

let arrProd = JSON.parse(localStorage.getItem('products')) || [];

export default function Product (props){
   const history=useHistory()
   const [products,setProducts]=useState([])
   const [item,setItem]=useState(1)
   const [message,setMessage]=useState()
   const [image,setImage]=useState()
   // const history=useHistory() 

   let choosen=props.match.params.title;
   let result = products.filter(function (obj) {
      return obj.title === choosen;
   })[0];

   useEffect(()=>{
      axios.get(`${process.env.REACT_APP_PROXY}/products`).then((response)=>{
         setProducts(response.data)
     })
   },[])

  function updateState(e){
     let counter=item
         if(e.target.value==="+")
            setItem(++counter)
         if(e.target.value==="-" && counter>1)
            setItem(--counter)
         if(e.target.classList[0]==="smallPics")   
            setImage(e.target.src)
  }

  function addedToCart(){
   if(arrProd.find((obj)=>obj.title===result.title) )
      setMessage("already")
   else{  
      arrProd.push({title:result.title,item:item})
      localStorage.setItem("products", JSON.stringify(arrProd));
   }
  }

   return (
      <div>
         <div className="container">   
         <div className="row">
            <div className="col-2">
            <br></br>  
            <img onClick={(event)=>updateState(event)} alt="..." src={T1} className="smallPics mx-auto d-block cursor"></img>
            <br></br>  
            <img onClick={(event)=>updateState(event)} alt="..." src={T1_scale2} className="smallPics mx-auto d-block cursor"></img>
            <br></br>
            <img onClick={(event)=>updateState(event)} alt="..." src={T1_scale3} className="smallPics mx-auto d-block cursor"></img>
            <br></br> 
            <img onClick={(event)=>updateState(event)} alt="..." src={T1_scale4} className="smallPics mx-auto d-block cursor"></img>
            </div>
            <div className="col-6">
            <br/><br/>

            <img src={image || (result && result.image)} alt="..." className="bigImg mx-auto d-block cursor"></img>

            </div>
            <div className="col-4">
               <br></br><br></br>
               <div>10,000 sales | <span>
               {result && <Rating rating={result.rating}/>}
               </span></div>
               <br></br>
               <div className="title"><b>{result &&result.title}</b></div>
               <br></br>
               <p>Description:</p>
               <p>{result && result.description}</p>
            
               <div className="seller">Best Seller</div>
               <div>&#10003; in stock</div>
               <br></br>
               <div className="price">{result && (result.price!==result.onsale?<div><span style={{color:"red",textDecoration:"line-through"}}>(${result.price})</span> ${result.onsale} per unit</div>:<div>${result.price} per unit</div>)}</div>
               <span>Quantity:&nbsp; 
               <input onClick={(event)=>updateState(event)} type="button" className="btnQty" value="-"/>&nbsp; {item} &nbsp;
               <input onClick={(event)=>updateState(event)} type="button" className="btnQty" value="+"/>
               
               </span>
            </div>
         </div>
         <div className="row">
            <div className="col-8 border">
               <br/>
               <div className="text-center similar">Similar Products</div>
               <br/>
               <div className="container-fluid mx-auto d-block">
               {
                  products.length>0 && products.map((obj)=>{
                     return (<a href={`${obj.title}`} key={obj.id}><img 
                     alt="..." 
                     src={obj.image} 
                     href='/products'
                     className="mediumPics cursor border m-2" /></a>
                     )
                  })
               }
               </div>
            </div>
            <div className="col-4">
               <br></br>
               <div className="shipping text-center">Shipping and return policies</div>
               <br></br>
               <div>ready to ship in:</div>
               <div style={{fontWeight:"bold"}}>3-5 bussiness days</div>
               <br></br><br></br>
               <button onClick={()=>addedToCart()} className="mx-auto d-block cursor buyBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >add to Cart</button>
               
               <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="staticBackdropLabel">Message</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {message==="already"? (
                              <div>This product already found in cart</div>
                              
                            ):(
                              <div>This product added to cart</div>
                              
                            )}
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" style={{color:"black"}} data-bs-dismiss="modal">Close</button>
                            <button onClick={()=>
                              history.push('/cart')
                           } data-bs-dismiss="modal" type="button" style={{color:"black"}} className="btn btn-warning" >Go to cart</button>
                        </div>
                        </div>
                    </div>
                </div>

               <br></br>
               <Link to="/cart"><button className="mx-auto d-block cursor buyBtn">Go to cart</button></Link>
               <br></br><br></br><br></br>
            </div>
         </div>
         </div>
      </div>

   );
   }


