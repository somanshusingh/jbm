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
  menuSelected = 0;
  allowedMenu = {
    users: 'no',
    vehicles: 'no',
    inboundPocess: 'no',
    outboundProcess: 'no',
    registerCard: 'no'
  }

  constructor(private serviceCall: ApiService, private Router: Router) { }

  ngOnInit(): void {
    this.menuVal('', '');
  }
  signUp() {
    var url = '/registration/user';
    var post_data = {
      // "UserId": $('#sUserName').val(),
      "Password": $('#password').val(),
      "FirstName": $('#Name').val(),
      "LastName":$('#Surname').val(),
      "Mobile": $('#mobile').val(),
      "Email": $('#email').val(),
      "Address": "work",
      "Role": $('#role').val(),
      "Created_By":this.serviceCall.UserName,
      "Allowed_Menu": {
        "users": this.allowedMenu.users,
        "vehicles": this.allowedMenu.vehicles,
        "inboundPocess": this.allowedMenu.inboundPocess,
        "outboundProcess": this.allowedMenu.outboundProcess,
        "registerCard": this.allowedMenu.registerCard
      },
      "EmpCode":$('emp_code').val()
    };
    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        $(".Popup1").show();
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1) {
            this.Message = "User Added Successfully!";
          } else if (data['status'] == 0) {
            this.Message = JSON.stringify(data['msg']);
          } else if (data['status'] == 100) {
            this.Message = 'Technical Issue ,Please Retry';
          }
        } else {
          this.Message = 'Technical Issue ,Please Retry'
        }
      },
      (error)=>{
        $(".Popup1").show();
        this.Message = "Technical Issue ,Please Retry";
      }
    )
  }

  validate() {
    var err = 0;
    var name = ($("#Name").val()).toString();
    var Surname = ($("#Surname").val()).toString();
    var namePattern =  new RegExp("^[A-Za-z]+$");
    var emailPattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var mobilePattern = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

    // if ($('#sUserName').val() !== '') {
    //   $("#Name").removeClass('errDisplay');
    //   $('.unameErr').html('');
    // } else {
    //   err++;
    //   $("#sUserName").addClass('errDisplay');
    //   $('.unameErr').html('Enter Username');
    // }
    if (name !== '') {
      if (!namePattern.test(name)) {
        err++;
        $("#Name").addClass('errDisplay');
        $('.nameErr').html('Enter First Name');
      } else {
          $("#Name").removeClass('errDisplay');
          $('.nameErr').html('');
      }
    } else {
      err++;
      $("#Name").addClass('errDisplay');
      $('.nameErr').html('Enter First Name');
    }
    if (Surname !== '') {
      if (!namePattern.test(Surname)) {
        err++;
        $("#Surname").addClass('errDisplay');
      $('.SurnameErr').html('Enter Last Name');
      } else {
        $("#Surname").removeClass('errDisplay');
        $('.SurnameErr').html('');
      }
    } else {
      err++;
      $("#Surname").addClass('errDisplay');
      $('.SurnameErr').html('Enter Last Name');
    }
    if ($("#email").val() !== '') {
      if (!emailPattern.test($("#email").val().toString())) {
        err++;
        $("#email").addClass('errDisplay');
        $('.emailErr').html('Enter Email');
      } else {
        $("#email").removeClass('errDisplay');
        $('.emailErr').html('');
      }
    } else {
      err++;
      $("#email").addClass('errDisplay');
      $('.emailErr').html('Enter Email');
    }
    if ($("#mobile").val() !== '') {
      if (!mobilePattern.test($("#mobile").val().toString())) {
        err++;
        $("#mobile").addClass('errDisplay');
        $('.mobileErr').html('Enter Correct Mobile number');
      } else {
        $("#mobile").removeClass('errDisplay');
        $('.mobileErr').html('');
      }
    } else {
      err++;
      $("#mobile").addClass('errDisplay');
      $('.mobileErr').html('Enter Correct Mobile number');
    }
    if ($('#role').val() === null || $('#role').val() === '') {
      err++;
      $("#role").addClass('errDisplay');
      $('.roleErr').html('Select Role');
    } else {
      $("#role").removeClass('errDisplay');
      $('.roleErr').html('');
    }
    if ($("#password").val() !== '') {
      if (($("#password").val()).toString().length < 4) {
        err++;
        $("#password").addClass('errDisplay');
        $('.passwordErr').html('Enter Password');
      } else {
        $("#password").removeClass('errDisplay');
        $('.passwordErr').html('');
      }
    } else {
      err++;
      $("#password").addClass('errDisplay');
      $('.passwordErr').html('Enter Password');
    }
    if ($('#confirmPassword').val() !== "") {
      if ($('#confirmPassword').val() !== $("#password").val()) {
        err++;
        $("#confirmPassword").addClass('errDisplay');
        $('.cpasswordErr').html('Enter Same Password');
      } else {
        $("#confirmPassword").removeClass('errDisplay');
        $('.cpasswordErr').html('');
      }
    } else {
      err++;
      $("#confirmPassword").addClass('errDisplay');
      $('.cpasswordErr').html('Enter Same Password');
    }
    if (err === 0) {
      this.signUp();
    }
  }
  hidePopup() {
    $(".Popup1").hide();
    let fullUrl= window.location.href.split('?')[1];
    let sessionID= (fullUrl && fullUrl.split('=')[1]) ? fullUrl.split('=')[1]:'';
    if (this.Message == 'User Added Successfully!') {
      this.Router.navigate(['/users'], { queryParams:{sessionID:sessionID}});
    }
  }
  KeyPressEvent(event: any, type) {
    let pattern;
    switch (type) {
      case 'Text': pattern = /[a-zA-Z ]/; break;
      case 'OnlyText': pattern = /[a-zA-Z]/; break;
      case 'Number': pattern = /[0-9\+\-\ ]/; break;
      case 'Mobile': pattern = /[0-9\+\-\ ]/; break;
      //case 'PAN':         pattern = /[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}/; break;
    }
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) { event.preventDefault(); }
  }
  ValidateNumber(event) {
    if (!(/^[0-9]*$/.test(event.target.value))) {
      event.target.value = "";
    }
  }
  ValidateText(event) {
    if (!(/^[A-Za-z]+$/.test(event.target.value))) {
      event.target.value = "";
    }
  }
  showCheckbox() {
    if (((<HTMLInputElement>document.getElementById("list1")).classList.contains('visible'))) {
      (<HTMLInputElement>document.getElementById("list1")).classList.remove('visible');
    }
    else
      (<HTMLInputElement>document.getElementById("list1")).classList.add('visible');
  }
  menuVal(isChecked, id) {

    if (id == 'users' && isChecked) {
      $('#menuOptionUsers').show();
      this.menuSelected++;
      this.allowedMenu.users = 'yes';
    } else if (id == 'users') {
      $('#menuOptionUsers').hide();
      this.menuSelected--;
      this.allowedMenu.users = 'no';
    }
    if (id == 'vehicles' && isChecked) {
      $('#menuOptionVehicles').show();
      this.menuSelected++;
      this.allowedMenu.vehicles = 'yes';
    } else if (id == 'vehicles') {
      $('#menuOptionVehicles').hide();
      this.menuSelected--;
      this.allowedMenu.vehicles = 'no';
    }
    if (id == 'inboundProcess' && isChecked) {
      $('#menuOptionInbound').show();
      this.menuSelected++;
      this.allowedMenu.inboundPocess = 'yes';
    } else if (id == 'inboundProcess') {
      $('#menuOptionInbound').hide();
      this.menuSelected--;
      this.allowedMenu.inboundPocess = 'no';
    }
    if (id == 'outboundProcess' && isChecked) {
      $('#menuOptionOutbound').show();
      this.menuSelected++;
      this.allowedMenu.outboundProcess = 'yes';
    } else if (id == 'outboundProcess') {
      $('#menuOptionOutbound').hide();
      this.menuSelected--;
      this.allowedMenu.outboundProcess = 'no';
    }
    if (id == 'registerCard' && isChecked) {
      $('#menuOptionRegister').show();
      this.menuSelected++;
      this.allowedMenu.registerCard = 'yes';
    } else if (id == 'registerCard') {
      $('#menuOptionRegister').hide();
      this.menuSelected--;
      this.allowedMenu.registerCard = 'no';
    }
    if (this.menuSelected == 0 || (isChecked && id=='SelectRole')) {
      $('#menuOptionNone').show();
    } else {
      $('#menuOptionNone').hide();
    }
  }
  selectMenu(){
    if($('#role').val() === 'Admin'){
      $('#checkUsers,#checkVehicles,#checkInbound,#checkOutbound,#checkRegister').prop('checked', true);
      this.menuVal(true,'users');
      this.menuVal(true,'vehicles');
      this.menuVal(true,'inboundProcess');
      this.menuVal(true,'outboundProcess');
      this.menuVal(true,'registerCard');
    }
    else if($('#role').val() === 'Supervisor'){
      $('#checkInbound,#checkOutbound,#checkRegister').prop('checked', true);
      $('#checkUsers,#checkVehicles').prop('checked', false);
      this.menuVal(false,'users');
      this.menuVal(false,'vehicles');
      this.menuVal(true,'inboundProcess');
      this.menuVal(true,'outboundProcess');
      this.menuVal(true,'registerCard');
    }
    else if($('#role').val() === 'GateUser'){
      $('#checkUsers').prop('checked', true);
      $('#checkVehicles,#checkInbound,#checkOutbound,#checkRegister').prop('checked', false);
      this.menuVal(true,'users');
      this.menuVal(false,'vehicles');
      this.menuVal(false,'inboundProcess');
      this.menuVal(false,'outboundProcess');
      this.menuVal(false,'registerCard');
    }else{
        $('#checkUsers,#checkVehicles,#checkInbound,#checkOutbound,#checkRegister').prop('checked', false);
        this.menuVal(false,'users');
        this.menuVal(false,'vehicles');
        this.menuVal(false,'inboundProcess');
        this.menuVal(false,'outboundProcess');
        this.menuVal(false,'registerCard');
        this.menuVal(true,'SelectRole');
    }
  }
  reset(){
    $('#Name').val('');
    $('#Surname').val('');
    $('#email').val('');
    $('#mobile').val('');
    $('#password').val('');
    $('#confirmPassword').val('');
    $('#role').val('');
    $('#emp_code').val('');
    $('#checkUsers,#checkVehicles,#checkInbound,#checkOutbound,#checkRegister').prop('checked', false);
        this.menuVal(false,'users');
        this.menuVal(false,'vehicles');
        this.menuVal(false,'inboundProcess');
        this.menuVal(false,'outboundProcess');
        this.menuVal(false,'registerCard');
        this.menuVal(true,'SelectRole');
  }

}
