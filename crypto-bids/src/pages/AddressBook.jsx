import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { FaPlus } from 'react-icons/fa'
import { deleteAddress } from '../util/userFuncs'
import { useAuthHeader, useAuthUser, useSignIn } from 'react-auth-kit'

/*
  Main AddressBook Component
*/
function AddressBook() {

    /*
      Set hook functions
    */
    const navigate = useNavigate()
    const signIn = useSignIn()
    const authHeader = useAuthHeader()
    const auth = useAuthUser()

    /*
      Set variables
    */
    const token = authHeader().split(' ')[1]
    const user = auth().user
    let wdAddresses = user.addresses

    /*
      Set addresses state
    */
    const [addresses, setAddresses] = useState(wdAddresses)
    
    /*
      onClick function handler
    */
    async function handleClick(token, address) {

        /*
          Call deleteAddress as promise to manipluate data
        */
        try {
            const promise = deleteAddress(token, address)
            promise.then((data) => {
                
                /*
                  Check data for address deleted, alert as such, update if needed
                */
                if(data === 'Address not deleted!') {
                    alert(data)

                } else if(data.message === 'Address deleted') {
                    
                    alert(data.message)

                    setAddresses(data.user.addresses)

                    signIn({
                        token: data.token,
                        expiresIn: 120,
                        tokenType: 'Bearer',
                        authState: { user: data.user },
                    })
                    
                } else {
                    alert(data.message)

                }
            })

        /*
          Handle errors
        */
        } catch (err) {
            console.log(err)
            alert('Address not deleted!')
            
        }
    }

    return (
        <Container fluid>
            <h1>Withdrawal Addresses</h1>
            <Container>
            <Stack gap={3}>
                <div className="bg-secondary border">
                    <Button type="primary" onClick={() => {addresses.length >= 5 ? alert('no more than 5 addresses') : navigate('/addAddress')}}>
                        <FaPlus />Address
                    </Button>
                </div>
                {addresses.length === 0 ?
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
                                        handleClick(token, address.id)
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