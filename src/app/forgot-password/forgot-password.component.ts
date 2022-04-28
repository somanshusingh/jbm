import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private serviceCall: ApiService) { }

  ngOnInit(): void {
  }
  updatePassword(){
    var url ="/registration/update";
    var post_data = {
      "UserId": $("#ID").val(),
      "Password": $("#password").val(),
      "Modified_By":"Admin"
    }
    this.serviceCall.signin(url, post_data).subscribe(data =>{
      console.log(data);
    })
  }

}
