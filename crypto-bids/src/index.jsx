import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from 'react-auth-kit'
import Routes from "./App"


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
        <AuthProvider
            authType={'cookie'}
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={false/*window.location.protocol === "https:"*/} >
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </AuthProvider>
	</React.StrictMode>
);
