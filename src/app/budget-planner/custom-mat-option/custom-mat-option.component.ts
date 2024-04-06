import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-custom-mat-option',
  template: `
    <span class="source-name">{{source}}</span>
    <button class="close" (click)="delete()">×</button>
  `,
  styles: [
    `
      .close {
        float: right;
        margin-left: 10px;
        color: red;
        cursor: pointer;
      }

      .source-name {
        display: inline-block;
        width: calc(100% - 30px);
        text-align: left;
      }
    `
  ]
})
export class CustomMatOptionComponent {
  @Input() source: string = '';
  @Input() index: number = 0;
  @Output() deleteRequest = new EventEmitter<number>();

  delete() {
    this.deleteRequest.emit(this.index);
  }
}
