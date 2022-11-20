import React from 'react'
import Stack from 'react-bootstrap/Stack'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useAuthUser } from 'react-auth-kit'

// Main AuthCard Component
function AuthCard() {
    const auth = useAuthUser()
    const user = auth().user
    const isUserEnvPractice = () => user.environment == 'practice' ? user.balances.test : user.balances.tether

    return (
        <Container fluid>
            <h1>Personal Information</h1>
            <Stack gap={3}>
                <div>
                    <Row>
                        <Col><h4>Username</h4></Col>
                        <Col><h5>{user.username}</h5></Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col><h4>Balance</h4></Col>
                        <Col><h5>{isUserEnvPractice()}</h5></Col>
                    </Row>
                </div>
            </Stack>
        </Container>
    )
}

export default AuthCard