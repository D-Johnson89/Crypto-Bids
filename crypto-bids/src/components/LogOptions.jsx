import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaHome, FaUserCircle, FaUserCheck, FaUserPlus } from 'react-icons/fa'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

/*
  Main Login nav options
*/
function LogOptions() {

    /*
      Set hook function
    */
    const navigate = useNavigate()


	return (
		<Navbar className="mb-5 border border-success rounded-pill" variant="secondary" bg="primary" expand="lg">
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
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default LogOptions
