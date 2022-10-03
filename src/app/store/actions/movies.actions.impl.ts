import { Movie } from '@models/movie.model';
import { StateContext } from '@ngxs/store';
import { append, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { MoviesService } from '@services/movies/movies-service';
import { MoviesStateModel } from '@store/state/movies.state';
import { catchError, tap, throwError } from 'rxjs';
import { FetchMovies } from './movies.actions';

const GENRES: string[] = [
  'action',
  'comedy',
  'crime',
  'documentary',
  'drama',
  'fantasy',
  'film noir',
  'horror',
  'romance',
  'science fiction',
  'westerns',
  'animation'
];

export const fetchMovies =
  (moviesService: MoviesService) =>
  (
    { getState, setState }: StateContext<MoviesStateModel>,
    action: FetchMovies
  ) => {
    const { start, end } = action.payload;
    return moviesService.getMovies(start, end).pipe(
      catchError((x, caught) => {
        return throwError(() => new Error(x));
      }),
      tap({
        next: (movies) => {
          movies.forEach((movie) => {
            const genre = movie.genre.toLowerCase().split(',', 1)[0];
            if (GENRES.indexOf(genre) !== -1) {
              movie.genreImage = 'assets/movies-genres/' + genre + '.png';
            }
          });
          const state = getState();
          setState({
            ...state,
            movies: [...state.movies, ...movies]
          });
        },
        error: (error) => {
          console.log('error', error.message);
        }
      })
    );
  };

export const addMovie =
  (moviesService: MoviesService) =>
  ({ setState }: StateContext<MoviesStateModel>, { payload }) => {
    payload.poster =
      payload.poster === ''
        ? 'https://in.bmscdn.com/iedb/movies/images/website/poster/large/ela-cheppanu-et00016781-24-03-2017-18-31-40.jpg'
        : payload.poster;
    return moviesService.addMovie(payload).pipe(
      catchError((x, caught) => {
        return throwError(() => new Error(x));
      }),
      tap({
        next: (result) => {
          setState(
            patch({
              movies: append([result])
            })
          );
        }
      })
    );
  };

export const editMovie =
  (moviesService: MoviesService) =>
  ({ setState }: StateContext<MoviesStateModel>, { payload }) => {
    return moviesService.editMovie(payload).pipe(
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
        }
      })
    );
  };

export const deleteMovie =
  (moviesService: MoviesService) =>
  ({ setState }: StateContext<MoviesStateModel>, { payload }) => {
    return moviesService.deleteMovie(payload).pipe(
      catchError((x, caught) => {
        return throwError(() => new Error(x));
      }),
      tap({
        next: (result) => {
          setState(
            patch({
              movies: removeItem<Movie>((movie) => movie.id === payload.id)
            })
          );
        }
      })
    );
  };
