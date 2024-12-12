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
//   export class HighlightDirective {
//
//   constructor(private el: ElementRef, private renderer: Renderer2) { }
//
//   //Listen for mouseenter and mouseleave events
//
//   @HostListener('mouseenter') onMouseEnter() {
//     this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'yellow'); // Highlight the name on hover
//   }
//
//   @HostListener('mouseleave') onMouseLeave() {
//     this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor'); // Remove highlight when hover ends
//   }
// }
//   ngOnInit(): void {
//     if (this.appSitterStatus) {
//       this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'green'); // Avail status (green)
//       this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
//       this.renderer.setProperty(this.el.nativeElement, 'innerText', 'Available');
//     } else {
//       this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'red'); // Unavail status (red)
//       this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
//       this.renderer.setProperty(this.el.nativeElement, 'innerText', 'Unavailable');
//     }
//
//     this.renderer.setStyle(this.el.nativeElement, 'padding', '5px 10px');
//     this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '5px');
//     this.renderer.setStyle(this.el.nativeElement, 'fontWeight', 'bold');
//   }
}
