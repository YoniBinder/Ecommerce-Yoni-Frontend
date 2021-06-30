import React from 'react'
import ReactPlayer from "react-player"

export default function AboutUs() {
    return (
        <div>
            <div className="container-fluid" style={{backgroundColor:"orange",height:"200px"}}>
            <br/><br/>
            <h1 className="text-center">Yoni Token</h1>
            <h3 className="text-center">Crypto is the future</h3>
            </div>
            <div className="container">
            <br/>
            <p className="text-center">At our store, you can find hardware wallets and also information on cryptocurrencies.
            <br/> It is essential, that your coins will be secured, not just online, but also in your hands.
            <br/> Our store started from 2019, and we have so far many clients around the world.
            <br/> We work only with audited suppliers and check carefully each product we recieve.
            <br/> We don't think that crypto is just an asset, but also a payment method.
            <br/><br/><b> You can also pay here in crypto!</b>
            </p>
            <br/>
            <div className="text-center">Take a look at our presentor, Mr. Robert Kyosaki, explains on bitcoin:</div>
            <br/>
            <ReactPlayer width="500px" style={{margin:"0 auto"}} url="https://www.youtube.com/watch?v=8jEMLsLA9_c"/>
            </div><br/><br/>
        </div>
    )
}
