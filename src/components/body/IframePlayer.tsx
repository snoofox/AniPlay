import { useState } from 'react';
import { Box, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { HiOutlineSwitchHorizontal, HiDownload, HiChevronDown } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuList, MenuItem, Button, useMediaQuery } from '@chakra-ui/react'

export const IframePlayer = ({ sources, internalPlayer, setInternalPlayer, title }: any) => {
    const sourceUrls = sources?.stream.slice(2, sources.stream.length);
    const [currentServer, setCurrentServer] = useState(sourceUrls[0]);

    return (
        <Box
            marginBottom={4}
        >
            <Menu>
                <MenuButton as={Button} size='xs' rightIcon={<HiChevronDown />}>
                    Select server
                </MenuButton>
                <MenuList>
                    {sourceUrls?.map((source: string, index: number) => {
                        return (
                            <MenuItem
                                key={index}
                                onClick={() => setCurrentServer(source)}
                            >
                                {`Source ${index + 1}`}
                            </MenuItem>)
                    })}
                </MenuList>
            </Menu>
            <Box display="flex" justifyContent="space-between" alignItems="center" bg="#313131" px={3} borderTopRadius="md" mt={4}>
                <Text fontSize="md">External Player (Contains Ads)</Text>
                <Box display="flex">
                    <Tooltip label='Switch Server'>
                        <IconButton
                            aria-label='Switch Server'
                            onClick={() => setInternalPlayer(!internalPlayer)}
                            icon={<HiOutlineSwitchHorizontal />}
                            variant='unstyled'
                            fontSize="xl"
                            fontWeight="bold"
                        />
                    </Tooltip>
                    <Tooltip label='Download'>
                        <Link to={sources.download}>
                            <IconButton
                                aria-label='Download'
                                icon={<HiDownload />}
                                variant='unstyled'
                                fontSize="xl"
                                fontWeight="bold"
                            />
                        </Link>
                    </Tooltip>
                </Box>
            </Box>
            <iframe
                title={title}
                src={currentServer}
                allowFullScreen
                frameBorder={0}
                marginWidth={0}
                marginHeight={0}
                scrolling="no"
                height='400'
                width="100%"
            >
            </iframe>
        </Box>
    )
}
