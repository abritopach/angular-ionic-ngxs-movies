import { Movie } from '../../models/movie.model';

export class FetchMovies {
    static readonly type = '[Movies] Fetch movies';

    constructor(public payload: {start: number, end: number}) {}
}
