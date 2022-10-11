import { FormControl } from '@angular/forms';

export interface MovieForm {
  id: FormControl<string>;
  title: FormControl<string>;
  year: FormControl<number>;
  director: FormControl<string>;
  cast: FormControl<string>;
  genre: FormControl<string>;
  notes: FormControl<string>;
  poster: FormControl<string>;
}
