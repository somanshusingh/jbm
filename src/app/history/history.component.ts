import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  isVehicleDataAvailable: any;
  Message='';

  constructor(private serviceCall: ApiService) { }

  ngOnInit(): void {
  }
  checkHistory(){
    if($("#VehicleNo").val() !== ''){
      let url = '/vehicle/view/' + $("#VehicleNo").val();
      this.serviceCall.getService(url, ).subscribe(
        data => {
          if(data['status'] == 1 && data['msg'] && data['msg'].length >0){
            $("#Material,#Material_Type, #Issued_By, #Issued_Date, #Driver_Name, #Driver_Number , #Time, #Consignee_Name, #Address, #Trip_No,#Gross_Weight,#Tare_Weight,#Net_Weight ,#addVehicleData").prop('disabled', false);
            $("#Make, #Model ,#Insurance_exp_date ,#PUC_exp_date").prop('disabled', true);
            this.Message =''
             $('#Make').val(data['msg'][0]['Make']);
             $('#Model').val(data['msg'][0]['Model']);
             $('#Insurance_exp_date').val(data['msg'][0]['Insurance_exp_date']);
             $('#PUC_exp_date').val(data['msg'][0]['PUC_exp_date']);
             $('#hiddenFields').show();
             this.isVehicleDataAvailable = true;
          }else if(data['status'] == 0){
            this.Message =data['msg'];
            $("#Material, #Issued_By, #Issued_Date, #Driver_Name, #Driver_Number , #Time, #Consignee_Name, #Address, #Trip_No,#Gross_Weight,#Tare_Weight,#Net_Weight,#addVehicleData, #Message, #Make, #Model ,#Insurance_exp_date ,#PUC_exp_date").prop('disabled', false);
            $("#Material, #Issued_By, #Issued_Date, #Driver_Name, #Driver_Number , #Time, #Consignee_Name, #Address, #Trip_No,#Gross_Weight,#Tare_Weight,#Net_Weight,#addVehicleData, #Message, #Make, #Model ,#Insurance_exp_date ,#PUC_exp_date").val('');
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
      "BookNo": $('#BookNo').val(),
      "VehicleNo": $('#VehicleNo').val(),
      "Make": $('#Make').val(),
      "Model": $('#Model').val(),
      "Insurance_exp_date": $('#Insurance_exp_date').val(),
      "PUC_exp_date": $('#PUC_exp_date').val(),
      "Material_Type": $('#Material_Type').val(),
      "Material": $('#Material').val(),
      "Issued_By": $('#Issued_By').val(),
      "Issued_Date": $('#Issued_Date').val(),
      "Driver_Name": $('#Driver_Name').val(),
      "Driver_Number": $('#Driver_Number').val(),
      "Time": $('#Time').val(),
      "Consignee_Name": $('#Consignee_Name').val(),
      "Address": $('#Address').val(),
      "Trip_No": $('#Trip_No').val(),
      "Gross_Weight": $('#Gross_Weight').val(),
      "Tare_Weight": $('#Tare_Weight').val(),
      "Net_Weight": $('#Net_Weight').val()
  }
    if(this.isVehicleDataAvailable == false){
      url ='/history/outside_transport';
    }

    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        if(data['status'] == 1){
          this.Message =JSON.stringify(data['msg']);
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
    if($('#Material').val() == ''){
      $('#Material').addClass('errDisplay');
      err++
    }else{
      $('#Material').removeClass('errDisplay');
    }
    if($('#Material_Type').val() == ''){
      $('#Material_Type').addClass('errDisplay');
      err++
    }else{
      $('#Material_Type').removeClass('errDisplay');
    }
    if($('#Issued_By').val() == ''){
      $('#Issued_By').addClass('errDisplay');
      err++
    }else{
      $('#Issued_By').removeClass('errDisplay');
    }
    if($('#Issued_Date').val() == ''){
      $('#Issued_Date').addClass('errDisplay');
      err++
    }else{
      $('#Issued_Date').removeClass('errDisplay');
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
    if($('#Time').val() == ''){
      $('#Time').addClass('errDisplay');
      err++
    }else{
      $('#Time').removeClass('errDisplay');
    }
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
    if($('#Trip_No').val() == ''){
      $('#Trip_No').addClass('errDisplay');
      err++
    }else{
      $('#Trip_No').removeClass('errDisplay');
    }
    if($('#Gross_Weight').val() == ''){
      $('#Gross_Weight').addClass('errDisplay');
      err++
    }else{
      $('#Gross_Weight').removeClass('errDisplay');
    }
    if($('#Tare_Weight').val() == ''){
      $('#Tare_Weight').addClass('errDisplay');
      err++
    }else{
      $('#Tare_Weight').removeClass('errDisplay');
    }
    if($('#Net_Weight').val() == ''){
      $('#Net_Weight').addClass('errDisplay');
      err++
    }else{
      $('#Net_Weight').removeClass('errDisplay');
    }

    if(err == 0){
      this.addVehicleData();
    }
  }

}
