import { Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    feather.replace();
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
  hideshow(event,childName){
    var target = event.currentTarget;
    var pElement = target.className.split(" ")[1];
    if($('.'+childName).hasClass('side-menu__sub-open')){
      $('.'+childName).removeClass('side-menu__sub-open');
      $('.side-menu').find('.side-menu__sub-icon').removeClass('transform rotate-180');
    }else{
      $('.'+pElement).find('.side-menu__sub-icon').addClass('transform rotate-180');
    $('.'+childName).addClass('side-menu__sub-open');
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
  changeView(view){
    if(view == '/dashboard'){
    $('.signupdiv, .vehiclediv').hide();
    $('.dashboarddiv').fadeIn();
    }else if(view == '/signup'){
      $('.dashboarddiv, .vehiclediv').hide();
      $('.signupdiv').fadeIn();
    }else if(view == '/vehicle'){
      $('.dashboarddiv, .signupdiv').hide();
      $('.vehiclediv').fadeIn();
    }else if(view == '/users'){
      $('.dashboarddiv, .signupdiv').hide();
      $('.usersdiv').fadeIn();
    }else if(view == '/outbound'){
      $('.dashboarddiv, .signupdiv').hide();
      $('.outbounddiv').fadeIn();
    }else if(view == '/outBoundDashboard'){
      $('.dashboarddiv, .signupdiv').hide();
      $('.outBoundDashboarddiv').fadeIn();
    }else if(view == '/inBoundDashboard'){
      $('.dashboarddiv, .signupdiv').hide();
      $('.inBoundDashboarddiv').fadeIn();
    }else if(view == '/inBound'){
      $('.dashboarddiv, .signupdiv').hide();
      $('.inbounddiv').fadeIn();
    }else{
      $('.dashboarddiv, .signupdiv,.vehiclediv').hide();
    }
  }
  menuToggleMobile(){
    if($('.menuToggleMobile').is(":visible")){
      $('.menuToggleMobile').attr('style','display:none');
    }else{
      $('.menuToggleMobile').attr('style','display:block');
    }
  }

}
