import React, {useEffect,useState } from 'react'
import Card from './Card'
import axios from 'axios'

export default function Blog (){

    const [list, setList]= useState(null)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PROXY}/blogs`).then((response)=>{    
        setList(response.data)
        })
    }, [])

        return (
            <div>
                <br/><h1 className="text-center"><span style={{color:"orange"}}>/</span> <b>Latest News</b><span style={{color:"orange"}}>/</span></h1>
                <div className="container d-flex flex-wrap ">
                { list?list.map((obj)=>
                    <Card key={obj._id} id={obj._id} title={obj.title} image={obj.image} category={obj.category} />
                )
                :<h1 className="text-center">No blogs yet</h1>
                }
                
            </div>
            </div>
        )
    }

