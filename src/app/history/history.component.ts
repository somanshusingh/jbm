import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  isVehicleDataAvailable: any;
  Message = '';
  uploadedFiles = [];
  uploadfile_name: any;
  docStatus = '';
  carNoAdded = false;
  card_number;

  constructor(private serviceCall: ApiService, private Router: Router) { }

  ngOnInit(): void {
    $('#MaterialOut, #DriverDetailsOut,.addButtonOut,.tab2').hide();
    let currentDate = moment().format('YYYY-MM-DD');
    let lastDate = moment().add(3, 'years').format('YYYY-MM-DD');
    $('#vehicleInsurance_exp_date').attr('Min', currentDate);
    $('#vehicleInsurance_exp_date').attr('Max', lastDate);
    $('#VPUC_exp_date').attr('Min', currentDate);
    $('#VPUC_exp_date').attr('Max', lastDate);
  }
  checkHistory() {
    var vehicleData;
    let url = '/vehicle/view/' + $("#checkOutVehicleNumber").val();
    this.serviceCall.getService(url).subscribe(
      data => {
        if (data['status'] == 1 && data['msg'] && data['msg'].length > 0) {
          vehicleData = data['msg'];
          this.Message = ''
          let Insurance_exp_date = data['msg'][0]['Insurance_exp_date'];
          let PUC_exp_date = data['msg'][0]['PUC_exp_date'];
          if (moment().diff(moment(Insurance_exp_date)) <= 0) {
            if (moment().diff(moment(PUC_exp_date)) <= 0) {
              let url = "/history/outside_transport/view?VehicleNo=" + $("#checkOutVehicleNumber").val();
              this.serviceCall.getService(url).subscribe(
                data => {
                  let vehicelStatus = 0;
                  if (data['status'] == 1 && data['msg'] && data['msg'].length > 0) {
                    for (var i in data['msg']) {
                      if (data['msg'][i].hasOwnProperty('Status') && data['msg'][i]['Status'].toLowerCase() !== 'completed' && data['msg'][i]['Status'].toLowerCase() !== 'close' && data['msg'][i]['Status'].toLowerCase() !== "") {
                        vehicelStatus++;
                        if(data['msg'][i]['Status'].toLowerCase() == 'in transit' ){
                          this.Message = 'Vehicle In Transit';
                          $('.Popup1').show();
                        }else if(data['msg'][i]['Status'].toLowerCase() == 'in plant'){
                          this.Message = 'Vehicle In Plant';
                          $('.Popup1').show();
                        }else{
                          this.Message = 'Please Complete The Existing Trip.';
                          $('.Popup1').show();
                        }
                      }
                    }
                    if (vehicelStatus > 0) {
                      // this.Message = 'Please Complete The Existing Trip.';
                      // $('.Popup1').show();
                    } else {
                      $('#OutVehicleNumberForm').hide();
                      $('#outboundForm').show();
                      $('#vehicleMake').val(vehicleData[0]['Make']);
                      $('#VehicleModel').val(vehicleData[0]['Model']);
                      $('#vehicleInsurance_exp_date').val(vehicleData[0]['Insurance_exp_date'].split('T')[0]);
                      $('#VPUC_exp_date').val(vehicleData[0]['PUC_exp_date'].split('T')[0]);
                      $('#Vnumber').val($('#checkOutVehicleNumber').val());
                      $('#Issued_By').val(this.serviceCall.Role);
                      $("#vehicleMake,#VehicleModel,#vehicleInsurance_exp_date,#VPUC_exp_date,#Vnumber").attr('disabled', 'disabled');
                      this.isVehicleDataAvailable = true;
                    }
                  } else if (data['status'] == 0 && data['msg'] == 'No trip available') {
                    $('#OutVehicleNumberForm').hide();
                      $('#outboundForm').show();
                      $('#vehicleMake').val(vehicleData[0]['Make']);
                      $('#VehicleModel').val(vehicleData[0]['Model']);
                      $('#vehicleInsurance_exp_date').val(vehicleData[0]['Insurance_exp_date'].split('T')[0]);
                      $('#VPUC_exp_date').val(vehicleData[0]['PUC_exp_date'].split('T')[0]);
                      $('#Vnumber').val($('#checkOutVehicleNumber').val());
                      $('#Issued_By').val(this.serviceCall.Role);
                      $("#vehicleMake,#VehicleModel,#vehicleInsurance_exp_date,#VPUC_exp_date,#Vnumber").attr('disabled', 'disabled');
                      this.isVehicleDataAvailable = true;
                  } else {
                    this.Message = 'Something went wrong.';
                    $('.Popup1').show();
                  }
                }, (error) => {
                  this.Message = 'Something went wrong.';
                  $('.Popup1').show();
                })
            } else {
              this.Message = "Vehicle PUC Expired";
              $('.Popup1').show();
              $('#checkVehicleOut').attr('disabled', 'disabled');
            }
          } else {
            this.Message = "Vehicle Insurance Expired";
            $('.Popup1').show();
            $('#checkVehicleOut').attr('disabled', 'disabled');
          }
        } else if (data['status'] == 0) {
          $('#OutVehicleNumberForm').hide();
          $('#outboundForm').show();
          this.isVehicleDataAvailable = false;
          $('#Vnumber').val($('#checkOutVehicleNumber').val());
          $("#Vnumber").attr('disabled', 'disabled');
          // this.Message =data['msg'];
          // $('.Popup1').show();
        } else if (data['status'] == 100) {
          this.Message = JSON.stringify(data['msg']);
          $('.Popup1').show();
        } else {
          this.Message = 'Something went wrong.';
          $('.Popup1').show();
        }
      }, (error) => {
        this.Message = 'Something went wrong.';
        $('.Popup1').show();
      }
    )
  }

  addVehicleData() {
    let url = '/history/outside_transport'
    let post_data = {
      // "Trip_No": (Math.round(Math.random() * 100000)),
      "VehicleNo": $('#Vnumber').val().toString().toUpperCase(),
      "Make": $('#vehicleMake').val(),
      "Model": $('#VehicleModel').val(),
      "Insurance_exp_date": $('#vehicleInsurance_exp_date').val(),
      "PUC_exp_date": $('#VPUC_exp_date').val(),
      // "Material_Type": $('#Material_Type').val(),
      "Material": $('#Material_Type').val(),
      "Issued_By": this.serviceCall.UserId,//$('#Issued_By').val(),
      // "Issued_Date": $('#Issued_Date').val(),
      "Driver_Name": $('#Driver_Name').val(),
      "Driver_Number": $('#Driver_Number').val(),
      // "Time": $('#Time').val(),
      "Consignee_Name": $('#Consignee_Name').val(),
      "Address": $('#Address').val(),
      // "Gross_Weight": $('#Gross_Weight').val(),
      // "Tare_Weight": $('#Tare_Weight').val(),
      // "Net_Weight": $('#Net_Weight').val(),
      "Qty_Mt_Weight": $('#outqty_mt_Weight').val(),
      "Vehicle": this.isVehicleDataAvailable,
      "Card_Number": this.card_number,//$('#outCardNumber').val(),
      "Status": "In plant"
      // "LrNumber":$('#outlrNumber').val(),
      // "LrDate":$('#outlrDate').val()
    }
    if ($('#outlrDate').val() !== '' && $('#outlrDate').val() !== null && $('#outlrDate').val() !== undefined) {
      post_data['LrDate'] = $('#outlrDate').val();
    }
    if ($('#outlrNumber').val() !== '' && $('#outlrNumber').val() !== null && $('#outlrNumber').val() !== undefined) {
      post_data['LrNumber'] = $('#outlrNumber').val();
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
      }, (error) => {
        this.Message = 'Something went wrong.';
        $(".Popup1").show();
      })
  }

  validate() {
    var err = 0
    // if($('#Material').val() == ''){
    //   $('#Material').addClass('errDisplay');
    //   err++
    // }else{
    //   $('#Material').removeClass('errDisplay');
    // }
    if ($('#Material_Type').val() == '') {
      $('#Material_Type').addClass('errDisplay');
      err++
    } else {
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
    if ($('#outqty_mt_Weight').val() == '') {
      $('#outqty_mt_Weight').addClass('errDisplay');
      err++
    } else {
      $('#outqty_mt_Weight').removeClass('errDisplay');
    }
    if ($('#outCardNumber').val() == '') {
      $('#outCardNumber').addClass('errDisplay');
      err++
    } else {
      $('#outCardNumber').removeClass('errDisplay');
    }
    if (err == 0) {
      // this.addVehicleData();
      $('.RegNoOut').show();
    }
  }
  validateVehicleDetails() {
    var err = 0
    if ($('#vehicleMake').val() == '') {
      $('#vehicleMake').addClass('errDisplay');
      err++
    } else {
      $('#vehicleMake').removeClass('errDisplay');
    }
    if ($('#VehicleModel').val() == '') {
      $('#VehicleModel').addClass('errDisplay');
      err++
    } else {
      $('#VehicleModel').removeClass('errDisplay');
    }
    if ($('#vehicleInsurance_exp_date').val() == '') {
      $('#vehicleInsurance_exp_date').addClass('errDisplay');
      err++
    } else {
      $('#vehicleInsurance_exp_date').removeClass('errDisplay');
    }
    if ($('#VPUC_exp_date').val() == '') {
      $('#VPUC_exp_date').addClass('errDisplay');
      err++
    } else {
      $('#VPUC_exp_date').removeClass('errDisplay');
    }
    if ($('#Vnumber').val() == '') {
      $('#Vnumber').addClass('errDisplay');
      err++
    } else {
      $('#Vnumber').removeClass('errDisplay');
    }
    if (err == 0) {
      this.active('Driver');
    }
  }
  validateDirverDetails() {
    var err = 0
    if ($('#Consignee_Name').val() == '') {
      $('#Consignee_Name').addClass('errDisplay');
      err++
    } else {
      $('#Consignee_Name').removeClass('errDisplay');
    }
    if ($('#Address').val() == '') {
      $('#Address').addClass('errDisplay');
      err++
    } else {
      $('#Address').removeClass('errDisplay');
    }
    if ($('#Driver_Name').val() == '') {
      $('#Driver_Name').addClass('errDisplay');
      err++
    } else {
      $('#Driver_Name').removeClass('errDisplay');
    }
    if ($('#Driver_Number').val() == '') {
      $('#Driver_Number').addClass('errDisplay');
      err++
    } else {
      $('#Driver_Number').removeClass('errDisplay');
    }
    if (err == 0) {
      this.active('Material');
    }
  }
  hidePopup() {
    $(".Popup1").hide();
    let fullUrl = window.location.href.split('?')[1];
    let sessionID = (fullUrl && fullUrl.split('=')[1]) ? fullUrl.split('=')[1] : '';
    if (this.Message == 'Trip Created Successfully') {
      this.Router.navigate(['/outBoundDashboard'], { queryParams: { sessionID: sessionID } });
    }
  }
  validateVehicleNumber() {
    var vehicleNumberPatter = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/
    if ($('#checkOutVehicleNumber').val() !== "") {
      // if(!vehicleNumberPatter.test($('#checkOutVehicleNumber').val().toString().toUpperCase())){
      //   $('#checkOutVehicleNumber').addClass('errDisplay');
      // }else{
      //   $('#checkOutVehicleNumber').removeClass('errDisplay');
      //   this.checkHistory();
      // }
      this.checkHistory();
    } else {
      $('#checkOutVehicleNumber').addClass('errDisplay');
    }
  }
  active(className) {
    $('.vehicle, .Driver, .Material').removeClass('top-menu--active');
    $('#MaterialOut, #DriverDetailsOut, #VehcileDataOut,.addButtonOut,.tab2,.tab1').hide();
    $('.' + className).addClass('top-menu--active');
    if (className == "Material") {
      $('#MaterialOut ,.addButtonOut').show();
      if (this.serviceCall.Material.length > 0) {
        $('#Material_Type').empty();
        $('#Material_Type').append("<option value=''>Select Material Type</option>");
        for (var a in this.serviceCall.Material) {
          $('#Material_Type').append("<option value=" + this.serviceCall.Material[a]['MaterialName'] + ">" + this.serviceCall.Material[a]['MaterialName'] + "</option>")
        }
      }
    }
    if (className == "Driver") {
      $('#DriverDetailsOut,.tab2').show();
    }
    if (className == "vehicle") {
      $('#VehcileDataOut,.tab1').show();
    }
  }
  uploadDocument() {
    $('.uploadDocOut').show();
    $('#errUploadDocOut').hide();
  }
  hideuploadPopup() {
    $(".uploadDocOut").hide();
  }
  hideuploadPopupok() {
    if (this.docStatus !== 'Documents Uploaded Successfully.') {
      $('.afterUploadOut,.afterUploadButtonOut').hide();
      $(".toUploadOut").show();
    } else {
      $(".uploadDocOut").hide();
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
      $("#errUploadDocOut").show();
    } else {
      $("#errUploadDocOut, .toUploadOut").hide();
      $('.afterUploadOut').show();
      this.docStatus = 'Please Wait...'
      let formData = new FormData();
      formData.append("files[]", this.uploadedFiles[0], 'rc.' + this.uploadedFiles['0'].name.split('.')[1]);
      formData.append("files[]", this.uploadedFiles[1], 'puc.' + this.uploadedFiles['1'].name.split('.')[1]);
      // formData.append("files", this.uploadedFiles['0'],'rc'+this.uploadedFiles['0'].name.split('.'));
      // formData.append("file_2", this.uploadedFiles['1'],'pucc');
      formData.append("VehicleNo", $('#Vnumber').val().toString());
      let url = '/vehicle/upload_document';
      this.serviceCall.uploadFile(url, formData).subscribe(
        data => {
          console.log(data);
          $('.afterUploadButtonOut').show();
          if (data['status'] == 1) {
            this.docStatus = 'Documents Uploaded Successfully.';
          } else if (data['status'] == 0) {
            this.docStatus = 'Documents Upload Failed.';
          } else {
            this.docStatus = "Technical issue, cannot upload."
          }
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

  hideCardPopup() {
    $('.RegNoOut').hide();
  }

  SendCardNo() {
    let url = '/getData';
    this.serviceCall.getCardNumber(url).subscribe(
      data => {
        $('.RegNoOut').hide();
        if (data['status'] == 1 && data['msg']) {
          this.card_number =  data['msg'];
          this.addVehicleData();
        } else {
          this.Message = 'Unable to get card.';
          $('.Popup1').show();
        }
      }, (error) => {
        $('.RegNoOut').hide();
        this.Message = 'Something went wrong.';
        $('.Popup1').show();
      })
  }

}
