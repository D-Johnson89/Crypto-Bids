import React, { useState, useEffect } from 'react'
import LogOptions from './LogOptions'
import Dashboard from './Dashboard'
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit'


// Function to check if Logged In, Determines Nav Option to use
function NavOptions() {
	const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser()
		
    console.log('USER: ', auth(), 'SIGNEDIN: ', isAuthenticated())
    
    return isAuthenticated() ? <Dashboard /> : <LogOptions />
}

export default NavOptions