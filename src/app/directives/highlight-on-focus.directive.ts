import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlightOnFocus]',
  standalone: true
})
export class HighlightOnFocusDirective {
  @Input() appHighlightOnFocus = '';

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.onFocus(this.appHighlightOnFocus || 'blue');

  }
  @HostListener('mouseleave') onMouseLeave() {
    this.onFocus('');
  }
  private onFocus(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
