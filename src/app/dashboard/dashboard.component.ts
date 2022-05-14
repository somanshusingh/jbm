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
  constructor(private serviceCall: ApiService, private Router: Router) { }

  ngOnInit(): void {
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
              $('#ViewVehicleNumber').html(this.data[i]['VehicleNo']);
              $('#ViewInsuranceExpireDate').html(this.data[i]['Insurance_exp_date'].split('T')[0]);
              $('#ViewPUCCExpireDate').html(this.data[i]['PUC_exp_date'].split('T')[0]);
              $('#ViewMake').html(this.data[i]['Make']);
              $('#ViewModel').html(this.data[i]['Model']);
              $('#ViewVehicleType').html(this.data[i]['VehicleType']);
              $('#ViewCreated_By').html(this.data[i]['Created_By']);
              $('#ViewCreated_On').html(this.data[i]['Created_On']);
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
            }
            if(source == 'edit'){
              $('.Popup1').show();
              $('#editdVehicleNo').val(this.data[i]['VehicleNo']);
              $('#editdInsurance_exp_date').val(this.data[i]['Insurance_exp_date'].split('T')[0]);
              $('#editdPUC_exp_date').val(this.data[i]['PUC_exp_date'].split('T')[0]);
              $('#editdMake').val(this.data[i]['Make']);
              $('#editdModel').val(this.data[i]['Model']);
              $('#editdVehicleType').val(this.data[i]['VehicleType']);
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
     "VehicleType":$('#editdVehicleType').val(),
     };
    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        $('.PopupMessagebutton').show();
        // $(".Popup1").show();
        if (data.hasOwnProperty('status')) {
          if (data['status'] == 1) {
            this.Message = 'Vehicle Data Updated Successfully';
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
}
