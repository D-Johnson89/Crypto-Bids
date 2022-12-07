import React, { useState } from 'react'
import LogOptions from './LogOptions'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'
import { useIsAuthenticated } from 'react-auth-kit'
import { UserContextProvider, UserContext } from '../util/UserContext'



// Function to check if Logged In, Determines Nav Option to use
function NavOptions() {
    const isAuthenticated = useIsAuthenticated()
    const [user, setUser] = useState()
	
    
    return (
        <>
            {!isAuthenticated() ? <LogOptions /> : <Dashboard />}
            <UserContextProvider>
                <Outlet />
            </UserContextProvider>
        </>
    )
}

export default NavOptions