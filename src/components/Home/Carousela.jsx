import React, {} from 'react'
import './Carousela.css'
import Cards from './Cards'
import {useAuth} from '../../context/AuthShopContext'

export default function Carousela (props){

  const {products}=useAuth()
  
 return (
      <div>
        <div className="container d-flex ">
        {
             props.title==="onSale" && products.filter((obj) =>{return obj.price!==obj.onsale}).map((prod)=>{    
                return <Cards key={prod.id} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
            })
        }
      </div>

    <div className="container d-flex">
        {
             props.title==="bestSeller" && products.filter((obj) =>{return obj.rating===5}).map((prod)=>{    
                return <Cards key={prod.id} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
            })

        }
    </div>

    <div className="container d-flex">

        {
             props.title==="newProducts" && products.filter((obj) =>{return obj.rating===4}).map((prod)=>{    
                return <Cards key={prod.id} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
            })

        }
    </div>

</div>    
    )
  }

