import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom"
import ReactGA from 'react-ga4';
import App from './App'

const config = {
    initialColorMode: "dark"
}

const theme = extendTheme({ config })
ReactGA.initialize('G-2F72E4DLHG');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
