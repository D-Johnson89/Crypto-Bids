import React from 'react'
import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Dropdown from 'react-bootstrap/Dropdown'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FaBars } from 'react-icons/fa'
import { createCandles } from '../util/basicFuncs'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu'


/*
  Main Trade page function
*/
function Trade() {
    console.log('trade page')
    /*
      Set state variables
    */
    const [bidPair, setBidPair] = useState('BTC/USDT')

    /*
      Set up useEffect for candle stick images
    */
   useEffect(() => {
      const candles = createCandles()

   }, /*[bidPair, cycle]*/)
    
  return (
    <Container fluid>
        <Container
            fluid
            align="start"
        >
            <Row>
                <Col md="auto">
                    <Dropdown>
                        <Dropdown.Toggle
                            variant="secondary"
                            id="crypto-selection"
                        >
                            <FaBars />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#">BTC</Dropdown.Item>
                            <Dropdown.Item href="#">ETH</Dropdown.Item>
                            <Dropdown.Item href="#">LTC</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col><h2>BTC/USDT</h2></Col>
            </Row>
        </Container>
        <Image fluid>
            <img src="" alt="Candle stick charts" />
        </Image>
    </Container>
  )
}

export default Trade
