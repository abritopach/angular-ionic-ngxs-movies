import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { FetchMovies, SelectedMovie, AddMovie, EditMovie, DeleteMovie, FilterMovies, SaveFilterMovies,
         SearchMovies, GetMovieTrailer, ClearMovies } from './../actions/movies.actions';

import { MoviesService } from '../../providers/movies-service';
import { YoutubeApiService } from '../../providers/youtube-api-service';

export class MoviesStateModel {
    movies: Movie[];
    selectedMovie: Movie;
    movieForm: {
        model: Movie,
        dirty: boolean,
        status: string,
        errors: {}
    };
    filter: {
        genre: string,
        years: {
            lower: number,
            upper: number
        }
    };
}

@State<MoviesStateModel>({
    name: 'catalog',
    defaults: {
        movies: [],
        selectedMovie: null,
        movieForm: {
            model: null,
            dirty: false,
            status: '',
            errors: {}
        },
        filter: {
            genre: 'Action',
            years: {
                lower: 1900,
                upper: new Date().getFullYear()
            }
        }
    }
})

export class MovieState {

    constructor(private moviesService: MoviesService, private youtubeApiService: YoutubeApiService) {}

    @Selector()
    static getMovies(state: MoviesStateModel) {
        return state.movies;
    }

    @Action(FetchMovies, { cancelUncompleted: true })
    fetchMovies({ getState, setState, patchState }: StateContext<MoviesStateModel>, { payload }) {
        // console.log('MovieState::fetchMovies() | method called');
        // console.log('fetchMovies payload', payload);
        const { start, end } = payload;
        return this.moviesService.getMovies(start, end).pipe(
            catchError((x, caught) => {
                // console.log('inside catchError', x);
                return throwError(x);
            }),
            tap((result) => {
            // console.log('fetchMovies result', result);
            const state = getState();
            // console.log('state', state);
            setState({
                ...state,
                movies: [ ...state.movies, ...result ]
            });
        },
        (error) => {
            console.log('error', error.message);
        }));
    }

    @Action(SelectedMovie)
    selectedMovie({ getState, setState }: StateContext<MoviesStateModel>, { payload }) {
        // console.log('selectedMovie payload', payload);
        const { title } = payload;
        return this.moviesService.getMovie(title).pipe(
            catchError((x, caught) => {
                // console.log('inside catchError', x);
                return throwError(x);
            }),
            tap((result) => {
            // console.log('result selectedMovie', result);
            const state = getState();
            setState({
                ...state,
                selectedMovie: {...result[0]}
            });
        }));
    }

    @Action(AddMovie)
    addMovie({ getState, setState }: StateContext<MoviesStateModel>, { payload }) {
        // console.log('payload', payload);
        return this.moviesService.addMovie(payload).pipe(
            catchError((x, caught) => {
                // console.log('inside catchError', x);
                return throwError(x);
            }),
            tap((result) => {
            // console.log('result addMovie', result);
            const state = getState();
            setState({
                ...state,
                movies: [ result, ...state.movies ]
            });
        }));
    }

    @Action(EditMovie)
    editMovie({ getState, setState }: StateContext<MoviesStateModel>, { payload }) {
        // console.log('payload', payload);
        return this.moviesService.editMovie(payload).pipe(
            catchError((x, caught) => {
                // console.log('inside catchError', x);
                return throwError(x);
            }),
            tap((result) => {
            // console.log('result editMovie', result);
            const state = getState();
            const movies = state.movies;
            movies[result['index']] = result;
            setState({
                ...state,
                movies: [ ...movies ]
            });
            // state.movies[result['index']] = {...result};
        }));
    }

    @Action(DeleteMovie)
    deleteMovie({ getState, setState }: StateContext<MoviesStateModel>, { payload }) {
        // console.log('payload', payload);
        return this.moviesService.deleteMovie(payload).pipe(
            catchError((x, caught) => {
                // console.log('inside catchError', x);
                return throwError(x);
            }),
            tap((result) => {
            // console.log('result deleteMovie', result);
            const state = getState();
            setState({
                 ...state,
                movies: state.movies.filter(movie => movie.title !== payload.title)
             });
        }));
    }

    @Action(FilterMovies, { cancelUncompleted: true })
    filterMovies({ getState, setState }: StateContext<MoviesStateModel>, { payload }) {
        return this.moviesService.filterMovies(payload).pipe(
            catchError((x, caught) => {
                // console.log('inside catchError', x);
                return throwError(x);
            }),
            tap((result) => {
            // console.log('filterMovies result', result);
            const state = getState();
            setState({
                ...state,
                movies: [ ...result ]
            });
        },
        (error) => {
            console.log('error', error.message);
        }));
    }

    @Action(SaveFilterMovies)
    saveFilterMovies({ getState, setState }: StateContext<MoviesStateModel>, { payload }) {
        // console.log('payload saveFilterMovies', payload);
        const state = getState();
        setState({
            ...state,
            filter: {...payload}
        });
    }

    @Action(SearchMovies, { cancelUncompleted: true })
    searchMovies({ getState, setState }: StateContext<MoviesStateModel>, { payload }) {
        return this.moviesService.searchMovies(payload.queryText).pipe(
            catchError((x, caught) => {
                // console.log('inside catchError', x);
                return throwError(x);
            }),
            tap((result) => {
            const state = getState();
            setState({
                ...state,
                movies: [ ...result ]
            });
        },
        (error) => {
            console.log('error', error.message);
        }));
    }

    @Action(GetMovieTrailer, { cancelUncompleted: true })
    getMovieTrailer({ getState, setState }: StateContext<MoviesStateModel>, { payload }) {
        return this.youtubeApiService.searchMovieTrailer(payload.movieTitle).pipe(
            catchError((x, caught) => {
                // console.log('inside catchError', x);
                return throwError(x);
            }),
            tap((result) => {
            console.log(result);
        },
        (error) => {
            console.log('error', error.message);
        }));
    }

    @Action(ClearMovies)
    clearMovies({ getState, setState }: StateContext<MoviesStateModel>) {
        console.log('MovieState::clearMovies() | action called');
        const state = getState();
        setState({
            ...state,
            movies: []
        });
    }
}
