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
  Message = '';
  uploadedFiles = [];
  uploadfile_name: any;
  docStatus='';

  constructor(private serviceCall: ApiService, private Router: Router) { }

  ngOnInit(): void {
    $('#MaterialIn, #DriverDetailsIn,.addButtonin,.tab2').hide();
  }
  checkHistory() {
    let url = '/vehicle/view/' + $("#checkVehicleNumber").val();
    this.serviceCall.getService(url).subscribe(
      data => {
        if (data['status'] == 1 && data['msg'] && data['msg'].length > 0) {
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
        } else if (data['status'] == 0) {
          this.Message = data['msg'];
          $('.Popup1').show();
        } else if (data['status'] == 100) {
          this.Message = JSON.stringify(data['msg']);
          $('.Popup1').show();
        } else {
          this.Message = 'Something went wrong.';
          $('.Popup1').show();
        }
      },(error)=>{
        this.Message = 'Something went wrong.';
        $('.Popup1').show();
      }
    )
  }

  addVehicleData() {
    let url = '/history/inhouse_transport'
    let post_data = {
      "Trip_No": (Math.round(Math.random() * 100000)),
      "VehicleNo": $('#inVnumber').val(),
      // "Make": $('#vehicleMake').val(),
      // "Model": $('#VehicleModel').val(),
      // "Insurance_exp_date": $('#vehicleInsurance_exp_date').val(),
      // "PUC_exp_date": $('#VPUC_exp_date').val(),
      "Material": $('#inMaterial_Type').val(),
      // "Material": $('#inMaterial').val(),
      // "Issued_By": $('#inIssued_By').val(),
      // "Issued_Date": $('#inIssued_Date').val(),
      "Driver_Name": $('#inDriver_Name').val(),
      "Driver_Number": $('#inDriver_Number').val(),
      // "Time": $('#inTime').val(),
      "Consignee_Name": $('#inConsignee_Name').val(),
      "Address": $('#inAddress').val(),
      "Qty_Mt_Weight": $('#qty_mt_Weight').val(),
      // "Gross_Weight": $('#inGross_Weight').val(),
      // "Tare_Weight": $('#inTare_Weight').val(),
      // "Net_Weight": $('#inNet_Weight').val()
      // "LrNumber":$('#lrNumber').val(),
      // "LrDate":$('#lrDate').val()
    }
    if ($('#lrDate').val() !== '' && $('#lrDate').val() !== null && $('#lrDate').val() !== undefined) {
      post_data['LrDate'] = $('#lrDate').val();
    }
    if ($('#lrNumber').val() !== '' && $('#lrNumber').val() !== null && $('#lrNumber').val() !== undefined) {
      post_data['LrNumber'] = $('#lrNumber').val();
    }


    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        $(".Popup1").show();
        if (data['status'] == 1) {
          // this.Message =JSON.stringify(data['msg']);
          this.Message = "Trip Created Successfully";
        } else if (data['status'] == 0) {
          this.Message = 'Error - ' + JSON.stringify(data['msg']);
        } else if (data['status'] == 100) {
          this.Message = JSON.stringify(data['msg']);
        } else {
          this.Message = 'Something went wrong.';
        }
      },(error)=>{
        this.Message = 'Something went wrong.';
        $('.Popup1').show();
      })
  }

  validate(source) {
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
    // if($('#inMaterial').val() == ''){
    //   $('#inMaterial').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#inMaterial').removeClass('errDisplay');
    // }
    if ($('#inMaterial_Type').val() == '') {
      $('#inMaterial_Type').addClass('errDisplay');
      err++
    } else {
      $('#inMaterial_Type').removeClass('errDisplay');
    }
    // if($('#inIssued_By').val() == ''){
    //   $('#inIssued_By').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#inIssued_By').removeClass('errDisplay');
    // }
    // if($('#inIssued_Date').val() == ''){
    //   $('#inIssued_Date').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#inIssued_Date').removeClass('errDisplay');
    // }
    if ($('#inDriver_Name').val() == '') {
      $('#inDriver_Name').addClass('errDisplay');
      err++
    } else {
      $('#inDriver_Name').removeClass('errDisplay');
    }
    if ($('#inDriver_Number').val() == '') {
      $('#inDriver_Number').addClass('errDisplay');
      err++
    } else {
      $('#inDriver_Number').removeClass('errDisplay');
    }
    // if($('#inTime').val() == ''){
    //   $('#inTime').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#inTime').removeClass('errDisplay');
    // }
    if ($('#inConsignee_Name').val() == '') {
      $('#inConsignee_Name').addClass('errDisplay');
      err++
    } else {
      $('#inConsignee_Name').removeClass('errDisplay');
    }
    if ($('#inAddress').val() == '') {
      $('#inAddress').addClass('errDisplay');
      err++
    } else {
      $('#inAddress').removeClass('errDisplay');
    }
    // if($('#inTrip_No').val() == ''){
    //   $('#inTrip_No').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#inTrip_No').removeClass('errDisplay');
    // }
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
    // if($('#inVnumber').val() == ''){
    //   $('#inVnumber').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#inVnumber').removeClass('errDisplay');
    // }
    if ($('#qty_mt_Weight').val() == '') {
      $('#qty_mt_Weight').addClass('errDisplay');
      err++
    } else {
      $('#qty_mt_Weight').removeClass('errDisplay');
    }

    if (err == 0) {
      this.addVehicleData();
    }
  }
  validateDirverDetails() {
    var err = 0
    if ($('#inDriver_Name').val() == '') {
      $('#inDriver_Name').addClass('errDisplay');
      err++
    } else {
      $('#inDriver_Name').removeClass('errDisplay');
    }
    if ($('#inDriver_Number').val() == '') {
      $('#inDriver_Number').addClass('errDisplay');
      err++
    } else {
      $('#inDriver_Number').removeClass('errDisplay');
    }
    if ($('#inConsignee_Name').val() == '') {
      $('#inConsignee_Name').addClass('errDisplay');
      err++
    } else {
      $('#inConsignee_Name').removeClass('errDisplay');
    }
    if ($('#inAddress').val() == '') {
      $('#inAddress').addClass('errDisplay');
      err++
    } else {
      $('#inAddress').removeClass('errDisplay');
    }
    if (err == 0) {
      this.active('Material');
    }
  }
  hidePopup() {
    $(".Popup1").hide();
    if (this.Message == 'Trip Created Successfully') {
      this.Router.navigate(['/inBoundDashboard']);
    }
  }
  validateVehicleNumber() {
    var vehicleNumberPatter = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/
    if ($('#checkVehicleNumber').val() !== "") {
      // if(!vehicleNumberPatter.test($('#checkVehicleNumber').val().toString().toUpperCase())){
      //   $('#checkVehicleNumber').addClass('errDisplay');
      // }else{
      //   $('#checkVehicleNumber').removeClass('errDisplay');
      //   this.checkHistory();
      // }
      this.checkHistory();
    } else {
      $('#checkVehicleNumber').addClass('errDisplay');
    }
  }
  active(className) {
    $('.vehicle, .Driver, .Material').removeClass('top-menu--active');
    $('#MaterialIn, #DriverDetailsIn, #VehcileDataIn,.addButtonin,.tab2,.tab1').hide();
    $('.' + className).addClass('top-menu--active');
    if (className == "Material") {
      $('#MaterialIn ,.addButtonin').show();
      if(this.serviceCall.Material.length >0){
        $('#inMaterial_Type').empty();
        $('#inMaterial_Type').append("<option value=''>Select Material Type</option>");
        for(var a in this.serviceCall.Material){
          $('#inMaterial_Type').append("<option value="+this.serviceCall.Material[a]['MaterialName']+">"+this.serviceCall.Material[a]['MaterialName']+"</option>")
      }
      }
    }
    if (className == "Driver") {
      $('#DriverDetailsIn,.tab2').show();
    }
    if (className == "vehicle") {
      $('#VehcileDataIn,.tab1').show();
    }
  }
  uploadDocument() {
    $('.uploadDoc').show();
    $('#errUploadDoc').hide();
  }
  hideuploadPopup() {
    $(".uploadDoc").hide();
  }
  hideuploadPopupok(){
    if(this.docStatus !=='Documents Uploaded Successfully.'){
      $('.afterUpload,.afterUploadButton').hide();
      $(".toUpload").show();
    }else{
      $(".uploadDoc").hide();
    }
  }
  getFiles(event) {
    if (event.target.files.length != 0) {
      this.uploadedFiles.push(event.target.files[0]);
      this.uploadfile_name = event.target.id;
    } else {
      this.uploadedFiles.pop();
    }
  }
  uploadDocs() {
    if (this.uploadedFiles.length < 2) {
      $("#errUploadDoc").show();
    } else {
      $("#errUploadDoc, .toUpload").hide();
      $('.afterUpload').show();
      this.docStatus = 'Please Wait...'
      let formData = new FormData();
        formData.append("files[]", this.uploadedFiles[0],'rc.'+this.uploadedFiles['0'].name.split('.')[1]);
        formData.append("files[]", this.uploadedFiles[1],'puc.'+this.uploadedFiles['1'].name.split('.')[1]);
      // formData.append("files", this.uploadedFiles['0'],'rc'+this.uploadedFiles['0'].name.split('.'));
      // formData.append("file_2", this.uploadedFiles['1'],'pucc');
      formData.append("VehicleNo",$('#inVnumber').val().toString());
      let url = '/vehicle/upload_document';
      this.serviceCall.uploadFile(url, formData).subscribe(
        data => {
          console.log(data);
          $('.afterUploadButton').show();
          if(data['status'] == 1){
            this.docStatus ='Documents Uploaded Successfully.';
          }else if(data['status'] == 0){
            this.docStatus ='Documents Upload Failed.';
          }else{
            this.docStatus ="Technical issue, cannot upload."
          }
        },(error)=>{
          $('.afterUploadButton').show();
          this.docStatus ="Technical issue, cannot upload."
        })
    }
  }
  ValidateNumber(event) {
    if (!(/^[0-9]*$/.test(event.target.value))) {
      event.target.value = "";
    }
  }
  KeyPressEvent(event: any, type) {
    let pattern;
    switch (type) {
      case 'Text': pattern = /[a-zA-Z ]/; break;
      case 'OnlyText': pattern = /[a-zA-Z]/; break;
      case 'Number': pattern = /[0-9\+\-\ ]/; break;
      case 'Mobile': pattern = /[0-9\+\-\ ]/; break;
      case 'Double': pattern = /^[0-9]*[.]?[0-9]*$/; break;
      case 'VarChar': pattern = /[a-zA-Z0-9 ]/; break;
      //case 'PAN':         pattern = /[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}/; break;
    }
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) { event.preventDefault(); }
  }
}
