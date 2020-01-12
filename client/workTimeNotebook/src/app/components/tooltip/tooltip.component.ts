import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {

  @Input()
  bgColor = '#ffcb66';

  @Input()
  color = 'black';

  @Input()
  message = '';

  @Input()
  canShow = false;

  @Input()
  connectedElementRef: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit() {
  }

}
