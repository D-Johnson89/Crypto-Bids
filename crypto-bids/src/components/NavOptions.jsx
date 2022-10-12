import React, { useState, useEffect } from 'react'
import LogOptions from './LogOptions'
import Dashboard from './Dashboard'
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit'


// Function to check if Logged In, Determines Nav Option to use
function NavOptions() {
	//const [username, setUsername] = useState('')
    //const [login, setLogin] = useState('')
	const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser()
		
	/*async function populateQuote() {
		const req = await fetch('http://localhost:5000/api/home', {
			headers: {
				'x-acces-token': localStorage.getItem('token'),
			},
		})

		const data = req.json()
		if(data.status === 'ok') {
			console.log(data)
			setUsername(data.username)
		} else {
			alert(date.error)
		}
	}

			
	useEffect(() => {
		
		const token = localStorage.getItem('token')
		if (token) {
			const user = jwt.decode(token)
			if(!user) {
				localStorage.removeItem('token')
			} else {
				console.log(user)
				populateQuote()
			}
		}
		
	}, [])
	console.log(username)*/
    console.log(auth())
	console.log(isAuthenticated())
    if(isAuthenticated()) {
        return (
            <div>
                <Dashboard />
            </div>
        )
    } else {
        return <LogOptions />
    }
}

export default NavOptions