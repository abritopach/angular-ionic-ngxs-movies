import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Movie } from '../../models/movie.model';
import { FetchMovies } from './../actions/movies.actions';

import { MoviesService } from '../../providers/movies-service';

export class MoviesStateModel {
    movies: Movie[];
}

@State<MoviesStateModel>({
    name: 'movies',
    defaults: {
        movies: []
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
        console.log('fetchMovies payload', payload);
        const { start, end } = payload;
        return this.moviesService.getMovies(start, end).pipe(tap((result: Movie[]) => {
            console.log('fetchMovies result', result);
            const state = getState();
            /*
            setState({
                ...state,
                movies: [ ...state.movies, result ]
            });
            */
           /*
           patchState({
                movies: [...state.movies, result]
            });
            */
        }));
    }
}
