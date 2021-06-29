import React,{useContext,useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Auth from '../Auth'
import axios from 'axios'

const AuthShopContext=React.createContext()

export function useAuth(){
    return useContext(AuthShopContext)
}


export function AuthShopProvider({children}) {

    const history=useHistory()
    const [currentUser,setCurrentUser]=useState()
    const [cart,setCart]=useState([])
    const [products,setProducts]=useState([])
    const [orders,setOrders]=useState([])
    const [users,setUsers]=useState([])
    const [url,setUrl]=useState()
    const [details,setDetails]=useState(null)
    // const [loading, setLoading]= useState(true)


    let Authorization = `bearer ${JSON.parse(localStorage.getItem("token"))}`

    async function signup(){
        let Authorization = await `bearer ${JSON.parse(localStorage.getItem("token"))}`
        axios.get(`${process.env.REACT_APP_PROXY}/current`, {headers: {Authorization}}).then((response)=>{ 
            setCurrentUser(response.data)
        return Auth.login(()=>history.push("/"))
        })
    }

    function logout(){
        setCurrentUser(null)
        return Auth.logout(()=>history.push('/'))
          
    }

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_PROXY}/current`, {headers: {Authorization}}).then((response)=>{ 
            setCurrentUser(response.data)
                 
        })
        axios.get(`${process.env.REACT_APP_PROXY}/products`).then((response)=>{ 
            setProducts(response.data)
        })
        axios.get(`${process.env.REACT_APP_PROXY}/orders`).then((response)=>{ 
            setOrders(response.data)
        })
        axios.get(`${process.env.REACT_APP_PROXY}/details`).then((response)=>{ 
            setDetails(response.data)
        })
        axios.get(`${process.env.REACT_APP_PROXY}/users`).then((response)=>{ 
            setUsers(response.data)
        })
       
        setCart(JSON.parse(localStorage.getItem('products'))||[])
        setUrl(window.location.href)
    },[Authorization])

    

    const value={   
        currentUser,
        signup,
        logout,
        cart,
        products,
        url,
        orders,
        details,
        users
    } 

    return (
        <AuthShopContext.Provider value={value}>
            {children}
        </AuthShopContext.Provider>
    )
}
