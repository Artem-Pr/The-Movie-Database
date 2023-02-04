interface MovieCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
}

export interface MovieGenre {
    id: number
    name: string
}

interface MovieProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

interface MovieProductionCountry {
    iso_3166_1: string,
    name: string
}

interface MovieSpokenLanguages {
    english_name: string
    iso_639_1: string
    name: string
}

export interface MovieDetailsRequest {
    id: number
    imdb_id: string
    adult: boolean
    backdrop_path: string
    belongs_to_collection: MovieCollection
    budget: number
    genres: MovieGenre[],
    homepage: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: MovieProductionCompany[]
    production_countries: MovieProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: MovieSpokenLanguages[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}
