import { Box, Button, CloseButton, Flex, HStack, IconButton } from "@chakra-ui/react";
import { VStack, chakra, useDisclosure, Image } from "@chakra-ui/react";
import { AiOutlineMenu, AiFillFire, AiFillHeart, AiFillThunderbolt } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";


export const Navbar = () => {
    const mobileNav = useDisclosure();

    if (mobileNav.isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset'
    }

    const MobileNavContent = (
        <VStack
            pos="absolute"
            w="full"
            display={mobileNav.isOpen ? "flex" : "none"}
            flexDirection="column"
            pb={4}
            spacing={3}
            rounded="sm"
            shadow="sm"
            bg="blackAlpha.900"
            zIndex={10}
        >
            <CloseButton
                aria-label="Close menu"
                justifySelf="self-start"
                onClick={mobileNav.onClose}
            />
            <Link to="/page/recent/1">
                <Button w="full" variant="ghost" leftIcon={<AiFillThunderbolt />}>
                    Recent
                </Button>
            </Link>
            <Link to="/page/trending/1">
                <Button w="full" variant="ghost" leftIcon={<AiFillFire />}>
                    Trending
                </Button>
            </Link>
            <Link to="/page/popular/1">
                <Button w="full" variant="ghost" leftIcon={<AiFillHeart />}>
                    Popular
                </Button>
            </Link>
        </VStack>
    );
    return (
        <Box pos="relative">
            <chakra.header
                shadow="sm"
                transition="box-shadow 0.2s"
                borderTop="3px solid"
                borderTopColor="#EC625F"
                w="full"
                overflowY="hidden"
                bg="blackAlpha.600"
            >
                <chakra.div h="4.5rem" mx="auto" maxW="1200px">
                    <Flex w="full" h="full" px="6" alignItems="center" justifyContent="space-between">
                        <Flex align="flex-start" gap={4}>
                            <Link to="/">
                                <HStack bg="inherit">
                                    <Image src="/AniPlay.png" />
                                </HStack>
                            </Link>
                            <HStack
                                spacing={4}
                                display={{
                                    base: "none",
                                    md: "flex",
                                }}
                                justify="flex-start"
                            >
                                <Link to="/">
                                    <Button
                                        bg="blackAlpha.600"
                                        color="gray.500"
                                        display="inline-flex"
                                        alignItems="center"
                                        fontSize="md"
                                        _hover={{
                                            color: "#EC625F",
                                        }}
                                        _focus={{
                                            boxShadow: "none",
                                        }}
                                    >
                                        Home
                                    </Button>
                                </Link>
                                <Link to="/page/recent/1">
                                    <Button
                                        bg="blackAlpha.600"
                                        color="gray.500"
                                        display="inline-flex"
                                        alignItems="center"
                                        fontSize="md"
                                        _hover={{
                                            color: "#EC625F",
                                        }}
                                        _focus={{
                                            boxShadow: "none",
                                        }}
                                    >
                                        Recent
                                    </Button>
                                </Link>
                                <Link to="/page/trending/1">
                                    <Button
                                        bg="blackAlpha.600"
                                        color="gray.500"
                                        display="inline-flex"
                                        alignItems="center"
                                        fontSize="md"
                                        _hover={{
                                            color: "#EC625F",
                                        }}
                                        _focus={{
                                            boxShadow: "none",
                                        }}
                                    >
                                        Trending
                                    </Button>
                                </Link>
                                <Link to="/page/popular/1">
                                    <Button
                                        bg="blackAlpha.600"
                                        color="gray.500"
                                        display="inline-flex"
                                        alignItems="center"
                                        fontSize="md"
                                        _hover={{
                                            color: "#EC625F",
                                        }}
                                        _focus={{
                                            boxShadow: "none",
                                        }}
                                    >
                                        Popular
                                    </Button>
                                </Link>
                            </HStack>
                        </Flex>
                        <Flex
                            justify="flex-end"
                            maxW="824px"
                            align="center"
                            color="gray.400"
                            gap={2}
                        >
                            <Link to="/search">
                                <IconButton
                                    aria-label="Open search"
                                    fontSize="20px"
                                    color="gray.800"
                                    _dark={{ color: "inherit" }}
                                    variant="ghost"
                                    icon={<BsSearch />}
                                />
                            </Link>
                            <IconButton
                                display={{ base: "flex", md: "none" }}
                                aria-label="Open menu"
                                fontSize="18px"
                                color="gray.800"
                                _dark={{ color: "inherit" }}
                                variant="ghost"
                                icon={<AiOutlineMenu />}
                                onClick={mobileNav.onOpen}
                            />
                        </Flex>
                    </Flex>

                    {MobileNavContent}
                </chakra.div>
            </chakra.header>
        </Box>
    );
};
