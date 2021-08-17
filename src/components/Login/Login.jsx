import React, {useRef,useState} from 'react'
import './Login.css';
import { Form, Button, Card, Container,Alert } from "react-bootstrap";
import {Link} from "react-router-dom"
import axios from 'axios'
import {useAuth} from '../../context/AuthShopContext'

export default function Login (props) {

    const emailRef=useRef()
    const passwordRef=useRef()
    const {signup} = useAuth()
    const [error,setError] = useState('')

    function userLogin(e){
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_PROXY}/users/jwt`,{
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then(async function (response) {
          setError('')
        //   setLoading(true)
        if(response.data.token){ 
            await localStorage.setItem("token",JSON.stringify(response.data.token))
            signup()
        }
        else
            setError(response.data.message);
      })
      .catch(function (error) {
        setError(error);
        // setLoading(false)
      });    
    }

        return (
            <>
            <Container style={{width:"400px"}} className="mb-3 mt-3">
                <Card>
                    <Card.Body>
                        <h2 className="text-center">Sign In</h2>
                        {error&& <Alert variant="danger">{error}</Alert>}
                        <Form>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control  ref={emailRef} type="email"required/>
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control  ref={passwordRef} type="password" required/>
                            </Form.Group>
                            <Button type="submit" className="d-block mx-auto btn-warning" onClick={(e)=>userLogin(e)}>Log in</Button>      
                         </Form>
                        

                            {/* <button onClick={(e)=>GoogleLogin(e)} className="loginBtn loginBtn--google d-block mx-auto mb-3 mt-3">
                            Login with Google
                            </button> */}
                            {/* <button onClick={(e)=>FacebookLogin(e)} className="loginBtn loginBtn--facebook d-block mx-auto">
                            Login with Facebook
                            </button>
                            <button onClick={(e)=>GithubLogin(e)} className="btn-github btn-social d-block mx-auto mb-3 mt-3">
                            <i className="fab fa-github"></i> Login with Github
                            </button> */}
                    </Card.Body>
                </Card> 
                </Container>
              <div className="text-center mb-4" >
                  Dont have an account? <Link to="/register">Sign up</Link>
            </div>
        </>
        )
}
