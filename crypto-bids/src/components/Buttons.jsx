import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


function Buttons({ buttons }) {
  return (
    <div>
        <Container>
            {buttons.map((button) => {
                <Row>
                    <Col>
                        <Button key={button.id}>
                            <div>{button.icon}</div>
                            <span>{button.text}</span>
                        </Button>
                    </Col>
                </Row>
            })}
        </Container>
    </div>
  )
}

export default Buttons