import React, { useState, useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { useAuthHeader } from 'react-auth-kit'
import { saveAddress } from '../util/userFuncs'
import { UserContext } from '../util/UserContext'

// Main AddAddress function
function AddAddress() {
    // Set states
    const [institute, setInstitute] = useState('')
    const [address, setAddress] = useState('')
    const [user, setUser] = useState(useContext(UserContext))
    const addresses = user.addresses

    const navigate = useNavigate()
    const authHeader = useAuthHeader()
    const token = authHeader().split(' ')[1]
    let id
    if (addresses.length) {
        id = addresses.length
        for (let i = 0; i < addresses.length; i++) {
            console.log(addresses[i])
            if (addresses[i].id !== i) {
                id = i
                break
            } else {
                continue
            }
        }
    } else {
        id = 0
    }
    console.log(id)

    // onSubmit function for saving adresses
    function submitForm(e) {
        // Prevent Default page refresh
        e.preventDefault()

        const promise = saveAddress(token, id, institute, address)
        
        promise.then((data) => {
            if (data.message == 'Address Saved') {
                const wdAddress = data.wdAddress
                const member = JSON.parse(JSON.stringify(user))
                member.addresses.push(wdAddress)
                console.log('User: ', user)
                console.log('Member: ', member)
                setUser(member)
                navigate('/addressBook')
            } else {
                alert('Address not saved!')
            }
        })
    }

    return (
        <Container fluid>
            <div className='mx-auto'>
                <h1>Add Withdrawal Address</h1>
                <p>**You may only have 5 addresses saved at a time**</p>
                <Form onSubmit={(e) => {
                    submitForm(e)
                }}>
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