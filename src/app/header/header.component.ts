import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { SideNavService } from '../services/side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  sideNavOpenState: boolean = false;
  userName: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private sideNavService: SideNavService
  ) {
    this.getLoginUser();
    this.sideNavService.sideNavOpen$.subscribe((res) => {
      this.sideNavOpenState = res;
    });
  }

  openCloseSideNav() {
    this.sideNavOpenState = !this.sideNavOpenState;
    this.sideNavService.sideNavEvent(this.sideNavOpenState);
  }

  getLoginUser() {
    this.userService.getLoginUser().subscribe((res: any) => {
      this.userName = `${res.body.firstName} ${res.body.lastName}`;
    });
  }

  logout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.router.navigate(['login']);
  }
}
