import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Movie } from '../../models/movie.model';
import { FetchMovies, SelectedMovie, AddMovie, EditMovie, DeleteMovie } from './../actions/movies.actions';

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

    @Action(AddMovie)
    addMovie({ getState, setState, patchState }: StateContext<MoviesStateModel>, { payload }) {
        console.log('payload', payload);
        return this.moviesService.addMovie(payload).pipe(tap((result) => {
            console.log('result addMovie', result);
            const state = getState();
            setState({
                ...state,
                movies: [ result, ...state.movies ]
            });
        }));
    }

    @Action(EditMovie)
    editMovie({ getState, setState, patchState }: StateContext<MoviesStateModel>, { payload }) {
        console.log('payload', payload);
        return this.moviesService.editMovie(payload).pipe(tap((result) => {
            console.log('result editMovie', result);
            const state = getState();
            state.movies[result['index']] = {...result};
        }));
    }

    @Action(DeleteMovie)
    deleteMovie({ getState, setState, patchState }: StateContext<MoviesStateModel>, { payload }) {
        console.log('payload', payload);
        return this.moviesService.deleteMovie(payload).pipe(tap((result) => {
            console.log('result deleteMovie', result);
            const state = getState();
            setState({
                 ...state,
                movies: state.movies.filter(movie => movie.title !== payload.title)
             });
        }));
    }
}
