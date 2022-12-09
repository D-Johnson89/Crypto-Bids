import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSignIn } from 'react-auth-kit'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { registerUser } from '../util/userFuncs'

/*
  Main Register function
*/
function Register() {

	/*
      Set form states
    */
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmation, setConfirmation] = useState('')

    /*
      Set hook functions
    */
	const navigate = useNavigate()
	const signIn = useSignIn()

    /*
      Submit form function
    */
    function submitForm(e) {

        /*
          Prevent default page refresh
        */
        e.preventDefault()


        /*
          If password == confirmation password send use a userFunc to send data to backend to register user
        */
        if (password == confirmation) {

            /*
              Call registerUser as a promise to manipulate the return data
            */
            const promise = registerUser(username, email, password)
            promise.then((data) => {


                /*
                  If return message == 'Registered Successfully', sign-in user and navigate to homepage
                */
                if (data.message == "Registered Successfully") {

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
                      Else, alert user email or username already exists
                    */
                } else {
                    alert('Email or username already exists')
                }
            })


            /*
              Else alert user passwords must match
            */
        } else {
            alert('Confirmation must match password')
        }
        
    }
    

	return (
		<div className="mx-auto">
			<h1>Register for a <Link to="/">Crypto-Bids</Link> Account</h1>
			<Form onSubmit={(e) => {
                submitForm(e)
            }}>
				<Form.Group className="mb-3" controlId="formGroupUsername">
					<Form.Label>Choose a Username</Form.Label>
					<Form.Control
						className="form-control mx-auto w-auto"
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter Username"
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupEmail">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						className="form-control mx-auto w-auto"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Enter Email"
						//pattern="/[\w\.?\W?]+\@[\w]+\.\w+/"
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formGroupPassword">
					<Form.Label>Create a Password</Form.Label>
					<Form.Control
						className="form-control mx-auto w-auto"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Create Password"
						//pattern="/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,15}/"
						required
					/>
					<Form.Text className="text-muted">
						Password must contain 2 uppercase letters, 2 lowercase
						letter,<br></br> 2 numbers, and 2 special characters
					</Form.Text>
				</Form.Group>
				<Form.Group className="mb-3"
                controlId="formGroupConfirmation">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						className="form-control mx-auto w-auto"
						type="password"
						value={confirmation}
						onChange={(e) => setConfirmation(e.target.value)}
						placeholder="Re-Enter Password"
					/>
				</Form.Group>
				<Button type="submit" variant="primary">
					Create Account
				</Button>
			</Form>
		</div>
	)
}

export default Register
