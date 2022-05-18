import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import * as feather from 'feather-icons';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Message;
  Edited=false;
  notUndefined = true;
  sourcenotUndefined = true;
  vehicleType =[];
  uploadedFiles = [];
  uploadfile_name: any;
  docStatus = '';
  constructor(private serviceCall: ApiService, private Router: Router) { }

  ngOnInit(): void {
    this.getVehicleType();
    let currentDate = moment().format('YYYY-MM-DD');
    let lastDate = moment().add(3, 'years').format('YYYY-MM-DD');
    $('#editdInsurance_exp_date').attr('Min', currentDate);
    $('#editdInsurance_exp_date').attr('Max', lastDate);
    $('#editdPUC_exp_date').attr('Min', currentDate);
    $('#editdPUC_exp_date').attr('Max', lastDate);
    this.getData();
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      lengthMenu: [10, 50, 100],
      processing: true,
      order: [],
      columnDefs: [{
        'targets': [0, 1, 2, 3, 4, 5], /* column index [0,1,2,3]*/
        'orderable': false, /* true or false */
      }],
      responsive: true,
      scrollX: true,
      // columns: [
      //   { "width": "5%" },
      //   { "width": "5%" },
      //   { "width": "5%" },
      //   { "width": "5%" },
      //   { "width": "5%" },
      //   { "width": "5%" },
      //   { "width": "5%" },
      //   { "width": "5%" },
      //   { "width": "5%" }
      // ]
    };
  }
  getData() {
    var url = "/vehicle/view"
    this.serviceCall.getService(url).subscribe(data => {
      this.data = data['msg'];
      console.log(this.data);
      if(this.Edited == false){
      this.dtTrigger.next();
      $('[name="Datatable1_length"]').val('10');
      }
      setTimeout(() => {
        feather.replace();
      }, 100);
    })
  }
  viewData(source, vehicleNo) {
    this.sourcenotUndefined = true;
    this.notUndefined = true;
    for (var i = 0; i < this.data.length; i++) {
      for (var a in this.data[i]) {
        if (a == 'VehicleNo') {
          if (this.data[i][a] == vehicleNo) {
            if (source == 'view') {
              $('.Popup1edit').show();
              $('.Popup1').hide();
              $('#ViewVehicleNumber').html(this.data[i]['VehicleNo']);
              $('#ViewInsuranceExpireDate').html(this.data[i]['Insurance_exp_date'].split('T')[0]);
              $('#ViewPUCCExpireDate').html(this.data[i]['PUC_exp_date'].split('T')[0]);
              $('#ViewMake').html(this.data[i]['Make']);
              $('#ViewModel').html(this.data[i]['Model']);
              $('#ViewVehicleType').html(this.data[i]['VehicleType']);
              $('#ViewCreated_By').html(this.data[i]['Created_By']);
              if(this.data[i]['Created_On'] !== null && this.data[i]['Created_On']!== '' && this.data[i]['Created_On'] !== undefined){
              $('#ViewCreated_On').html(this.data[i]['Created_On'].split('T')[0]);}
              $('#ViewModified_By').html(this.data[i]['Modified_By']);
              if(this.data[i]['Modified_By'] == '' ||this.data[i]['Modified_By'] == null || this.data[i]['Modified_By'] == 'undefined'){
                this.notUndefined = false;
              }else{
                this.notUndefined = true;
              }
              $('#ViewModified_On').html(this.data[i]['Modified_On']);
              $('#ViewSource').html(this.data[i]['Source']);
              if(this.data[i]['Source'] == '' ||this.data[i]['Source'] == null || this.data[i]['Source'] == 'undefined'){
                this.sourcenotUndefined = false;
              }else{
                this.sourcenotUndefined = true;
              }
              $('#ViewStatus').html(this.data[i]['Status']);
              if(this.data[i]['Document'] !== '' && this.data[i]['Document'] !== undefined && this.data[i]['Document'] !== null){
                $('#doc1Name').html(this.data[i]['Document']['Doc1_Name']);
                $('#docImage1').attr('src','https://jbmapp.herokuapp.com'+this.data[i]['Document']['Doc1_Data']);
                $('#doc2Name').html(this.data[i]['Document']['Doc2_Name']);
                $('#docImage2').attr('src','https://jbmapp.herokuapp.com'+this.data[i]['Document']['Doc2_Data']);
                $('#docViewStatus').html('');
              }else{
                $('#doc1Name').html('');
                $('#docImage1').attr('src','');
                $('#doc2Name').html('');
                $('#docImage2').attr('src','');
                $('#docViewStatus').html('Documents Not Available.')
              }
            }
            if(source == 'edit'){
              $('.Popup1').show();
              $('.Popup1edit').hide();
              $('#editdVehicleNo').val(this.data[i]['VehicleNo']);
              $('#editdInsurance_exp_date').val(this.data[i]['Insurance_exp_date'].split('T')[0]);
              $('#editdPUC_exp_date').val(this.data[i]['PUC_exp_date'].split('T')[0]);
              $('#editdMake').val(this.data[i]['Make']);
              $('#editdModel').val(this.data[i]['Model']);
              // $('#editdVehicleType').val(this.data[i]['VehicleType']);
              $('#VehicleTypeEditDash').empty();
              $('#VehicleTypeEditDash').append("<option value=''>Select Vehicle Type</option>");
              for (var a in this.vehicleType) {
                $('#VehicleTypeEditDash').append("<option value='" + this.vehicleType[a]['VehicleType'] + "'>" + this.vehicleType[a]['VehicleType']  + "</option>")
              }
              $('#VehicleTypeEditDash').val(this.data[i]['VehicleType'])
            }
          }
        }
      }
    }
  }
  hideView() {
    $('.Popup1edit').hide();
  }
  updateVehicle(){
    $('.Popup1').hide();
    $('.Popup1edit').hide();
    $('.Popup1message').show();
    $('.PopupMessagebutton').hide();
    this.Message ='Please Wait...'
    var url = '/vehicle/data/update';
    var post_data = {
     "VehicleNo":$('#editdVehicleNo').val(),
     "Make":$('#editdMake').val(),
     "Model":$('#editdModel').val(),
     "Insurance_exp_date":$('#editdInsurance_exp_date').val(),
     "PUC_exp_date":$('#editdPUC_exp_date').val(),
     "VehicleType":$('#VehicleTypeEditDash').val(),
     };
    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        $('.PopupMessagebutton').show();
        // $(".Popup1").show();
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1) {
            this.Message = 'Vehicle Data Updated Successfully';
            this.uploadDocs();
           // this.Router.navigate(['/signin']);
          } else if (data['status'] == 0) {
            this.Message = 'Updated Failed';
          } else if (data['status'] == 100) {
            this.Message = 'Technical Issue ,Please Retry';
          }
        } else {
          this.Message = 'Technical Issue ,Please Retry'
        }
      },(error)=>{
        $('.PopupMessagebutton').show();
        this.Message = 'Technical Issue ,Please Retry';
      }
    )
  }
  validateEdit(){
    var err = 0 
    if($('#editdVehicleNo').val() == ''){
      $('#editdVehicleNo').addClass('errDisplay');
      err++
    }else{
      $('#editdVehicleNo').removeClass('errDisplay');
    }
    if($('#editdMake').val() == ''){
      $('#editdMake').addClass('errDisplay');
      err++
    }else{
      $('#editdMake').removeClass('errDisplay');
    }
    if($('#editdModel').val() == ''){
      $('#editdModel').addClass('errDisplay');
      err++
    }else{
      $('#editdModel').removeClass('errDisplay');
    }
    if($('#editdInsurance_exp_date').val() == ''){
      $('#editdInsurance_exp_date').addClass('errDisplay');
      err++
    }else{
      $('#editdInsurance_exp_date').removeClass('errDisplay');
    }
    if($('#editdPUC_exp_date').val() == ''){
      $('#editdPUC_exp_date').addClass('errDisplay');
      err++
    }else{
      $('#editdPUC_exp_date').removeClass('errDisplay');
    }
    if($('#editdVehicleType').val() == ''){
      $('#editdVehicleType').addClass('errDisplay');
      err++
    }else{
      $('#editdVehicleType').removeClass('errDisplay');
    }
    if(err === 0){
      this.updateVehicle();
    }
  }
  closeEdit(){
    $('.Popup1').hide();
  }
  hideMessagePopup(){
    $('.Popup1message').hide();
    this.Edited = true;
    // this.getData();
    window.location.reload();
  }
  navigate(path){
    this.Router.navigate([path], { queryParams:{sessionID:this.serviceCall.sessionID}})
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
      $('#VehicleTypeEditDash').empty();
          $('#VehicleTypeEditDash').append("<option value=''>Select Vehicle Type</option>");
          for (var a in this.vehicleType) {
            $('#VehicleTypeEditDash').append("<option value='" + this.vehicleType[a]['VehicleType'] + "'>" + this.vehicleType[a]['VehicleType']  + "</option>")
          }
    }, (error) => {

    })
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
      if(this.uploadedFiles.length > 0){
      formData.append("files[]", this.uploadedFiles[0], 'rc.' + this.uploadedFiles['0'].name.split('.')[1]);
      if(this.uploadedFiles[1] !== undefined && this.uploadedFiles[1] !== null && this.uploadedFiles[1] !== ''){
      formData.append("files[]", this.uploadedFiles[1], 'puc.' + this.uploadedFiles['1'].name.split('.')[1]);}
      // formData.append("files", this.uploadedFiles['0'],'rc'+this.uploadedFiles['0'].name.split('.'));
      // formData.append("file_2", this.uploadedFiles['1'],'pucc');
      formData.append("VehicleNo", $('#editdVehicleNo').val().toString());
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
      }
    // }
  }

}
