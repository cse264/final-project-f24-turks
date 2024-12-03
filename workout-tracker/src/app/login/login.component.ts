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
  paidUsers: any[] = [];
  signupObj: any ={
    userName: '',
    password: '',
    paidPassword: ''
  };
  loginObj: any = {
    userName: '',
    password: '',
    paidPassword: ' '
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
    if(this.signupObj.paidPassword === 'abc123') {
      this.paidUsers.push(this.signupObj);
      localStorage.setItem('paidUsers', JSON.stringify(this.paidUsers));
      alert('Paid User signed up successfully');
      //this.router.navigate(['/paid']); 
      return;
    }else if(this.signupObj.paidPassword === '') {
      this.signupUsers.push(this.signupObj);
      localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
      alert('normal user signed up successfully');
      //this.router.navigate(['/normalUser']); 
    }else {
      alert('Invalid paid password');
    }
    
  }

  onLogin() {
    const localData = localStorage.getItem('signupUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
    const localData2 = localStorage.getItem('paidUsers');
    if (localData2 != null) {
      this.paidUsers = JSON.parse(localData2);
    }
    // Check if the login credentials match any of the signup users
    const user = this.signupUsers.find(user => user.userName === this.loginObj.userName && user.password === this.loginObj.password);
    const paiduser = this.paidUsers.find(user => user.userName === this.loginObj.userName && user.password === this.loginObj.password);
    if(user==null && paiduser==null){
      alert('User not found');
    }else if (paiduser != null &&paiduser.paidPassword === 'abc123') {
      alert('paid User found');
      this.router.navigate(['/paid']);
    } else if (user != null && user.paidPassword === '') {
      alert('Normal User found');
      this.router.navigate(['/normalUser']);
    }
  }
}

