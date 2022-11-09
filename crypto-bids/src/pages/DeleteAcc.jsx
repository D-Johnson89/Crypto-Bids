import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useAuthHeader, useSignOut } from 'react-auth-kit'
import { deleteAcc } from '../util/userFuncs'

function DeleteAcc() {
    // Set password state
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const authHeader = useAuthHeader()
    const signOut = useSignOut()
    const token = authHeader().split(' ')[1]

    // Submit form function
    function submitForm(e) {

        // Prevent default page refresh
        e.preventDefault()

        const promise = deleteAcc(token, password)
        promise.then((data) => {
            if (data.message == 'Account deleted') {
                alert(data.message)
                signOut()
                navigate('/')
            } else {
                alert(data.message)
            }
        })
    }
    return (
        <div className="mx-auto">
            <h1>Delete Account</h1>
            <Form onSubmit={(e) => {
                submitForm(e)
            }}>
                <Form.Group className="mb-3"
                controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        className="form-control mx-auto w-auto"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        required
                    />
                    <Form.Text className="text-muted">
                        Enter password to delete account.
                    </Form.Text>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Delete Account
                </Button>
            </Form>
        </div>
    )
}

export default DeleteAcc