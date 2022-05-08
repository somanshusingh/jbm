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
  UserName = ' User Name';
  Role = 'Role';
  constructor(private serviceCall: ApiService, private Router: Router) { }

  ngOnInit(): void {
    feather.replace();
    // if(this.serviceCall.Role == 'Admin'){
    //    $('.mobileVehicles, .mobileUsers ,.desktopVehicles ,.desktopUsers').show();
    // }
    // if(this.serviceCall.Role == 'Supervisor'){
    //    $('.mobileInboundProcess,.mobileOutboundProcess,.desktopInboundProcess,.desktopOutboundProcess').show();
    // }
    // if(this.serviceCall.Role == 'GateUser'){
    //    $('.mobileRegisterCard,.desktopRegisterCard').show();
    // }
    this.serviceCall.Allowed_Menu = {"users":"yes","vehicles":"yes","registerCard":"yes","inboundPocess":"yes","outboundProcess":"yes"};
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
    if (this.serviceCall.Role == undefined || this.serviceCall.Role == '' || this.serviceCall.Role == null) {
      //  this.Router.navigate(['/signin']);
    }
    if (this.serviceCall.UserName !== '') {
      this.UserName = this.serviceCall.UserName;
      this.Role = this.serviceCall.Role;
    }
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

    // if(pElement === 'vehicles'){
    //   $('.signupdiv').hide();
    //   $('.dashboarddiv').fadeIn();
    // } else if (pElement === 'users'){
    //   $('.dashboarddiv').hide();
    //   $('.signupdiv').fadeIn();
    // } else{
    //   $('.dashboarddiv').hide();
    //   $('.signupdiv').hide();
    // }
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
    } else if (view == '/inBound') {
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
  // addActive(className){
  //   $('.desktopVehiclesOption, .desktopUsersOption').removeClass('side-menu--active');
  //   $('.'+className).addClass('side-menu--active');
  // }

}
