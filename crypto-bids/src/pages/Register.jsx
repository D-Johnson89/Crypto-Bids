import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { port } from '../../../backend/index'

function Register() {
	const history = useHistory()

	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmation, setConfirmation] = useState('')

	async function registerUser(e) {
		e.preventDefault()

		const response = await fetch(`http://localhost:${port}/api/register`, {
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

		if(password !== confirmation) {
			alert('Confirmation must match password')
		}

		const data = await response.json()

		if (data.status === 'ok') {
			const token = jwt.sign(
				{
					userId: user._id,
					username: user.username,
					email: user.email,
				}, secret
			)

			localStorage.setItem(token)
			history.push('/dashboard')
		}
	}

	return (
		<div className="mx-auto">
			<h1>Register for a Crypto-Bids Account</h1>
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
						pattern="/[\w\.?\W?]+\@[\w]+\.\w+/"
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
