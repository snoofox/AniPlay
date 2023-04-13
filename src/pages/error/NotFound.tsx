import { Heading, Text, Button } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter, Flex } from '@chakra-ui/react'
import { Link } from "react-router-dom";

export const NotFound = () => {
    return (
        <Flex
            w="full"
            h="100vh"
            px={6}
            alignItems="center"
        >
            <Card align='center' flex={1}>
                <CardHeader>
                    <Heading size='2xl'>404 | Not found</Heading>
                </CardHeader>
                <CardBody>
                    <Text>Oops! This Anime Is Not Available... the sadness.😢 </Text>
                </CardBody>
                <CardFooter>
                    <Link to="/">
                        <Button bg='gray.500'>Take me home</Button>
                    </Link>
                </CardFooter>
            </Card>
        </Flex>
    )
}

