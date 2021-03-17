import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {

    transform(items, search: string) {
        if (items.length !== 0) {
            return items.filter( item  => item.title.toLowerCase().indexOf(search) > -1);
        }
        return null;
    }

}
