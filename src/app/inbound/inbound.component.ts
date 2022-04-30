import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  }
  checkHistory(){
    if($("#VehicleNo").val() !== ''){
      let url = '/vehicle/view/' + $("#VehicleNo").val();
      this.serviceCall.getService(url).subscribe(
        data => {
          if(data['status'] == 1 && data['msg'] && data['msg'].length >0){
            $("#Material,#Material_Type, #Issued_By, #Issued_Date, #Driver_Name, #Driver_Number , #Time, #Consignee_Name, #Address, #Trip_No,#Gross_Weight,#Tare_Weight,#Net_Weight ,#addVehicleData").prop('disabled', false);
            $("#Make, #Model ,#vehicleInsurance_exp_date ,#PUC_exp_date").prop('disabled', true);
            this.Message =''
             $('#Make').val(data['msg'][0]['Make']);
             $('#Model').val(data['msg'][0]['Model']);
             $('#vehicleInsurance_exp_date').val(data['msg'][0]['vehicleInsurance_exp_date']);
             $('#PUC_exp_date').val(data['msg'][0]['PUC_exp_date']);
             $('#hiddenFields').show();
             this.isVehicleDataAvailable = true;
          }else if(data['status'] == 0){
            this.Message =data['msg'];
            $("#Material, #Issued_By, #Issued_Date, #Driver_Name, #Driver_Number , #Time, #Consignee_Name, #Address, #Trip_No,#Gross_Weight,#Tare_Weight,#Net_Weight,#addVehicleData, #Message, #Make, #Model ,#vehicleInsurance_exp_date ,#PUC_exp_date").prop('disabled', false);
            $("#Material, #Issued_By, #Issued_Date, #Driver_Name, #Driver_Number , #Time, #Consignee_Name, #Address, #Trip_No,#Gross_Weight,#Tare_Weight,#Net_Weight,#addVehicleData, #Message, #Make, #Model ,#vehicleInsurance_exp_date ,#PUC_exp_date").val('');
            this.isVehicleDataAvailable = false;
            $('#hiddenFields').show();
          }else if(data['status'] == 100){
            this.Message = JSON.stringify(data['msg']);
          }else{
            this.Message ='Something went wrong.';
          }
        }
      )
    }
  }

  addVehicleData(){
    let url = '/history/inhouse_transport'
    let post_data = {
      "BookNo": "JBM" + (Math.round(Math.random()*100000)),
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
      "Trip_No": (Math.round(Math.random()*100000)),
      "Gross_Weight": $('#inGross_Weight').val(),
      "Tare_Weight": $('#inTare_Weight').val(),
      "Net_Weight": $('#inNet_Weight').val()
  }


    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        $(".Popup1").show();
        if(data['status'] == 1){
          // this.Message =JSON.stringify(data['msg']);
          this.Message = "Vehicle Added Successfully";
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
    if($('#inGross_Weight').val() == ''){
      $('#inGross_Weight').addClass('errDisplay');
      err++
    }else{
      $('#inGross_Weight').removeClass('errDisplay');
    }
    if($('#inTare_Weight').val() == ''){
      $('#inTare_Weight').addClass('errDisplay');
      err++
    }else{
      $('#inTare_Weight').removeClass('errDisplay');
    }
    if($('#inNet_Weight').val() == ''){
      $('#inNet_Weight').addClass('errDisplay');
      err++
    }else{
      $('#inNet_Weight').removeClass('errDisplay');
    }
    if($('#inVnumber').val() == ''){
      $('#inVnumber').addClass('errDisplay');
      err++
    }else{
      $('#inVnumber').removeClass('errDisplay');
    }

    if(err == 0){
      this.addVehicleData();
    }
  }
  hidePopup(){
    $(".Popup1").hide();
    if(this.Message == 'Vehicle Added Successfully'){
      this.Router.navigate(['/inBoundDashboard']);
    }
  }

}
