import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-outbound-dashboard',
  templateUrl: './outbound-dashboard.component.html',
  styleUrls: ['./outbound-dashboard.component.css']
})
export class OutboundDashboardComponent implements OnInit {
  data;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Message;
  Edited=false;
  constructor(private serviceCall: ApiService) { }

  ngOnInit(): void {
    this.getData();
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      lengthMenu: [10, 50, 100],
      processing: true,
      order: [],
    responsive: true,
    scrollX: true,
    };
  }
  getData(){
    var url = "/history/outside_transport/view"
    this.serviceCall.getService(url).subscribe(data=>{
      this.data = data['msg'];
      console.log(this.data);
      if(this.Edited == false){
        this.dtTrigger.next();
        }
    })
  }
  viewData(source, Trip_No) {
    for (var i = 0; i < this.data.length; i++) {
      for (var a in this.data[i]) {
        if (a == 'Trip_No') {
          if (this.data[i][a] == Trip_No) {
            if (source == 'view') {
              $('.oviewPopup1edit').show();
              $('#oViewTrip_No').html(this.data[i]['Trip_No']);
              $('#oViewVehicleNo').html(this.data[i]['VehicleNo']);
              $('#oViewInsurance_exp_date').html(this.data[i]['Insurance_exp_date']);
              $('#oViewPUC_exp_date').html(this.data[i]['PUC_exp_date']);
              $('#oViewMake').html(this.data[i]['Make']);
              $('#oViewModel').html(this.data[i]['Model']);
              $('#oViewAddress').html(this.data[i]['Address']);
              $('#oViewConsignee_Name').html(this.data[i]['Consignee_Name']);
              $('#oViewDriver_Name').html(this.data[i]['Driver_Name']);
              $('#oViewDriver_Number').html(this.data[i]['Driver_Number']);
              $('#oViewIssued_By').html(this.data[i]['Issued_By']);
              $('#oViewIssued_Date').html(this.data[i]['Issued_Date']);
              $('#oViewMaterial').html(this.data[i]['Material']);
              $('#oViewMaterial_Type').html(this.data[i]['Material_Type']);
              $('#oViewQty_Mt_Weight').html(this.data[i]['Qty_Mt_Weight']);
              $('#oViewTime').html(this.data[i]['Time']);
              $('#oViewVehicle_Mapping').html(this.data[i]['Vehicle_Mapping']);
            }
            if(source == 'edit'){
              $('.editPopOut').show();
              $('#outEditvehicleMake').val(this.data[i]['Make']);
              $('#outEditvehicleIns_exp_date').val(this.data[i]['Insurance_exp_date'].split('T')[0]);
              $('#outEditAddress').val(this.data[i]['Address']);
              $('#outEditMaterial').val(this.data[i]['Material']);
              $('#outEditIssued_By').val(this.data[i]['Issued_By']);
              $('#outEditDriver_Name').val(this.data[i]['Driver_Name']);
              $('#outEditConsignee_Name').val(this.data[i]['Consignee_Name']);
              $('#outEditoutqty_mt_Weight').val(this.data[i]['Qty_Mt_Weight']);
              $('#outEditVnumber').val(this.data[i]['VehicleNo']);
              $('#outEditVehicleModel').val(this.data[i]['Model']);
              $('#outEditVPUC_exp_date').val(this.data[i]['PUC_exp_date'].split('T')[0]);
              $('#outEditMaterial_Type').val(this.data[i]['Material_Type']);
              $('#outEditIssued_Date').val(this.data[i]['Issued_Date'].split('T')[0]);
              $('#outEditDriver_Number').val(this.data[i]['Driver_Number']);
              $('#outEditTrip_No').val(this.data[i]['Trip_No']);
            }
          }
        }
      }
    }
  }
  closeEdit(){
    $('.editPopOut').hide();
  }
  hideView(){
    $('.oviewPopup1edit').hide();
  }
  validateEdit(){
    var err = 0 
    if($('#outEditvehicleMake').val() == ''){
      $('#outEditvehicleMake').addClass('errDisplay');
      err++
    }else{
      $('#outEditvehicleMake').removeClass('errDisplay');
    }
    if($('#outEditVehicleModel').val() == ''){
      $('#outEditVehicleModel').addClass('errDisplay');
      err++
    }else{
      $('#outEditVehicleModel').removeClass('errDisplay');
    }
    if($('#outEditvehicleIns_exp_date').val() == ''){
      $('#outEditvehicleIns_exp_date').addClass('errDisplay');
      err++
    }else{
      $('#outEditvehicleIns_exp_date').removeClass('errDisplay');
    }
    if($('#outEditVPUC_exp_date').val() == ''){
      $('#outEditVPUC_exp_date').addClass('errDisplay');
      err++
    }else{
      $('#outEditVPUC_exp_date').removeClass('errDisplay');
    }
    if($('#outEditMaterial').val() == ''){
      $('#outEditMaterial').addClass('errDisplay');
      err++
    }else{
      $('#outEditMaterial').removeClass('errDisplay');
    }
    if($('#outEditMaterial_Type').val() == ''){
      $('#outEditMaterial_Type').addClass('errDisplay');
      err++
    }else{
      $('#outEditMaterial_Type').removeClass('errDisplay');
    }
    if($('#outEditIssued_By').val() == ''){
      $('#outEditIssued_By').addClass('errDisplay');
      err++
    }else{
      $('#outEditIssued_By').removeClass('errDisplay');
    }
    if($('#outEditIssued_Date').val() == ''){
      $('#outEditIssued_Date').addClass('errDisplay');
      err++
    }else{
      $('#outEditIssued_Date').removeClass('errDisplay');
    }
    if($('#outEditDriver_Name').val() == ''){
      $('#outEditDriver_Name').addClass('errDisplay');
      err++
    }else{
      $('#outEditDriver_Name').removeClass('errDisplay');
    }
    if($('#outEditDriver_Number').val() == ''){
      $('#outEditDriver_Number').addClass('errDisplay');
      err++
    }else{
      $('#outEditDriver_Number').removeClass('errDisplay');
    }
    if($('#outEditTime').val() == ''){
      $('#outEditTime').addClass('errDisplay');
      err++
    }else{
      $('#outEditTime').removeClass('errDisplay');
    }
    if($('#outEditConsignee_Name').val() == ''){
      $('#outEditConsignee_Name').addClass('errDisplay');
      err++
    }else{
      $('#outEditConsignee_Name').removeClass('errDisplay');
    }
    if($('#outEditAddress').val() == ''){
      $('#outEditAddress').addClass('errDisplay');
      err++
    }else{
      $('#outEditAddress').removeClass('errDisplay');
    }
    if($('#outEditTrip_No').val() == ''){
      $('#outEditTrip_No').addClass('errDisplay');
      err++
    }else{
      $('#outEditTrip_No').removeClass('errDisplay');
    }
    if($('#outEditoutqty_mt_Weight').val() == ''){
        $('#outEditoutqty_mt_Weight').addClass('errDisplay');
        err++
      }else{
        $('#outEditoutqty_mt_Weight').removeClass('errDisplay');
    }
    if($('#outEditVnumber').val() == ''){
      $('#outEditVnumber').addClass('errDisplay');
      err++
    }else{
      $('#outEditVnumber').removeClass('errDisplay');
    }

    if(err == 0){
      this.updateOutboundData();
    }
  }
  updateOutboundData(){
    $('.editPopOut').hide();
    $('.outDashmessage').show();
    $('.outDashmessagebutton').hide();
    this.Message ='Please Wait...'
    let url = '/history/outside_transport/update'
    let post_data = {
      "Trip_No": $('#outEditTrip_No').val(),
      "VehicleNo": $('#outEditVnumber').val(),
      "Make": $('#outEditvehicleMake').val(),
      "Model": $('#outEditVehicleModel').val(),
      "Insurance_exp_date": $('#outEditvehicleInsurance_exp_date').val(),
      "PUC_exp_date": $('#outEditVPUC_exp_date').val(),
      "Material_Type": $('#outEditMaterial_Type').val(),
      "Material": $('#outEditMaterial').val(),
      "Issued_By":this.serviceCall.UserId,
      // "Issued_Date": $('#outEditIssued_Date').val(),
      "Driver_Name": $('#outEditDriver_Name').val(),
      "Driver_Number": $('#outEditDriver_Number').val(),
      // "Time": $('#outEditTime').val(),
      "Consignee_Name": $('#outEditConsignee_Name').val(),
      "Address": $('#outEditAddress').val(),
      "Qty_Mt_Weight": $('#outEditoutqty_mt_Weight').val()
    }


    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        $('.outDashmessagebutton').show();
        if (data['status'] == 1) {
          // this.Message =JSON.stringify(data['msg']);
          this.Message = "Vehicle Updated Successfully";
        } else if (data['status'] == 0) {
          this.Message = 'Update Failed';
        } else if (data['status'] == 100) {
          this.Message = JSON.stringify(data['msg']);
        } else {
          this.Message = 'Something went wrong.';
        }
      })
  }
  hideMessagePopup(){
    $('.outDashmessage').hide();
    this.Edited = true;
    this.getData();
  }

}
