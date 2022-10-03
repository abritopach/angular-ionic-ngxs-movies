import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
import { patch, append, removeItem, updateItem } from '@ngxs/store/operators';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Movie } from '@models/movie.model';
import {
  FetchMovies,
  AddMovie,
  EditMovie,
  DeleteMovie,
  FilterMovies,
  SaveFilterMovies,
  GetMovieTrailer,
  ClearMovies,
  LikeMovie,
  CommentMovie,
  FavoriteMovie,
  DeleteFavoriteMovie,
  DeleteAllFavoritesMovies,
  ClearState
} from '@store/actions/movies.actions';

import { MoviesService } from '@services/movies/movies-service';
import { YoutubeApiService } from '@services/youtube-api/youtube-api-service';
import { Injectable } from '@angular/core';
import { attachAction } from '@ngxs-labs/attach-action';
import {
  addMovie,
  deleteMovie,
  editMovie,
  fetchMovies
} from '@store/actions/movies.actions.impl';

export class MoviesStateModel {
  movies: Movie[];
  movieForm: {
    model: Movie;
    dirty: boolean;
    status: string;
    errors: {};
  };
  filter: {
    genre: string;
    years: {
      lower: number;
      upper: number;
    };
    rate: number;
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
    favorites: []
  }
})
@Injectable()
export class MovieState implements NgxsOnInit {
  constructor(
    private moviesService: MoviesService,
    private youtubeApiService: YoutubeApiService
  ) {
    attachAction(MovieState, FetchMovies, fetchMovies(moviesService));
    attachAction(MovieState, AddMovie, addMovie(moviesService));
    attachAction(MovieState, EditMovie, editMovie(moviesService));
    attachAction(MovieState, DeleteMovie, deleteMovie(moviesService));
  }

  @Selector()
  static getMovies(state: MoviesStateModel) {
    return state.movies;
  }

  @Selector()
  static movieById(state: MoviesStateModel) {
    return (id: string) => {
      return state.movies.filter((movie) => movie.id === id)[0];
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
      favorites: []
    });
  }

  @Action(FilterMovies, { cancelUncompleted: true })
  filterMovies(
    { getState, setState }: StateContext<MoviesStateModel>,
    { payload }
  ) {
    return this.moviesService.filterMovies(payload).pipe(
      catchError((x, caught) => {
        return throwError(() => new Error(x));
      }),
      tap({
        next: (result) => {
          const state = getState();
          setState({
            ...state,
            movies: [...result]
          });
        },
        error: (error) => {
          console.log('error', error.message);
        }
      })
    );
  }

  @Action(SaveFilterMovies)
  saveFilterMovies({ setState }: StateContext<MoviesStateModel>, { payload }) {
    setState(
      patch({
        filter: { ...payload }
      })
    );
  }

  @Action(GetMovieTrailer, { cancelUncompleted: true })
  getMovieTrailer(
    { getState, setState }: StateContext<MoviesStateModel>,
    { payload }
  ) {
    return this.youtubeApiService.searchMovieTrailer(payload.movieTitle).pipe(
      catchError((x, caught) => {
        return throwError(() => new Error(x));
      }),
      tap({
        next: (result) => {},
        error: (error) => {
          console.log('error', error.message);
        }
      })
    );
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
        return throwError(() => new Error(x));
      }),
      tap({
        next: (result) => {
          setState(
            patch({
              movies: updateItem<Movie>(
                (movie) => movie.id === result.id,
                result
              )
            })
          );
        },
        error: (error) => {
          console.log('error', error.message);
        }
      })
    );
  }

  @Action(CommentMovie)
  commentMovie({ setState }: StateContext<MoviesStateModel>, { payload }) {
    return this.moviesService.editMovie(payload).pipe(
      catchError((x, caught) => {
        return throwError(() => new Error(x));
      }),
      tap({
        next: (result) => {
          setState(
            patch({
              movies: updateItem<Movie>(
                (movie) => movie.id === result.id,
                result
              )
            })
          );
        },
        error: (error) => {
          console.log('error', error.message);
        }
      })
    );
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
  deleteFavoriteMovie(
    { setState }: StateContext<MoviesStateModel>,
    { payload }
  ) {
    setState(
      patch({
        favorites: removeItem<Movie>((movie) => movie.id === payload.id)
      })
    );
  }

  @Action(DeleteAllFavoritesMovies)
  deleteAllFavoritesMovies({
    getState,
    setState
  }: StateContext<MoviesStateModel>) {
    const state = getState();
    setState({
      ...state,
      favorites: []
    });
  }
}
