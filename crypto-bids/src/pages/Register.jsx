import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSignIn } from 'react-auth-kit'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// Main Register function
function Register() {
	// Set form states
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmation, setConfirmation] = useState('')
	const navigate = useNavigate()
	const signIn = useSignIn()

	// Function to register user
	async function registerUser(e) {
		// Prevent default page refresh
		e.preventDefault()

		// Check Passwords match
		if(password !== confirmation) {
			alert('Confirmation must match password')
		}

		// Send data to server to create user
		const response = await fetch('http://localhost:5000/api/users/register', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
				confirmation,
			}),
		})
        .then((response) => {
            return response.json()
        })
		.then((data) => {
            // Sign user in if successfully registered
            if (data.message === "Registered Successfully") {
                signIn({
                    token: data.token,
                    expiresIn: 1440,
                    tokenType: 'Bearer',
                    authState: { email: data.email, username: data.username },
                })
                navigate('/', {
                    state: {
                        username: data.username,
                        email: data.email,
                        balance: data.balance,
                    },
                })
            }
        })
	}

	return (
		<div className="mx-auto">
			<h1>Register for a <Link to="/">Crypto-Bids</Link> Account</h1>
			<Form onSubmit={registerUser}>
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
				<Form.Group className="mb-3">
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
