export interface MovieRequest {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: number
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface MoviesListRequest {
    page: number
    results: MovieRequest[]
    total_pages: number
    total_results: number
}
