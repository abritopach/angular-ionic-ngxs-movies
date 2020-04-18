import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { FetchMovies, AddMovie, EditMovie, DeleteMovie, FilterMovies, SaveFilterMovies,
            GetMovieTrailer, ClearMovies, LikeMovie, CommentMovie, FavoriteMovie,
            DeleteFavoriteMovie, DeleteAllFavoritesMovies, ClearState } from './../actions/movies.actions';

import { MoviesService } from '../../services/movies/movies-service';
import { YoutubeApiService } from '../../services/youtube-api/youtube-api-service';
import { Injectable } from '@angular/core';

export class MoviesStateModel {
    movies: Movie[];
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
        },
        rate: number
    };
    favorites: Movie[];
}

@State<MoviesStateModel>({
    name: 'catalog',
    defaults: {
        movies: [],
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
            },
            rate: 0
        },
        favorites:  []
    }
})

@Injectable()
export class MovieState implements NgxsOnInit {

    private readonly GENRES: string[] = ['action', 'comedy', 'crime', 'documentary', 'drama', 'fantasy',
        'film noir', 'horror', 'romance', 'science fiction', 'westerns', 'animation'];

    constructor(private moviesService: MoviesService, private youtubeApiService: YoutubeApiService) {}

    @Selector()
    static getMovies(state: MoviesStateModel) {
        return state.movies;
    }

    @Selector()
    static movieById(state: MoviesStateModel) {
        return (id: string) => {
            return state.movies.filter(movie => movie.id === id)[0];
        };
    }

    ngxsOnInit(ctx: StateContext<MoviesStateModel>) {
        ctx.dispatch(new ClearState());
    }

    @Action(ClearState)
    clearState({ setState }: StateContext<MoviesStateModel>) {
        setState({
            movies: [],
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
                },
                rate: 0
            },
        favorites:  []});
    }

    @Action(FetchMovies, { cancelUncompleted: true })
    fetchMovies({ getState, setState }: StateContext<MoviesStateModel>, { payload }) {
        const { start, end } = payload;
        return this.moviesService.getMovies(start, end).pipe(
            catchError((x, caught) => {
                return throwError(x);
            }),
            tap((movies) => {

                movies.forEach((movie) => {
                    const genre = movie.genre.toLowerCase().split(',', 1)[0];
                    if (this.GENRES.indexOf(genre) !== -1) {
                        movie.genreImage = 'assets/movies-genres/' + genre + '.png';
                    }
                });

                const state = getState();
                setState({
                    ...state,
                    movies: [ ...state.movies, ...movies ]
                });
            },
            (error) => {
                console.log('error', error.message);
            })
        );
    }

    @Action(AddMovie)
    addMovie({ setState }: StateContext<MoviesStateModel>, { payload }) {
        payload.poster = payload.poster === '' ? 'https://in.bmscdn.com/iedb/movies/images/website/poster/large/ela-cheppanu-et00016781-24-03-2017-18-31-40.jpg' : payload.poster;
        return this.moviesService.addMovie(payload).pipe(
            catchError((x, caught) => {
                return throwError(x);
            }),
            tap((result) => {
            setState(
                patch({
                    movies: append([result])
                })
            );
        }));
    }

    @Action(EditMovie)
    editMovie({ setState }: StateContext<MoviesStateModel>, { payload }) {
        return this.moviesService.editMovie(payload).pipe(
            catchError((x, caught) => {
                return throwError(x);
            }),
            tap((result) => {
            setState(
                patch({
                    movies: updateItem<Movie>(movie => movie.id === result.id, result)
                })
            );
        }));
    }

    @Action(DeleteMovie)
    deleteMovie({ setState }: StateContext<MoviesStateModel>, { payload }) {
        return this.moviesService.deleteMovie(payload).pipe(
            catchError((x, caught) => {
                return throwError(x);
            }),
            tap((result) => {
                setState(
                    patch({
                        movies: removeItem<Movie>(movie => movie.id === payload.id)
                    })
                );
        }));
    }

    @Action(FilterMovies, { cancelUncompleted: true })
    filterMovies({ getState, setState }: StateContext<MoviesStateModel>, { payload }) {
        return this.moviesService.filterMovies(payload).pipe(
            catchError((x, caught) => {
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

    @Action(SaveFilterMovies)
    saveFilterMovies({ setState }: StateContext<MoviesStateModel>, { payload }) {
        setState(
            patch({
                filter: {...payload}
            })
        );
    }

    @Action(GetMovieTrailer, { cancelUncompleted: true })
    getMovieTrailer({ getState, setState }: StateContext<MoviesStateModel>, { payload }) {
        return this.youtubeApiService.searchMovieTrailer(payload.movieTitle).pipe(
            catchError((x, caught) => {
                return throwError(x);
            }),
            tap((result) => {
        },
        (error) => {
            console.log('error', error.message);
        }));
    }

    @Action(ClearMovies)
    clearMovies({ getState, setState }: StateContext<MoviesStateModel>) {
        const state = getState();
        setState({
            ...state,
            movies: []
        });
    }

    @Action(LikeMovie)
    likeMovie({ setState }: StateContext<MoviesStateModel>, { payload }) {
        return this.moviesService.editMovie(payload).pipe(
            catchError((x, caught) => {
                return throwError(x);
            }),
            tap((result) => {
            setState(
                patch({
                    movies: updateItem<Movie>(movie => movie.id === result.id, result)
                })
            );
        }));
    }

    @Action(CommentMovie)
    commentMovie({ setState }: StateContext<MoviesStateModel>, { payload }) {
        return this.moviesService.editMovie(payload).pipe(
            catchError((x, caught) => {
                return throwError(x);
            }),
            tap((result) => {
            setState(
                patch({
                    movies: updateItem<Movie>(movie => movie.id === result.id, result)
                })
            );
        }));
    }

    @Action(FavoriteMovie)
    favoriteMovie({ setState }: StateContext<MoviesStateModel>, { payload }) {
        setState(
            patch({
                favorites: append([payload])
            })
        );
    }

    @Action(DeleteFavoriteMovie)
    deleteFavoriteMovie({ setState }: StateContext<MoviesStateModel>, { payload }) {
        setState(
            patch({
                favorites: removeItem<Movie>(movie => movie.id === payload.id)
            })
        );
    }

    @Action(DeleteAllFavoritesMovies)
    deleteAllFavoritesMovies({ getState, setState }: StateContext<MoviesStateModel>) {
        const state = getState();
        setState({
            ...state,
            favorites: []
        });
    }
}
