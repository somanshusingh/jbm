import { Component, OnInit } from '@angular/core';
import { data } from '../data';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  data1;
  Message;
  //dtOptions:DataTables.Settings = {};
  constructor(private serviceCall: ApiService,private Router: Router) { }

  ngOnInit(): void {
    this.data1 = data;
    // this.dtOptions = {
    //   pagingType:'full_numbers',
    //   pageLength:5,
    //   lengthMenu:[5,15,25],
    //   processing:true
    // };
    // $("#tableData").DataTable({
    //   data:this.data1,
    //   "columns":[
    //     {"data":"FullName"},
    //     {"data":"Email"},
    //     {"data":"ContactNo"},
    //     {"data":"ExpectedTime"},
    //     {"data":"ArrivalTime"}
    //   ]
    // })
  }
  addVehcile() {
    var url = '/vehicle/registration';
    var post_data = {
     "VehicleNo":$('#VehicleNo').val(),
     "Make":$('#Make').val(),
     "Model":$('#Model').val(),
     "Insurance_exp_date":$('#Insurance_exp_date').val(),
     "PUC_exp_date":$('#PUC_exp_date').val(),
     "VehicleType":$('#VehicleType').val(),
     "Status":$('#Status').val(),
     "Created_By":"ID2"
     };
    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        $(".Popup1").show();
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1) {
            this.Message = 'Vehicle Added Successfully';
           // this.Router.navigate(['/signin']);
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

  validate(){
    var err = 0 
    if($('#VehicleNo').val() == ''){
      $('#VehicleNo').addClass('errDisplay');
      err++
    }else{
      $('#VehicleNo').removeClass('errDisplay');
    }
    if($('#Make').val() == ''){
      $('#Make').addClass('errDisplay');
      err++
    }else{
      $('#Make').removeClass('errDisplay');
    }
    if($('#Model').val() == ''){
      $('#Model').addClass('errDisplay');
      err++
    }else{
      $('#Model').removeClass('errDisplay');
    }
    if($('#Insurance_exp_date').val() == ''){
      $('#Insurance_exp_date').addClass('errDisplay');
      err++
    }else{
      $('#Insurance_exp_date').removeClass('errDisplay');
    }
    if($('#PUC_exp_date').val() == ''){
      $('#PUC_exp_date').addClass('errDisplay');
      err++
    }else{
      $('#PUC_exp_date').removeClass('errDisplay');
    }
    if($('#VehicleType').val() == ''){
      $('#VehicleType').addClass('errDisplay');
      err++
    }else{
      $('#VehicleType').removeClass('errDisplay');
    }
    if($('#Status').val() == ''){
      $('#Status').addClass('errDisplay');
      err++
    }else{
      $('#Status').removeClass('errDisplay');
    }

    if(err === 0){
      this.addVehcile();
    }
  }
  hidePopup(){
    $(".Popup1").hide();
    if(this.Message == 'Vehicle Added Successfully'){
      this.Router.navigate(['/dashboard']);
    }
  }

}
