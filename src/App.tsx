import { Box } from '@chakra-ui/react'
import { Navbar } from "./components/header/Navbar"
import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Footer } from "./components/footer/Footer";
import { AnimeInfo } from './pages/AnimeInfo';
import { PageFeed } from './pages/PageFeed';
import { Player } from './pages/Player';
import './styles/App.css'

function App() {
    return (
        <Box className="App">
            <Navbar />
            <Box as="section" display="flex" flexDirection="column" bg="blackAlpha.300" minH="100vh">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/anime/:slug" element={<AnimeInfo />} />
                    <Route path="/play/:slug" element={<Player />} />
                    <Route path="/page/:slug/:page" element={<PageFeed />} />
                </Routes>
            </Box>
            <Box h={14} w="full" bg="blackAlpha.300"></Box>
            <Footer />
        </Box>
    )
}

export default App
