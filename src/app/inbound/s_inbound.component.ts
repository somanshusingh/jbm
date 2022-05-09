import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-inbound',
  templateUrl: './inbound.component.html',
  styleUrls: ['./inbound.component.css']
})
export class InboundComponent implements OnInit {
  isVehicleDataAvailable: any;
  Message='';

  constructor(private serviceCall: ApiService,private Router: Router) { }

  ngOnInit(): void {
    $('#MaterialIn, #DriverDetailsIn,.addButtonin').hide();
  }
  checkHistory(){
      let url = '/vehicle/view/' + $("#checkVehicleNumber").val();
      this.serviceCall.getService(url).subscribe(
        data => {
          if(data['status'] == 1 && data['msg'] && data['msg'].length >0){
            this.Message = ''
            let Insurance_exp_date = data['msg'][0]['Insurance_exp_date'];
            let PUC_exp_date = data['msg'][0]['PUC_exp_date'];
            if (moment().diff(moment(Insurance_exp_date)) <= 0) {
              if (moment().diff(moment(PUC_exp_date)) <= 0) {
                $('#VehicleNumberForm').hide();
                $('#inboundForm').show();
                $('#invehicleMake').val(data['msg'][0]['Make']);
                $('#inVehicleModel').val(data['msg'][0]['Model']);
                $('#invehicleInsurance_exp_date').val(data['msg'][0]['Insurance_exp_date'].split('T')[0]);
                $('#inVPUC_exp_date').val(data['msg'][0]['PUC_exp_date'].split('T')[0]);
                $('#inVnumber').val($("#checkVehicleNumber").val());
                $('#inIssued_By').val(this.serviceCall.Role);
                this.isVehicleDataAvailable = true;
              } else {
                this.Message = "Vehicle PUC Expire";
                $('.Popup1').show();
              }
            } else {
              this.Message = "Vehicle Insurance Expire";
              $('.Popup1').show();
            }
          }else if(data['status'] == 0){
            this.Message =data['msg'];
            $('.Popup1').show();
          }else if(data['status'] == 100){
            this.Message = JSON.stringify(data['msg']);
            $('.Popup1').show();
          }else{
            this.Message ='Something went wrong.';
            $('.Popup1').show();
          }
        }
      )
  }

