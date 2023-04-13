import { useState, useEffect } from 'react'
import { Box, Input, InputGroup, InputRightAddon } from '@chakra-ui/react'
import { apiEndpoint } from "../utils/config";
import { Feed } from '../components/body/Feed';
import { BiSearch } from "react-icons/bi";
import axios from 'axios'


export const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        async function getSearchData() {
            if (searchTerm) {
                await axios.get(`${apiEndpoint}/search/${searchTerm}`)
                    .then(response => {
                        setResults(response.data.results);
                    })
            }
        }
        getSearchData()
    }, [searchTerm])

    return (
        <Box
            display="flex"
            p={{ base: 4, md: 8 }}
            justifyContent="center"
            flexDirection="column"
        >
            <InputGroup>
                <Input
                    variant="solid"
                    placeholder="Search anything ..."
                    autoFocus
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
            </InputGroup>
            <Box p={4} mt={3}>
                <Feed data={results} />
            </Box>
        </Box>
    )
}
