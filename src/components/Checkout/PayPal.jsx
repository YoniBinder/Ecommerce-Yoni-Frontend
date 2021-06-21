import React,{useEffect,useRef} from 'react';

export default function PayPal() {
    const paypal=useRef()
    useEffect(() => {
        window.paypal
          .Buttons({
            CreateOrder:(data,actions,err)=>{
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units:[
                        {
                            description: "Cool looking table",
                            amount:{
                                currency_code:"USD",
                                value: 650.00,
                            },
                        },
                    ],
                });
            },
            onApprove:async (data,actions)=>{
                const order=await actions.order.capture()
                console.log(order);
            },
            onError:(err)=>{
                console.log(err)
            }
        }).render(paypal.current)
    }, [])
    return (
        <div>
            <div ref={paypal} style={{width:"200px", margin:"0 auto"}}></div>
        </div>
    )
}
