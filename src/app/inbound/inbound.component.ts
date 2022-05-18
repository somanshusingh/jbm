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
  docStatus = '';
  carNoAdded = false;
  storeTrip;
  currentTab = 'vehicle';

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
              $('#inboundRegisterFinal').hide();
              $("#inboundSubmitFinal").show();
            } else {
              this.Message = "Vehicle PUC Expired";
              $('.Popup1').show();
              $('#checkVehicleIn').attr('disabled', 'disabled');
            }
          } else {
            this.Message = "Vehicle Insurance Expired";
            $('.Popup1').show();
            $('#checkVehicleIn').attr('disabled', 'disabled');
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
      }, (error) => {
        this.Message = 'Something went wrong.';
        $('.Popup1').show();
      }
    )
  }

  addVehicleData() {
    let url = '/history/inhouse_transport'
    let post_data = {
      "Trip_No": (Math.round(Math.random() * 100000)),
      "VehicleNo": $('#inVnumber').val().toString().toUpperCase(),
      "Make": $('#invehicleMake').val(),
      "Model": $('#inVehicleModel').val(),
      "Insurance_exp_date": moment($('#invehicleInsurance_exp_date').val()).format('YYYY-MM-DD hh:mm:ss'),
      "PUC_exp_date": moment($('#inVPUC_exp_date').val()).format('YYYY-MM-DD hh:mm:ss'),
      "Material": $('#inMaterial_Type').val(),
      // "Material": $('#inMaterial').val(),
      "Issued_By": this.serviceCall.UserId,
      // "Issued_Date": $('#inIssued_Date').val(),
      "Driver_Name": $('#inDriver_Name').val(),
      "Driver_Number": $('#inDriver_Number').val(),
      // "Time": $('#inTime').val(),
      "Consignee_Name": $('#inConsignee_Name').val(),
      "Address": $('#inAddress').val(),
      "Qty_Mt_Weight": $('#qty_mt_Weight').val(),
      "Status": "In transit"
      // "Gross_Weight": $('#inGross_Weight').val(),
      // "Tare_Weight": $('#inTare_Weight').val(),
      // "Net_Weight": $('#inNet_Weight').val()
      // "LrNumber":$('#lrNumber').val(),
      // "LrDate":$('#lrDate').val()
    }
    if ($('#lrDate').val() !== '' && $('#lrDate').val() !== null && $('#lrDate').val() !== undefined) {
      post_data['LrDate'] = moment($('#lrDate').val()).format('YYYY-MM-DD hh:mm:ss');
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
          this.Message = JSON.stringify(data['msg']) == ''? 'Something went wrong':JSON.stringify(data['msg']);
        } else if (data['status'] == 100) {
          this.Message = JSON.stringify(data['msg']) == ''? 'Something went wrong':JSON.stringify(data['msg']);
        } else {
          this.Message = 'Something went wrong.';
        }
      }, (error) => {
        this.Message = 'Something went wrong.';
        $('.Popup1').show();
      })
  }

  validate(source) {
    var err = 0
    var mobilePattern = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
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
      if (!mobilePattern.test($("#inDriver_Number").val().toString())) {
        $('#inDriver_Number').addClass('errDisplay');
      err++
      }
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
      if (window.location.pathname == '/inBound/inhouse') {
        $('.RegNo').show();
      }
      else {
        this.addVehicleData();
      }
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
      $('#tabErr').hide();
    } else {
      if(this.currentTab.toLowerCase() == 'vehicle'){
        $('#tabErr').show();
        this.active('Driver');
      }
    }
  }
  hidePopup() {
    $(".Popup1").hide();
    let fullUrl = window.location.href.split('?')[1];
    let sessionID = (fullUrl && fullUrl.split('=')[1]) ? fullUrl.split('=')[1] : '';
    if (this.Message == 'Trip Created Successfully') {
      this.Router.navigate(['/inBoundDashboard'], { queryParams: { sessionID: sessionID } });
    }
    if (this.carNoAdded == true) {
      // window.location.reload();
      this.Router.navigate(['/inBoundDashboard'], { queryParams: { sessionID: sessionID } });
    }
  }
  validateVehicleNumber() {
    // var vehicleNumberPatter = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/
    var vehicleNumberPatter =/^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/
    if ($('#checkVehicleNumber').val() !== "") {
      if(!vehicleNumberPatter.test($('#checkVehicleNumber').val().toString().toUpperCase())){
        $('#checkVehicleNumber').addClass('errDisplay');
      }else{
        $('#checkVehicleNumber').removeClass('errDisplay');
        if (window.location.pathname == '/inBound/inhouse') {
          this.getInHouseStatus();
        } else {
          this.getInboundStatus();
        }
      }
      // this.checkHistory();
    } else {
      $('#checkVehicleNumber').addClass('errDisplay');
    }
  }
  active(className) {
    this.currentTab = className;
    $('#tabErr').hide();
    $('.vehicle, .Driver, .Material').removeClass('top-menu--active');
    $('#MaterialIn, #DriverDetailsIn, #VehcileDataIn,.addButtonin,.tab2,.tab1').hide();
    $('.' + className).addClass('top-menu--active');
    if (className == "Material") {
      $('#MaterialIn ,.addButtonin').show();
      if (this.serviceCall.Material.length > 0) {
        $('#inMaterial_Type').empty();
        $('#inMaterial_Type').append("<option value=''>Select Material Type</option>");
        for (var a in this.serviceCall.Material) {
          $('#inMaterial_Type').append("<option value='" + this.serviceCall.Material[a]['MaterialName'] + "'>" + this.serviceCall.Material[a]['MaterialName'] + "</option>")
        }
      }
      $('#inMaterial_Type').val(this.storeTrip['Material']);
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
  hideuploadPopupok() {
    if (this.docStatus !== 'Documents Uploaded Successfully.') {
      $('.afterUpload,.afterUploadButton').hide();
      $(".toUpload").show();
    } else {
      $(".uploadDoc").hide();
    }
  }
  // getFiles(event) {
  //   if (event.target.files.length != 0) {
  //     this.uploadedFiles.push(event.target.files[0]);
  //     this.uploadfile_name = event.target.id;
  //   } else {
  //     this.uploadedFiles.pop();
  //   }
  // }
  // uploadDocs() {
  //   if (this.uploadedFiles.length < 2) {
  //     $("#errUploadDoc").show();
  //   } else {
  //     $("#errUploadDoc, .toUpload").hide();
  //     $('.afterUpload').show();
  //     this.docStatus = 'Please Wait...'
  //     let formData = new FormData();
  //     formData.append("files[]", this.uploadedFiles[0], 'rc.' + this.uploadedFiles['0'].name.split('.')[1]);
  //     formData.append("files[]", this.uploadedFiles[1], 'puc.' + this.uploadedFiles['1'].name.split('.')[1]);
  //     // formData.append("files", this.uploadedFiles['0'],'rc'+this.uploadedFiles['0'].name.split('.'));
  //     // formData.append("file_2", this.uploadedFiles['1'],'pucc');
  //     formData.append("VehicleNo", $('#inVnumber').val().toString());
  //     let url = '/vehicle/upload_document';
  //     this.serviceCall.uploadFile(url, formData).subscribe(
  //       data => {
  //         console.log(data);
  //         $('.afterUploadButton').show();
  //         if (data['status'] == 1) {
  //           this.docStatus = 'Documents Uploaded Successfully.';
  //         } else if (data['status'] == 0) {
  //           this.docStatus = 'Documents Upload Failed.';
  //         } else {
  //           this.docStatus = "Technical issue, cannot upload."
  //         }
  //       }, (error) => {
  //         $('.afterUploadButton').show();
  //         this.docStatus = "Technical issue, cannot upload."
  //       })
  //   }
  // }
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
  getInboundStatus() {
    let vehicelStatus = 0;
    let TripsAvailable = [];
    let url = '/history/inhouse_transport/view?VehicleNo=' + $("#checkVehicleNumber").val();
    this.serviceCall.getService(url).subscribe(
      data => {
        if (data['status'] == 1 && data['msg'] && data['msg'].length > 0) {
          for (var i in data['msg']) {
            // if (data['msg'][i]['Status'] == 'open') {
            if (data['msg'][i].hasOwnProperty('Status') && data['msg'][i]['Status'].toLowerCase() !== 'completed' && data['msg'][i]['Status'].toLowerCase() !== 'close' && data['msg'][i]['Status'].toLowerCase() !== "") {
              vehicelStatus++;
              TripsAvailable.push(data['msg'][i]);
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
            this.checkHistory();
          }
        } else if (data['status'] == 0 && data['msg'].toLowerCase() == 'no trip available') {
          this.checkHistory();
        } else if (data['status'] == 0 && data['msg'].toLowerCase() == 'trip already exists') {
          this.Message = 'Please Complete The Existing Trip.';
          $('.Popup1').show();
        } else {
          this.Message = 'Something went wrong.';
          $('.Popup1').show();
        }
      }, (error) => {
        this.Message = 'Something went wrong.';
        $('.Popup1').show();
      })
  }

  getInHouseStatus() {
    let vehicelStatus = 0;
    let TripsAvailable = [];
    let url = '/history/inhouse_transport/view?VehicleNo=' + $("#checkVehicleNumber").val();
    this.serviceCall.getService(url).subscribe(
      data => {
        if (data['status'] == 1 && data['msg'] && data['msg'].length > 0) {
          for (var i in data['msg']) {
            if (data['msg'][i]['Status'].toLowerCase() == 'in transit') {
              vehicelStatus++;
              TripsAvailable.push(data['msg'][i]);
            }
          }
          if (TripsAvailable.length > 0) {
            this.checkHistoryInhouse(TripsAvailable[0]);
          } else {
            this.Message = 'No Trip Available.';
            $('.Popup1').show();
          }
        } else if (data['status'] == 0 && data['msg'] == 'No trip available') {
          this.Message = 'No Trip Available.';
          $('.Popup1').show();
        }
      }, (error) => {
        this.Message = 'Something went wrong.';
        $('.Popup1').show();
      })
  }

  checkHistoryInhouse(Trip) {
    $("#inTripDasboard").val('');
    console.log(Trip);
    let url = '/vehicle/view/' + Trip['VehicleNo'];
    this.serviceCall.getService(url).subscribe(data => {
      if (data['status'] == 1 && data['msg'] && data['msg'].length > 0) {
        $('#VehicleNumberForm').hide();
        $('#inboundForm').show();
        $('#invehicleMake').val(data['msg'][0]['Make']);
        $('#inVehicleModel').val(data['msg'][0]['Model']);
        $('#invehicleInsurance_exp_date').val(data['msg'][0]['Insurance_exp_date'].split('T')[0]);
        $('#inVPUC_exp_date').val(data['msg'][0]['PUC_exp_date'].split('T')[0]);
        $('#inVnumber').val($("#checkVehicleNumber").val());
        // $('#inIssued_By').val(this.serviceCall.Role);
        $('#inDriver_Name').val(Trip['Driver_Name']);
        $('#inDriver_Number').val(Trip['Driver_Number']);
        $('#inConsignee_Name').val(Trip['Consignee_Name']);
        $('#inAddress').val(Trip['Address']);
        $('#qty_mt_Weight').val(Trip['Qty_Mt_Weight']);
        $('#inMaterial_Type').val(Trip['Material']);
        $('#lrNumber').val(Trip['LrNumber']);
        if (Trip['LrDate'] !== null && Trip['LrDate'] !== undefined && Trip['LrDate'] !== '') {
          $('#lrDate').val(Trip['LrDate'].split('T')[0]);
        }
        $("#inTripDasboard").val(Trip['Trip_No']);
        this.storeTrip = Trip;
        this.active('Material');
        $('#inboundRegisterFinal').show();
        $("#inboundSubmitFinal").hide();
      } else {
        this.Message = 'Vehicle Data Not Found';
        $('.Popup1').show();
      }
    }, (error) => {
      this.Message = 'Something went wrong.';
      $('.Popup1').show();
    })

  }
  hideCardPopup() {
    $('.RegNo').hide();
  }
  SendCardNo() {
    // var err = 0;
    // if ($('#PopUpCardNo').val() == '') {
    //   $('#PopUpCardNo').addClass('errDisplay');
    //   err++
    // } else {
    //   $('#PopUpCardNo').removeClass('errDisplay');
    // }
    // if (err == 0) {
    let url = '/getData';
    this.serviceCall.getCardNumber(url).subscribe(
      data => {
        $('.RegNo').hide();
        if (data['status'] == 1 && data['msg']) {
          let url = '/history/inhouse_transport/update'
          let post_data = {
            "Trip_No": $("#inTripDasboard").val(),
            "Card_Number": data['msg'],//$("#PopUpCardNo").val(),
            "Status": 'In plant'
          }
          this.serviceCall.signin(url, post_data).subscribe(data => {
            $('.RegNo').hide();
            if (data['status'] == 1) {
              this.Message = "Card Updated Successfully.";
              $('.Popup1').show();
              this.carNoAdded = true;
            } else {
              this.Message = 'Unable to update card.';
              $('.Popup1').show();
            }
          }, (error) => {
            $('.RegNo').hide();
            this.Message = 'Something went wrong.';
            $('.Popup1').show();
          })
        } else {
          this.Message = 'Unable to get card.';
          $('.Popup1').show();
        }
      }, (error) => {
        $('.RegNo').hide();
        this.Message = 'Something went wrong.';
        $('.Popup1').show();
      })
    // }
  }
  validateDoc() {
    if (this.docStatus !== 'Documents Uploaded Successfully.' && (window.location.pathname !== '/inBound/inhouse')) {
      $('.buttonCss').css('background-color', 'red');
      $('.uploadErr').show();
    } else {
      $('.buttonCss').css('background-color', '#1d40aa');
      $('.uploadErr').hide();
      this.active('Driver');
    }
  }
}
