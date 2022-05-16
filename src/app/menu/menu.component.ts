import { Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  UserName;
  Role = '';
  toggle = 'show';
  Message = '';
  data: any;
  cardStatus='';
  constructor(private serviceCall: ApiService, private Router: Router) { }

  ngOnInit(): void {
    var fullUrl = window.location.href.split('?')[1];
    this.serviceCall.sessionID = (fullUrl && fullUrl.split('=')[1]) ? fullUrl.split('=')[1] : '';
    feather.replace();
    this.getSession();
    this.getMaterial();
    if (this.serviceCall.Allowed_Menu.hasOwnProperty('users')) {
      if (this.serviceCall.Allowed_Menu['users'] == 'yes') {
        $('.mobileUsers ,.desktopUsers').show();
      }
      if (this.serviceCall.Allowed_Menu['vehicles'] == 'yes') {
        $('.mobileVehicles ,.desktopVehicles').show();
      }
      if (this.serviceCall.Allowed_Menu['registerCard'] == 'yes') {
        $('.mobileRegisterCard,.desktopRegisterCard').show();
      }
      if (this.serviceCall.Allowed_Menu['inboundPocess'] == 'yes') {
        $('.mobileInboundProcess,.desktopInboundProcess').show();
      }
      if (this.serviceCall.Allowed_Menu['outboundProcess'] == 'yes') {
        $('.mobileOutboundProcess,.desktopOutboundProcess').show();
      }
    }
    // if (this.serviceCall.Role == undefined || this.serviceCall.Role == '' || this.serviceCall.Role == null) {
    //    this.Router.navigate(['/signin']);
    // }
    // if (this.serviceCall.UserName !== '') {
    //   this.UserName = this.serviceCall.UserName;
    //   this.Role = this.serviceCall.Role;
    // }
    $('.dashboarddiv').hide();
    $('.signupdiv').hide();
    $('.vehiclediv').hide();
    $('.usersdiv').hide();
    $('.outbounddiv').hide();
    $('.inbounddiv').hide();
    $('.outBoundDashboarddiv').hide();
    $('.inBoundDashboarddiv').hide();
    this.changeView(window.location.pathname);
  }
  hideshow(event, childName) {
    $('#subs').show();
    // (click)="hideshow($event,'vehiclesOption')"
    var target = event.currentTarget;
    var pElement = target.className.split(" ")[1];
    if ($('.' + childName).hasClass('side-menu__sub-open')) {
      $('.' + childName).removeClass('side-menu__sub-open');
      $('.side-menu').find('.side-menu__sub-icon').removeClass('transform rotate-180');
    } else {
      $('.' + pElement).find('.side-menu__sub-icon').addClass('transform rotate-180');
      $('.' + childName).addClass('side-menu__sub-open');
    }
    if (childName == 'vehiclesOption') {
      if ($(".gateprocess").attr('class') == "fa-solid fa-chevron-left gateprocess") {
        $(".gateprocess").attr('class', 'fa-solid fa-chevron-down gateprocess');
      } else {
        $(".gateprocess").attr('class', 'fa-solid fa-chevron-left gateprocess');
      }
    }
    if (childName == 'Gate1Option') {
      if ($(".gatein").attr('class') == "fa-solid fa-chevron-left gatein") {
        $(".gatein").attr('class', 'fa-solid fa-chevron-down gatein');
      } else {
        $(".gatein").attr('class', 'fa-solid fa-chevron-left gatein');
      }
    }
  }
  hideshowMobile(event, childName) {
    var target = event.currentTarget;
    var pElement = target.className.split(" ")[1];
    if ($('.' + childName).hasClass('menu__sub-open')) {
      $('.' + childName).removeClass('menu__sub-open');
      $('.side-menu').find('.side-menu__sub-icon').removeClass('transform rotate-180');
    } else {
      $('.' + pElement).find('.side-menu__sub-icon').addClass('transform rotate-180');
      $('.' + childName).addClass('menu__sub-open');
    }
  }
  changeView(view) {
    if (view == '/dashboard') {
      $('.signupdiv, .vehiclediv').hide();
      $('.dashboarddiv').fadeIn();
    } else if (view == '/signup') {
      $('.dashboarddiv, .vehiclediv').hide();
      $('.signupdiv').fadeIn();
    } else if (view == '/vehicle') {
      $('.dashboarddiv, .signupdiv').hide();
      $('.vehiclediv').fadeIn();
    } else if (view == '/users') {
      $('.dashboarddiv, .signupdiv').hide();
      $('.usersdiv').fadeIn();
    } else if (view == '/outbound') {
      $('.dashboarddiv, .signupdiv').hide();
      $('.outbounddiv').fadeIn();
    } else if (view == '/outBoundDashboard') {
      $('.dashboarddiv, .signupdiv').hide();
      $('.outBoundDashboarddiv').fadeIn();
    } else if (view == '/inBoundDashboard') {
      $('.dashboarddiv, .signupdiv').hide();
      $('.inBoundDashboarddiv').fadeIn();
    } else if (view == '/inBound' || view == '/inBound/inhouse') {
      $('.dashboarddiv, .signupdiv').hide();
      $('.inbounddiv').fadeIn();
    } else {
      $('.dashboarddiv, .signupdiv,.vehiclediv').hide();
    }
  }
  menuToggleMobile() {
    if ($('.menuToggleMobile').is(":visible")) {
      $('.menuToggleMobile').attr('style', 'display:none');
    } else {
      $('.menuToggleMobile').attr('style', 'display:block');
    }
  }

  hideMenuNames() {
    $('.hideMenuOnClick').toggle();
    if (this.toggle == 'show') {
      this.toggle = 'hide';
      $('.side-nav').attr('style', 'width: 88px;');
      $('#subs').hide();
      $('.disableOnClick').addClass('disabled');
      $('.disableOnClick').attr('disabled', 'disabled');
    } else {
      this.toggle = 'show';
      $('.side-nav').attr('style', 'width: 230px;');
      $('.disableOnClick').removeClass('disabled');
    }

  }
  hideProfilePopup() {
    $(".Popup1Profile").hide();
  }
  showChangeOpt() {
    $('.Popup1Profile,#popOptions,.PopupMessagebutton').show();
    this.Message = '';
    $('#popMessageReset,.PopupMessageShow').hide();
    $("#menuPassword").val('');
    $("#menuConfirmPassword").val('');
  }
  changePassword() {
    var err = 0
    if ($("#menuPassword").val() !== '') {
      $("#menuPassword").removeClass('errDisplay');
      $("#menupasswordErr").html('');
    } else {
      err++;
      $("#menuPassword").addClass('errDisplay');
      $("#passwordErr").html('Enter Password');
    }
    if ($("#menuConfirmPassword").val() !== '' && $("#menuConfirmPassword").val() == $("#menuPassword").val()) {
      $("#menuConfirmPassword").removeClass('errDisplay');
      $("#menucPasswordErr").html('');
    } else {
      err++;
      $("#menuConfirmPassword").addClass('errDisplay');
      $("#menucPasswordErr").html('Confirm Password');
    }
    if (err == 0) {
      $('#popOptions,.PopupMessagebutton').hide();
      this.Message = 'Please Wait...';
      $('#popMessageReset').show();
      var url = "/registration/pwd/update";
      var post_data = {
        "UserId": this.serviceCall.UserId,
        "Password": $("#menuPassword").val(),
        "Modified_By": this.serviceCall.UserId
      }
      this.serviceCall.signin(url, post_data).subscribe(data => {
        $('.PopupMessageShow').show()
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1) {
            this.Message = "Password Changed!";
          } else {
            this.Message = "User does not exists.";
          }
        } else {
          this.Message = "Technical Issue.";
        }
      })
    }
  }
  hidePopupMsg() {
    if (this.Message == "Password Changed!") {
      $(".Popup1Profile").hide();
    } else {
      $('#popOptions,.PopupMessagebutton').show();
      this.Message = '';
      $('#popMessageReset,.PopupMessageShow').hide();
    }
  }
  getSession() {
    var url = "/session/get/" + this.serviceCall.sessionID;
    // this.serviceCall.getSession(url).subscribe(data => {
    this.serviceCall.getService(url).subscribe(data => {
      // debugger;
      console.log(data);
      this.data = data;
      if (this.data.hasOwnProperty('status') && this.data['status'] == 1) {
        if (this.data.hasOwnProperty('msg') && this.data['msg'].length > 0 && this.data['msg'][0].hasOwnProperty('data') && this.data['msg'][0]['data'].hasOwnProperty('user')) {
          this.serviceCall.UserId = this.data['msg'][0]['data']['user'].hasOwnProperty('UserId') ? this.data['msg'][0]['data']['user']['UserId'] : '';
          this.serviceCall.Role = this.data['msg'][0]['data']['user'].hasOwnProperty('Role') ? this.data['msg'][0]['data']['user']['Role'] : '';
          this.Role = this.serviceCall.Role;
          this.serviceCall.UserName = this.data['msg'][0]['data']['user'].hasOwnProperty('Name') ? this.data['msg'][0]['data']['user']['Name'] : '';
          this.UserName = this.serviceCall.UserName;
          this.serviceCall.Allowed_Menu = this.data['msg'][0]['data']['user'].hasOwnProperty('Allowed_Menu') ? this.data['msg'][0]['data']['user']['Allowed_Menu'] : {};
          if (this.serviceCall.UserId == '') {
            this.Router.navigate(['/signin']);
          }
        } else {
          this.Router.navigate(['/signin'])
        }
      } else {
        this.Router.navigate(['/signin'])
      }
      if (this.serviceCall.Allowed_Menu.hasOwnProperty('users')) {
        if (this.serviceCall.Allowed_Menu['users'] == 'yes') {
          $('.mobileUsers ,.desktopUsers').show();
        }
        if (this.serviceCall.Allowed_Menu['vehicles'] == 'yes') {
          $('.mobileVehicles ,.desktopVehicles').show();
        }
        if (this.serviceCall.Allowed_Menu['registerCard'] == 'yes') {
          $('.mobileRegisterCard,.desktopRegisterCard').show();
        }
        if (this.serviceCall.Allowed_Menu['inboundPocess'] == 'yes') {
          $('.mobileInboundProcess,.desktopInboundProcess').show();
        }
        if (this.serviceCall.Allowed_Menu['outboundProcess'] == 'yes') {
          $('.mobileOutboundProcess,.desktopOutboundProcess').show();
        }
      }

    },
      (error) => {
        this.Router.navigate(['/signin']);
      }
    )
  }
  endSession() {
    debugger;
    var url = "/session/end/" + this.serviceCall.sessionID;
    this.serviceCall.getService(url).subscribe(data => {
      // this.Router.navigate(['/signin']);
      console.log(data);
      window.location.reload();
    })
  }
  getMaterial() {
    let url = "/master/material/view"
    var same = false;
    this.serviceCall.getService(url).subscribe(data => {
      for (var i in data['msg']) {
        same = false;
        if (this.serviceCall.Material.length > 0) {
          for (var a in this.serviceCall.Material) {
            if (this.serviceCall.Material[a]['MaterialName'] === data['msg'][i]['MaterialName']) {
              same = true;
            }
          }
          if (same == false) {
            this.serviceCall.Material.push(data['msg'][i]);
          }
        } else {
          this.serviceCall.Material.push(data['msg'][i]);
        }
      }
    }, (error) => {

    })
  }
  navigate(path) {
    this.Router.navigate([path], { queryParams: { sessionID: this.serviceCall.sessionID } })
  }
  gateProcessClick() {
    if ($("#id_gateprocess").attr('class') == "fa-solid fa-chevron-left") {
      $("#id_gateprocess").attr('class', 'fa-solid fa-chevron-down');
    } else {
      $("#id_gateprocess").attr('class', 'fa-solid fa-chevron-left');
    }
  }
  OpenCardPopup(){
    $('.CardMenu').show();
  }
  hideCardPopup(){
    $('.CardMenu').hide();
  }
  SendCardNo() {
    let url = '/getData';
    this.serviceCall.getCardNumber(url).subscribe(
      data => {
        $('.CardMenu').hide();
        if (data['status'] == 1 && data['msg']) {
          let url = '/history/card/out/' + data['msg'];//'27002298E479'
          this.serviceCall.getService(url).subscribe(data=>{
            if (data['status'] == 1) {
              this.cardStatus = 'Trip Closed Successfully.';
              $('.PopupMenu').show();
            }else{
              this.cardStatus = 'Error - '+JSON.stringify(data['msg']);
              $('.PopupMenu').show();
            }
          }, (error) => {
            this.cardStatus = 'Something went wrong.';
            $('.PopupMenu').show();
          }
          )
        } else {
          this.cardStatus = 'Unable to get card number.';
          $('.PopupMenu').show();
        }
      }, (error) => {
        $('.CardMenu').hide();
        this.cardStatus = 'Something went wrong.';
        $('.PopupMenu').show();
      })
  }
  hidePopup(){
    $('.PopupMenu').hide();
  }
}
