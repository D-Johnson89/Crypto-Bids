//import { resolvePath } from 'react-router-dom'


// Function to register user
export function registerUser(username, email, password) {

        return fetch('http://localhost:5000/api/users/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        })
        .then((response) => {
            return response.json()
        })
       .catch ((err) => {
        console.log('Error: ', err)
        return 'Email or username already exist'
       }) 
}


// Function to login user
export function loginUser(email, password) {

    // Send data to server to try to login
    return fetch('http://localhost:5000/api/users/login', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    })
    .then((response) => {
        if(response.status != 200 && response.status != 201) {
            throw new Error('Login Failed')
            
        }
        return response.json()
    })
    .catch((err) => {
        console.log("Error: ", err)
        return 'Email or password incorrect!'
    })
}


// Function to add addresses
export function saveAddress(token, id, institute, address) {

    return fetch('http://localhost:5000/api/users/addAddress', {
        method: "POST",
        headers: {
            Authentication: `${token}`,
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            id,
            institute,
            address,
        }),
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => {
        console.log('Error: ', err)
        return 'Address not saved!'
    }) 
}


// Function to delete addresses
export function deleteAddress(user, token, item) {
    const confirmBox = window.confirm(
        'Do you really want to delete this address?'
    )

    const doDelete = async () => {
        try {
            //console.log(confirmBox, item)
            const response = await fetch(`http://localhost:5000/api/users/addressBook`, {
                method: "DELETE",
                headers: {
                    Authentication: `${token}`,
                    AddressId: `${item}`,
                }
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if(data.message == 'Address deleted') {
                    //May have to look at deleting addresses another way
                    user.addresses.splice(item, 1)
                    alert(data.message)
                } else {
                    alert(data.message)
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    if (confirmBox) {
        doDelete()
    }
}


// Function to change password
export function changePW(token, oldPW, newPW) {
    return fetch('http://localhost:5000/api/users/changePW', {
        method: "PUT",
        headers: {
            Authentication: `${token}`,
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            oldPW,
            newPW,
        }),
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => {
        console.log('Error: ', err)
        return 'Password change unsuccessful'
    })
}


// Function to delete user
export function deleteAcc(token, password) {
    return fetch('http://localhost:5000/api/users/deleteAcc', {
        method: "DELETE",
        headers: {
            Authentication: `${token}`,
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            password,
        }),
    })
    .then((response) => {
        return response.json()
    })
    .catch((err) => {
        console.log('Error: ', err)
        return 'Failed to delete account'
    })
}