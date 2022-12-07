import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSignIn } from 'react-auth-kit'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { loginUser} from '../util/userFuncs'


/*
  Main Login function
*/
function Login() {

	/*
      Set email and password states
    */
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    /*
      Set hook functions
    */
	const signIn = useSignIn()
	const navigate = useNavigate()

	/*
      Function to log user in
    */
	function submitForm(e) {

        /*
          Prevent default page refresh
        */
        e.preventDefault()

        /*
          Call loginUser as a promise to manipulate the return data
        */
        const promise = loginUser(email, password)
        promise.then((data) => {

            /*
              If reponse includes token, sign-in user and navigate home
            */
            if (data.token) {
                
                /*
                  Sign-in user
                */
                signIn({
                    token: data.token,
                    expiresIn: 120,
                    tokenType: 'Bearer',
                    authState: { user: data.user },
                })

                /*
                  Navigate home
                */
                navigate('/')
            
            /*
              Else alert user email or password is incorrect
            */
            } else {
                alert('Email or password incorrect!')
            }
        })
    }

	return (
		<div className="mx-auto">
			<h1>Login</h1>
			<Form onSubmit={(e) => {
                submitForm(e)
            }}>
				<Form.Group className="mb-3"
				controlId="formGroupEmail">
					<Form.Label>User Email</Form.Label>
					<Form.Control
						className="form-control
						mx-auto w-auto"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter Email"
						//pattern="/[\w\.?\W?]+\@[\w]+\.\w+/"
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupPassword">
					<Form.Label>User Password</Form.Label>
					<Form.Control
						className="form-control mx-auto w-auto"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter Password"
						//pattern="/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,15}/"
						required
					/>
				</Form.Group>
				<Button type="submit" variant="primary">
					Login
				</Button>
			</Form>
			<p className="my-3">Not a member?  Register <Link to='users/register'>here</Link>.</p>
		</div>
	)
}

export default Login
