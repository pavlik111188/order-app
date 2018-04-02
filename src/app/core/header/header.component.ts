import {Component, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewChecked {

  constructor(public auth: AuthService,
              private changeDetector: ChangeDetectorRef) { }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }
}
