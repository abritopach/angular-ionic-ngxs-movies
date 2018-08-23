import { Movie } from '../../models/movie.model';

export class FetchMovies {
    static readonly type = '[Movies] Fetch movies';

    constructor(public payload: {start: number, end: number}) {}
}

export class SelectedMovie {
    static readonly type = '[Movies] Selected movie';

    constructor(public payload: { title: string}) {}
}

export class AddMovie {
    static readonly type = '[Movies] Add movie';

    constructor(public payload: Movie) {}
}

export class EditMovie {
    static readonly type = '[Movies] Edit movie';

    constructor(public payload: Movie) {}
}

export class DeleteMovie {
    static readonly type = '[Movies] Delete movie';

    constructor(public payload: Movie) {}
}

export class FilterMovies {
    static readonly type = '[Movies] Filter movies';

    constructor(public payload: {filters: {}}) {}
}

export class SaveFilterMovies {
    static readonly type = '[Movies] Save Filter movies';

    constructor(public payload: {filters: {}}) {}
}

export class SearchMovies {
    static readonly type = '[Movies] Search movies';

    constructor(public payload: { queryText: string}) {}
}

export class GetMovieTrailer {
    static readonly type = '[Movies] Get Movie Trailer';

    constructor(public payload: { movieTitle: string}) {}
}

export class ClearMovies {
    static readonly type = '[Movies] Clear movies';

    constructor() {}
}

export class LikeMovie {
    static readonly type = '[Movies] Like movie';

    constructor(public payload: Movie) {}
}

export class CommentMovie {
    static readonly type = '[Movies] Comment movie';

    constructor(public payload: Movie) {}
}

export class FavoriteMovie {
    static readonly type = '[Movies] Favorite movie';

    constructor(public payload: Movie) {}
}

export class DeleteFavoriteMovie {
    static readonly type = '[Movies] Delete Favorite movie';

    constructor(public payload: Movie) {}
}

export class DeleteAllFavoritesMovies {
    static readonly type = '[Movies] Delete All Favorites movies';

    constructor() {}
}
