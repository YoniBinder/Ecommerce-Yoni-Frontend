import React from 'react'
import {Route,Redirect} from 'react-router-dom'

import {useAuth} from '../context/AuthShopContext'


export default function ProtectedRoute({component:Component,...rest}) {
  const {currentUser}=useAuth()
    return(
        <Route {...rest} render={(props)=>{ 
        return currentUser.role==='Admin'
        ?<Component {...props}/>
        :<Redirect to="/" />
        }}/>
      )
}
