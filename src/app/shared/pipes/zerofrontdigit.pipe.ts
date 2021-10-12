import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zerofrontdigit',
})
export class ZerofrontdigitPipe implements PipeTransform {
  transform(number: number): string {
    return ('0' + number).slice(-2);
  }
}
