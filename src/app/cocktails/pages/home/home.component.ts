import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  userName: string | null = null;
  constructor(private router: Router, private loginService: LoginService) {}
  ngOnInit(): void {
    this.userName = this.loginService.getStoredUserName();
  }
  logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  cocktails() {
    this.router.navigate(['/listCocktails']);
  }
}
