import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-outbound-dashboard',
  templateUrl: './outbound-dashboard.component.html',
  styleUrls: ['./outbound-dashboard.component.css']
})
export class OutboundDashboardComponent implements OnInit {
  data=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Message;
  Edited=false;
  constructor(private serviceCall: ApiService, private Router: Router) { }

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
      if(data['msg'] !=='No trip available'){
      this.data = data['msg'];
      }
      // for(var i in data['msg']){
      //   if(data['msg'][i].hasOwnProperty('Status') && data['msg'][i]['Status'] == 'open'){
      //     this.data.push(data['msg'][i]);
      //   }
      // }
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
              $('.editPopOut').hide();
              $('#oViewTrip_No').html(this.data[i]['Trip_No']);
              $('#oViewVehicleNo').html(this.data[i]['VehicleNo']);
              $('#oViewInsurance_exp_date').html(this.data[i]['Insurance_exp_date'].split('T')[0]);
              $('#oViewPUC_exp_date').html(this.data[i]['PUC_exp_date'].split('T')[0]);
              $('#oViewMake').html(this.data[i]['Make']);
              $('#oViewModel').html(this.data[i]['Model']);
              $('#oViewAddress').html(this.data[i]['Address']);
              $('#oViewConsignee_Name').html(this.data[i]['Consignee_Name']);
              $('#oViewDriver_Name').html(this.data[i]['Driver_Name']);
              $('#oViewDriver_Number').html(this.data[i]['Driver_Number']);
              $('#oViewIssued_By').html(this.data[i]['Issued_By']);
              $('#oViewIssued_Date').html(this.data[i]['Issued_Date']);
              $('#oViewMaterial').html(this.data[i]['Material']);
              $('#oViewMaterial_Type').html(this.data[i]['Material']);
              $('#oViewQty_Mt_Weight').html(this.data[i]['Qty_Mt_Weight']);
              $('#oViewTime').html(this.data[i]['Time']);
              $('#oViewVehicle_Mapping').html(this.data[i]['Card_Number']);
              $('#oViewQty_Mt_Weight').html(this.data[i]['Qty_Mt_Weight']);
              let net_weight = (this.data[i]['Gross_Weight'] -0 )+(this.data[i]['Tare_Weight'] -0);
              $('#oViewNet_Weight').html(net_weight.toString());//$('#oViewNet_Weight').html(this.data[i]['Net_Weight']);
              $('#oViewGross_Weight').html(this.data[i]['Gross_Weight']);
              $('#oViewTare_Weight').html(this.data[i]['Tare_Weight']);
              $('#oViewStatus').html(this.data[i]['Status']);
              if(this.data[i]['Document'] !== '' && this.data[i]['Document'] !== undefined && this.data[i]['Document'] !== null){
                $('#doc1NameOut').html(this.data[i]['Document']['Doc1_Name']);
                $('#docImage1Out').attr('src','https://jbmapp.herokuapp.com'+this.data[i]['Document']['Doc1_Data']);
                $('#doc2NameOut').html(this.data[i]['Document']['Doc2_Name']);
                $('#docImage2Out').attr('src','https://jbmapp.herokuapp.com'+this.data[i]['Document']['Doc2_Data']);
                $('#docViewStatusOut').html('');
              }else{
                $('#doc1NameOut').html('');
                $('#docImage1Out').attr('src','');
                $('#doc2NameOut').html('');
                $('#docImage2Out').attr('src','');
                $('#docViewStatusOut').html('Documents Not Available.')
              }
            }
            if(source == 'edit'){
              $('.editPopOut').show();
              $('.oviewPopup1edit').hide();
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
              // $('#outEditMaterial_Type').val(this.data[i]['Material']);
              $('#outEditIssued_Date').val(this.data[i]['Issued_Date'].split('T')[0]);
              $('#outEditDriver_Number').val(this.data[i]['Driver_Number']);
              $('#outEditTrip_No').val(this.data[i]['Trip_No']);
              if(this.serviceCall.Material.length >0){
                $('#outEditM').empty();
                $('#outEditM').append("<option value=''>Select Material Type</option>")
                for(var a in this.serviceCall.Material){
                  $('#outEditM').append("<option value='"+this.serviceCall.Material[a]['MaterialName']+"'>"+this.serviceCall.Material[a]['MaterialName']+"</option>")
              }
              }
              $('#outEditlrDate').val(moment(this.data[i]['LrDate']).format('YYYY-MM-DD'));
              $('#outEditlrNumber').val(this.data[i]['LrNumber']);
              $('#outEditMaterial_Type').val(this.data[i]['Material']);
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
    var vehicleNumberPatter =/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
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
      // if(!vehicleNumberPatter.test($('#outEditVnumber').val().toString().toUpperCase())){
      let a = $('#outEditVnumber').val() as any
      if(a.length < 4 || a.length > 10){
        $('#outEditVnumber').addClass('errDisplay');
        err++
      }else{
        $('#outEditVnumber').removeClass('errDisplay');
      }
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
      "VehicleNo": $('#outEditVnumber').val().toString().toUpperCase(),
      "Make": $('#outEditvehicleMake').val(),
      "Model": $('#outEditVehicleModel').val(),
      "Insurance_exp_date": moment($('#outEditvehicleInsurance_exp_date').val()).format('YYYY-MM-DD hh:mm:ss'),
      "PUC_exp_date": moment($('#outEditVPUC_exp_date').val()).format('YYYY-MM-DD hh:mm:ss'),
      // "Material_Type": $('#outEditMaterial_Type').val(),
      "Material": $('#outEditMaterial_Type').val(),//$('#outEditMaterial').val(),
      "Issued_By":this.serviceCall.UserId,
      // "Issued_Date": $('#outEditIssued_Date').val(),
      "Driver_Name": $('#outEditDriver_Name').val(),
      "Driver_Number": $('#outEditDriver_Number').val(),
      // "Time": $('#outEditTime').val(),
      "Consignee_Name": $('#outEditConsignee_Name').val(),
      "Address": $('#outEditAddress').val(),
      "Qty_Mt_Weight": $('#outEditoutqty_mt_Weight').val()
    }
    if($('#outEditlrDate').val() !== '' && $('#outEditlrDate').val() !== null &&$('#outEditlrDate').val() !== undefined ){
      post_data['LrDate'] = moment($('#outEditlrDate').val()).format('YYYY-MM-DD hh:mm:ss');
    }
    if($('#outEditlrNumber').val() !== '' &&$('#outEditlrNumber').val() !== null&&$('#outEditlrNumber').val() !== undefined ){
      post_data['LrNumber'] = $('#outEditlrNumber').val();
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
      },
      (error)=>{
        $('.outDashmessagebutton').show();
        this.Message = 'Something went wrong.';
      })
  }
  hideMessagePopup(){
    $('.outDashmessage').hide();
    this.Edited = true;
    // this.getData();
    window.location.reload();
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
  navigate(path){
    this.Router.navigate([path], { queryParams:{sessionID:this.serviceCall.sessionID}})
  }

}
