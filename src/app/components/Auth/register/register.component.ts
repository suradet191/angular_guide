import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  position = ['admin', 'cashier']
  constructor(private location: Location, private resService: RestService) { }

  ngOnInit() {
  }
  onBlack() {
    this.location.back();
  }
  onSubmit(formregis: NgForm) {
    this.resService.onRegister(formregis.value).subscribe
      (
        data => { alert(data.message); data.result },
        err => { console.log(err.message) }
      )
  }
}
