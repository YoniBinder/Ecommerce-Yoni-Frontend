import React, { useState,useEffect,useRef} from 'react'
// import Auth from '../../Auth'
import {useAuth} from '../../context/AuthShopContext'
import axios from 'axios'

export default function Account(props) {

    const [firstName,setFirstName]=useState("")
    const [phone,setPhone]=useState("")
    const [lastName,setLastName]=useState("")
    const [country,setCountry]=useState("")
    const [order,setOrder]=useState([])
    const {currentUser}=useAuth()
    const {logout}=useAuth()
    const {orders}=useAuth()
    const imgRef = useRef(null)
    useEffect(()=>{

        if(currentUser){
            let arrOrder = []
            for (let i=0;i<orders.length;i++) {

                if(orders[i].userId===currentUser._id){
                    
                    arrOrder.push(orders[i])   
                }
                        
            }
            setOrder(arrOrder)
    }
    },[currentUser,orders])


    


    function submitAdd(e){
        var formData = new FormData();
        var imagefile = imgRef.current.files[0]
        formData.append("yourImage", imagefile);
        axios.post(`${process.env.REACT_APP_PROXY}/image`, formData).then(
            response => {
                if (response.data.error){
                    console.log(response.data.message)
                }
                else{
                    alert(response.data.message)
                    const user={
                        ...currentUser,
                        profileImage: imagefile.name,
                    }
                    axios.put(`${process.env.REACT_APP_PROXY}/users/${currentUser._id}`,user)
                      .then(function (response) {
                        console.log(response.data);
                      })
                      .catch(function (error) {
                        console.log(error);
                      });    
                }
            }
        )
    }



    async function userSignOut(){
            await localStorage.removeItem("token")
            logout()
        }
    function changeValue(e){
        if(e.target.id==="phoneNumber") setPhone(e.target.value)
        if(e.target.id==="country") setCountry(e.target.value)
        if(e.target.id==="firstName") setFirstName(e.target.value)
        if(e.target.id==="lastName") setLastName(e.target.value)
     }
    function handleForm(e){
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_PROXY}/users/${currentUser._id}`,{
            ...currentUser,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phone,
            country: country,
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });    
    }


    
    return (
        <div className="container">
            <h1 className="text-center mt-4">Hello, {currentUser && currentUser.username }</h1>
            <div className="row">
                <div className="col-4">
                    <div className="container border rounded mt-4 mb-4 p-3 text-center">
                            <img src={currentUser && `${process.env.REACT_APP_PROXY}/image/${currentUser.profileImage}`} style={{width:"150px",height:"180px"}} name="img" alt="..." ></img>
                            <h2>{currentUser && (currentUser.username) }</h2>
                            <p>{currentUser && (currentUser.createdAt.substring(0, 10))}</p>
                            <hr/>
                            <label htmlFor="img">Select image:</label>
                            <input type="file" ref={imgRef} name="yourImage" defaultValue="" />                            
                            <button onClick={(e)=>submitAdd(e)} className="btn btn-warning d-block mx-auto">UPLOAD PICTURE</button>
                    </div>

                </div>
                <div className="col-8">
                <div className="container border rounded mt-4 mb-4 p-3">
                    <h2 className="text-center">User Profile</h2>
                    <hr/>
                    <form onSubmit={(event)=>handleForm(event)}>
                        <div className="container">
                        <div className="row">
                        <div className="col">
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input type="text" className="form-control" id="firstName" onChange={(event)=>changeValue(event)} defaultValue={currentUser.firstName} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailAddress" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="emailAddress" value={currentUser && currentUser.email} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" className="form-control" id="country" onChange={(event)=>changeValue(event)} defaultValue={currentUser.country}/>
                        </div>
                        </div>
                        <div className="col">
                        <div className="mb-3">
                            <label htmlFor="laseName" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="lastName" onChange={(event)=>changeValue(event)} defaultValue={currentUser.lastName}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                            <input type="text" className="form-control" id="phoneNumber" onChange={(event)=>changeValue(event)} defaultValue={currentUser.phoneNumber} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">User name</label>
                            <input type="text" className="form-control" id="userName" defaultValue={currentUser.username} disabled/>
                        </div>
                        </div>
                        <hr/>
                        <button type="submit"style={{width:"200px"}} className="btn btn-warning d-block mx-auto mb-1">Update Details</button>
                        </div>
                        </div>
                        </form>
                </div>
                </div>
            </div>
            <div>
            </div>
            <div className="d-flex flex-row justify-content-start flex-wrap">
            {order && order.map((obj)=>
            <div key={obj.id} className="border border-dark order" style={{margin:"10px",padding:"10px",width:'300px'}}>
            
            <span style={{color:"blue",fontWeight:"bold"}}>You have purchased:</span>
             {obj.products.map((item)=><div key={item.title}>{item.item} units of {item.title} </div>)}
            <p><span style={{color:"blue",fontWeight:"bold"}}>Total price: </span>${obj.total}</p>
            <p><span style={{color:"blue",fontWeight:"bold"}}>Order number: </span>{obj.reference}</p>
            <p><span style={{color:"blue",fontWeight:"bold"}}>Status: </span>{obj.status}</p>    
            </div>
            
            )}
            </div>

            <button onClick={(e)=>userSignOut(e)} style={{width:"150px"}} className="btn d-block mx-auto btn-primary mb-3 mt-3">Sign out</button>

        </div>
        
    )
}
