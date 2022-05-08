import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  isVehicleDataAvailable: any;
  Message='';

  constructor(private serviceCall: ApiService,private Router: Router) { }

  ngOnInit(): void {
    $('#MaterialOut, #DriverDetailsOut,.addButtonOut').hide();
  }
  checkHistory(){
    let url = '/vehicle/view/' + $("#checkOutVehicleNumber").val();
    this.serviceCall.getService(url).subscribe(
      data => {
        if(data['status'] == 1 && data['msg'] && data['msg'].length >0){
          this.Message =''
           $('#OutVehicleNumberForm').hide();
           $('#outboundForm').show();
           $('#vehicleMake').val(data['msg'][0]['Make']);
           $('#VehicleModel').val(data['msg'][0]['Model']);
           $('#vehicleInsurance_exp_date').val(data['msg'][0]['Insurance_exp_date'].split('T')[0]);
           $('#VPUC_exp_date').val(data['msg'][0]['PUC_exp_date'].split('T')[0]);
           $('#Vnumber').val($('#checkOutVehicleNumber').val());
           $('#Issued_By').val(this.serviceCall.Role);
           $("#vehicleMake,#VehicleModel,#vehicleInsurance_exp_date,#VPUC_exp_date,#Vnumber").attr('disabled','disabled');
           this.isVehicleDataAvailable = true;
        }else if(data['status'] == 0){
          $('#OutVehicleNumberForm').hide();
          $('#outboundForm').show();
          this.isVehicleDataAvailable = false;
          $('#Vnumber').val($('#checkOutVehicleNumber').val());
          $("#Vnumber").attr('disabled','disabled');
          // this.Message =data['msg'];
          // $('.Popup1').show();
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
    let url = '/history/outside_transport'
    let post_data = {
      "Trip_No": (Math.round(Math.random()*100000)),
      "VehicleNo": $('#Vnumber').val(),
      "Make": $('#vehicleMake').val(),
      "Model": $('#VehicleModel').val(),
      "Insurance_exp_date": $('#vehicleInsurance_exp_date').val(),
      "PUC_exp_date": $('#VPUC_exp_date').val(),
      "Material_Type": $('#Material_Type').val(),
      "Material": $('#Material').val(),
      "Issued_By": $('#Issued_By').val(),
      "Issued_Date": $('#Issued_Date').val(),
      "Driver_Name": $('#Driver_Name').val(),
      "Driver_Number": $('#Driver_Number').val(),
      "Time": $('#Time').val(),
      "Consignee_Name": $('#Consignee_Name').val(),
      "Address": $('#Address').val(),
      // "Gross_Weight": $('#Gross_Weight').val(),
      // "Tare_Weight": $('#Tare_Weight').val(),
      // "Net_Weight": $('#Net_Weight').val(),
      "Qty_Mt_Weight": $('#outqty_mt_Weight').val(),
      "Vehicle":this.isVehicleDataAvailable
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
    // if($('#Material').val() == ''){
    //   $('#Material').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#Material').removeClass('errDisplay');
    // }
    if($('#Material_Type').val() == ''){
      $('#Material_Type').addClass('errDisplay');
      err++
    }else{
      $('#Material_Type').removeClass('errDisplay');
    }
    // if($('#Issued_By').val() == ''){
    //   $('#Issued_By').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#Issued_By').removeClass('errDisplay');
    // }
    // if($('#Issued_Date').val() == ''){
    //   $('#Issued_Date').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#Issued_Date').removeClass('errDisplay');
    // }
    // if($('#Time').val() == ''){
    //   $('#Time').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#Time').removeClass('errDisplay');
    // }
    // if($('#Trip_No').val() == ''){
    //   $('#Trip_No').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#Trip_No').removeClass('errDisplay');
    // }
    // if($('#Gross_Weight').val() == ''){
    //   $('#Gross_Weight').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#Gross_Weight').removeClass('errDisplay');
    // }
    // if($('#Tare_Weight').val() == ''){
    //   $('#Tare_Weight').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#Tare_Weight').removeClass('errDisplay');
    // }
    // if($('#Net_Weight').val() == ''){
    //   $('#Net_Weight').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#Net_Weight').removeClass('errDisplay');
    // }
    if($('#outqty_mt_Weight').val() == ''){
        $('#outqty_mt_Weight').addClass('errDisplay');
        err++
      }else{
        $('#outqty_mt_Weight').removeClass('errDisplay');
    }
    if(err == 0){
      this.addVehicleData();
    }
  }
  validateVehicleDetails(){
    var err = 0 
    if($('#vehicleMake').val() == ''){
      $('#vehicleMake').addClass('errDisplay');
      err++
    }else{
      $('#vehicleMake').removeClass('errDisplay');
    }
    if($('#VehicleModel').val() == ''){
      $('#VehicleModel').addClass('errDisplay');
      err++
    }else{
      $('#VehicleModel').removeClass('errDisplay');
    }
    if($('#vehicleInsurance_exp_date').val() == ''){
      $('#vehicleInsurance_exp_date').addClass('errDisplay');
      err++
    }else{
      $('#vehicleInsurance_exp_date').removeClass('errDisplay');
    }
    if($('#VPUC_exp_date').val() == ''){
      $('#VPUC_exp_date').addClass('errDisplay');
      err++
    }else{
      $('#VPUC_exp_date').removeClass('errDisplay');
    }
    if($('#Vnumber').val() == ''){
      $('#Vnumber').addClass('errDisplay');
      err++
    }else{
      $('#Vnumber').removeClass('errDisplay');
    }
    if(err == 0){
      this.active('Driver');
    }
  }
  validateDirverDetails(){
    var err = 0 
    if($('#Consignee_Name').val() == ''){
      $('#Consignee_Name').addClass('errDisplay');
      err++
    }else{
      $('#Consignee_Name').removeClass('errDisplay');
    }
    if($('#Address').val() == ''){
      $('#Address').addClass('errDisplay');
      err++
    }else{
      $('#Address').removeClass('errDisplay');
    }
    if($('#Driver_Name').val() == ''){
      $('#Driver_Name').addClass('errDisplay');
      err++
    }else{
      $('#Driver_Name').removeClass('errDisplay');
    }
    if($('#Driver_Number').val() == ''){
      $('#Driver_Number').addClass('errDisplay');
      err++
    }else{
      $('#Driver_Number').removeClass('errDisplay');
    }
    if(err == 0){
      this.active('Material');
    }
  }
  hidePopup(){
    $(".Popup1").hide();
    if(this.Message == 'Trip Created Successfully'){
      this.Router.navigate(['/outBoundDashboard']);
    }
  }
  validateVehicleNumber(){
    var vehicleNumberPatter = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/
    if($('#checkOutVehicleNumber').val() !== ""){
      // if(!vehicleNumberPatter.test($('#checkOutVehicleNumber').val().toString().toUpperCase())){
      //   $('#checkOutVehicleNumber').addClass('errDisplay');
      // }else{
      //   $('#checkOutVehicleNumber').removeClass('errDisplay');
      //   this.checkHistory();
      // }
      this.checkHistory();
    }else{
      $('#checkOutVehicleNumber').addClass('errDisplay');
    }
  }
  active(className) {
    $('.vehicle, .Driver, .Material').removeClass('top-menu--active');
    $('#MaterialOut, #DriverDetailsOut, #VehcileDataOut,.addButtonOut').hide();
    $('.' + className).addClass('top-menu--active');
    if(className =="Material"){
      $('#MaterialOut ,.addButtonOut').show();
    }
    if(className =="Driver"){
      $('#DriverDetailsOut').show();
    }
    if(className =="vehicle"){
      $('#VehcileDataOut').show();
    }
  }

}
