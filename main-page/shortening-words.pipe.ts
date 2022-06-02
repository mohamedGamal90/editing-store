import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorteningWords'
})
export class ShorteningWordsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value.length<24){
      return value
    }
    return value.substr(0,20)+'...';
  }

}
