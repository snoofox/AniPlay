import React, { useEffect, useState, useRef } from 'react';
import { HiOutlineSwitchHorizontal, HiDownload } from 'react-icons/hi';
import { BsSkipEnd } from 'react-icons/bs';
import { Box, IconButton, Text, Tooltip } from '@chakra-ui/react';
import Hls from 'hls.js';
import plyr from 'plyr';
import 'plyr/dist/plyr.css';
import { Link } from 'react-router-dom';


export const VideoPlayer = ({ sources, internalPlayer, setInternalPlayer, title }: any) => {
    const src = `https://aniplay-proxy.onrender.com/${sources.stream[0]}`;
    const [player, setPlayer] = useState<any>(null);
    const videoRef = useRef<any>();

    useEffect(() => {
        let flag = true;

        const defaultOptions = {
            captions: { active: true, update: true, language: 'en' },
            controls: [
                'play-large',
                'rewind',
                'play',
                'fast-forward',
                'progress',
                'current-time',
                'duration',
                'mute',
                'captions',
                'settings',
                'pip',
                'fullscreen',
            ],
        };

        function createPlayer(options = defaultOptions) {
            const newPlayer = new plyr(videoRef?.current, options);

            setPlayer(new plyr(videoRef?.current, options));

            if (newPlayer) {
                const skipButton = document.createElement('button');
                skipButton.classList.add('skip-button');
                skipButton.innerHTML = 'Skip Intro';
                skipButton.addEventListener('click', function () {
                    newPlayer.forward(85);
                    skipButton.hidden = true; //hides the skip button even if the anime is still loading after skipping the intro
                });

                let controls: any;
                newPlayer.on('ready', () => {
                    controls = document.querySelector('.plyr__controls');
                });

                newPlayer.on('enterfullscreen', (event) => {
                    if (controls) {
                        controls.appendChild(skipButton);
                    }
                    window.screen.orientation.lock('landscape');
                });

                newPlayer.on('exitfullscreen', (event: Event) => {
                    const skipBtn = document.querySelector('.skip-button')
                    if (skipBtn) {
                        skipBtn.remove();
                    }
                    window.screen.orientation.lock('portrait');
                });

                newPlayer.on('timeupdate', function (e) {
                    const time = newPlayer.currentTime,
                        lastTime = localStorage.getItem(title);

                    // hides skip button if the intro was already passed
                    if (time >= 85) {
                        const skipBtn: any = document.querySelector('.skip-button')

                        if (skipBtn)
                            return (skipBtn.hidden = true);

                        const skipbtn = document.getElementById('skipbtn')
                        if (skipbtn)
                            return (skipbtn.style.display = 'none');
                    }

                    // re-adds skip button
                    if (time < 85) {
                        const skipBtn: any = document.querySelector('.skip-button')
                        if (skipBtn)
                            return (skipBtn.hidden = false);

                        const skipbtn = document.getElementById('skipbtn')
                        if (skipbtn)
                            return (skipbtn.style.display = 'inline');
                    }

                    if (time > Number(lastTime)) {
                        localStorage.setItem(title, `${Math.round(newPlayer.currentTime)}`);
                    }
                    if (newPlayer.ended) {
                        localStorage.removeItem(title);
                    }
                });

                newPlayer.on('play', function (e) {
                    if (flag) {
                        const lastTime = localStorage.getItem(title);
                        if (lastTime !== null && lastTime > String(newPlayer.currentTime)) {
                            newPlayer.forward(parseInt(lastTime));
                        }
                        flag = false;
                    }
                });

                newPlayer.on('seeking', (event) => {
                    localStorage.setItem(title, String(Math.round(newPlayer.currentTime)));
                });
            }
        }

        let hls: any;
        if (Hls.isSupported()) {
            function updateQuality(newQuality: any) {
                if (newQuality === 0) {
                    window.hls.currentLevel = -1;
                    console.log('Auto quality selection');
                } else {
                    window.hls.levels.forEach((level: any, levelIndex: number) => {
                        if (level.height === newQuality) {
                            console.log('Found quality match with ' + newQuality);
                            window.hls.currentLevel = levelIndex;
                        }
                    });
                }
            }

            hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(videoRef?.current);

            hls.on(Hls.Events.MANIFEST_PARSED, function (event: Event, data: any) {
                const availableQualities = hls.levels.map((l: any) => l.height);
                availableQualities.unshift(0);
                const newDefaultOptions = {
                    ...defaultOptions,
                    quality: {
                        default: 0,
                        options: availableQualities,
                        forced: true,
                        onChange: (e: Event) => updateQuality(e),
                    },
                };

                hls.on(Hls.Events.LEVEL_SWITCHED, function (event: Event, data: any) {
                    const span = document.querySelector(
                        ".plyr__menu__container [data-plyr='quality'][value='0'] span"
                    );

                    if (span) {
                        span.innerHTML = hls.autoLevelEnabled
                            ? `Auto (${hls.levels[data.level].height}p)`
                            : 'Auto';
                    }
                });

                createPlayer(newDefaultOptions);
            });

            window.hls = hls;
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = src;
            createPlayer();
        } else {
            const newPlayer = new plyr(src, defaultOptions);
            newPlayer.source = {
                type: 'video',
                title: title,
                sources: [
                    {
                        src: src,
                        type: 'video/mp4',
                    },
                ],
            };
            setPlayer(newPlayer);
        }

        return () => {
            hls.stopLoad();
            hls.destroy();
        };
    }, [src, title]);

    // hides the skip button even if the anime is still loading after skipping the intro
    function hidebtn(e: any) {
        const btn = document.getElementById(e);
        if (btn) {
            btn.style.display = 'none';
        }
    }

    return (
        <Box
            marginBottom={4}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" bg="#313131" px={3} borderTopRadius="md">
                <Text fontSize="md">Internal Player</Text>
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
                    <Tooltip label='Skip Intro'>
                        <IconButton
                            aria-label='Skip Intro'
                            onClick={() => player.forward(85) && hidebtn('skipbtn')}
                            icon={<BsSkipEnd />}
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
            <video
                id="player"
                ref={videoRef}
                playsInline
                crossOrigin="anonymous"
            >
                <track kind="captions" src="" srcLang="en" label="English" default />
            </video>
        </Box>
    );
}
