import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaUserCircle, FaUserCheck, FaUserPlus } from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
//import Login from '../pages/Login'
//import Register from '../pages/Register'


function LogOptions() {
	return (
		<Navbar variant="primary" bg="info" expand="lg">
			<Container fluid>
				<Navbar.Brand href="/"><FaHome /></Navbar.Brand>
				<Navbar.Toggle aria-controls="log-options" />
				<Navbar.Collapse id="log-options">
					<Nav>
						<NavDropdown
							id="log-options-dropdown"
							title="Dropdown"
							menuVariant="info"
						>
							<NavDropdown.Item href="../pages/login"><FaUserCheck />Login</NavDropdown.Item>
							<NavDropdown.Item href="../pages/register"><FaUserPlus />Register</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default LogOptions
