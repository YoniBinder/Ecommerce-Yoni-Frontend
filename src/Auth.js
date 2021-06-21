// import firebase from 'firebase/app'
import 'firebase/auth'
import axios from 'axios'

let Authorization = `bearer ${JSON.parse(localStorage.getItem("token"))}`

class Auth{
    constructor(){
        axios.get(`${process.env.REACT_APP_PROXY}/current`, {headers: {Authorization}}).then((user)=>{
            if (user) {
                this.authenticated=true
            } else {
                this.authenticated=false
            }
        });
    }
    login(cb){
        this.authenticated=true
        cb()
    }
    logout(cb){
        this.authenticated=false
        cb()
    }
    isAuthenticated(){
        return this.authenticated
    }
}
export default new Auth()