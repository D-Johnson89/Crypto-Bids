import React from 'react'
import LogOptions from './LogOptions'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'
import { useIsAuthenticated} from 'react-auth-kit'


/*
  Conditional nav option, renders logoptions or user dashboard, set as index and renders children in <Outlet />
*/
function NavOptions() {

    /*
      Set hook function
    */
    const isAuthenticated = useIsAuthenticated()
	
    
    return (
        <>
            {!isAuthenticated() ? <LogOptions /> : <Dashboard />}
            <Outlet />
        </>
    )
}

export default NavOptions