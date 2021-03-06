import { Component, OnInit } from '@angular/core';
import { data } from '../data';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  data1;
  Message;
  uploadedFiles = [];
  uploadfile_name: any;
  docStatus = '';
  vehicleType =[];
  //dtOptions:DataTables.Settings = {};
  constructor(private serviceCall: ApiService,private Router: Router) { }

  ngOnInit(): void {
  this.getVehicleType();
  let currentDate = moment().format('YYYY-MM-DD');
  let lastDate = moment().add(3, 'years').format('YYYY-MM-DD');
  $('#Insurance_exp_date').attr('Min', currentDate);
  $('#Insurance_exp_date').attr('Max', lastDate);
  $('#PUC_exp_date').attr('Min', currentDate);
  $('#PUC_exp_date').attr('Max', lastDate);
  

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
     "VehicleNo":$('#VehicleNo').val().toString().toUpperCase(),
     "Make":$('#Make').val(),
     "Model":$('#Model').val(),
     "Insurance_exp_date":moment($('#Insurance_exp_date').val()).format('YYYY-MM-DD hh:mm:ss'),
     "PUC_exp_date":moment($('#PUC_exp_date').val()).format('YYYY-MM-DD hh:mm:ss'),
     "VehicleType":$('#VehicleTypeDash').val(),
     "Status":$('#Status').val(),
     "Created_By":this.serviceCall.Role
     };
    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        $(".Popup1").show();
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1) {
            this.Message = 'Vehicle Added Successfully';
            this.uploadDocs();
           // this.Router.navigate(['/signin']);
          } else if (data['status'] == 0) {
            this.Message = data['msg'];
          } else if (data['status'] == 100) {
            this.Message = 'Technical Issue ,Please Retry';
          }
        } else {
          this.Message = 'Technical Issue ,Please Retry'
        }
      },
      (error)=>{
        $(".Popup1").show();
        this.Message = 'Technical Issue ,Please Retry'
      }
    )
  }
  reset(){
     $('#VehicleNo').val('');
     $('#Make').val('');
     $('#Model').val('');
     $('#Insurance_exp_date').val('');
     $('#PUC_exp_date').val('');
     $('#VehicleType').val('');
     $('#Status').val('');
  };
  validate(){
    var err = 0 
    var vehicleNumberPatter =/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/
    if($('#VehicleNo').val() == ''){
      $('#VehicleNo').addClass('errDisplay');
      err++
    }else{
      let tempVehicleNo = $('#VehicleNo').val() as any;
      // if ([9, 10, 11].indexOf(tempVehicleNo.length) > -1) {
      //   $('#VehicleNo').removeClass('errDisplay');
      // } else{
      //   $('#VehicleNo').addClass('errDisplay');
      //   err++
      // }
      // if(!vehicleNumberPatter.test($('#VehicleNo').val().toString().toUpperCase())){
      let a = $('#VehicleNo').val() as any
      if(a.length < 4 || a.length > 10){
        $('#VehicleNo').addClass('errDisplay');
        err++
      }else{
        $('#VehicleNo').removeClass('errDisplay');
      }
    }
    // if($('#Make').val() == ''){
    //   $('#Make').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#Make').removeClass('errDisplay');
    // }
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
    if($('#VehicleTypeDash').val() == ''){
      $('#VehicleTypeDash').addClass('errDisplay');
      err++
    }else{
      $('#VehicleTypeDash').removeClass('errDisplay');
    }
    if($('#Status').val() == ''){
      $('#Status').addClass('errDisplay');
      err++
    }else{
      $('#Status').removeClass('errDisplay');
    }

    // if(this.docStatus !== 'Documents Uploaded Successfully.'){
    //   $('#uploadDocV').addClass('docErr');
    //   $('.uploadErrVehicle').show();
    //   err++
    // }else{
    //   $('#uploadDocV').removeClass('docErr');
    //   $('.uploadErrVehicle').hide();
    // }
    if(this.uploadedFiles.length < 2){
      err++
      $('#docErrVeh').html('Please select both documents');
    }else{
      $('#docErrVeh').html('');
    }

    if(err === 0){
      this.addVehcile();
    }
  }
  hidePopup(){
    $(".Popup1").hide();
    let fullUrl= window.location.href.split('?')[1];
    let sessionID= (fullUrl && fullUrl.split('=')[1]) ? fullUrl.split('=')[1]:'';
    if(this.Message == 'Vehicle Added Successfully'){
      this.Router.navigate(['/dashboard'], { queryParams:{sessionID:sessionID}});
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
    // if (this.uploadedFiles.length < 2) {
      // $("#errUploadDoc").show();
    // } else {
      // $("#errUploadDoc, .toUpload").hide();
      // $('.afterUpload').show();
      this.docStatus = 'Please Wait...'
      let formData = new FormData();
      formData.append("files[]", this.uploadedFiles[0], 'rc.' + this.uploadedFiles['0'].name.split('.')[1]);
      formData.append("files[]", this.uploadedFiles[1], 'puc.' + this.uploadedFiles['1'].name.split('.')[1]);
      // formData.append("files", this.uploadedFiles['0'],'rc'+this.uploadedFiles['0'].name.split('.'));
      // formData.append("file_2", this.uploadedFiles['1'],'pucc');
      formData.append("VehicleNo", $('#VehicleNo').val().toString().toUpperCase());
      let url = '/vehicle/upload_document';
      this.serviceCall.uploadFile(url, formData).subscribe(
        data => {
          console.log(data);
          // $('.afterUploadButton').show();
          if (data['status'] == 1) {
            this.docStatus = 'Documents Uploaded Successfully.';
          } else if (data['status'] == 0) {
            this.docStatus = 'Documents Upload Failed.';
          } else {
            this.docStatus = "Technical issue, cannot upload."
          }
          console.log('Vehicle Document Upload Status -------------------------------------------' + this.docStatus);
        }, (error) => {
          $('.afterUploadButton').show();
          this.docStatus = "Technical issue, cannot upload."
          console.log('Vehicle Document Upload Status -------------------------------------------' + this.docStatus);
        })
    // }
  }
  uploadDocument() {
    $('.uploadDocV').show();
    $('#errUploadDoc').hide();
  }
  hideuploadPopup() {
    $(".uploadDocV").hide();
  }
  hideuploadPopupok() {
    if (this.docStatus !== 'Documents Uploaded Successfully.') {
      $('.afterUpload,.afterUploadButton').hide();
      $(".toUpload").show();
    } else {
      $(".uploadDocV").hide();
    }
  }
  getVehicleType() {
    let url = "/master/vehicletype/view"
    var same = false;
    this.serviceCall.getService(url).subscribe(data => {
      for (var i in data['msg']) {
        same = false;
        if (this.vehicleType.length > 0) {
          for (var a in this.vehicleType) {
            if (this.vehicleType[a]['VehicleType'] === data['msg'][i]['VehicleType']) {
              same = true;
            }
          }
          if (same == false) {
            this.vehicleType.push(data['msg'][i]);
          }
        } else {
          this.vehicleType.push(data['msg'][i]);
        }
      }
      $('#VehicleTypeDash').empty();
          $('#VehicleTypeDash').append("<option value=''>Select Vehicle Type</option>");
          for (var a in this.vehicleType) {
            $('#VehicleTypeDash').append("<option value='" + this.vehicleType[a]['VehicleType'] + "'>" + this.vehicleType[a]['VehicleType']  + "</option>")
          }
    }, (error) => {

    })
  }
}
