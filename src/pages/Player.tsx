import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiEndpoint } from "../utils/config";
import axios from "axios";
import { HiDownload } from "react-icons/hi";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { Box, Flex, Spinner, Heading, Button, Text, Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { VideoPlayer } from "../components/body/VideoPlayer";
import { IframePlayer } from "../components/body/IframePlayer";

export const Player = () => {
    const { slug } = useParams()
    const [episodeLinks, setEpisodeLinks] = useState<any>(null);
    const [internalPlayer, setInternalPlayer] = useState(true);
    const [loading, setLoading] = useState<boolean>(true);
    const slugArray = slug?.split('-')!
    const currentEpisode = parseInt(slugArray[slugArray.length - 1]);

    useEffect(() => {
        async function fetchLinks() {
            try {
                const response = await axios.get(`${apiEndpoint}/stream/${slug}`)
                if (response.data.status === 200) {
                    setEpisodeLinks(response.data.data)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchLinks();

    }, [slug])

    if (loading) {
        return (
            <Flex justifyContent="center" alignItems="center" h="100vh">
                <Spinner size='xl' />
            </Flex >
        )
    }

    return (
        <Box m={{ base: "1rem", md: "3rem" }} display="flex" justifyContent="center" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
                <Heading
                    as="h2"
                    fontSize={{ base: 'xl', md: '3xl' }}
                    fontFamily="'Lexend', sans-serif"
                    fontWeight="bold"
                >
                    {episodeLinks?.title}
                </Heading>
                <Link to={episodeLinks?.download}>
                    <Button
                        display={{ base: 'none', md: 'block' }}
                        rightIcon={<HiDownload />}
                    >
                        Download
                    </Button>
                </Link>
            </Box>
            <Text mt={6} fontSize={{ base: 'xs', md: 'sm' }} color="gray.400">If video player is blank, Try refreshing the page or use an external server</Text>
            <Grid
                mt={3}
                templateColumns={{ base: 'auto', md: '70% calc(30% - 1rem)' }}
                gap="1rem"
                alignItems="flex-start"
            >
                {internalPlayer ? (
                    <VideoPlayer
                        sources={episodeLinks}
                        internalPlayer={internalPlayer}
                        setInternalPlayer={setInternalPlayer}
                        title={slug}
                    />
                ) : (
                    <IframePlayer
                        sources={episodeLinks}
                        internalPlayer={internalPlayer}
                        setInternalPlayer={setInternalPlayer}
                        title={slug}
                    />
                )}
                <Box display={{ base: 'flex', md: 'none' }} justifyContent="space-between">
                    {currentEpisode > 1 && (
                        <Link to={`/play/${slug?.replace(`episode-${currentEpisode}`, `episode-${currentEpisode - 1}`)}`}>
                            <Button leftIcon={<GrFormPreviousLink />} >Previous</Button>
                        </Link>
                    )}
                    {currentEpisode < episodeLinks.totalEpisodes && (
                        <Link to={`/play/${slug?.replace(`episode-${currentEpisode}`, `episode-${currentEpisode + 1}`)}`}>
                            <Button rightIcon={<GrFormNextLink />} >Next</Button>
                        </Link>
                    )}
                </Box>
                <Box
                    borderWidth={1}
                    borderRadius="sm"
                    p={4}
                    mt={{ base: 6, md: 0 }}
                >
                    <Text fontFamily="'Lexend', sans-serif">Episodes</Text>
                    <Grid
                        mt={3}
                        gridTemplateColumns="repeat(auto-fit, minmax(3rem, 1fr))"
                        gap="1rem 0.8rem"
                        justifyContent="space-between"
                    >
                        {episodeLinks.episodes?.map((ep: any, index: number) => {
                            return (
                                <Link key={index} to={`/play${ep.episodeUrl.trim()}`}>
                                    <Button p='0.6rem 0.8rem' w="full">{ep.episode}</Button>
                                </Link>
                            )
                        })}
                    </Grid>
                </Box>
            </Grid>
            <Box display={{ base: 'none', md: 'flex' }} justifyContent="space-between" maxW="70%" mt={3}>
                {currentEpisode > 1 && (
                    <Link to={`/play/${slug?.replace(`episode-${currentEpisode}`, `episode-${currentEpisode - 1}`)}`}>
                        <Button leftIcon={<GrFormPreviousLink />} >Previous</Button>
                    </Link>
                )}
                {currentEpisode < episodeLinks.totalEpisodes && (
                    <Link to={`/play/${slug?.replace(`episode-${currentEpisode}`, `episode-${currentEpisode + 1}`)}`}>
                        <Button rightIcon={<GrFormNextLink />} >Next</Button>
                    </Link>
                )}
            </Box>
        </Box>
    )
}
