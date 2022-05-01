import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
Message
  constructor(private serviceCall: ApiService) { }

  ngOnInit(): void {
  }
  updatePassword() {
    var err = 0
    if ($("#username").val() !== '') {
      $("#username").removeClass('errDisplay');
      $('#usernameErr').html('');
    } else {
      err++;
      $("#username").addClass('errDisplay');
      $('#usernameErr').html('Enter ID');
    }
    if ($("#password").val() !== '') {
      $("#password").removeClass('errDisplay');
      $("#passwordErr").html('');
    } else {
      err++;
      $("#password").addClass('errDisplay');
      $("#passwordErr").html('Enter Password');
    }
    if ($("#cPassword").val() !== '') {
      $("#cPassword").removeClass('errDisplay');
      $("#cPasswordErr").html('');
    } else {
      err++;
      $("#cPassword").addClass('errDisplay');
      $("#cPasswordErr").html('Confirm Password');
    }
    if (err == 0) {
      var url = "/registration/update";
      var post_data = {
        "UserId": $("#username").val(),
        "Password": $("#password").val(),
        "Modified_By": "Admin"
      }
      this.serviceCall.signin(url, post_data).subscribe(data => {
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1) {
            this.Message = "Password Changed!";
          }else{
          this.Message = "User does not exists.";
          }
        }else{
          this.Message = "Technical Issue.";
        }
      })
    }
  }

}
