import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { port } from '../../../backend/index'
import LogOptions from './LogOptions'
import Dashboard from './Dashboard'

// Function to check if Logged In, Determines Nav Option to use
function NavOptions() {
    const history = useHistory()
	const [username, setUsername] = useState('')
		
	async function populateQuote() {
		const req = await fetch(`http://localhost:${port}/api/home`, {
			headers: {
				'x-acces-token': localStorage.getItem('token'),
			},
		})

		const data = req.json()
		if(data.status === 'ok') {
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
				//history.replace('/login')
				return <LogOptions />
			} else {
				populateQuote()
				return <Dashboard />
			}
		}
		
	}, [])
}

export default NavOptions