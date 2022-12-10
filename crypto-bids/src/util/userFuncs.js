/*
  Function to register user
*/
export function registerUser(username, email, password) {

    /*
      Send data to server and try to create user
    */
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

    /*
      If successful, send response to page for use
    */
    .then((response) => {
        return response.json()
    })

    /*
      Else return email or username already exist
    */
    .catch ((err) => {
    console.log('Error: ', err)
    return 'Email or username already exist'
    }) 
}


/*
  Function to login user
*/
export function loginUser(email, password) {

    /*
      Send data to server to try to login
    */
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

    /*
      If successful, send response to page for use
    */
    .then((response) => {
        if(response.status != 200 && response.status != 201) {
            throw new Error('Login Failed')
            
        }
        return response.json()
    })

    /*
      Else return email or password incorrect
    */
    .catch((err) => {
        console.log("Error: ", err)
        return 'Email or password incorrect!'
    })
}


/*
  Function to add addresses
*/
export function saveAddress(token, id, institute, address) {

    /*
      Send data to server to try to add address
    */
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

    /*
      If successful, send response to page for use
    */
    .then((response) => {
        return response.json()
    })

    /*
      Else return address not saved
    */
    .catch((err) => {
        console.log('Error: ', err)
        return 'Address not saved!'
    }) 
}


/*
  Function to delete addresses
*/
export function deleteAddress(token, item) {

    /*
      Check if user wants to delete address
    */
    const confirmBox = window.confirm(
        'Do you really want to delete this address?'
    )

    /*
      Variable function to do if user confirms delete
    */
    const doDelete = async () => {

        /*
          Send data to server to try to delete address
        */
        try {
            
            /*
              Variable promise to handle and return to page for use
            */
            const response = await fetch(`http://localhost:5000/api/users/addressBook`, {
                method: "DELETE",
                headers: {
                    Authentication: `${token}`,
                    AddressId: `${item}`,
                    "Content-Type" : "application/json",
                }
            })
            
            .then((response) => {
                //console.log('Response: ', response)
                return response.json()
            })

        /*
          Handle errors
        */
        } catch (err) {
            console.log(err)
        }
    }

    /*
      If user confirms delete, follow through
    */
    if (confirmBox) {
        doDelete()
    }
}


/*
  Function to change password
*/
export function changePW(token, oldPW, newPW) {

    /*
      Send data to server to try to change password
    */
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

    /*
      If successful, send response to page for use
    */
    .then((response) => {
        return response.json()
    })

    /*
      Else return password change unsuccessful
    */
    .catch((err) => {
        console.log('Error: ', err)
        return 'Password change unsuccessful'
    })
}


/*
  Function to delete user
*/
export function deleteAcc(token, password) {

    /*
      Send data to server to try to change password
    */
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

    /*
      If successful, send response to page for use
    */
    .then((response) => {
        return response.json()
    })

    /*
      Else return failed to delete account
    */
    .catch((err) => {
        console.log('Error: ', err)
        return 'Failed to delete account'
    })
}