import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LogOptions from './LogOptions'
import Dashboard from './Dashboard'



// Function to check if Logged In, Determines Nav Option to use
function NavOptions() {
	const [username, setUsername] = useState('')
		
	async function populateQuote() {
		const req = await fetch('http://localhost:5000/api/home', {
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
			} else {
				populateQuote()
			}
		}
		
	}, [])
	console.log(username)
	if(!username){
		return <LogOptions />
	}
	return <Dashboard />
	
}

export default NavOptions