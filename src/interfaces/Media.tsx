export interface Media {
    id: number;
    title: {
        romaji: string;
        english: string;
        native: string;
        userPreferred: string;
    };
    coverImage: {
        extraLarge: string;
        large: string;
        medium: string;
        color: string;
    };
    description: string;
    startDate: {
        year: number;
        month: number;
        day: number;
    };
    endDate: {
        year: number;
        month: number;
        day: number;
    };
    format: string;
    season: string;
    seasonYear: number;
    episodes: number;
    duration: number;
    status: string;
    genres: string[];
    synonyms: string[];
    averageScore: number;
    meanScore: number;
    popularity: number;
    favourites: number;
}
