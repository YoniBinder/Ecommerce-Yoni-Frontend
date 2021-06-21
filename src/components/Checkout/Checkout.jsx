import React, { Component } from "react";
import "./Checkout.css";
import Paypal from "./PayPal";
// import { db } from "../../firebase";
import axios from 'axios'
let arrProd = JSON.parse(localStorage.getItem("products")) || [];
let Authorization = `bearer ${JSON.parse(localStorage.getItem("token"))}`

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingOption: 0,
      messageName: null,
      messageStreet: null,
      messageCity: null,
      messageHouseNum: null,
      messageEmail: null,
      myProducts: [],
      currentUser:null,
    };
    this.emailRef = React.createRef();
    this.shipmentRef = React.createRef();
    this.streetAddRef = React.createRef();
    this.fullNameRef = React.createRef();
    this.houseNumberRef = React.createRef();
    this.cityNameRef = React.createRef();
    this.emailRef = React.createRef();
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_PROXY}/products`).then((response)=>{
      this.setState({myProducts:response.data})
    })

    axios.get(`${process.env.REACT_APP_PROXY}/current`, {headers: {Authorization}}).then((response)=>{ 
      this.setState({currentUser:response.data})
  })
 
  }
  onChangeValue(event) {
    this.setState({shippingOption: Number(event.target.value)});
  }
  priceCalculation() {
    let totalsum = 0;
    for (let i = 0; i < arrProd.length; i++)
      for (let j = 0; j < this.state.myProducts.length; j++)
        if (arrProd[i].title === this.state.myProducts[j].title)
          totalsum += this.state.myProducts[j].onsale * arrProd[i].item;
    return totalsum;
  }
  
  placeOrder(e) {
    e.preventDefault()
    let fullName = this.fullNameRef.current;
    let houseNumber = this.houseNumberRef.current;
    let cityName = this.cityNameRef.current;
    let streetadd = this.streetAddRef.current;
    let emailInput = this.emailRef.current;

    let houseNum = new RegExp("^[0-9]{1,3}$", "gm");
    let name = new RegExp("^[A-Z]{1}[a-z]+ [A-Z]{1}[a-z]+$", "gm");
    let city = new RegExp("^[A-Z]{1}[a-z]+", "gm");
    let street = new RegExp("^[A-Z]{1}[a-z]+", "gm");
    let email = new RegExp('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,64}','gm')

    let flag1 = 0;
    let flag2 = 0;
    let flag3 = 0;
    let flag4 = 0;
    let flag5 = 0;

    if (name.test(fullName.value)) {
      fullName.style.border = "green 2px solid";
      this.setState({ messageName: "" });
      flag1 = 1;
    } else {
      fullName.style.border = "red 2px solid";
      this.setState({ messageName: "The name should be as in your ID card" });
    }
    if (email.test(emailInput.value)) {
      emailInput.style.border = "green 2px solid";
      this.setState({ messageEmail: "" });
      flag5 = 1;
    } else {
      emailInput.style.border = "red 2px solid";
      this.setState({
        messageEmail: "The email is not correct",
      });
    }
    if (street.test(streetadd.value)) {
      streetadd.style.border = "green 2px solid";
      this.setState({ messageStreet: "" });
      flag2 = 1;
    } else {
      streetadd.style.border = "red 2px solid";
      this.setState({
        messageStreet: "The street name should be as in your ID",
      });
    }

    if (city.test(cityName.value)) {
      cityName.style.border = "green 2px solid";
      this.setState({ messageCity: "" });
      flag3 = 1;
    } else {
      cityName.style.border = "red 2px solid";
      this.setState({ messageCity: "The city name should be as in your ID" });
    }
    if (houseNum.test(houseNumber.value)) {
      houseNumber.style.border = "green 2px solid";
      this.setState({ messageHouseNum: "" });
      flag4 = 1;
    } else {
      houseNumber.style.border = "red 2px solid";
      this.setState({
        messageHouseNum: "The house number should contain up to 3 digits",
      });
    }

    if (flag1 === 1 && flag2 === 1 && flag3 === 1 && flag4 === 1 && flag5===1) {
      axios.post(`${process.env.REACT_APP_PROXY}/orders`,{

        userId: this.state.currentUser._id,
        products: arrProd,
        city: this.cityNameRef.current.value,
        street: this.streetAddRef.current.value,
        house_number: this.houseNumberRef.current.value,
        total:this.priceCalculation()
      })
      .then(function (response) {
        localStorage.setItem("products", JSON.stringify([]));
        window.location.href = "/success/" + response.data.reference;
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
              <h2 className="text-center ">Enter your shipping address</h2>
              
                <div className="formChk">
                  <label className="lbl">Country</label>
                  <br />
                  <select
                    className="form-select mb-3"
                    style={{ width: "400px" }}
                    aria-label="Default select example"
                  >
                    <option>Israel</option>
                    <option value="1">China</option>
                    <option value="2">USA</option>
                    <option value="3">Spain</option>
                    <option value="4">Mexico</option>
                    <option value="5">Italy</option>
                  </select>
                  <label className="lbl">Full Name *</label>
                  <br />
                  <input
                    type="text"
                    className="inp"
                    ref={this.fullNameRef}
                  ></input>
                  <br />
                  {this.state.messageName && <div style={{color:"red"}}>{this.state.messageName}</div>}
                  <label className="lbl">Email *</label>
                  <br />
                  <input
                    type="text"
                    className="inp"
                    ref={this.emailRef}
                  ></input>
                  <br />
                  {this.state.messageEmail && <div style={{color:"red"}}>{this.state.messageEmail}</div>}

                  <label className="lbl">Street address *</label>
                  <br />
                  <input
                    type="text"
                    className="inp"
                    ref={this.streetAddRef}
                  ></input>
                  <br />
                  {this.state.messageStreet && <div style={{color:"red"}}>{this.state.messageStreet}</div>}

                  <label className="lbl">House number *</label>
                  <br />
                  <input
                    type="text"
                    className="inp"
                    ref={this.houseNumberRef}
                  ></input>
                  <br />
                  {this.state.messageHouseNum && <div style={{color:"red"}}>{this.state.messageHouseNum}</div>}
                  <label className="lbl">City *</label>
                  <br />
                  <input
                    type="text"
                    className="inp"
                    ref={this.cityNameRef}
                  ></input>
                  <br />
                  {this.state.messageCity && <div style={{color:"red"}}>{this.state.messageCity}</div>}

                  <label className="lbl">Postal code (optional)</label>
                  <br />
                  <input type="text" className="inp"></input>
                  <br />
                  <label className="lbl">Comments (optional)</label>
                  <br />
                  <textarea className="txtArea" cols="47" rows="5"></textarea>
                  <br />
                </div>
                <h2 className="text-center ">Enter your payment details</h2>
                <div className="text-center">
                  {" "}
                  The payment that was choosen is:
                </div>
                <br />

                <Paypal />
              
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
                      value="0"
                      id="r1"
                      required
                      defaultChecked
                    />
                    <label htmlFor="r1">
                      <span className="radioButtonGraph"></span>
                      Pickup - free
                    </label>
                  </p>
                  <p className="radioP">
                    <input
                      type="radio"
                      name="name"
                      value="3"
                      id="r2"
                      required
                    />
                    <label htmlFor="r2">
                      <span className="radioButtonGraph"></span>
                      Regular mailing - $3
                    </label>
                  </p>
                  <p className="radioP">
                    <input
                      type="radio"
                      name="name"
                      value="9"
                      id="r3"
                      required
                    />
                    <label htmlFor="r3">
                      <span className="radioButtonGraph"></span>
                      Registered mailing - $9
                    </label>
                  </p>
                  <p className="radioP">
                    <input
                      type="radio"
                      name="name"
                      value="15"
                      id="r4"
                      required
                    />
                    <label htmlFor="r4">
                      <span className="radioButtonGraph"></span>
                      Home delivery - $15
                    </label>
                  </p>
                </div>

                <br />
                <br />
                <p>
                  Item(s) total:{" "}
                  <span className="text-end">${this.priceCalculation()}</span>
                </p>
                <p>
                  Shipping:{" "}
                  <span className="text-end">${this.state.shippingOption}</span>
                </p>
                <p>
                  Coupon:<span className="text-end">-$</span>
                </p>
                <hr />
                <p style={{ fontWeight: "bold" }}>
                  Total ({arrProd.length} items){" "}
                  <span className="text-end">
                    ${this.priceCalculation() + this.state.shippingOption}
                  </span>
                </p>
                <button
                  onClick={(element) => this.placeOrder(element)}
                  type="submit"
                  id="checkoutBtn"
                  className="d-block mx-auto"
                  style={{ color: "white" , padding:"6px"}}

                  // data-bs-toggle="modal"
                  // data-bs-target="#exampleModal"
                >
                  Place order
                </button>
{/* 
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title text-center"
                          id="exampleModalLabel"
                        >
                          Message
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div>{this.state.messageName}</div>
                        <div>{this.state.messageStreet}</div>
                        <div>{this.state.messageHouseNum}</div>
                        <div>{this.state.messageCity}</div>
                        <div>{this.state.messageEmail}</div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div> */}
                  {/* </div> */}
                {/* </div> */}

                <br />
              </div>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}
