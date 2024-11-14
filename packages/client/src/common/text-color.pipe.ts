import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'textColor',
})
export class TextColorPipe implements PipeTransform {

  private colorRGB: { [key: string]: string } = {
    'red': '255, 0, 0',
    'blue': '0, 0, 255',
    'green': '0, 255, 0',
    'yellow': '255, 255, 0',
    'orange': '255, 165, 0',
    'purple': '128, 0, 128',
    'pink': '255, 192, 203',
    'brown': '165, 42, 42',
    'black': '0, 0, 0',
    'gray': '128, 128, 128',
  };

  transform(color: string): string {
    return `rgb(${this.colorRGB[color] + ', 0.6'});`;
  }
}