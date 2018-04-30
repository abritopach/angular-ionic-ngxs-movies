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
