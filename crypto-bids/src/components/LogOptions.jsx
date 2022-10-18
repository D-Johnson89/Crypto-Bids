import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaUserCircle, FaUserCheck, FaUserPlus, FaInfo } from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useAuthUser } from 'react-auth-kit'
//import Login from '../pages/Login'
//import Register from '../pages/Register'


function LogOptions() {
	return (
		<Navbar variant="secondary" bg="primary" expand="lg">
			<Container fluid>
				<Navbar.Brand href="/"><FaHome /></Navbar.Brand>
				<Navbar.Toggle aria-controls="log-options" />
				<Navbar.Collapse id="log-options">
					<Nav>
						<NavDropdown
							id="log-options-dropdown"
							title={<FaUserCircle/>}
							menuVariant="info"
						>
							<NavDropdown.Item>
								<Link to="/login">
								<FaUserCheck />Login
								</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link to="/register">
								<FaUserPlus />Register
								</Link>
							</NavDropdown.Item>
                            <NavDropdown.Item>
								<Link to="/aboutUs">
								<FaInfo />About Us
								</Link>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default LogOptions
