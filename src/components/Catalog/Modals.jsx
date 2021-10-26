import React, { Component } from 'react'
import './Modal.css'


let arrProd = JSON.parse(localStorage.getItem('products')) || [];
export default class Modals extends Component {
  constructor(props){
    super(props)
    
    this.state = {
        Item:1,
        message:""
    }
    
    this.updateState = this.updateState.bind(this)
    this.addedToCart = this.addedToCart.bind(this)
 }
  
  updateState(e){
    let counter=this.state.Item
        if(e.target.value==="+")
           this.setState({ Item: ++counter})
        if(e.target.value==="-" && counter>1)
           this.setState({ Item: --counter})
 }
  addedToCart(){

    if(arrProd.find((obj)=>obj.Image===this.props.image)){
       this.setState({message:"already"});
      
    }
    else{
       arrProd.push({title:this.props.title,Item:this.state.Item});
       localStorage.setItem('products', JSON.stringify(arrProd));
       this.setState({message:"added"});
    }
   
}
render(){
  
        return (
          <div>
          
          <button id="zoomIn" className="mx-auto bg-info" data-bs-toggle="modal" data-bs-target={`#id${this.props.id}`}><i className="fas fa-search-plus"></i></button>


        <div className="modal fade" id={`id${this.props.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <img className="bigPic" src={this.props.image} alt="..."></img>
                <div>{this.props.desc}</div>
                <input onClick={this.updateState} type="button" className="btnQty" value="-"/>&nbsp; {this.state.Item} &nbsp;
               <input onClick={this.updateState} type="button" className="btnQty" value="+"/><br/><br/>
               <button onClick={this.addedToCart} className="mx-auto d-block cursor" style={{backgroundColor:"orange"}} data-bs-toggle="modal" data-bs-target="#staticBackdrop" >add to Cart</button>
               { (this.state.message==="already")&& <div style={{color:"red"}}>The product is already in cart</div> }
               { (this.state.message==="added")&& <div style={{color:"green"}}>The product added to cart</div> }
                </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" style={{color:"black"}}>Close</button>
 
          
          <button onClick={()=>
            window.location.href='/cart'
          } data-bs-dismiss="modal" type="button" className="btn btn-warning" style={{color:"black"}} >Go to cart</button>

              </div>
            </div>
          </div>
        </div>
        </div>
        )
  }
}