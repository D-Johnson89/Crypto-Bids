import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import Routes from "./App"

/*const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)

root.render(<BrowserRouter>
  <App />
</BrowserRouter>)*/

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes/>
		</BrowserRouter>
	</React.StrictMode>
);
