import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatArrayAsString',
  standalone: true
})
export class FormatArrayAsString implements PipeTransform {

  transform(array: any[] | undefined, key: string): string {
    if (!array) return '';

    if (key.length === 0) {
      return array.join(', ');
    }

    return array.map((item: any) => item[key]).join(', ');
  }

}
