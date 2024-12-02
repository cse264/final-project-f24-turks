import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { debug } from 'console';
@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent implements OnInit {
  signupUsers: any[] = [];
  signupObj: any ={
    userName: '',
    password: '',
  };
  loginObj: any = {
    userName: '',
    password: '',
  }
  constructor(private router: Router) {}
  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  onSignUp() {
    if(this.signupObj.userName === '' || this.signupObj.password === '') {
      alert('Please enter username and password');
      return;
    }
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    alert('User signed up successfully');
    this.router.navigate(['/expenses']); 
  }

  onLogin() {
    const localData = localStorage.getItem('signupUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
    // Check if the login credentials match any of the signup users
    const user = this.signupUsers.find(user => user.userName === this.loginObj.userName && user.password === this.loginObj.password);
    if (user) {
      alert('User found');
      this.router.navigate([`/expenses/${this.loginObj.userName}`]);
    } else {
      alert('User not found');
    }
  }
}

