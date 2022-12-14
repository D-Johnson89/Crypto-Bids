import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaHome, FaUserCircle, FaUserCheck, FaUserPlus, FaInfo } from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

function LogOptions() {
    const navigate = useNavigate()
	return (
		<Navbar variant="secondary" bg="primary" expand="lg">
			<Container fluid>
				<Navbar.Brand onClick={() =>{ navigate('/') }}><FaHome /></Navbar.Brand>
				<Navbar.Toggle aria-controls="log-options" />
				<Navbar.Collapse id="log-options">
					<Nav>
						<NavDropdown
							id="log-options-dropdown"
							title={<FaUserCircle/>}
							menuVariant="info"
						>
							<NavDropdown.Item onClick={() => { navigate('/users/login')}} >
								<FaUserCheck />Login
							</NavDropdown.Item>
							<NavDropdown.Item onClick={() => { navigate('/users/register')}} >
								<FaUserPlus />Register
							</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => { navigate('/aboutus')}} >
								<FaInfo />About Us
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default LogOptions
