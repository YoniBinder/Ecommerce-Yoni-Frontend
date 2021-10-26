import React, { useRef,useState} from 'react';
import './Header.css';
import {Link,NavLink} from "react-router-dom";
import Logo from "../../pictures/bitcoinLogo.png";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ShoppingCart from './ShoppingCart'
import Popover from 'react-bootstrap/Popover'
import {useAuth} from '../../context/AuthShopContext'


export default function Header (){

    const [urlValue,setUrlValue]=useState()
    const callRef = useRef();
    const {cart}=useAuth()
    const {currentUser}=useAuth()

  function setUrl(){
    setUrlValue(callRef.current.value)
    }   
    let header={
        color:'rgb(255, 102, 0)',
        pointerEvents:"none"
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                
                <Link to="/"><img className="navbar-brand" width="40px" height="50px" alt="..." src={Logo}></img></Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav" >
                    <li>
                    <OverlayTrigger
                    trigger={['hover', 'focus']}
                    key="bottom"
                    placement="bottom"
                    overlay={
                        <Popover id="popover-positioned-bottom">
                        <Popover.Title as="h3"><div className="text-center fw-bold">Your Cart</div></Popover.Title>
                        <Popover.Content >
                            <ShoppingCart/>
                        </Popover.Content>
                        </Popover>
                    }
                    >
                    <Link to="/cart">
                        <div className="navbar-brand">
                    <i className="fas fa-shopping-cart"></i>{cart.length>0 && <span id="numItems" >{cart.length}</span>} 
                    </div></Link>
                    </OverlayTrigger>
                    </li>
                    
                    <li className="nav-item">
                        <div className="nav-link pageLink ml-3" ><NavLink exact to="/" style={{color:"black"}} activeStyle={header}>Home</NavLink></div>
                    </li>
                    {!currentUser &&<li className="nav-item">
                        <div className="nav-link pageLink ml-2"><NavLink to="/login" style={{color:"black"}} activeStyle={header}>Login</NavLink></div>
                    </li>}
                    <li className="nav-item">
                        <div className="nav-link pageLink ml-2"><NavLink to="/register" style={{color:"black"}} activeStyle={header}>Register</NavLink></div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link pageLink ml-2" ><NavLink to="/catalog" style={{color:"black"}} exact activeStyle={header}>Store</NavLink></div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link pageLink ml-2"><NavLink to="/contactUs" style={{color:"black"}} activeStyle={header}>Contact-Us</NavLink></div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link pageLink ml-2"><NavLink to="/aboutUs" style={{color:"black"}} activeStyle={header}>About-Us</NavLink></div>
                    </li>
                    <li className="nav-item">
                        <div className="nav-link pageLink ml-2"><NavLink to="/blog" style={{color:"black"}} activeStyle={header}>Blogs</NavLink></div>
                    </li>
                    <li className="nav-item">
                    {currentUser && <NavLink to="/account/profile" className="nav-link fw-bold pageLink ml-2" style={{color:"black"}} activeStyle={header}> {currentUser.username}</NavLink>}  

                    </li>
                    <li className="nav-item">
                    {currentUser && currentUser.role==="Admin" && <NavLink to="/admin" className="nav-link ml-2" style={{color:"black"}} activeStyle={header}><i className="fas fa-user-cog"></i></NavLink> }

                    </li>
                </ul>
            </div>
                      
            <input id="searcBox" className="me-2" type="search" placeholder="Search" ref={callRef} onChange={()=>setUrl()} aria-label="Search"></input>
            
            <Link className="btn p-1 px-4 rounded fw-bold searchBtn" to={"/catalog?q="+urlValue} style={{color:"black",background:"#ff0800"}}>Search</Link>
            
        
        </div>
      </nav>
      );
   }

