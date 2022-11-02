import React, { useContext } from 'react'
import LogOptions from './LogOptions'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit'
import { UserContext } from '../util/userFuncs'



// Function to check if Logged In, Determines Nav Option to use
function NavOptions() {
    const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser()
    const user = useContext(UserContext)
	
    
    return (
        <>
            {!isAuthenticated() ? <LogOptions /> : <Dashboard />}
            <UserContext.Provider value={user} >
                <Outlet/>
            </UserContext.Provider>
        </>
    )
}

export default NavOptions