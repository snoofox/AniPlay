import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { apiEndpoint } from "../utils/config"
import { Link } from "react-router-dom"
import { Box, Image, Heading, Text, Spinner, Flex, Button, useMediaQuery, Grid, Switch } from "@chakra-ui/react"
import { NotFound } from "../pages/error/NotFound"
import axios from "axios"

export const AnimeInfo = () => {
    const [animeData, setAnimeData] = useState<any>(null)
    const [notAvailable, setNotAvailable] = useState(false)
    const [loading, setLoading] = useState(true)
    const slug = useParams().slug?.replace('-dub', '')
    const [isDub, setIsDub] = useState(false);
    const [isMobile] = useMediaQuery('(max-width: 600px)')
    const navigate = useNavigate()


    useEffect(() => {
        function fetchAnimeData() {
            axios.get(`${apiEndpoint}/anime/${slug}${isDub ? '-dub' : ''}`)
                .then((response) => {
                    if (response.data.status === 200) {
                        setAnimeData(response.data.data)
                        setLoading(false)
                    } else if (response.data.status === 404) {
                        setNotAvailable(true)
                    }
                })
                .catch((error: any) => {
                    setNotAvailable(true)
                })
        }
        fetchAnimeData()
    }, [slug, isDub])

    const handleSwitch = (e: any) => {
        setIsDub(!isDub);
    }

    if (notAvailable) {
        return <NotFound />
    }

    if (loading) {
        return (
            <Flex justifyContent="center" alignItems="center" h="100vh">
                <Spinner size='xl' />
            </Flex>
        )
    }

    return (
        <Box m={{ base: "1rem", md: "3rem" }} display="flex" justifyContent="center" flexDirection="column">
            <Image src={animeData.bannerImage ? animeData.bannerImage : 'https://cdn.wallpapersafari.com/41/44/6Q9Nwh.jpg'} alt={animeData.title?.native} h="2xs" w="full" objectFit="cover" />
            <Flex gap={3}>
                <Box display={{ base: 'none', md: 'block' }} pos="relative" top="-5rem" ml={12} minWidth="220px">
                    <Image
                        src={animeData.coverImage?.large}
                        alt={animeData.title?.native}
                        minH="300px"
                        maxH="400px"
                        filter="drop-shadow(rgba(0, 0, 0, 0.8) 0px 0px 10px)"
                        borderRadius={4}
                    />
                    <Flex flexDirection="column" gap={2} mt={6}>
                        <Button bg="#9B1C31" _hover={{ bg: '#C34A4A' }} onClick={() => navigate(`/play/${slug}-episode-1`)}>Watch Sub</Button>
                        {animeData.isDub && (
                            <Button onClick={() => navigate(`/play/${slug}-dub-episode-1`)}>Watch Dub</Button>
                        )}
                    </Flex>
                </Box>
                <Box display="flex" flexDirection="column" mt={6} m={4} gap={3}>
                    <Heading as="h2" fontSize="2xl">{animeData.title?.romaji}</Heading>
                    <Text color="gray.400">English - {animeData.title?.english}</Text>
                    <Text><b>Status:</b> {animeData.status}</Text>
                    <Text><b>Plot Summery:</b> {animeData.description}</Text>
                    <Text><b>Genre:</b> {animeData.genres?.join(", ")}</Text>
                    <Text><b>Released:</b> {animeData.seasonYear}</Text>
                    <Text><b>Episodes:</b> {animeData.episodes}</Text>
                </Box>
            </Flex>
            <Flex display={{ base: 'flex', md: 'none' }} flexDirection="column" gap={2} mt={6}>
                <Button bg="#9B1C31" _hover={{ bg: '#C34A4A' }} onClick={() => navigate(`/play/${slug}-episode-1`)}>Watch Sub</Button>
                {animeData.isDub && (
                    <Button onClick={() => navigate(`/play/${slug}-dub-episode-1`)}>Watch Dub</Button>
                )}
            </Flex>
            <Box
                borderWidth={1}
                borderRadius="sm"
                p={6}
                mt={6}
            >
                <Box display="flex" alignItems="center" gap={2} mb={5}>
                    <Text fontWeight="bold">Episodes</Text>
                    {animeData.isDub && (
                        <Box display="flex" alignItems="center" gap={1}>
                            <Switch colorScheme='red' onChange={handleSwitch} isChecked={isDub ? true : false} />
                            <Text fontWeight="bold">{isDub ? 'SUB' : 'DUB'}</Text>
                        </Box>
                    )}
                </Box>
                <Grid
                    gridTemplateColumns={`repeat(auto-fit, minmax(${isMobile ? '4rem' : '140px'}, 1fr))`}
                    gap="1rem 0.8rem"
                    justifyContent="space-between"
                >
                    {animeData.episode?.map((ep: any, index: number) => {
                        return (
                            <Link key={index} to={`/play${ep.episodeUrl.trim()}`}>
                                <Button p='0.6rem 0.8rem' w="full">{!isMobile ? `Episode ${ep.episode}` : ep.episode}</Button>
                            </Link>
                        )
                    })}
                </Grid>
            </Box>
        </Box >
    )
}
