import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  data;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Message: string;
  Edited = false;
  menuSelected = 0;
  allowedMenu = {
    users: 'no',
    vehicles: 'no',
    inboundPocess: 'no',
    outboundProcess: 'no',
    registerCard: 'no'
  }
  constructor(private serviceCall: ApiService) { }

  ngOnInit(): void {
    this.getData();
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      lengthMenu: [10, 50, 100],
      processing: true,
      order: [],
      columnDefs: [{
        'targets': [0, 1, 2, 3], /* column index [0,1,2,3]*/
        'orderable': false, /* true or false */
      }],
      scrollX: true,
    };
  }
  getData() {
    var url = "/registration/user/view"
    this.serviceCall.getService(url).subscribe(data => {
      this.data = data['msg'];
      console.log(this.data);
      if (this.Edited == false) {
        this.dtTrigger.next();
      }
    })
  }
  viewData(source, userid) {
    for (var i = 0; i < this.data.length; i++) {
      for (var a in this.data[i]) {
        if (a == 'UserId') {
          if (this.data[i][a] == userid) {
            if (source == 'view') {
              $('.userViewPopup1').show();
              $('#ViewUserUserId').html(this.data[i]['UserId']);
              $('#ViewUserName').html(this.data[i]['Name']);
              $('#ViewUserEmail').html(this.data[i]['Email']);
              $('#ViewUserMobile').html(this.data[i]['Mobile']);
              $('#ViewUserRole').html(this.data[i]['Role']);
              $('#ViewUserCreated_By').html(this.data[i]['Created_By']);
              $('#ViewUserCreated_On').html(this.data[i]['Created_On']);
              $('#ViewUserModified_By').html(this.data[i]['Modified_By']);
              $('#ViewUserModified_On').html(this.data[i]['Modified_On']);
              $('#ViewUserStatus').html(this.data[i]['Status']);
            }
            if (source == 'edit') {
              $('.userPopup1').show();
              $('#editsUserName').val(this.data[i]['UserId']);
              $('#editpassword').val(this.data[i]['Password']);
              $('#editconfirmPassword').val(this.data[i]['Password']);
              $('#editName').val(this.data[i]['Name']);
              $('#editmobile').val(this.data[i]['Mobile']);
              $('#editemail').val(this.data[i]['Email']);
              $('#editrole').val(this.data[i]['Role']);
            }
          }
        }
      }
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
  closeEdit() {
    $('.userPopup1').hide();
  }
  validateEdit() {
    var err = 0;
    var name = ($("#editName").val()).toString();
    var namePattern = new RegExp('^[a-zA-Z ]+$');
    var emailPattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var mobilePattern = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

    if ($('#editsUserName').val() !== '') {
      $("#editName").removeClass('errDisplay');
      $('.unameErr').html('');
    } else {
      err++;
      $("#editsUserName").addClass('errDisplay');
      $('.unameErr').html('Enter Username');
    }
    if (name !== '') {
      if (!namePattern.test(name)) {
        err++;
        $("#editName").addClass('errDisplay');
        $('.nameErr').html('Enter full name');
      } else {
        var namearray = name.split(" ");
        if (namearray[1] === "" || namearray[0] === "" || namearray[1] === undefined) {
          err++;
          $("#editName").addClass('errDisplay');
          $('.nameErr').html('Enter full name')
        } else {
          $("#editName").removeClass('errDisplay');
          $('.nameErr').html('');
        }
      }
    } else {
      err++;
      $("#editName").addClass('errDisplay');
      $('.nameErr').html('Enter full name');
    }
    if ($("#editemail").val() !== '') {
      if (!emailPattern.test($("#editemail").val().toString())) {
        err++;
        $("#editemail").addClass('errDisplay');
        $('.emailErr').html('Enter Email');
      } else {
        $("#editemail").removeClass('errDisplay');
        $('.emailErr').html('');
      }
    } else {
      err++;
      $("#editemail").addClass('errDisplay');
      $('.emailErr').html('Enter Email');
    }
    if ($("#editmobile").val() !== '') {
      if (!mobilePattern.test($("#editmobile").val().toString())) {
        err++;
        $("#editmobile").addClass('errDisplay');
        $('.mobileErr').html('Enter Correct Mobile number');
      } else {
        $("#editmobile").removeClass('errDisplay');
        $('.mobileErr').html('');
      }
    } else {
      err++;
      $("#editmobile").addClass('errDisplay');
      $('.mobileErr').html('Enter Correct Mobile number');
    }
    if ($('#editrole').val() === null || $('#editrole').val() === '') {
      err++;
      $("#editrole").addClass('errDisplay');
      $('.roleErr').html('Select Role');
    } else {
      $("#editrole").removeClass('errDisplay');
      $('.roleErr').html('');
    }
    if ($("#editpassword").val() !== '') {
      if (($("#editpassword").val()).toString().length < 4) {
        err++;
        $("#editpassword").addClass('errDisplay');
        $('.passwordErr').html('Enter Password');
      } else {
        $("#editpassword").removeClass('errDisplay');
        $('.passwordErr').html('');
      }
    } else {
      err++;
      $("#editpassword").addClass('errDisplay');
      $('.passwordErr').html('Enter Password');
    }
    if ($('#editconfirmPassword').val() !== "") {
      if ($('#editconfirmPassword').val() !== $("#editpassword").val()) {
        err++;
        $("#editconfirmPassword").addClass('errDisplay');
        $('.cpasswordErr').html('Enter Same Password');
      } else {
        $("#editconfirmPassword").removeClass('errDisplay');
        $('.cpasswordErr').html('');
      }
    } else {
      err++;
      $("#editconfirmPassword").addClass('errDisplay');
      $('.cpasswordErr').html('Enter Same Password');
    }
    if (err === 0) {
      this.updateUser();
    }
  }
  updateUser() {
    $('.userPopup1').hide();
    $('.Usermessage').show();
    $('.UserPopupMessagebutton').hide();
    this.Message = 'Please Wait...'
    var url = '/registration/data/update';
    var post_data = {
      "UserId": $('#editsUserName').val(),
      "Password": $('#editpassword').val(),
      "Name": $('#editName').val(),
      "Mobile": $('#editmobile').val(),
      "Email": $('#editemail').val(),
      "Address": "work",
      "Role": $('#editrole').val(),
      "Allowed_Menu": {
        "users": this.allowedMenu.users,
        "vehicles": this.allowedMenu.vehicles,
        "inboundPocess": this.allowedMenu.inboundPocess,
        "outboundProcess": this.allowedMenu.outboundProcess,
        "registerCard": this.allowedMenu.registerCard
      }
    };
    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        $(".UserPopupMessagebutton").show();
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1) {
            this.Message = "User Data Updated Successfully!";
          } else if (data['status'] == 0) {
            this.Message = 'Update Failed';
          } else if (data['status'] == 100) {
            this.Message = 'Technical Issue ,Please Retry';
          }
        } else {
          this.Message = 'Technical Issue ,Please Retry'
        }
      }
    )
  }
  hideView() {
    $('.userViewPopup1').hide();
  }
  hideMessagePopup() {
    $('.Usermessage').hide();
    this.Edited = true;
    this.getData();
  }
  showCheckbox() {
    if (((<HTMLInputElement>document.getElementById("list2")).classList.contains('visible'))) {
      (<HTMLInputElement>document.getElementById("list2")).classList.remove('visible');
    }
    else
      (<HTMLInputElement>document.getElementById("list2")).classList.add('visible');
  }
  menuVal(isChecked, id) {

    if (id == 'users' && isChecked) {
      $('#editmenuOptionUsers').show();
      this.menuSelected++;
      this.allowedMenu.users = 'yes';
    } else if (id == 'users') {
      $('#editmenuOptionUsers').hide();
      this.menuSelected--;
      this.allowedMenu.users = 'no';
    }
    if (id == 'vehicles' && isChecked) {
      $('#editmenuOptionVehicles').show();
      this.menuSelected++;
      this.allowedMenu.vehicles = 'yes';
    } else if (id == 'vehicles') {
      $('#editmenuOptionVehicles').hide();
      this.menuSelected--;
      this.allowedMenu.vehicles = 'no';
    }
    if (id == 'inboundProcess' && isChecked) {
      $('#editmenuOptionInbound').show();
      this.menuSelected++;
      this.allowedMenu.inboundPocess = 'yes';
    } else if (id == 'inboundProcess') {
      $('#editmenuOptionInbound').hide();
      this.menuSelected--;
      this.allowedMenu.inboundPocess = 'no';
    }
    if (id == 'outboundProcess' && isChecked) {
      $('#editmenuOptionOutbound').show();
      this.menuSelected++;
      this.allowedMenu.outboundProcess = 'yes';
    } else if (id == 'outboundProcess') {
      $('#editmenuOptionOutbound').hide();
      this.menuSelected--;
      this.allowedMenu.outboundProcess = 'no';
    }
    if (id == 'registerCard' && isChecked) {
      $('#editmenuOptionRegister').show();
      this.menuSelected++;
      this.allowedMenu.registerCard = 'yes';
    } else if (id == 'registerCard') {
      $('#editmenuOptionRegister').hide();
      this.menuSelected--;
      this.allowedMenu.registerCard = 'no';
    }
    if (this.menuSelected == 0) {
      $('#editmenuOptionNone').show();
    } else {
      $('#editmenuOptionNone').hide();
    }
  }

}
