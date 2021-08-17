import React, { useState,useEffect,useRef} from 'react'
import {useAuth} from '../../context/AuthShopContext'
import axios from 'axios'
import './Account.css'

export default function Account() {
    const [userDetails,setUserDetails]=useState({
        firstName:'',
        lastName:'',
        phoneNumber:'',
        country:'',
    })

    const [order,setOrder]=useState([])
    const {currentUser}=useAuth()
    const {logout}=useAuth()
    const {orders}=useAuth()
    const imgRef = useRef(null)
    const [update,setUpdate]=useState(false)

    useEffect(()=>{
        //put this in the context area
        if(currentUser){
            setUserDetails({
                firstName:currentUser.firstName,
                lastName:currentUser.lastName,
                phoneNumber:currentUser.phoneNumber,
                country:currentUser.country})
            let arrOrder = []
            for (let i=0;i<orders.length;i++) {

                if(orders[i].userId===currentUser._id){
                    
                    arrOrder.push(orders[i])   
                }
                        
            }
            setOrder(arrOrder)

            console.log(currentUser)
    }
    },[currentUser,orders])


    function uploadPicture(e){
        var formData = new FormData();
        var imagefile = imgRef.current.files[0]
        formData.append("yourImage", imagefile);
        axios.post(`${process.env.REACT_APP_PROXY}/users/image`, formData).then(
            response => {
                if (response.data.error){
                    console.log(response.data.message)
                }
                else{
                    alert(response.data.message)
                    axios.patch(`${process.env.REACT_APP_PROXY}/users/${currentUser._id}`,{
                        profileImage: imagefile.name
                    })
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
    function handleUserDetailsChanges(e){
        setUpdate(false)  
        if(e.target.id==="phoneNumber") setUserDetails({...userDetails, phoneNumber:e.target.value})
        if(e.target.id==="country") setUserDetails({...userDetails,country:e.target.value})
        if(e.target.id==="firstName") setUserDetails({...userDetails,firstName:e.target.value})
        if(e.target.id==="lastName") setUserDetails({...userDetails,lastName:e.target.value})
     }

    function updateUserDetails(e){
        e.preventDefault()
        axios.patch(`${process.env.REACT_APP_PROXY}/users/${currentUser.id}`,{
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            phoneNumber: userDetails.phoneNumber,
            country: userDetails.country
          })
          .then(function (response) {
              
                setUpdate(true)
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
                            <button onClick={(e)=>uploadPicture(e)} className="btn btn-warning d-block mx-auto">UPLOAD PICTURE</button>
                    </div>

                </div>
                <div className="col-8">
                <div className="container border rounded mt-4 mb-4 p-3">
                    <h2 className="text-center">User Profile</h2>
                    <hr/>
                    <form onSubmit={(e)=>updateUserDetails(e)}>
                        <div className="container">
                        <div className="row">
                        <div className="col">
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input type="text" className="form-control" id="firstName" onChange={e=>handleUserDetailsChanges(e)} defaultValue={currentUser.firstName} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailAddress" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="emailAddress" value={currentUser && currentUser.email} disabled />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">Country</label>
                            <input type="text" className="form-control" id="country" onChange={e=>handleUserDetailsChanges(e)} defaultValue={currentUser.country}/>
                        </div>
                        </div>
                        <div className="col">
                        <div className="mb-3">
                            <label htmlFor="laseName" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="lastName" onChange={e=>handleUserDetailsChanges(e)} defaultValue={currentUser.lastName}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone number</label>
                            <input type="text" className="form-control" id="phoneNumber" onChange={e=>handleUserDetailsChanges(e)} defaultValue={currentUser.phoneNumber} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">User name</label>
                            <input type="text" className="form-control" id="userName" defaultValue={currentUser.username} disabled/>
                        </div>
                        </div>
                        </div>
                        </div>
                        
                        <hr/>
                        <button type="submit" className="btn btn-warning d-block mx-auto" style={{width:"200px"}}>Update Details</button>
                        {update && <div className="update" >update completed!</div>}
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

            <button onClick={()=>userSignOut()} style={{width:"150px"}} className="btn d-block mx-auto btn-primary mb-3 mt-3">Sign out</button>

        </div>
        
    )
}
