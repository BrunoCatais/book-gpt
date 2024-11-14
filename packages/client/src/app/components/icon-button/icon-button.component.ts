import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() icon: string = 'person';
  @Output() buttonClick = new EventEmitter<Event>();

  onClick(event: Event): void {
    this.buttonClick.emit(event);
  }
}