import { Component, OnInit } from '@angular/core';
import { data } from '../data';
import * as $ from "jquery";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  data1;
  Message;
  //dtOptions:DataTables.Settings = {};
  constructor(private serviceCall: ApiService) { }

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
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1 && data['msg'] == 'user exist') {
            this.Message = data['msg'];
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
      $('#VehicleNoDiv').addClass('errDisplay');
      err++
    }else{
      $('#VehicleNoDiv').removeClass('errDisplay');
    }
    if($('#Make').val() == ''){
      $('#MakeDiv').addClass('errDisplay');
      err++
    }else{
      $('#MakeDiv').removeClass('errDisplay');
    }
    if($('#Model').val() == ''){
      $('#ModelDiv').addClass('errDisplay');
      err++
    }else{
      $('#ModelDiv').removeClass('errDisplay');
    }
    if($('#Insurance_exp_date').val() == ''){
      $('#Insurance_exp_dateDiv').addClass('errDisplay');
      err++
    }else{
      $('#Insurance_exp_dateDiv').removeClass('errDisplay');
    }
    if($('#PUC_exp_date').val() == ''){
      $('#PUC_exp_dateDiv').addClass('errDisplay');
      err++
    }else{
      $('#PUC_exp_dateDiv').removeClass('errDisplay');
    }
    if($('#VehicleType').val() == ''){
      $('#VehicleTypeDiv').addClass('errDisplay');
      err++
    }else{
      $('#VehicleTypeDiv').removeClass('errDisplay');
    }
    if($('#Status').val() == ''){
      $('#StatusDiv').addClass('errDisplay');
      err++
    }else{
      $('#StatusDiv').removeClass('errDisplay');
    }

    if(err === 0){
      this.addVehcile();
    }
  }

}
