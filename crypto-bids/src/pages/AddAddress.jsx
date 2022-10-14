import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import NavOptions from '../components/NavOptions'
import { useNavigate } from 'react-router-dom'
import { useAuthHeader } from 'react-auth-kit'

// Main AddAddress function
function AddAddress() {
    // Set states
    const [institute, setInstitute] = useState('')
    const [address, setAddress] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const authHeader = useAuthHeader()
    const token = authHeader()

    // onSubmit function for saving adresses
    async function saveAddress(e) {
        // Prevent default page refresh
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:5000/api/addAddress', {
                method: "POST",
                headers: {
                    Authentication: `${token}`,
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    institute,
                    address,
                }),
            })

            const data = response.json()
            console.log(data)


        } catch (err) {
            if (err) setError(err.message)
            console.log('Error: ', error)
        }
    }

    return (
        <Container fluid>
            <NavOptions />
            <div className='mx-auto'>
                <h1>Add Withdrawal Address</h1>
                <p>**You may only have 5 addresses saved at a time**</p>
                <Form onSubmit={saveAddress}>
                    <Form.Group className='mb-3'
                    controlId='formGroupInstitute'>
                        <Form.Label>Institute Name</Form.Label>
                        <Form.Control
                            className='form-control mx-auto w-auto'
                            type='string'
                            value={institute}
                            onChange={(e) => setInstitute(e.target.value)}
                            placeholder='Institute Name'
                            required
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'
                    controlId='formGroupAddress'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            className='form-control mx-auto w-auto'
                            type='string'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Address'
                            required
                        />
                    </Form.Group>
                    <Button type='submit'
                    variant='primary'>
                        Save Address
                    </Button>
                </Form>
            </div>
        </Container>
    )
}

export default AddAddress