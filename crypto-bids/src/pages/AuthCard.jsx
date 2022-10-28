import React, { useState, useEffect } from 'react'
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavOptions from '../components/NavOptions'
//import { useAuthHeader } from 'react-auth-kit'

// Main AuthCard Component
function AuthCard({bool, user}) {
    const url = window.location.pathname
    /*const authHeader = useAuthHeader()
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const token = authHeader()*/

    // Function to fetch data
    /*const fillCard = async () => {
        setLoading(true)
        try {
            const response = await fetch('http://localhost:5000/api/authCard', {
                headers: {
                    Authentication: `${token}`
                }
            })
        } catch (err) {
            setError(err)
            console.log('Error: ', error)
        }
    }*/
    
    if (url =='/authCard') bool = true

    return (
        <Container fluid>
            {bool == true
            ? <>
            <h1>Personal Information</h1>
            </> : <></>}
            <Stack gap={3}>
                <div>
                    <Row>
                        <Col>Username</Col>
                        <Col></Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col>Balance</Col>
                        <Col></Col>
                    </Row>
                </div>
            </Stack>
        </Container>
    )
}

export default AuthCard