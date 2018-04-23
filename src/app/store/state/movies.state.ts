import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Movie } from '../../models/movie.model';
import { FetchMovies, SelectedMovie } from './../actions/movies.actions';

import { MoviesService } from '../../providers/movies-service';

export class MoviesStateModel {
    movies: Movie[];
    selectedMovie: Movie;
}

@State<MoviesStateModel>({
    name: 'catalog',
    defaults: {
        movies: [],
        selectedMovie: null
    }
})

export class MovieState {

    constructor(private moviesService: MoviesService) {}

    @Selector()
    static getMovies(state: MoviesStateModel) {
        return state.movies;
    }

    @Action(FetchMovies)
    fetchMovies({ getState, setState, patchState }: StateContext<MoviesStateModel>, { payload }) {
        // console.log('fetchMovies payload', payload);
        const { start, end } = payload;
        return this.moviesService.getMovies(start, end).pipe(tap((result) => {
            // console.log('fetchMovies result', result);
            const state = getState();
            // console.log('state', state);
            setState({
                ...state,
                movies: [ ...state.movies, ...result ]
            });
        }));
    }

    @Action(SelectedMovie)
    selectedMovie({ getState, setState, patchState }: StateContext<MoviesStateModel>, { payload }) {
        // console.log('selectedMovie payload', payload);
        const { title } = payload;
        return this.moviesService.getMovie(title).pipe(tap((result) => {
            // console.log('result selectedMovie', result);
            const state = getState();
            setState({
                ...state,
                selectedMovie: {...result[0]}
            });
        }));
    }
}
