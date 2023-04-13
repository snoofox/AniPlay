import React, { useState, useEffect } from "react"
import { Feed } from "../components/body/Feed"
import { useParams, Link } from "react-router-dom"
import { apiEndpoint } from "../utils/config"
import { Box, Heading, Text, Flex, Spinner, Button } from "@chakra-ui/react"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import axios from "axios"

export const PageFeed = () => {
    const { slug, page } = useParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const currentPage = parseInt(page!)

    useEffect(() => {
        async function fetchAnime() {
            try {
                const response = await axios.get(`${apiEndpoint}/api/${slug}/${page}`)

                if (response.data.status === 200) {
                    console.log(response)
                    setData(response.data.data)
                    setLoading(false)
                }

            } catch (error) {
                console.log(`Error ${error}`)
            }
        }

        fetchAnime()
    }, [slug, page])

    if (loading) {
        return (
            <Flex justifyContent="center" alignItems="center" h="100vh">
                <Spinner size='xl' />
            </Flex>
        )
    }

    const titleCase = (str: string) => {
        return str.toLowerCase().split(' ').map((word: string) => {
            return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');
    }

    return (
        <Box p={{ base: 4, md: 8 }} display="flex" justifyContent="center" flexDirection="column">
            <Heading
                as="h3"
                fontSize={{ base: 'xl', md: '3xl' }}
                fontFamily="'Lexend', sans-serif"
                fontWeight="200"
                mt={4}
            >
                <Text as="span" fontWeight="bold">{titleCase(`${slug}`)} Anime</Text> Results
            </Heading>
            <Box mt={{ base: 4, md: 8 }}>
                <Feed data={data} />
            </Box>
            <Box mt={14} display="flex" justifyContent={{ base: 'space-around', md: 'center' }} gap={8}>
                {currentPage > 1 && (
                    <Link to={`/page/${slug}/${currentPage - 1}`}>
                        <Button
                            variant="outline"
                            borderRadius="0.5rem"
                            leftIcon={<AiOutlineLeft />}
                            size="lg"
                        >
                            Previous
                        </Button>
                    </Link>
                )}
                <Link to={`/page/${slug}/${currentPage + 1}`}>
                    <Button
                        size="lg"
                        variant="outline"
                        borderRadius="0.5rem"
                        rightIcon={<AiOutlineRight />}
                    >
                        Next
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}
