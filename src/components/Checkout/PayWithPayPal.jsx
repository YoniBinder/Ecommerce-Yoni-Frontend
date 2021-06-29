

import React from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import './PayWithPayPal.css'
class PayWithPayPal extends React.Component {

    render() {
      const { amount, onSuccess, currency,onError } = this.props;
        return (
            <div className="paypalBtn">
            <PayPalButton
            
              amount={amount}
              currency={currency}
              onSuccess={(details, data) => onSuccess(details, data)}
              onError={(err)=>onError(err)}
              options={{
                currency:currency,
                clientId: "AWNAsi9gAVMnnY4kmlSMKtxPeuiiKsmdnq8h5xbZ_ANozuovpOURwIAIdW8nCLlkr_BhWDnKGK0Zn3pG"
              }}
              style= {{
                layout:  'vertical',
                shape:   'pill',
                label:   'checkout'
              }}
          />
          </div>
        );
    }
}

export default PayWithPayPal;