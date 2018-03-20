import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from '../../mdb';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  public isModalShown: boolean = true;

  public showModal():void {
    this.isModalShown = true;
  }

  public hideModal():void {
    this.autoShownModal.hide();
  }

  public onHidden():void {
    this.isModalShown = false;
  }

  constructor() { }

  ngOnInit() {
  }

}
