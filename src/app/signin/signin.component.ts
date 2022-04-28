import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as $ from "jquery";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private serviceCall: ApiService,private Router: Router) { }

  Message
  ngOnInit(): void {
  }

  signIn() {
    var url = '/registration/signin';
    var post_data = {
      "UserId": $('#username').val(),//"ID3",
      "Password": $('#password').val()//"12345"
    };
    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1) {
            this.Message = data['msg'];
            this.Router.navigate(['/dashboard']);
          } else if (data['status'] == 0) {
            $('#username').val('');
            $('#password').val('');
            $('.Error').html('Incorrect Username or Password!');
          } else if (data['status'] == 100) {
            this.Message = 'Technical Issue ,Please Retry';
          }
        } else {
          this.Message = 'Technical Issue ,Please Retry';
          $('.Error').html('Technical Issue ,Please Retry');
        }
      }
    )
  }
  validate(){
    var err=0;
    if($('#username').val() ==''){
      $("#username").addClass('errDisplay');
      err++
    }else{
      $("#username").removeClass('errDisplay');
    }
    if($('#password').val() ==''){
      $("#password").addClass('errDisplay');
      err++
    }else{
      $("#password").removeClass('errDisplay');
    }
    if(err ==0 ){
      this.signIn();
    }
  }

}
