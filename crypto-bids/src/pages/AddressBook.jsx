import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import NavOptions from '../components/NavOptions'
import { FaPlus } from 'react-icons/fa'
import { useAuthHeader } from 'react-auth-kit'

function AddressBook() {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const authHeader = useAuthHeader()
    const token = authHeader()

    const addresses = populateAddresses()

    async function populateAddresses() {
        try {
            const response = await fetch('http://localhost:5000/api/addressBook', {
            headers: {
                Authentication: `${token}`,
                credentials: 'include',
            },
        })
            const data = response.json()
            console.log(data)
        } catch {
            if (err) setError(err.message)
            console.log('Error: ', error)
        }
    }
        
    return (
        <Container fluid>
            <NavOptions />
            <h1>Withdrawal Addresses</h1>
            <Stack gap={3}>
                <div className="bg-secondary border">
                    <Button type="primary" onClick={() => navigate('/addAddress')}>
                        <FaPlus />Address
                    </Button>
                </div>
                
            </Stack>
        </Container>
    )
}

export default AddressBook