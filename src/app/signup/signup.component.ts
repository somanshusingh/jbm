import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import * as $ from "jquery";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  Message: any;

  constructor(private serviceCall: ApiService,private Router: Router) { }

  ngOnInit(): void {
  }
  signUp() {
    var url = '/registration/user';
    var post_data = {
      "UserId": "ID3",
      "Password": "12345",
      "Name": "Test Name",
      "Mobile": "9340179038",
      "Email": "test@mail.com",
      "Address": "mumbai",
      "Role":"Admin"
    };
    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1 && data['msg'] == 'user exist') {
            this.Message = data['msg'];
            this.Router.navigate(['/signin']);
          } else if (data['status'] == 0) {
            this.Message = data['msg'];
          } else if (data['status'] == 100) {
            this.Message = 'Technical Issue ,Please Retry';
          }
        } else {
          this.Message = 'Technical Issue ,Please Retry'
        }
      }
    )
  }

  validate() {
    var err = 0;
    var name = ($("#Name").val()).toString();
    var namePattern = new RegExp('^[a-zA-Z ]+$');
    var emailPattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (name !== '') {
      if (!namePattern.test(name)) {
        err++;
        $("#nameDiv").addClass('errDisplay');
      } else {
        var namearray = name.split(" ");
        if (namearray[1] === "" || namearray[0] === "" || namearray[1] === undefined) {
          err++;
          $("#nameDiv").addClass('errDisplay');
        } else {
          $("#nameDiv").removeClass('errDisplay')
        }
      }
    } else {
      err++;
      $("#nameDiv").addClass('errDisplay');
    }
    if ($("#email").val() !== '') {
      if (!emailPattern.test($("#email").val().toString())) {
        err++;
        $("#emailDiv").addClass('errDisplay');
      } else {
        $("#emailDiv").removeClass('errDisplay');
      }
    } else {
      err++;
      $("#emailDiv").addClass('errDisplay');
    }
    if ($('#role').val() === null || $('#role').val() === ''){
      err++;
          $("#roleDiv").addClass('errDisplay');
    }else{
      $("#roleDiv").removeClass('errDisplay');
    }
    if ($("#password").val() !== '') {
      if (($("#password").val()).toString().length < 4) {
        err++;
        $("#passwordDiv").addClass('errDisplay');
      } else {
        $("#passwordDiv").removeClass('errDisplay');
      }
    } else {
      err++;
      $("#passwordDiv").addClass('errDisplay');
    }
    if($('#confirmPassword').val()!==""){
      if($('#confirmPassword').val() !== $("#password").val()){
        err++;
         $("#confirmPasswordDiv").addClass('errDisplay');
      }else{
        $("#confirmPasswordDiv").removeClass('errDisplay');
      }
    }else{
      err++;
      $("#confirmPasswordDiv").addClass('errDisplay');
    }
    if (err === 0) {
      if((<HTMLInputElement>document.getElementById("terms")).checked == true){
        $("#termsDiv").removeClass('errDisplay');
        this.signUp();
      }else{
        err++;
        $("#termsDiv").addClass('errDisplay');
      }
    }
  }

}
