import { State, Action, StateContext, Selector, NgxsOnInit } from '@ngxs/store';
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
  clearMovies,
  commentMovie,
  deleteAllFavoritesMovies,
  deleteFavoriteMovie,
  deleteMovie,
  editMovie,
  favoriteMovie,
  fetchMovies,
  filterMovies,
  getMovieTrailer,
  likeMovie,
  saveFilterMovies
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
    attachAction(MovieState, FilterMovies, filterMovies(moviesService));
    attachAction(MovieState, SaveFilterMovies, saveFilterMovies);
    attachAction(
      MovieState,
      GetMovieTrailer,
      getMovieTrailer(youtubeApiService)
    );
    attachAction(MovieState, ClearMovies, clearMovies);
    attachAction(MovieState, LikeMovie, likeMovie(moviesService));
    attachAction(MovieState, CommentMovie, commentMovie(moviesService));
    attachAction(MovieState, FavoriteMovie, favoriteMovie);
    attachAction(MovieState, DeleteFavoriteMovie, deleteFavoriteMovie);
    attachAction(
      MovieState,
      DeleteAllFavoritesMovies,
      deleteAllFavoritesMovies
    );
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
}
