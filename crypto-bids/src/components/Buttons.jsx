import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


// Function to create app's basic ui nap buttons
function Buttons({ buttons }) {
    

  return (
    <Container
        style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto",
            gridTemplateRows: "auto auto",
        }}
    >
        {buttons.map((button) => {
            return (
                <Button key={button.id}>
                    <div>{button.icon}</div>
                    <span>{button.text}</span>
                </Button>
            )
        })}
    </Container>
  )
}

export default Buttons