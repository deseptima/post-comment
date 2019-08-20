import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loadmask',
  templateUrl: './loadmask.component.html',
  styleUrls: ['./loadmask.component.scss']
})
export class LoadmaskComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('active') isLoading: boolean;

  constructor() {}

  ngOnInit() {}
}
