import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")


	async function loginUser(e) {
		e.preventDefault()

		const response = await fetch("http://localhost:5000/api/login", {
			method: "POST",
			headers: {
				"Content-Type" : "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

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
