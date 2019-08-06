import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sourcePipe'
})
export class SourcePipe implements PipeTransform {
  transform(sources: string[], search: string = ''): string[] {
    if (!search.trim()) {
      return sources;
    }

    return sources.filter(source => {
      return source.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }
}
