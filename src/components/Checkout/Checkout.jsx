import React, { Component } from "react";
import "./Checkout.css";
import PayWithPaypal from "./PayWithPayPal";
import axios from 'axios'

let arrProd = JSON.parse(localStorage.getItem("products")) || [];
let Authorization = `bearer ${JSON.parse(localStorage.getItem("token"))}`

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingOption: 0,
      myProducts: [],
      currentUser:false,
      total:0,
      paypalComplete:false
    };
    this.emailRef = React.createRef();
    this.shipmentRef = React.createRef();
    this.streetNameRef = React.createRef();
    this.fullNameRef = React.createRef();
    this.houseNumberRef = React.createRef();
    this.cityNameRef = React.createRef();
    this.paymentRef = React.createRef();
    
  }
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_PROXY}/products`).then((response)=>{
      this.setState({myProducts:response.data})
    })

    axios.get(`${process.env.REACT_APP_PROXY}/current`, {headers: {Authorization}}).then((response)=>{ 
      this.setState({currentUser:response.data})
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
  setErrorPayment(input, message) {
    input.className  = 'payment error';
    input.innerText = message;
  }


  setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'formControl error';
	small.innerText = message;
}

  setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'formControl success';
}
submitForm(e){
  e.preventDefault()
  
  }
  
  placeOrder(e) {
    e.preventDefault()
    let fullName = this.fullNameRef.current.value.trim();
    let houseNumber = this.houseNumberRef.current.value.trim();
    let city = this.cityNameRef.current.value.trim();
    let street = this.streetNameRef.current.value.trim();
    let email = this.emailRef.current.value.trim();

    let houseNum = new RegExp("^[0-9]{1,4}$", "gm");
   

    let flag1 = 0;
    let flag2 = 0;
    let flag3 = 0;
    let flag4 = 0;
    

    if (fullName==='') {
      this.setErrorFor(this.fullNameRef.current, 'Name cannot be blank');
      
    } else {
      this.setSuccessFor(this.fullNameRef.current);
      flag1 = 1;
    }


    if (city==='') {
      this.setErrorFor(this.cityNameRef.current, 'City cannot be blank');
      
    } else {
      this.setSuccessFor(this.cityNameRef.current);
      flag2 = 1;
    }

    if (street==='') {
      this.setErrorFor(this.streetNameRef.current, 'Street cannot be blank');
    } else {
      this.setSuccessFor(this.streetNameRef.current);
      flag3 = 1;
    }

    if(houseNumber === '') {
      this.setErrorFor(this.houseNumberRef.current, 'House number cannot be blank');
    } else if (!houseNum.test(houseNumber)) {
      this.setErrorFor(this.houseNumberRef.current, 'Not a valid house number');
    } else {
      this.setSuccessFor(this.houseNumberRef.current);
      flag4 = 1;
    }

    if(this.props.match.params.payment==="paypal" && !this.state.paypalComplete){
      this.setErrorPayment(this.paymentRef.current, 'Payment not completed');
      return;
    }

      

    if (flag1 === 1 && flag2 === 1 && flag3 === 1 && flag4 === 1) {
      axios.post(`${process.env.REACT_APP_PROXY}/orders`,{

        userId: this.state.currentUser._id,
        products: arrProd,
        city: city,
        street: street,
        house_number: houseNumber,
        total:this.itemsSumCalculation()
      })
      .then(function (response) {
        axios.post(`${process.env.REACT_APP_PROXY}/sendMailToClient`,{
          to : email,
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
        
      })
      .catch(function (error) {
        console.log(error);
      });    
    }
   
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
                    value={this.state.currentUser ? this.state.currentUser.email:""} 
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
                <br />
          
                {(this.props.match.params.payment==="paypal" && !this.state.paypalComplete) && 
                <PayWithPaypal 
                amount={this.totalPrice()} 
                currency={"USD"} 
                items={arrProd}
                onSuccess={(details, data)=>details.status==="COMPLETE" && this.setState({paypalComplete:true})}
                onError={(err)=>alert(err)}
                />}
                {(this.props.match.params.payment==="paypal" && this.state.paypalComplete) && 
                <div className="text-center font-weight-bold text-success">Payment Confirmed!</div>}
                
                {this.props.match.params.payment==="cash" && <div className="text-center font-weight-bold" >Cash. Please prepare exact change</div>}
                <br/><br/>
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
                  onClick={(element) => this.placeOrder(element)}
                  type="submit"
                  id="checkoutBtn"
                  className="d-block mx-auto"
                  style={{ color: "white" , padding:"6px"}}

                >
                  Place order
                </button>
                  <div className="payment" ref={this.paymentRef}></div>
                
              </div>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}
