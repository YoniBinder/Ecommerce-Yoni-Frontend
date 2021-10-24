import React, { Component } from "react";
import "./Checkout.css";
import PayWithPaypal from "./PayWithPayPal";
import axios from 'axios'
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';



let arrProd = JSON.parse(localStorage.getItem("products")) || [];
let Authorization = `bearer ${JSON.parse(localStorage.getItem("token"))}`

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingOption: 0,
      myProducts: [],
      currentUser:{},
      paypalComplete:false,
      bitcoinComplete:false,
      checkout:null,
      creditComplete:false,
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
      streetName:"",
      fullName:"",
      houseNumber:"",
      cityName:"",
      email:"",
      id:""
    };
    this.emailRef = React.createRef();
    this.shipmentRef = React.createRef();
    this.streetNameRef = React.createRef();
    this.fullNameRef = React.createRef();
    this.houseNumberRef = React.createRef();
    this.cityNameRef = React.createRef();
    this.orderRef = React.createRef();
    
  }
  componentDidMount() {
    axios.post('https://api.commerce.coinbase.com/checkouts',  
    {
      "name": "Yoni Token Collection",
      "description": "hardware/accessories",
      "local_price": {
          "amount": "50.00",
          "currency": "USD"
      },
    "pricing_type": "fixed_price",
    "requested_info": [ ]
  },
      {headers: {"X-CC-Api-Key": "486c76f2-9b0b-4b10-a383-5210a1661ad2",
                  'X-CC-Version':'2018-03-22'
                } 
      }
      
    ).then((response)=>{
      this.setState({checkout:response.data.data.id})
    }).catch((error)=>
      console.log(error))

    axios.get(`${process.env.REACT_APP_PROXY}/products`).then((response)=>{
      this.setState({myProducts:response.data})
      
    })

    axios.get(`${process.env.REACT_APP_PROXY}/users/current`, {headers: {Authorization}}).then((response)=>{ 
      this.setState({currentUser:response.data})
      this.setState({email:response.data.email})
      this.setState({email:response.data.id})
  })
 
  }

  onChangeValue(e){
    switch(e.target.value) {
      case 'Pickup':
        this.setState({shippingOption:0})
        break;
      case 'RegularMailing':
        this.setState({shippingOption:3})
        break;
      case 'RegisteredMailing':
        this.setState({shippingOption:9})
      break;
      case 'Delivery':
        this.setState({shippingOption:15})
        break;
      
      default:
        this.setState({shippingOption:0})
    }
  }
  countryChange(e){
    switch(e.target.value) {
      case 'Israel':
        this.setState({shippingOption:0})
        break;
      case 'China':
        this.setState({shippingOption:30})
        break;
      case 'USA':
        this.setState({shippingOption:30})
      break;
      case 'Spain':
        this.setState({shippingOption:10})
        break;
      case 'Mexico':
        this.setState({shippingOption:40})
        break;
      case 'Italy':
        this.setState({shippingOption:10})
        break;
      default:
        this.setState({shippingOption:0})
    }
  }
  
 
  itemsSumCalculation() {
    let totalsum = 0;
    for (let i = 0; i < arrProd.length; i++)
      for (let j = 0; j < this.state.myProducts.length; j++)
        if (arrProd[i].title === this.state.myProducts[j].title)
          totalsum += this.state.myProducts[j].onsale * arrProd[i].item;
    return totalsum;
  }
  totalPrice(){
 
    if(this.props.match.params.coupon===true)
      return  this.itemsSumCalculation()*0.9+this.state.shippingOption
    else
      return this.itemsSumCalculation()+this.state.shippingOption
    
  }
 

  setErrorMessageOrder(input, message) {
    input.className  = 'order error';
    input.innerText = message;
  }


  setErrorMessage(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'formControl error';
	small.innerText = message;
}

  setSuccessMessage(input) {
	const formControl = input.parentElement;
	formControl.className = 'formControl success';
}
  isPaymentSuccess(){
    if(this.props.match.params.payment==="cash")
       return true
    else if(this.props.match.params.payment==="paypal" && this.state.paypalComplete)
       return true;
    else if(this.props.match.params.payment==="credit" && this.state.creditComplete)
       return true;
    else if(this.props.match.params.payment==="bitcoin" && this.state.bitcoinComplete)
       return true;
    return false
  }

  isShippingDetailsFilled(){

    let counter=0

    if (this.state.fullName==='')
      this.setErrorMessage(this.fullNameRef.current, 'Name cannot be blank');
    else{
      this.setSuccessMessage(this.fullNameRef.current);
      counter++
    }

    if (this.state.cityName==='') 
      this.setErrorMessage(this.cityNameRef.current, 'City cannot be blank');
    else{ 
      this.setSuccessMessage(this.cityNameRef.current);
      counter++
    }

    if (this.state.streetName==='') 
      this.setErrorMessage(this.streetNameRef.current, 'Street cannot be blank');
    else {
      this.setSuccessMessage(this.streetNameRef.current);
      counter++
    }

    if(this.state.houseNumber === '') {
      this.setErrorMessage(this.houseNumberRef.current, 'House number cannot be blank');
    } 
    else {
      this.setSuccessMessage(this.houseNumberRef.current);
      counter++
    }

    if (counter===4)
      return true
    return false
  }

  async placeOrder(e) {
    e.preventDefault()
    if (this.isPaymentSuccess() && this.isShippingDetailsFilled() ){
     let response=await axios.post(`${process.env.REACT_APP_PROXY}/orders`,{
        userId: this.state.currentUser._id,
        products: arrProd,
        city: this.state.cityName,
        street: this.state.streetName,
        house_number: this.state.houseNumber,
        total:this.totalPrice()
      })
      console.log(response.data.reference)
      axios.post(`http://localhost:5000/mails/sendMailToClient`,{
        to : "jonibinder1986@gmail.com",
        subject :'order registered',
        orderNumber:response.data.reference
      })
      .then(response=> {
          localStorage.setItem("products", JSON.stringify([]));
          window.location.href = "/success/" + response.data.reference;
        })
      .catch(response=>{
            console.log(response)
        })
        
  
    }
      else{
        if (!this.isShippingDetailsFilled())
          this.setErrorMessageOrder(this.orderRef.current, 'Please fill the form where * is shown');
        else
          this.setErrorMessageOrder(this.orderRef.current, 'Payment not completed');

      }
  }
  
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }


  render() {
    return (
      <div>
        <div className="container-fluid">
        <form onSubmit={(e)=>this.placeOrder(e)}>
          <div className="row">
            <div className="col-9">
              <br />

              {/*shipping */}
              <h2 className="text-center ">Enter your shipping address</h2>
              
                <div className="formChk">
                  <label className="lbl">Country</label>
                  <br />
                  <select
                    className="form-select mb-3"
                    style={{ width: "200px" }}
                    aria-label="Default select example"
                    onChange={(e)=>this.countryChange(e)}
                  >
                    <option value="Israel">Israel</option>
                    <option value="China">China</option>
                    <option value="USA">USA</option>
                    <option value="Spain">Spain</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Italy">Italy</option>
                  </select>

                  {/*Full Details */}
                  <div className="formControl">
                  <label>Full Name *</label>
                  <br />
                  <input
                    type="text"
                    ref={this.fullNameRef}
                    name="fullName"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  ></input>
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small>Error message</small>
                  </div>
                 
                  <div className="formControl">
                  <label>Email *</label>
                  <br />
                  <input
                    type="text"
                    ref={this.emailRef}
                    value={this.state.currentUser && this.state.currentUser.email} 
                    disabled
                  ></input>
                   <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small>Error message</small>
                </div>
             
                <div className="formControl">
                  <label>Street address *</label>
                  <br />
                  <input
                    type="text"
                    ref={this.streetNameRef}
                    name="streetName"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  ></input>
                <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small>Error message</small>
                  </div>

                  <div className="formControl">
                  <label>House number *</label>
                  <br />
                  <input
                    type="text"
                    ref={this.houseNumberRef}
                    name="houseNumber"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  ></input>
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small>Error message</small>
                  </div>

                  <div className="formControl">
                  <label>City *</label>
                  <br />
                  <input
                    type="text"
                    ref={this.cityNameRef}
                    name="cityName"
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  ></input>
                  <i className="fas fa-check-circle"></i>
                  <i className="fas fa-exclamation-circle"></i>
                  <small>Error message</small>
                  </div>


                  <label className="lbl">Postal code (optional)</label>
                  <br />
                  <input type="text" className="inp"></input>
                  <br />
                  <label className="lbl">Comments (optional)</label>
                  <br />
                  <textarea className="txtArea" cols="47" rows="5"></textarea>
                  <br />
                </div>


                {/* Payment */}
                <h2 className="text-center ">Enter your payment details</h2>
                <div className="text-center">
                  {" "}
                  The payment that was choosen is:
                </div>
                <br/>


                {/* Cash Payment */}
                {this.props.match.params.payment==="cash" && 
                <div className="text-center font-weight-bold" >Cash. Please prepare exact change</div>}


                {/* Credit Payment */}
                {(this.props.match.params.payment==="credit" && !this.state.creditComplete) &&
                <div id="PaymentForm">
                   <div className="row">
                  <div className="col">
                        <Cards
                          cvc={this.state.cvc}
                          expiry={this.state.expiry}
                          focused={this.state.focus}
                          name={this.state.name}
                          number={this.state.number}
                        />
                  </div>
                  <div className="col">
                          <input
                            className="m-2"
                            type="tel"
                            name="number"
                            placeholder="Card Number"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                          <input
                            className="m-2"
                            type="text"
                            name="name"
                            placeholder="Name"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                          <input
                            className="m-2"
                            type="number"
                            name="expiry"
                            placeholder="Valid Thru"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                          <input
                           className="m-2 "
                            type="number"
                            name="cvc"
                            placeholder="CVC"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                          />
                          <br/><br/>
                          <button className="pay" onClick={()=>this.setState({creditComplete:true})}>Pay</button>
                        </div>
                        </div>
                      </div>

                }

                {/* Paypal Payment */}
                
                {(this.props.match.params.payment==="paypal" && !this.state.paypalComplete) && 
                
                <PayWithPaypal 
                amount={this.totalPrice()} 
                currency={"USD"} 
                items={arrProd}
                onSuccess={(details, data)=>details.status==="COMPLETE" && this.setState({paypalComplete:true})}
                onError={(err)=>alert(err)}
                />}
              

                {((this.props.match.params.payment==="paypal" && this.state.paypalComplete)
                || (this.props.match.params.payment==="bitcoin" && this.state.bitcoinComplete)
                || (this.props.match.params.payment==="credit" && this.state.creditComplete)
                ) && 
                <div className="text-center font-weight-bold text-success">Payment Confirmed!</div>}
                
               
                {/* Bitcoin Payment */}
                {(this.props.match.params.payment==="bitcoin" && !this.state.bitcoinComplete) &&
                
              
                <div className="text-center">

                      <CoinbaseCommerceButton 
                     
                      styled={true} 
                      checkoutId={this.state.checkout} 
                      onChargeSuccess={(message)=>this.setState({bitcoinComplete:true})}/>
                </div>
                }

              <br/>
            </div>
            <div className="col-3">
              <div className="orderDetails">
                <h4 className="text-center">Order details</h4>
                <div>
                  {this.state.myProducts.length > 0 &&
                    arrProd.map((obj) => {
                      let results = this.state.myProducts.filter((prod) => {
                        return prod.title === obj.title;
                      })[0];

                      return (
                        <div
                          className="container border"
                          key={`${results.title}`}
                        >
                          <div className="row">
                            <div className="col-5">
                              <img
                                className="popImg"
                                src={results.image}
                                alt="..."
                              />
                            </div>
                            <div className="col-7">
                              <div>
                                <b>{results.title}</b>
                              </div>
                              <br />
                              <div className="text-start">
                                {obj.item} x ${results.onsale}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <br />
                <div
                  className="btn-group-vertical"
                  onChange={(element) => this.onChangeValue(element)}
                >
                  <p className="radioP">
                    <input
                      type="radio"
                      name="name"
                      value="Pickup"
                      id="r1"
                      required
                      defaultChecked
                    />
                    <label htmlFor="r1">
                      <span className="radioButtonGraph"></span>
                      Pickup: free
                    </label>
                  </p>
                  <p className="radioP">
                    <input
                      type="radio"
                      name="name"
                      value="RegularMailing"
                      id="r2"
                      required
                    />
                    <label htmlFor="r2">
                      <span className="radioButtonGraph"></span>
                      Regular mailing: $3
                    </label>
                  </p>
                  <p className="radioP">
                    <input
                      type="radio"
                      name="name"
                      value="RegisteredMailing"
                      id="r3"
                      required
                    />
                    <label htmlFor="r3">
                      <span className="radioButtonGraph"></span>
                      Registered mailing: $9
                    </label>
                  </p>
                  <p className="radioP">
                    <input
                      type="radio"
                      name="name"
                      value="Delivery"
                      id="r4"
                      required
                    />
                    <label htmlFor="r4">
                      <span className="radioButtonGraph"></span>
                      Home delivery: $15
                    </label>
                  </p>
                </div>

                <br />
                <br />
                <p>
                  Item(s) total:{" "}
                  <span className="text-end">${this.itemsSumCalculation().toFixed(2)}</span>
                </p>
                <p>
                  Shipping:{" "}
                  <span className="text-end">${this.state.shippingOption}</span>
                </p>
                <p>
                  Coupon:<span className="text-end">{this.props.match.params.coupon===true ?<span> -${(this.priceCalculation()*0.1).toFixed(2)}</span>:<span>$0</span>}</span>
                </p>
                <hr />
                <p style={{ fontWeight: "bold" }}>
                  Total ({arrProd.length} items){" "} 
                  <span className="text-end">
                    ${this.totalPrice()}
                  </span>
                  
                </p>
                <button
                  type="submit"
                  id="checkoutBtn"
                  className="d-block mx-auto"
                  style={{ color: "white" , padding:"6px"}}

                >
                  Place order
                </button>
                  <div className="order" ref={this.orderRef}></div>
                
              </div>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}
