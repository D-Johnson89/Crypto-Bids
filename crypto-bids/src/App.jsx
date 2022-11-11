import React from 'react'
import { Suspense } from 'react'
import { useRoutes } from 'react-router'
import { Home, Register, Login, AboutUs, AddressBook, AddAddress, AuthCard, ChangePW, DeleteAcc, ComingSoon, Invitation, Trade, Records } from './pages'
import NavOptions from './components/NavOptions'

const index = [{path: '/', element:<NavOptions />, children: [{index: true, element: <Home />}, {path: 'users/login', element: <Login />}, {path: 'users/register', element: <Register />}, {path: '/addressBook', element: <AddressBook />}, {path: 'addAddress', element: <AddAddress />}, {path: 'authCard', element: <AuthCard />}, {path: 'changePW', element: <ChangePW />}, {path: 'deleteAcc', element: <DeleteAcc />}, {path: 'aboutUs', element: <AboutUs />}, {path: 'comingSoon', element: <ComingSoon />}, {path: 'invitation', element: <Invitation />}, {path: 'trade', element: <Trade />}, {path: 'records', element: <Records />}]}]

function App() {
    
    let element = useRoutes(index)

    return (
        <Suspense fallback={<>Loading</>}>
            {element}
        </Suspense>
    )
}

export default App
