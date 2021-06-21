import React, { Component } from 'react'
import './Catalog.css';
import Prod from './Prod';
import axios from 'axios'

export default class Catalog extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            Products:[],
            priceBTC:"",
            list:[]
        }
        
        this.updateState = this.updateState.bind(this)
        this.updateStateSearch = this.updateStateSearch.bind(this)
        this.price0=React.createRef()
        this.price1=React.createRef()
        this.price2=React.createRef()
        this.price3=React.createRef()
        this.price4=React.createRef()
        this.price5=React.createRef()
        this.rate0=React.createRef()
        this.rate1=React.createRef()
        this.rate2=React.createRef()
        this.rate3=React.createRef()
        this.rate4=React.createRef()
        this.typeRefHard=React.createRef()
        this.typeRefAcc=React.createRef()
        this.searchRef=React.createRef()
    }

    componentDidUpdate(prevProps) {    
    if(this.props.location.search!==prevProps.location.search){
        this.searchRef.current.value=window.location.search.slice(3)
        axios.get(`${process.env.REACT_APP_PROXY}/products?q=${this.searchRef.current.value}`).then((response)=>{
            
            this.setState({list:response.data})
                })
            }
    }

    componentDidMount(){

        this.searchRef.current.value=window.location.search.slice(3)
        axios.get(`${process.env.REACT_APP_PROXY}/products?q=${this.searchRef.current.value}`).then((response)=>{ 
        this.setState({list:response.data})
        })

        fetch("https://api.coincap.io/v2/assets")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({priceBTC:result.data[0].priceUsd})
            
          },
          (error) => {
            console.log("error")
          }
        )
    }
    
    updateStateSearch(e){
        axios.get(`${process.env.REACT_APP_PROXY}/products?q=${e.target.value}`).then((response)=>{
            this.setState({list:response.data})
        })

    }
    updateState(e){
        let min=1000
        let max=0
        let rate=0
        let hardware=""

        if (this.price0.current.checked){
            if(min>0)
                min=0
            if(max<10)
                max=10

        }
        if (this.price1.current.checked){
            if(min>10)
                min=10
            if(max<20)
                max=20

        }
        if (this.price2.current.checked){
            if(min>20)
                min=20
            if(max<30)
                max=30

        }
        if (this.price3.current.checked){
            if(min>30)
                min=30
            if(max<50)
                max=50

        }
        if (this.price4.current.checked){
            if(min>50)
                min=50
            if(max<100)
                max=100

        }
        if (this.price5.current.checked){
            if(min>100)
                min=100
            if(max<1000)
                max=1000

        }    
        if(min>max){
            min=0
            max=1000
        }
        if (this.rate0.current.checked) rate=4
        if (this.rate1.current.checked) rate=3
        if (this.rate2.current.checked) rate=2
        if (this.rate3.current.checked) rate=1
        if (this.rate4.current.checked) rate=0
        
        if(this.typeRefHard.current.checked && !this.typeRefAcc.current.checked) 
            hardware=true
        if(this.typeRefAcc.current.checked && !this.typeRefHard.current.checked) 
            hardware=false


        axios.get(`${process.env.REACT_APP_PROXY}/products?q=${this.searchRef.current.value}&price=[${min},${max}]&rate=${rate}&hardware=${hardware}`).then((response)=>{ 
            this.setState({list:response.data})
            })

    }
 

    render() {
        return (
            <div className="container-fluid body">
                <div className="row">
                    <div className="col-3">
                    <br/>
                        <h4 className="text-center font-weight-bold">Items</h4>
                        <div className="container-fluid">
                            <form className="d-flex">
                            
                            <input id="search"  ref={this.searchRef} onChange={this.updateStateSearch} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            </form>
                        </div>
                        <br/>
                        <div className="container-sm" onChange={this.updateState}>
                            <div className="row">
                            <div className="form-check col-6">
                            <input className="form-check-input" ref={this.typeRefHard} type="checkbox" value="hardware" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                hardware wallet
                            </label>
                            </div>
                            <p className="col-6 text-end">{this.state.list.filter((obj)=>{return obj.hardware===true}).length}</p>

                            <div className="form-check col-6">
                            <input className="form-check-input" ref={this.typeRefAcc} type="checkbox" name="accessories" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                accessories
                            </label>
                            </div>
                            <p className="col-6 text-end">{this.state.list.filter((obj)=>{return obj.hardware===false}).length}</p>

                            </div>
                        </div>

                        <br/>

                        <h4 className="text-center font-weight-bold">price</h4>
                        <div className="container-sm" onChange={this.updateState}>
                            <div className="row">
                                <div className="form-check col-9">
                                <input className="form-check-input" type="checkbox" value="10" ref={this.price0} id="flexCheckDefault" onChange={this.updateState}/>
                                <label className="form-check-label  mb-2" htmlFor="flexCheckDefault">
                                    under $10
                                </label>
                                </div>
                                <div className="col-3 text-end">{this.state.list.filter((obj)=>{return obj.price<10}).length}</div>
                                <div className="form-check col-9">
                                <input className="form-check-input" type="checkbox" value="20" ref={this.price1} id="flexCheckChecked"/>
                                <label className="form-check-label  mb-2" htmlFor="flexCheckChecked">
                                    $10 to $20
                                </label>
                                </div>
                                <div className="col-3 text-end">{this.state.list.filter((obj)=>{return obj.price>=10 && obj.price<20}).length}</div>
                                <div className="form-check col-9">
                                <input className="form-check-input" type="checkbox" value="30" ref={this.price2} id="flexCheckChecked"/>
                                <label className="form-check-label  mb-2" htmlFor="flexCheckChecked">
                                    $20 to $30
                                </label>
                                </div>
                                <div className="col-3 text-end">{this.state.list.filter((obj)=>{return obj.price>=20 && obj.price<30}).length}</div>
                                <div className="form-check col-9">
                                <input className="form-check-input" type="checkbox" value="50" ref={this.price3} id="flexCheckChecked"/>
                                <label className="form-check-label mb-2" htmlFor="flexCheckChecked">
                                    $30 to $50
                                </label>
                                </div>
                                <div className="col-3 text-end">{this.state.list.filter((obj)=>{return obj.price>=30 && obj.price<50}).length}</div>
                                <div className="form-check col-9">
                                <input className="form-check-input" type="checkbox" value="100" ref={this.price4} id="flexCheckChecked"/>
                                <label className="form-check-label  mb-2" htmlFor="flexCheckChecked">
                                    $50 to $100
                                </label>
                                </div>
                                <div className="col-3 text-end">{this.state.list.filter((obj)=>{return obj.price>=50 && obj.price<100}).length}</div>
                                <div className="form-check col-9">
                                <input className="form-check-input" type="checkbox" value="1000" ref={this.price5} id="flexCheckChecked"/>
                                <label className="form-check-label  mb-2" htmlFor="flexCheckChecked">
                                     $100 &#38; above
                                </label>
                                </div>
                                <div className="col-3 text-end">{this.state.list.filter((obj)=>{return obj.price>=100}).length}</div>
                                </div>
                        </div>
                        <br/>
                        <h4 className="text-center font-weight-bold">Avg. customer review</h4>
                        <div className="container-sm" onChange={this.updateState}>
                            <div className="row">
                                <div className="form-check col-9">
                                <input className="form-check-input" type="checkbox" value="1" ref={this.rate0} id="flexCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                <span className="stars">★★★★</span><span className="starsNot">★</span> &#38; up
                                </label>
                                </div>
                                <p className="col-3 text-end">{this.state.list.filter((obj)=>{return obj.rating>=4}).length}</p>

                                <div className="form-check col-9">
                                <input className="form-check-input" type="checkbox" value="2" ref={this.rate1} id="flexCheckChecked"/>
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                    <span className="stars">★★★</span><span className="starsNot">★★</span> &#38; up
                                </label>
                                </div>
                                <p className="col-3 text-end">{this.state.list.filter((obj)=>{return obj.rating>=3}).length}</p>
                                <div className="form-check col-9">
                                <input className="form-check-input" type="checkbox" value="3" ref={this.rate2} id="flexCheckChecked"/>
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                <span className="stars">★★</span><span className="starsNot">★★★</span> &#38; up
                                </label>
                                </div>
                                <p className="col-3 text-end">{this.state.list.filter((obj)=>{return obj.rating>=2}).length}</p>
                                <div className="form-check col-9">
                                <input className="form-check-input" type="checkbox" value="4" ref={this.rate3} id="flexCheckChecked"/>
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                <span className="stars">★</span><span className="starsNot">★★★★</span> &#38; up
                                </label>
                                </div>
                                <p className="col-3 text-end">{this.state.list.filter((obj)=>{return obj.rating>=1}).length}</p>
                                <div className="form-check col-9">
                                <input className="form-check-input" type="checkbox" value="5" ref={this.rate4} id="flexCheckChecked"/>
                                <label className="form-check-label" htmlFor="flexCheckChecked">
                                <span className="stars"></span><span className="starsNot">★★★★★</span> &#38; up
                                </label>
                                </div>
                                <p className="col-3 text-end">{this.state.list.filter((obj)=>{return obj.rating>=0}).length}</p>
                                </div>
                        </div>
                    
                     </div>

                    <div className="col-9">
                        <br/>
                        <div className="container d-flex justify-content-center flex-wrap">
                            {
                                this.state.list.length>0
                                ?this.state.list.map((prod) =>
                                    <Prod key={prod.title} priceBTC={this.state.priceBTC} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
                                    )
                                :<h1>No products to be shown</h1>
                                }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
