import { Box, Image, Text, useBreakpointValue } from "@chakra-ui/react"
import { Tag, TagLabel } from '@chakra-ui/react'
import { Link } from "react-router-dom";

export const AnimeCard = (props: any) => {
    const height = useBreakpointValue({ base: "220px", sm: "245px" })

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            width='full'
            _hover={{
                opacity: 0.6
            }}
            transition="opacity .4s ease"
        >
            <Link to={`/anime/${props.slug}`}>
                <Image src={props.image} alt={props.title} w="100%" h={height} objectFit="cover" />
                <Box display="flex" justifyContent="space-between" pos="relative" top="-30px">
                    {props.genre && (
                        <Tag fontSize={{ base: '2xs', md: 'xs' }} mx={2} bg="#222831" fontWeight="600">
                            <TagLabel>{props.genre}</TagLabel>
                        </Tag>
                    )}
                    {props.episode && (
                        <Tag fontSize={{ base: '2xs', md: 'xs' }} mx={2} bg="#222831" fontWeight="600">
                            <TagLabel>{`Ep ${props.episode}`}</TagLabel>
                        </Tag>
                    )}
                </Box>
                <Box p="6" pt={0}>
                    <Text fontWeight="bold" fontSize="md" mb="2" noOfLines={2}>
                        {props.title}
                    </Text>
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                        <Text fontSize='xs'>{props.type}</Text>
                        {props.status && (
                            <Text
                                as="span"
                                w="4px"
                                h="4px"
                                borderRadius="50%"
                                background="rgba(255,255,255,.4)"
                                display="inline-block"
                                margin="3px 6px"
                            >
                            </Text>
                        )}
                        <Text fontSize='xs'>{props.status}</Text>
                    </Box>
                </Box>
            </Link>
        </Box>
    );
};

