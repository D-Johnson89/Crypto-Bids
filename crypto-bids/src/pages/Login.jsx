import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSignIn } from 'react-auth-kit'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

//import Alert from "react-bootstrap/Alert"

// Main Login function
function Login() {
	// Set email and password states
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(null)
	const signIn = useSignIn()
	const navigate = useNavigate()

	// Function to log user in
	async function loginUser(e) {
		// Prevent default page refresh
		e.preventDefault()

		// Send data to server to try to login
		try {
			const response = await fetch('/api/users/login', {
				method: "POST",
				headers: {
					"Content-Type" : "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			})
            .then((response) => {
                return response.json()
            })
		    .then((data) => {
                // Check for correct email
                if (data.email === undefined) {
                    alert('Email not registered!')
                // Sign in user
                } else {
                    signIn({
                        token: data.token,
                        expiresIn: 1440,
                        tokenType: 'Bearer',
                        authState: { email: data.email, username: data.username },
                    })
                }
            }).catch((err) => {
                if (err) setError(err.message)

                console.log("Error: ", error)
            })

            const member = {
                username: data.username,
                email: data.email,
                balance: data.balance,
            }

			navigate('/')

            console.log(member)
        // Catch errors
		} catch (err) {
			if (err) setError(err.message)

			console.log("Error: ", error)
		}

		
	}

	return (
		<div className="mx-auto">
			<h1>Login</h1>
			<Form onSubmit={loginUser}>
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
			<p className="my-3">Not a member?  Register <Link to='/register'>here</Link>.</p>
		</div>
	)
}

export default Login
