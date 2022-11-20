import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle, FaPiggyBank, FaUserLock, FaSignOutAlt, FaTrashAlt, FaHome } from 'react-icons/fa'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useSignOut, useAuthUser } from 'react-auth-kit'


// Main User Nav Options
function Dashboard() {
    const signOut = useSignOut()
    const navigate = useNavigate()
    const auth = useAuthUser()
    const user = auth().user


    function logout() {
        signOut()
        navigate('/')
    }

    const isUserEnvPractice = () => user.environment == 'practice' ? user.balances.test : user.balances.tether

    const Card = () => {
        return (
            <Container>
                <Stack gap={1}>
                    <div>
                        <Row>
                            <Col xs={6}>Username</Col>
                            <Col xs={6}>{user.username}</Col>
                        </Row>
                    </div>
                    <div>
                        <Row>
                            <Col xs={6}>Balance</Col>
                            <Col xs={6}>{isUserEnvPractice()}</Col>
                        </Row>
                    </div>
                </Stack>
            </Container>
        )
    }
    
    return (
        <Navbar className="mb-5 border border-success rounded-pill" variant="secondary" bg="primary" expand="lg">
            <Container fluid>
                <Navbar.Brand onClick={() => {navigate('/')}}><FaHome /></Navbar.Brand>
                <Navbar.Toggle aria-controls="dashboard" />
                <Navbar.Collapse id="dashboard">
                    <Nav>
                        <NavDropdown
                            id="log-options-dropdown"
                            title={<FaUserCircle />}
                            menuVariant="info"
                        >
                            <NavDropdown.Item onClick={() => { navigate('/authCard')}} >
                                <Card />
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate('/addressBook')}} >
                                <FaPiggyBank />Withdrawal Address
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate('/changePW')}} >
                                <FaUserLock />Change Password
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate('/deleteAcc')}} >
                                <FaTrashAlt />Delete Account
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Button variant="primary" onClick={() => logout()}>
                                    <FaSignOutAlt />Logout
                                </Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Dashboard