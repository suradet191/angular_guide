import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private resService: RestService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(form1: NgForm) {

    this.resService.onLogin(form1.value).subscribe(
      data => {
        localStorage.setItem(environment.keyLocalAuthenInfo,data.token);
        alert(data.message)
        this.router.navigate(['/stock'])
      },err => {
        console.log(err.message)
      }
      );


  }
}
