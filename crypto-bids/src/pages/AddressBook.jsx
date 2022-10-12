import React from 'react'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import NavOptions from '../components/NavOptions'

function AddressBook() {
    return (
        <Container fluid>
            <NavOptions />
            <h1>Withdrawal Addresses</h1>
            <Stack gap={3}>
                <div className="bg-secondary border">
                    
                </div>
            </Stack>
        </Container>
    )
}

export default AddressBook