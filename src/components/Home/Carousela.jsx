import React, {} from 'react'
import './Carousela.css'
// import Carousel from 'react-bootstrap/Carousel'
import Cards from './Cards'
import {useAuth} from '../../context/AuthShopContext'

export default function Carousela (props){

  const {products}=useAuth()
  
//  const nextIcon=<span className="carousel-control-next-icon" style={{backgroundColor:"black"}}></span>
//  const prevIcon=<span className="carousel-control-prev-icon" style={{backgroundColor:"black"}}></span>
 return (
      <div className="pb-3">
      {/* <Carousel nextIcon={nextIcon} prevIcon={prevIcon} indicators={false}> */}
        {/* <Carousel.Item> */}
        <div className="container d-flex ">
        {
             props.title==="onSale" && products.filter((obj) =>{return obj.price!==obj.onsale}).map((prod)=>{    
                return <Cards key={prod.id} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
            })

        }
        {/* {
             props.title==="bestSeller" && products.filter((obj) =>{return obj.rating===5}).map((prod)=>{    
                return <Cards key={prod.id} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
            })

        }
        {
             props.title==="newProducts" && products.filter((obj) =>{return obj.rating===4}).map((prod)=>{    
                return <Cards key={prod.id} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
            })

        } */}
      </div>
  {/* </Carousel.Item> */}
  {/* <Carousel.Item> */}
  <div className="container d-flex">
       {/* {
             props.title==="onSale" && products.filter((obj) =>{return obj.price!==obj.onsale}).map((prod)=>{    
                return <Cards key={prod.id} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
            })

        } */}
        {
             props.title==="bestSeller" && products.filter((obj) =>{return obj.rating===5}).map((prod)=>{    
                return <Cards key={prod.id} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
            })

        }
        {/* {
             props.title==="newProducts" && products.filter((obj) =>{return obj.rating===4}).map((prod)=>{    
                return <Cards key={prod.id} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
            })

        } */}
    </div>

  {/* </Carousel.Item>
  <Carousel.Item> */}
    <div className="container d-flex">
        {/* {
             props.title==="onSale" && products.filter((obj) =>{return obj.price!==obj.onsale}).map((prod)=>{    
                return <Cards key={prod.id} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
            })

        }
        {
             props.title==="bestSeller" && products.filter((obj) =>{return obj.rating===5}).map((prod)=>{    
                return <Cards key={prod.id} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
            })

        } */}
        {
             props.title==="newProducts" && products.filter((obj) =>{return obj.rating===4}).map((prod)=>{    
                return <Cards key={prod.id} id={prod.id} rating={prod.rating} price={prod.price} title={prod.title} image={prod.image} desc={prod.description} onsale={prod.onsale}/>
            })

        }
    </div>
  {/* </Carousel.Item>
</Carousel> */}
</div>    
    )
  }

