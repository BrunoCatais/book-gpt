import { Pipe, PipeTransform } from '@angular/core';
import CssColors from '../css-colors.enum';

@Pipe({
  standalone: true,
  name: 'translateColor',
})
export class TranslateColorPipe implements PipeTransform {

  private colorTranslations: { [key in CssColors]: string } = {
    [CssColors.Red]: 'Vermelho',
    [CssColors.Blue]: 'Azul',
    [CssColors.Green]: 'Verde',
    [CssColors.Yellow]: 'Amarelo',
    [CssColors.Orange]: 'Laranja',
    [CssColors.Purple]: 'Roxo',
    [CssColors.Pink]: 'Rosa',
    [CssColors.Brown]: 'Marrom',
    [CssColors.Black]: 'Preto',
    [CssColors.Gray]: 'Cinza',
  };

  transform(value: CssColors): string {
    return this.colorTranslations[value] || value;
  }
}