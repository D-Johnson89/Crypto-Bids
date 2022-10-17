import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import NavOptions from '../components/NavOptions'
import { FaPlus } from 'react-icons/fa'
import { useAuthHeader } from 'react-auth-kit'

function AddressBook() {
    const navigate = useNavigate()
    const authHeader = useAuthHeader()
    const [error, setError] = useState(null)
    const [addresses, setAddresses] = useState(null)
    const token = authHeader()

    useEffect(() => {
        //function populateAddresses() {
            
                const response = fetch('http://localhost:5000/api/addressBook', {
                    headers: {
                        Authentication: `${token}`,
                        credentials: 'include',
                    },
                })
                .then(data => response.json())

                //const data = response.json()
                console.log(data)
                /*.then((data) => {
                    const wdAddresses = data.addresses
                    console.log(wdAddresses)
                })*/
             
        //}
    }, [addresses])

    //const response = populateAddresses()

    /*function makeCard(obj, index, list) {
        const name = obj.institute
        const address = obj.address
        const amount = obj.withdrawn
        list[index] = [name, address, amount]
        const content = 
        <li>
            <Card className='text-center'>
                <Card.Header>{name}</Card.Header>
                <Card.Body>
                    <Card.Title>{address}</Card.Title>
                </Card.Body>
                <Card.Footer className='text-muted'>{amount}</Card.Footer>
            </Card>
        </li>
    }*/

    /*async function populateAddresses() {
        try {
            const addresses = await fetch('http://localhost:5000/api/addressBook', {
                headers: {
                    Authentication: `${token}`,
                    credentials: 'include',
                },
            })

            const data = addresses.json()
            .then((data) => {
                const wdAddresses = data.addresses
                console.log(wdAddresses)
                if (wdAddresses.length < 1) {
                    //console.log(wdAddresses)
                    const component = () =>
                    <div>
                        <h3>No Saved Addresses</h3>
                    </div>
                } else {
                    const component = wdAddresses.forEach((obj, index, list) => 
                        <div>
                            <Card className='text-center'>
                                <Card.Header>{obj.institute}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{obj.address}</Card.Title>
                                </Card.Body>
                                <Card.Footer className='text-muted'>{obj.withdrawn}</Card.Footer>
                            </Card>
                        </div>*/

                        // second attempt to create inside async function
                    /*{
                        const name = obj.institute
                        const address = obj.address
                        const amount = obj.withdrawn
                        list[index] = [name, address, amount]
                    
                    })*/
                /*}
            })
        } catch {
            if (err) setError(err.message)
            console.log('Error: ', error)
        }
        const addresses = response.json()
        console.log(addresses)
    }*/
        
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
                <div>
                    {addresses}
                </div>
            </Stack>
        </Container>
    )
}

export default AddressBook