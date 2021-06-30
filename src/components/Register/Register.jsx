import React, { useRef,useState} from "react";
import { Form, Button, Card, Container,Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'

export default function Register() {
      const usernameRef=useRef()
      const emailRef=useRef()
      const passwordRef=useRef()
      const passConfirmRef=useRef()
      const history=useHistory()       
      const [error,setError] = useState('')
    
      const email=new RegExp('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,64}','gm')

    function registerUser(e){
    e.preventDefault();
    if(usernameRef.current.value.length===0)
        return setError('Please enter username')
    if(!email.test(emailRef.current.value))
        return setError('Please enter valid email address')
    if(passwordRef.current.value.length<6)
        return setError('Password should be more than 6 letters')
    if(passwordRef.current.value!==passConfirmRef.current.value)
        return setError('passwords do not match')
    
    axios.post(`${process.env.REACT_APP_PROXY}/users`,{
        email: emailRef.current.value,
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
      .then(function (response) {
        history.push('/login')
      })
      .catch(function (error) {
        console.log(error);
      });    
       
    }

  return (
    <div>    
        <Container style={{width:"400px"}} className="mb-3 mt-3">
            <Card>
                <Card.Body>
                    <h2 className="text-center">Register</h2>
                    {error&& <Alert variant="danger">{error}</Alert>}
                    <Form>
                    <Form.Group id="email">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" ref={usernameRef} required/>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control type="password" ref={passConfirmRef} required/>
                        </Form.Group>
                        <Button type="submit" onClick={(e)=>registerUser(e)} className="d-block mx-auto btn-warning">Sign up</Button>
                    </Form>
                </Card.Body>
            </Card> 
            </Container>
          <div className="text-center mb-4">
              Already have an account? <Link to="/">Login</Link>
        </div>
    </div>
  );
}
