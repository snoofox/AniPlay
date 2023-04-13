import { SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { AnimeCard } from "./AnimeCard";
import { Media } from "../../interfaces/Media";
import { Gogo } from "../../interfaces/Gogo";

interface FeedProps {
    data: (Media | Gogo)[];
}

export const Feed = ({ data }: FeedProps) => {
    const size = useBreakpointValue({ base: "120px", sm: "140px", lg: "160px", xl: "calc(170px + 2vw)" })

    return (
        <SimpleGrid minChildWidth={size} spacing={8} justifyContent="center">
            {data.map((anime, index: number) => {
                let data;

                if ('coverImage' in anime) {
                    data = {
                        title: anime.title.english,
                        image: anime.coverImage.large,
                        type: anime.format,
                        status: anime.status,
                        genre: anime.genres[0],
                        episode: anime.episodes,
                        slug: anime.title.romaji
                            .replace(/\s+/g, '-')
                            .replace(/[^a-zA-Z0-9-]/g, '')
                            .toLowerCase()

                    }
                } else {
                    data = {
                        title: anime.title,
                        image: anime.image,
                        episode: anime.episode,
                        slug: anime.title
                            .replace(/\s+/g, '-')
                            .replace(/[^a-zA-Z0-9-]/g, '')
                            .toLowerCase()
                    }
                }
                return (
                    <AnimeCard key={index} {...data} />
                )
            })}
        </SimpleGrid>
    )
}
