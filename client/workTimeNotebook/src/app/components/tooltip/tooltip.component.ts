import { Component, OnInit, Input, ElementRef, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit, OnDestroy {
  
  @Input()
  bgColor = '#ffcb66';

  @Input()
  color = 'black';

  @Input()
  message = '';

  @Input()
  connectedElementRef: HTMLElement;

  isElemHover = false;

  private disposeMouseoverListner: Function;
  private disposeMouseoutListner: Function;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.disposeMouseoverListner = this.renderer.listen(this.connectedElementRef, 'mouseover', () => {this.isElemHover = true; console.log(this.isElemHover);});
    this.disposeMouseoutListner = this.renderer.listen(this.connectedElementRef, 'mouseout', () => {this.isElemHover = false; console.log(this.isElemHover);});
  }

  ngOnDestroy() {
    this.disposeMouseoverListner();
    this.disposeMouseoutListner();
  }

}
