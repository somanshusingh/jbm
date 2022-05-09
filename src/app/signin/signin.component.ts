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
    $('#loginButton, #username, #password').attr("disabled", 'disabled');
    var url = '/registration/signin';
    var post_data = {
      "UserId": $('#username').val(),//"ID3",
      "Password": $('#password').val()//"12345"
    };
    this.serviceCall.signin(url, post_data).subscribe(
      data => {
    $('#loginButton, #username, #password').removeAttr("disabled");
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1) {
            this.Message = data['msg'];
            this.Router.navigate(['/dashboard']);
            this.serviceCall.Role= data['msg']['Role'];
            this.serviceCall.UserName= data['msg']['Name'];
            this.serviceCall.Allowed_Menu= data['msg']['Allowed_Menu'];
            this.serviceCall.UserId= data['msg']['UserId'];
          } else if (data['status'] == 0) {
            $('#username').val('');
            $('#password').val('');
            if (typeof data['msg'] === "string"){
              $('.Error').html(data['msg']);
            } else {
              $('.Error').html('Technical Issue! Please Retry');
            }
          } else if (data['status'] == 100) {
            $('.Error').html('Technical Issue! Please Retry');
          }
        } else {
          $('.Error').html('Technical Issue! Please Retry');
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
