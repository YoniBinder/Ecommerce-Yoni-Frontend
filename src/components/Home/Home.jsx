import React from 'react'
import "./Home.css"
import { Link } from "react-router-dom";
import Carousela from "./Carousela"


export default function Home() {

    return (
        <div>
            <div className="container-fluid shopping background text-center">
                <br />
                <h1 className="titles">Crypto Hardware wallets and Accessories</h1><br />
                <h2 className="titles">Because like in real life, your money must be secured</h2><br />
                <h2 className="titles font-weight-bold">Order now and don't be concerned!</h2>
                <br />
                <Link to="/catalog" className="d-block mx-auto shopButton">Visit Shop</Link>
                
            </div>
            <div className="container-fluid p-0 text-center">
                <h3 className="titles pt-3 pb-3 pl-4">Best sellers</h3>
                <div className="d-flex justify-content-center pb-3">
                    <Carousela title="bestSeller" />
                </div>
                <h3 className="titles pt-3 pb-3 pl-4 text-center" style={{ backgroundColor:"rgba(212, 139, 30, 0.95)"}}>New products</h3>
                <div className="container-fluid d-flex justify-content-center pb-3" style={{ backgroundColor: "rgba(212, 139, 30, 0.95)" }} >
                    <Carousela title="newProducts" />
                </div>
                <h3 className="titles pt-3 pb-3 pl-4 text-center">On sale</h3>
                <div className="container-fluid d-flex justify-content-center pb-3">
                    <Carousela title="onSale" />
                </div>
            </div>
        </div>
    )

}
