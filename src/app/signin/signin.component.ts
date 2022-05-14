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
    // var url = '/registration/signin/'+ btoa($('#username').val().toString()) +'/'+ btoa($('#password').val().toString());
    var url = '/registration/signin/'+ $('#username').val().toString() +'/'+ $('#password').val().toString();
    var post_data = {
      "UserId": $('#username').val(),//"ID3",
      "Password": $('#password').val()//"12345"
    };
      this.serviceCall.getService(url).subscribe(
      data => {
    $('#loginButton, #username, #password').removeAttr("disabled");
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1) {
            this.Message = data['msg'];
            this.Router.navigate(['/dashboard'], { queryParams:{sessionID:data['msg']['sessionID']}});
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
      },
      (error)=>{
        $('#loginButton, #username, #password').removeAttr("disabled");
        $('.Error').html('Technical Issue! Please Retry');
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
  submit(event){
    if(event.key === "Enter"){
      event.preventDefault();
      this.validate();
    }
  }

}
