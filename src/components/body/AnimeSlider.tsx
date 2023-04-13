import React, { useState, useEffect } from "react";
import { Box, Flex, HStack, Image, Badge, Text, Heading, useMediaQuery, Button, ButtonGroup } from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { apiEndpoint } from "../../utils/config";
import { AiFillPlayCircle, AiFillCalendar } from "react-icons/ai";

export const AnimeSlider = () => {
    const [slides, setSlides] = useState([])
    const [isMobile] = useMediaQuery("(max-width: 600px)")

    useEffect(() => {
        async function fetchSlides() {
            const response = await axios.get(`${apiEndpoint}/api/trending/1`)
            if (response.status === 200) {
                setSlides(
                    response.data.data.filter((anime: any) => {
                        return anime.bannerImage !== null
                    })
                )
            }
        }

        fetchSlides()
    }, [])


    const arrowStyles = {
        cursor: "pointer",
        pos: "absolute",
        top: "50%",
        w: "auto",
        mt: "-22px",
        p: "16px",
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        transition: "0.6s ease",
        borderRadius: "0 3px 3px 0",
        userSelect: "none",
        _hover: {
            opacity: 0.8,
            bg: "black",
        },
    } as const;

    const [currentSlide, setCurrentSlide] = useState(0);

    const slidesCount = slides.length;

    const prevSlide = () => {
        setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };
    const nextSlide = () => {
        setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };
    const setSlide = (slide: number) => {
        setCurrentSlide(slide);
    };
    const carouselStyle = {
        transition: "all .5s",
        ml: `-${currentSlide * 100}%`,
    };

    return (
        <Flex w="full" pos="relative" overflow="hidden">
            <Flex h={isMobile ? '250px' : '400px'} w="full" {...carouselStyle}>
                {slides.map((slide: any, sid: number) => (
                    <Box
                        key={`slide-${sid}`}
                        boxSize="full"
                        flex="none"
                        position="relative"
                        _before={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundImage: 'linear-gradient(to left, rgba(20, 21, 26, 0), rgba(20, 21, 26, 1))',
                            mixBlendMode: 'multiply',
                            zIndex: 1

                        }}
                    >
                        <Box
                            position="absolute"
                            zIndex={2}
                            maxW="50%"
                            display="flex"
                            ml={{ base: '5%' }}
                            flexDirection="column"
                            gap={isMobile ? '2' : '4'}
                            bottom={isMobile ? '4' : '10'}
                        >
                            <Text fontSize='sm'>#{sid + 1} Spotlight</Text>
                            <Heading fontSize={isMobile ? 'lg' : '3xl'} color="white" noOfLines={1} maxW="70%">{slide.title.english}</Heading>
                            {!isMobile && (
                                <Box>
                                    <HStack gap={3}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <AiFillPlayCircle />
                                            <Text fontSize='sm'>{slide.type}</Text>
                                        </Box>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <AiFillCalendar />
                                            <Text fontSize='sm'>{slide.status}</Text>
                                        </Box>
                                        <Badge bg='#c24e4c' fontSize='xs'>{slide.genres[0]}</Badge>
                                    </HStack>
                                    <Text noOfLines={3} fontSize='sm' mt="2" color="white">{slide.description}</Text>
                                </Box>
                            )}
                            <ButtonGroup>
                                <Link
                                    to={`play/${slide.title.romaji
                                        .replace(/\s+/g, '-')
                                        .replace(/[^a-zA-Z0-9-]/g, '')
                                        .toLowerCase()}-episode-1`
                                    }>
                                    <Button size='sm' bg='#B93431'>Watch Now</Button>
                                </Link>
                                <Link
                                    to={`anime/${slide.title.romaji
                                        .replace(/\s+/g, '-')
                                        .replace(/[^a-zA-Z0-9-]/g, '')
                                        .toLowerCase()}`
                                    }>
                                    <Button size='sm'>Details</Button>
                                </Link>
                            </ButtonGroup>
                        </Box>
                        <Image
                            src={slide.bannerImage}
                            alt="carousel image"
                            boxSize="full"
                            backgroundSize="cover"
                            objectFit="cover"
                        />
                    </Box>
                ))}
            </Flex>
            <Text {...arrowStyles} left="0" onClick={prevSlide} zIndex={2}>
                &#10094;
            </Text>
            <Text {...arrowStyles} right="0" onClick={nextSlide} zIndex={2}>
                &#10095;
            </Text>
        </Flex>
    );
};
