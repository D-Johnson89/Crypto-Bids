import React, { useState } from 'react'
import LogOptions from './LogOptions'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'
import { useIsAuthenticated } from 'react-auth-kit'
import { UserContext } from '../util/userFuncs'



// Function to check if Logged In, Determines Nav Option to use
function NavOptions() {
    const isAuthenticated = useIsAuthenticated()
    const [user, setUser] = useState(null)
	
    
    return (
        <>
            {!isAuthenticated() ? <LogOptions /> : <Dashboard />}
            <UserContext.Provider value={{user, setUser}} >
                <Outlet />
            </UserContext.Provider>
        </>
    )
}

export default NavOptions