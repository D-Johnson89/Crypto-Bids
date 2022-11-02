import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignIn, useSignOut } from 'react-auth-kit'

const navigate = useNavigate()
const signIn = useSignIn()
const signOut = useSignOut()

// Function to register user
export async function registerUser(e, username, email, pw, conf) {

    // Prevent default page refresh
    e.preventDefault()

    // Check passwords match
    if (pw === conf) {
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
				confirmation,
			}),
		})
        .then((response) => {
            return response.json()
        })
        .then((data) => {
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
        } catch (err) {
            
            console.log('Error: ', err)
        }
    } else {
        alert('Confirmation must match password')
    }
}

