import {Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlightOnFocus]',
  standalone: true
})
export class HighlightOnFocusDirective {
  @Input() appHighlightOnFocus ='';


 constructor(private el: ElementRef) { }
  @HostListener('focus') onFocus() {
    this.focus(this.appHighlightOnFocus)
  }
  @HostListener('blur') onBlur() {
  this.focus('');
  }
  private focus(color: (() => void) | string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