  addVehicleData(){
    let url = '/history/inhouse_transport'
    let post_data = {
      "Trip_No": (Math.round(Math.random()*100000)),
      "VehicleNo": $('#inVnumber').val(),
      // "Make": $('#vehicleMake').val(),
      // "Model": $('#VehicleModel').val(),
      // "Insurance_exp_date": $('#vehicleInsurance_exp_date').val(),
      // "PUC_exp_date": $('#VPUC_exp_date').val(),
      "Material_Type": $('#inMaterial_Type').val(),
      "Material": $('#inMaterial').val(),
      "Issued_By": $('#inIssued_By').val(),
      "Issued_Date": $('#inIssued_Date').val(),
      "Driver_Name": $('#inDriver_Name').val(),
      "Driver_Number": $('#inDriver_Number').val(),
      "Time": $('#inTime').val(),
      "Consignee_Name": $('#inConsignee_Name').val(),
      "Address": $('#inAddress').val(),
      "Qty_Mt_Weight": $('#qty_mt_Weight').val(),
      // "Gross_Weight": $('#inGross_Weight').val(),
      // "Tare_Weight": $('#inTare_Weight').val(),
      // "Net_Weight": $('#inNet_Weight').val()
  }


    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        $(".Popup1").show();
        if(data['status'] == 1){
          // this.Message =JSON.stringify(data['msg']);
          this.Message = "Trip Created Successfully";
        }else if(data['status'] == 0){
          this.Message = 'Error - ' +JSON.stringify(data['msg']);
        }else if(data['status'] == 100){
          this.Message = JSON.stringify(data['msg']);
        }else{
          this.Message = 'Something went wrong.';
        }
      })
  }

  validate(){
    var err = 0 
    // if($('#vehicleMake').val() == ''){
    //   $('#vehicleMake').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#vehicleMake').removeClass('errDisplay');
    // }
    // if($('#VehicleModel').val() == ''){
    //   $('#VehicleModel').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#VehicleModel').removeClass('errDisplay');
    // }
    // if($('#vehicleInsurance_exp_date').val() == ''){
    //   $('#vehicleInsurance_exp_date').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#vehicleInsurance_exp_date').removeClass('errDisplay');
    // }
    // if($('#VPUC_exp_date').val() == ''){
    //   $('#VPUC_exp_date').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#VPUC_exp_date').removeClass('errDisplay');
    // }
    if($('#inMaterial').val() == ''){
      $('#inMaterial').addClass('errDisplay');
      err++
    }else{
      $('#inMaterial').removeClass('errDisplay');
    }
    if($('#inMaterial_Type').val() == ''){
      $('#inMaterial_Type').addClass('errDisplay');
      err++
    }else{
      $('#inMaterial_Type').removeClass('errDisplay');
    }
    if($('#inIssued_By').val() == ''){
      $('#inIssued_By').addClass('errDisplay');
      err++
    }else{
      $('#inIssued_By').removeClass('errDisplay');
    }
    if($('#inIssued_Date').val() == ''){
      $('#inIssued_Date').addClass('errDisplay');
      err++
    }else{
      $('#inIssued_Date').removeClass('errDisplay');
    }
    if($('#inDriver_Name').val() == ''){
      $('#inDriver_Name').addClass('errDisplay');
      err++
    }else{
      $('#inDriver_Name').removeClass('errDisplay');
    }
    if($('#inDriver_Number').val() == ''){
      $('#inDriver_Number').addClass('errDisplay');
      err++
    }else{
      $('#inDriver_Number').removeClass('errDisplay');
    }
    if($('#inTime').val() == ''){
      $('#inTime').addClass('errDisplay');
      err++
    }else{
      $('#inTime').removeClass('errDisplay');
    }
    if($('#inConsignee_Name').val() == ''){
      $('#inConsignee_Name').addClass('errDisplay');
      err++
    }else{
      $('#inConsignee_Name').removeClass('errDisplay');
    }
    if($('#inAddress').val() == ''){
      $('#inAddress').addClass('errDisplay');
      err++
    }else{
      $('#inAddress').removeClass('errDisplay');
    }
    if($('#inTrip_No').val() == ''){
      $('#inTrip_No').addClass('errDisplay');
      err++
    }else{
      $('#inTrip_No').removeClass('errDisplay');
    }
    // if($('#inGross_Weight').val() == ''){
    //   $('#inGross_Weight').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#inGross_Weight').removeClass('errDisplay');
    // }
    // if($('#inTare_Weight').val() == ''){
    //   $('#inTare_Weight').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#inTare_Weight').removeClass('errDisplay');
    // }
    // if($('#inNet_Weight').val() == ''){
    //   $('#inNet_Weight').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#inNet_Weight').removeClass('errDisplay');
    // }
    if($('#inVnumber').val() == ''){
      $('#inVnumber').addClass('errDisplay');
      err++
    }else{
      $('#inVnumber').removeClass('errDisplay');
    }
    if($('#qty_mt_Weight').val() == ''){
      $('#qty_mt_Weight').addClass('errDisplay');
      err++
    }else{
      $('#qty_mt_Weight').removeClass('errDisplay');
    }

    if(err == 0){
      this.addVehicleData();
    }
  }
  hidePopup(){
    $(".Popup1").hide();
    if(this.Message == 'Trip Created Successfully'){
      this.Router.navigate(['/inBoundDashboard']);
    }
  }
  validateVehicleNumber(){
    var vehicleNumberPatter = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/
    if($('#checkVehicleNumber').val() !== ""){
      // if(!vehicleNumberPatter.test($('#checkVehicleNumber').val().toString().toUpperCase())){
      //   $('#checkVehicleNumber').addClass('errDisplay');
      // }else{
      //   $('#checkVehicleNumber').removeClass('errDisplay');
      //   this.checkHistory();
      // }
      this.checkHistory();
    }else{
      $('#checkVehicleNumber').addClass('errDisplay');
    }
  }
  active(className) {
    $('.vehicle, .Driver, .Material').removeClass('top-menu--active');
    $('#MaterialIn, #DriverDetailsIn, #VehcileDataIn,.addButtonin').hide();
    $('.' + className).addClass('top-menu--active');
    if(className =="Material"){
      $('#MaterialIn ,.addButtonin').show();
    }
    if(className =="Driver"){
      $('#DriverDetailsIn').show();
    }
    if(className =="vehicle"){
      $('#VehcileDataIn').show();
    }
  }
}
