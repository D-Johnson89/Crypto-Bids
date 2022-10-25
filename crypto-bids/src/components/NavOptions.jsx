import React from 'react'
import LogOptions from './LogOptions'
import Dashboard from './Dashboard'
import { useIsAuthenticated } from 'react-auth-kit'


// Function to check if Logged In, Determines Nav Option to use
function NavOptions(user) {
	const isAuthenticated = useIsAuthenticated()
    console.log(user)
    
    return isAuthenticated() ? <Dashboard user={user} /> : <LogOptions />
}

export default NavOptions