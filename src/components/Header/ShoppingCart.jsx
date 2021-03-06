import React from "react";
import "./ShoppingCart.css";
import {useAuth} from '../../context/AuthShopContext'

let arrProd = JSON.parse(localStorage.getItem("products")) || [];

export default function ShoppingCart() {
    const {products}=useAuth()


  return (
    <div>
      {(products && arrProd.length>0)  
      ?(arrProd.map((obj) => {
        let results = products.filter((prod) => {
          return prod.title === obj.title;
        })[0];
        return (
          <div className="border" key={obj.title}>
            <div className="row">
              <div className="col-5">
                <img className="popImg" src={products&&results.image} alt="..." />
              </div>
              <div className="col-7">
                <div>
                  <b>{products&&results.title}</b>
                </div>
                <br />
                <div className="text-start">
                  {obj.item} x ${products&&results.onsale}
                </div>
              </div>
            </div>
          </div>
        );
      })
      )
      :(<div>No products have been added to cart</div>)
    }
    </div>
  );
}
