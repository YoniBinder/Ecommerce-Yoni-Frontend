import React, { Component } from 'react'
import './PageNotFound.css'
import bitOnfire from './bitcoinCrash.jpg'
export default class PageNotFound extends Component {

    render() {
        return (
            <div className="container">
                <h1 id="title">404:Page Not Found</h1>
                <img id="notFound" src={bitOnfire} alt="..." width="400px" height="270px"></img> 
            </div>
        )
    }
}
