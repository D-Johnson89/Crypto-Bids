import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { FaPlus } from 'react-icons/fa'
import { UserContext, deleteAddress } from '../util/userFuncs'
import { useAuthHeader } from 'react-auth-kit'

// Main AddressBook Component
function AddressBook() {
    const navigate = useNavigate()
    const authHeader = useAuthHeader()
    const token = authHeader().split(' ')[1]
    const user = useContext(UserContext)
    console.log(user)
    let wdAddresses = user.addresses
    console.log(wdAddresses)
    const [addresses, setAddresses] = useState(wdAddresses)
    

    

    return (
        <Container fluid>
            <h1>Withdrawal Addresses</h1>
            <Container>
            <Stack gap={3}>
                <div className="bg-secondary border">
                    <Button type="primary" onClick={() => {addresses.length == 5 ? alert('no more than 5 addresses') : navigate('/addAddress')}}>
                        <FaPlus />Address
                    </Button>
                </div>
                {addresses.length == 0 ?
                <h3>No Saved Addresses</h3> :
                    addresses.map((address) => (
                    <div key={address.id}>
                        <Card className='text-center'>
                    <Card.Header><h4>{address.institute}</h4></Card.Header>
                    <Card.Body>
                        <Card.Title>{address.address}</Card.Title>
                        <Card.Text className='text-muted'>{address.withdrawn}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            variant='primary'
                            onClick={() => {
                                deleteAddress(user, token, address.id)
                                setAddresses(
                                    addresses.filter(
                                        (address) => {
                                            address.id !== addresses.id
                                        }
                                    )
                                )
                            }}
                        >
                            Delete
                        </Button>
                    </Card.Footer>
                </Card>
                    </div>
                ))}
            </Stack>
            </Container>
        </Container>
    )
}

export default AddressBook