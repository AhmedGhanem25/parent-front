import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  template: `<div *ngIf="showMe">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
    </div>`,
})
export class LoadingIndicatorComponent {
  @Input() public backgroundColor = 'rgba(0, 115, 170, 0.69)';
  @Input() public showMe = false;
}
