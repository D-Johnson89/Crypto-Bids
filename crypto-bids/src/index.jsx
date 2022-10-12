import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from 'react-auth-kit'

/*const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<BrowserRouter>
  <App />
</BrowserRouter>)*/

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={false} > {/*window.location.protocol === "https:"*/}
			<BrowserRouter>
				<App />
			</BrowserRouter>
    	</AuthProvider>
		
	</React.StrictMode>
);
