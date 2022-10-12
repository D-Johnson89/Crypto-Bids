import React from 'react'
import Stack from 'react-bootstrap/Stack'


function AboutUs() {
    return (
        <div>
            <h1>About Us</h1>
            <Stack gap={3}>
                <div className="bg-light border">
                    <h3>Our Goal</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque commodi cumque harum tempore blanditiis alias facilis ad, velit maiores eos fugit nam consequatur in, atque consequuntur. Earum tempora possimus incidunt?</p>
                </div>
                <div className="bg-light border">
                    <h3>Our Inspiration</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat repudiandae rem facilis cumque! Repudiandae consequuntur eius deleniti eum id distinctio ex ab non dolorem, enim delectus necessitatibus, fugit consequatur inventore.</p>
                </div>
                <div className="bg-light border">
                    <h3>Services Provided</h3>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque velit corrupti iste aspernatur, exercitationem dolore voluptates nihil impedit molestiae suscipit illo veniam sed quia ex accusantium consequatur. Corrupti, hic nam?</p>
                </div>
            </Stack>
        </div>
    )
}

export default AboutUs