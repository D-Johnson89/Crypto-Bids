import React from 'react'
import LogOptions from './LogOptions'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit'


// Function to check if Logged In, Determines Nav Option to use
function NavOptions() {
    const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser()
	
    
    return (
        <>
            {!isAuthenticated() ? <LogOptions /> : <Dashboard />}
            
                <Outlet />
            
        </>
    )
}

export default NavOptions