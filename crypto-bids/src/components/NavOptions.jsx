import React, { useState } from 'react'
import LogOptions from './LogOptions'
import Dashboard from './Dashboard'



// Function to check if Logged In, Determines Nav Option to use
function NavOptions(user) {
	function useAuth() {
        if (user != null) {
            return true
        }
        
        return false
    }
    
    return !useAuth || {user} == null ? <LogOptions /> : <Dashboard user={user} />
}

export default NavOptions