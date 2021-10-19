import React,{useContext,useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Auth from '../Auth'
import axios from 'axios'

const AuthShopContext=React.createContext()

export function useAuth(){
    return useContext(AuthShopContext)
}


export default function AuthShopProvider({children}) {

    const history=useHistory()
    const [currentUser,setCurrentUser]=useState()
    const [cart,setCart]=useState([])
    const [products,setProducts]=useState([])
    const [orders,setOrders]=useState([])
    const [url,setUrl]=useState()
    const [details,setDetails]=useState(null)

    // const [loading, setLoading]= useState(true)
    

    let Authorization = `bearer ${JSON.parse(localStorage.getItem("token"))}`

    async function signup(){
        let Authorization = await `bearer ${JSON.parse(localStorage.getItem("token"))}`
        axios.get(`${process.env.REACT_APP_PROXY}/users/current`, {headers: {Authorization}}).then((response)=>{ 
            setCurrentUser(response.data)
        return Auth.login(()=>history.push("/"))
        })
    }

    function logout(){
        setCurrentUser(null)
        return Auth.logout(()=>history.push('/'))
          
    }

    useEffect(()=>{
        async function fetchUserData() {
            let current=await axios.get(`${process.env.REACT_APP_PROXY}/users/current`, {headers: {Authorization}})
            setCurrentUser(current.data)
            
            let userOrders=await axios.get(`${process.env.REACT_APP_PROXY}/orders/${current.data._id}`)
            setOrders(userOrders.data)
        }
        fetchUserData();
        
        axios.get(`${process.env.REACT_APP_PROXY}/products`).then((response)=>{ 
            setProducts(response.data)
        })
        
        axios.get(`${process.env.REACT_APP_PROXY}/store`).then((response)=>{ 
            setDetails(response.data)
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
        details
    } 
    
    return (
        <AuthShopContext.Provider value={value}>
            {children}
        </AuthShopContext.Provider>
    )
}
