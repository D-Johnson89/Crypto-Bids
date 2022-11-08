import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useAuthHeader } from 'react-auth-kit'
import { changePW, UserContext } from '../util/userFuncs'

function ChangePW() {
    // Set old pw, new pw, and confirmation pw states
    const [oldPW, setOldPW] = useState('')
    const [newPW, setNewPW] = useState('')
    const [conf, setConf] = useState('')

    const navigate = useNavigate()
    const authHeader = useAuthHeader()
    const token = authHeader().split(' ')[1]

    // Submit form function
    function submitForm(e) {

        // Prevent default page refresh
        e.preventDefault()

        if (newPW === conf) {
            const promise = changePW(token, oldPW, newPW)
            promise.then((data) => {
                console.log(data)
                if (data.message == 'Password Changed') {
                    alert(data.message)
                    navigate('/')
                } else {
                    alert(data.message)
                }
            })
        } else {
            alert("New Password doesn't match confirmation!")
        }
    }


    return (
        <div className="mx-auto">
            <h1>Change Your Password</h1>
            <Form onSubmit={(e) => {
                submitForm(e)
            }}>
                <Form.Group className="mb-3"
                controlId="formGroupOldPW">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                        className="form-control mx-auto w-auto"
                        type="password"
                        value={oldPW}
                        onChange={(e) => setOldPW(e.target.value)}
                        placeholder="Enter Old Password"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3"
                controlId="formGroupNewPW">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        className="form-control mx-auto w-auto"
                        type="password"
                        value={newPW}
                        onChange={(e) => setNewPW(e.target.value)}
                        placeholder="Choose New Password"
                        required
                    />
                    <Form.Text className="text-muted">
						Password must contain 2 uppercase letters, 2 lowercase
						letter,<br></br> 2 numbers, and 2 special characters
					</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3"
                controlId="formGroupConfirmation">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        className="form-control mx-auto w-auto"
                        type="password"
                        value={conf}
                        onChange={(e) => setConf(e.target.value)}
                        placeholder="Re-enter New Password"
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="primary">
					Change Password
				</Button>
            </Form>
        </div>
    )
}

export default ChangePW