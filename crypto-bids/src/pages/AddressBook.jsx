import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import NavOptions from '../components/NavOptions'
import { FaPlus } from 'react-icons/fa'
import { useAuthHeader } from 'react-auth-kit'

// Main AddressBook Function
function AddressBook() {
    const navigate = useNavigate()
    const authHeader = useAuthHeader()
    const [error, setError] = useState(null)
    const [addresses, setAddresses] = useState([])
    const [isLoading, setLoading] = useState(false)
    const token = authHeader()
    let testArr = []

    // Fetch data from server
    const fetchAddresses = async () => {
        setLoading(true)
        try {

            const response = await fetch('http://localhost:5000/api/addressBook', {
                headers: {
                    Authentication: `${token}`
                }
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                const array = data['addresses']
                setAddresses(array)
                console.log('Addresses: ', addresses)
                setLoading(false)
            })
            .finally(
                addresses.map
            )
        } catch (err) {
            setError(err)
            console.log(error)
        }
        console.log('test arr: ', testArr)
        
    }

    // Make Withdrawal Address Cards Arrays
    function makeCards(obj, index, list) {
        const name = obj.institute
        const address = obj.address
        const amount = obj.withdrawn
        list[index] = [name, address, amount]
        return (
            <div>
                <Card className='text-center'>
                    <Card.Header>{name}</Card.Header>
                    <Card.Body>
                        <Card.Title>{address}</Card.Title>
                    </Card.Body>
                    <Card.Footer className='text-muted'>{amount}</Card.Footer>
                </Card>
            </div>
        )
    }

    useEffect(() => {
        fetchAddresses()
    }, [])

    
    

    return (
        isLoading ? <div>Loading...</div> :
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