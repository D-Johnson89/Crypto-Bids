import { createContext } from 'react'
//import { resolvePath } from 'react-router-dom'

export const UserContext = createContext(null)

// Function to register user
export async function registerUser(e, username, email, password, confirmation) {

    // Prevent default page refresh
    e.preventDefault()

    // Check passwords match
    if (password === confirmation) {
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username,
				email,
				password,
			}),
		})
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data.token)
            if (data.message === "Registered Successfully") {
                console.log('userFuncs: ', data)
                return data
            } else {
                alert('Email or Username already exist')
                return null
            }
        })
        } catch (err) {
            
            console.log('Error: ', err)
        }
    } else {
        alert('Confirmation must match password')
    }
}

