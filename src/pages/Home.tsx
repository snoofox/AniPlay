import { useState, useEffect } from "react";
import { AnimeSlider } from "../components/body/AnimeSlider";
import { Box, Button, Heading, Text, Flex, Spinner } from "@chakra-ui/react";
import { Feed } from "../components/body/Feed";
import { apiEndpoint } from "../utils/config";
import { Media } from "../interfaces/Media";
import { Gogo } from "../interfaces/Gogo";
import { Tabs, TabList, Tab } from '@chakra-ui/react'
import axios from "axios";
import { Link } from "react-router-dom";

export const Home = () => {
    const [popular, setPopular] = useState<Media[] | Gogo[]>([]);
    const [recent, setRecent] = useState<Media[] | Gogo[]>([]);
    const [type, setType] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPopular() {
            const response = await axios.get(`${apiEndpoint}/api/popular/1`)
            if (response.status === 200) {
                setPopular(response.data.data)
            }
        }

        fetchPopular()
    }, [])

    useEffect(() => {
        async function fetchAnimes() {
            const response = await axios.get(`${apiEndpoint}/api/recent/1?type=${type}`)
            if (response.status === 200) {
                setRecent(response.data.data)
                setLoading(false)
            }
        }

        fetchAnimes()
    }, [type])

    const handleTabsChange = (index: number) => {
        setType(index + 1)
    }

    if (loading) {
        return (
            <Flex justifyContent="center" alignItems="center" h="100vh">
                <Spinner size='xl' />
            </Flex>
        )
    }

    return (
        <Box as="section">
            <AnimeSlider />
            <Box as="section" className="popularSection">
                <Box display='flex' p={6} mt={2} justifyContent='space-between' alignItems='center'>
                    <Heading as="h2" fontSize='2xl' fontWeight="200" fontFamily="'Lexend', sans-serif">
                        <Text as="span" fontWeight="bold">Most</Text> Popular
                    </Heading>
                    <Link to="/page/popular/1">
                        <Button size='xs' variant='outline'>View All</Button>
                    </Link>
                </Box>
                <Box p={6} pt={3}>
                    <Feed data={popular} />
                </Box>
            </Box>
            <Box className="recentSection">
                <Box display='flex' p={6} mt={2} justifyContent='space-between' alignItems='center'>
                    <Heading as="h2" fontSize='2xl' fontWeight="200" fontFamily="'Lexend', sans-serif">
                        <Text as="span" fontWeight="bold">Recent</Text> Release
                    </Heading>
                    <Link to="/page/recent/1">
                        <Button size='xs' variant='outline'>View All</Button>
                    </Link>
                </Box>
            </Box>
            <Box px={6} pt={3} pb={0}>
                <Tabs onChange={handleTabsChange}>
                    <TabList>
                        <Tab>SUB</Tab>
                        <Tab>DUB</Tab>
                    </TabList>
                </Tabs>
                <Box mt={4}>
                    <Feed data={recent} />
                </Box>
            </Box>
        </Box>
    )
}
