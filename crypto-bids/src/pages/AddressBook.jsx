import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import NavOptions from '../components/NavOptions'
import { FaPlus } from 'react-icons/fa'
import { useAuthHeader } from 'react-auth-kit'

// Main AddressBook Component
function AddressBook() {
    const navigate = useNavigate()
    const authHeader = useAuthHeader()
    const [error, setError] = useState(null)
    const [addresses, setAddresses] = useState([])
    const [isLoading, setLoading] = useState(false)
    const token = authHeader()

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
                array.length < 1 ? setAddresses(['No Saved Addresses']) : setAddresses(array)
                setLoading(false)
            })
            
        } catch (err) {
            setError(err)
            console.log('Error: ', error)
        }
        
    }

    useEffect(() => {
        fetchAddresses()
    }, [])

    function deleteAddress(item) {
        const confirmBox = window.confirm(
            'Do you really want to delete this address?'
        )

        const doDelete = async () => {
            try {
                //console.log(confirmBox, item)
                const response = await fetch(`http://localhost:5000/api/addressBook/`, {
                    method: "DELETE",
                    headers: {
                        Authentication: `${token}`,
                        AddressId: `${item}`,
                    }
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    data.message ? fetchAddresses() : alert(data.message)
                })
            } catch (err) {
                setError(err)
                console.log(error)
            }
        }

        if (confirmBox) {
            doDelete()
        }
    }

    const NoAddress = () => {
        return (<div>
            <h3>No Saved Addresses</h3>
        </div>)
    }

    return (
        isLoading ? <div>Loading...</div> :
        <Container fluid>
            <NavOptions />
            <h1>Withdrawal Addresses</h1>
            <Container>
            <Stack gap={3}>
                <div className="bg-secondary border">
                    <Button type="primary" onClick={() => {addresses.length == 5 ? alert('no more than 5 addresses') : navigate('/addAddress')}}>
                        <FaPlus />Address
                    </Button>
                </div>
                {addresses == 'No Saved Addresses' ?
                <NoAddress /> :
                    addresses.map((address) => (
                    <div key={address._id}>
                        <Card className='text-center'>
                    <Card.Header><h4>{address.institute}</h4></Card.Header>
                    <Card.Body>
                        <Card.Title>{address.address}</Card.Title>
                        <Card.Text className='text-muted'>{address.withdrawn}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            variant='primary'
                            onClick={() => deleteAddress(address._id)}
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