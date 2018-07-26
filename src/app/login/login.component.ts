import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { LoginService, Authorization } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Roster } from '../roster';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username: string; 
  private password: string; 

  returnUrl: string;

  constructor(private route: ActivatedRoute, private router: Router, private loginService : LoginService) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  private login(){
    this.loginService.getToken(this.username, this.password).subscribe(
      (authorization : Authorization) => {
        if(authorization.auth){
          localStorage.setItem('token', authorization.token)
          this.router.navigateByUrl(this.returnUrl).then(e => {
            if (e) {
              console.log("Navigation is successful!");
            } else {
              console.log("Navigation has failed!");
            }
          });
        }
        else{
          console.log("authentication failed");
        }
      },
      err => {
        console.log("Error occured");
      }
    );
  }

}
