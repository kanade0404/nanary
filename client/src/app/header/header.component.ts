import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private globalService: GlobalService, private router: Router) { }

  ngOnInit() {
  }
  clickedLogo() {
    this.router.navigate(['/']);
  }
  clickedProfile() {
    //this.router.navigate(['user/' + 1]);
  }
}
