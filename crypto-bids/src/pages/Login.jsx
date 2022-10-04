import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
//import Alert from "react-bootstrap/Alert"
import { PORT } from "../../../backend/index"

// Save port as variable
const port = PORT

// Main Login function
function Login() {
	//Set email and password states
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	// Function to log user in
	async function loginUser(e) {
		//Prevent default page refresh
		e.preventDefault()

		// Send data to server to try to login
		const response = await fetch(`http://localhost:${port}/api/login`, {
			method: "POST",
			headers: {
				"Content-Type" : "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		// Make server response readable
		const data = await response.json()

		/* If successfully logged in, store jwt, redirect to homepage. If not alert as such*/
		if(data.user) {
			localStorage.setItem('token', data.user)
			alert('Login Successful')
			window.location.href = '/home'
		} else {
			alert('Email Does Not Exist.')
		}
		console.log(data)
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
		</div>
	)
}

export default Login
