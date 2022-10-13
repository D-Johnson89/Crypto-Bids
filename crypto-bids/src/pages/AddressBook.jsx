import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import NavOptions from '../components/NavOptions'
import { FaPlus } from 'react-icons/fa'
import { useAuthUser } from 'react-auth-kit'

function AddressBook() {
    const navigate = useNavigate()
    const auth = useAuthUser()
    const [error, setError] = useState(null)
    const email = auth().email
    console.log(auth().email)
    
    const addresses = populateAddresses()

    async function populateAddresses() {
        await fetch('http://localhost:5000/api/addressBook'/*, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }*/)
        //console.log(addresses)
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