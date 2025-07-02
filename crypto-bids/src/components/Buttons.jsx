import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


// Function to create app's basic ui nap buttons
function Buttons({ buttons }) {
    const navigate = useNavigate()
    

  return (
    <Container
        style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            gridTemplateRows: "auto auto",
            backgroundColor: "#0d6efd",
            border: "3px solid blue",
            borderRadius: "10px",
        }}
    >
        {buttons.map((button) => {
            return (
                <Button key={button.id} onClick={() => { navigate(button.destination)}}>
                    <h1>{button.icon}</h1>
                    <h4>{button.text}</h4>
                </Button>
            )
        })}
    </Container>
  )
}

export default Buttons