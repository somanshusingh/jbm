import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-inbound-dashboard',
  templateUrl: './inbound-dashboard.component.html',
  styleUrls: ['./inbound-dashboard.component.css']
})
export class InboundDashboardComponent implements OnInit {
  data=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Message;
  tripNo: any;
  Edited = false;
  constructor(private serviceCall: ApiService, private Router: Router) { }

  ngOnInit(): void {
    this.getData();
    this.dtOptions = {
      pagingType: 'simple_numbers',
      pageLength: 10,
      lengthMenu: [10, 50, 100],
      processing: true,
      order: [],
      columnDefs: [{
        'targets': [0, 1, 2, 3], /* column index [0,1,2,3]*/
        'orderable': false, /* true or false */
      }],
      responsive: true,
      scrollX: true,
    };
  }
  getData() {
    var url = "/history/inhouse_transport/view"
    this.serviceCall.getService(url).subscribe(data => {
      this.data = data['msg'];
      // for(var i in data['msg']){
      //   if(data['msg'][i].hasOwnProperty('Status') && data['msg'][i]['Status'] == 'open'){
      //     this.data.push(data['msg'][i]);
      //   }
      // }
      console.log(this.data);
      if (this.Edited == false) {
        this.dtTrigger.next();
      }
    })
  }
  closeEdit() {
    $('.editInPopup1').hide();
  }
  validateEdit() {
    var err = 0
    if ($('#editinvehicleMake').val() == '') {
      $('#editinvehicleMake').addClass('errDisplay');
      err++
    } else {
      $('#editinvehicleMake').removeClass('errDisplay');
    }
    if ($('#editinVehicleModel').val() == '') {
      $('#editinVehicleModel').addClass('errDisplay');
      err++
    } else {
      $('#editinVehicleModel').removeClass('errDisplay');
    }
    if ($('#editinvehicleInsurance_exp_date').val() == '') {
      $('#editinvehicleInsurance_exp_date').addClass('errDisplay');
      err++
    } else {
      $('#editinvehicleInsurance_exp_date').removeClass('errDisplay');
    }
    if ($('#editinVPUC_exp_date').val() == '') {
      $('#editinVPUC_exp_date').addClass('errDisplay');
      err++
    } else {
      $('#editinVPUC_exp_date').removeClass('errDisplay');
    }
    if ($('#editinMaterial').val() == '') {
      $('#editinMaterial').addClass('errDisplay');
      err++
    } else {
      $('#editinMaterial').removeClass('errDisplay');
    }
    if ($('#editinMaterial_Type').val() == '') {
      $('#editinMaterial_Type').addClass('errDisplay');
      err++
    } else {
      $('#editinMaterial_Type').removeClass('errDisplay');
    }
    if ($('#editinIssued_By').val() == '') {
      $('#editinIssued_By').addClass('errDisplay');
      err++
    } else {
      $('#editinIssued_By').removeClass('errDisplay');
    }
    if ($('#editinIssued_Date').val() == '') {
      $('#editinIssued_Date').addClass('errDisplay');
      err++
    } else {
      $('#editinIssued_Date').removeClass('errDisplay');
    }
    if ($('#editinDriver_Name').val() == '') {
      $('#editinDriver_Name').addClass('errDisplay');
      err++
    } else {
      $('#editinDriver_Name').removeClass('errDisplay');
    }
    if ($('#editinDriver_Number').val() == '') {
      $('#editinDriver_Number').addClass('errDisplay');
      err++
    } else {
      $('#editinDriver_Number').removeClass('errDisplay');
    }
    if ($('#editinTime').val() == '') {
      $('#editinTime').addClass('errDisplay');
      err++
    } else {
      $('#editinTime').removeClass('errDisplay');
    }
    if ($('#editinConsignee_Name').val() == '') {
      $('#editinConsignee_Name').addClass('errDisplay');
      err++
    } else {
      $('#editinConsignee_Name').removeClass('errDisplay');
    }
    if ($('#editinAddress').val() == '') {
      $('#editinAddress').addClass('errDisplay');
      err++
    } else {
      $('#editinAddress').removeClass('errDisplay');
    }
    if ($('#editinTrip_No').val() == '') {
      $('#editinTrip_No').addClass('errDisplay');
      err++
    } else {
      $('#editinTrip_No').removeClass('errDisplay');
    }
    if ($('#editinVnumber').val() == '') {
      $('#editinVnumber').addClass('errDisplay');
      err++
    } else {
      $('#editinVnumber').removeClass('errDisplay');
    }
    if ($('#editqty_mt_Weight').val() == '') {
      $('#editqty_mt_Weight').addClass('errDisplay');
      err++
    } else {
      $('#editqty_mt_Weight').removeClass('errDisplay');
    }
    if (err == 0) {
      this.updateInboundData();
    }
  }
  updateInboundData() {
    $('.editInPopup1').hide();
    $('.inViewPopup1').hide();
    $('.inPopup1message').show();
    $('.inPopupMessagebutton').hide();
    this.Message = 'Please Wait...'
    let url = '/history/inhouse_transport/update'
    let post_data = {
      "Trip_No": $('#editinTrip').val(),
      "VehicleNo": $('#editinVnumber').val(),
      // "Material_Type": $('#editinMaterial_Type').val(),
      "Material": $('#editinMaterial_Type').val(),
      "Issued_By": this.serviceCall.UserId,
      // "Issued_Date": '',
      "Driver_Name": $('#editinDriver_Name').val(),
      "Driver_Number": $('#editinDriver_Number').val(),
      // "Time": '',
      "Consignee_Name": $('#editinConsignee_Name').val(),
      "Address": $('#editinAddress').val(),
      "Qty_Mt_Weight": $('#editqty_mt_Weight').val()
    }
    if ($('#editinlrDate').val() !== '' && $('#editinlrDate').val() !== null && $('#editinlrDate').val() !== undefined) {
      post_data['LrDate'] = moment($('#editinlrDate').val()).format('YYYY-MM-DD hh:mm:ss');
    }
    if ($('#editinlrNumber').val() !== '' && $('#editinlrNumber').val() !== null && $('#editinlrNumber').val() !== undefined) {
      post_data['LrNumber'] = $('#editinlrNumber').val();
    }
    this.serviceCall.signin(url, post_data).subscribe(
      data => {
        $(".inPopupMessagebutton").show();
        if (data['status'] == 1) {
          this.Message = "Data Updated Successfully";
        } else if (data['status'] == 0) {
          this.Message = 'Update Failed';
        } else if (data['status'] == 100) {
          this.Message = JSON.stringify(data['msg']);
        } else {
          this.Message = 'Something went wrong.';
        }
      },
      (error)=>{
        $(".inPopupMessagebutton").show();
        this.Message = 'Something went wrong.';
      })
  }
  viewData(source, tripNo) {
    this.tripNo = tripNo;
    for (var i = 0; i < this.data.length; i++) {
      for (var a in this.data[i]) {
        if (a == 'Trip_No') {
          if (this.data[i][a] == tripNo) {
            if (source == 'view') {
              $('.inViewPopup1').show();
              $('.editInPopup1').hide();
              $('#inViewTrip_No').html(this.data[i]['Trip_No']);
              $('#inViewVehicleNo').html(this.data[i]['VehicleNo']);
              $('#inViewDriver_Name').html(this.data[i]['Driver_Name']);
              $('#inViewDriver_Number').html(this.data[i]['Driver_Number']);
              $('#inViewConsignee_Name').html(this.data[i]['Consignee_Name']);
              $('#inViewIssued_By').html(this.data[i]['Issued_By']);
              $('#inViewIssued_Date').html(this.data[i]['Issued_Date']);
              $('#inViewMaterial').html(this.data[i]['Material']);
              $('#inViewMaterial_Type').html(this.data[i]['Material_Type']);
              $('#inViewQty_Mt_Weight').html(this.data[i]['Qty_Mt_Weight']);
              $('#inViewTime').html(this.data[i]['Time']);
              $('#inViewStatus').html(this.data[i]['Status']);
              $('#inViewQty_Mt_Weight').html(this.data[i]['Qty_Mt_Weight']);
              $('#inViewMake').html(this.data[i]['Make']);
              $('#inViewModel').html(this.data[i]['Model']);
              $('#inViewPUC_exp_date').html(this.data[i]['UC_exp_date']);
              $('#inViewAddress').html(this.data[i]['Address']);
              $('#inViewCard_Number').html(this.data[i]['Card_Number']);
              $('#inViewInsurance_exp_date').html(this.data[i]['Insurance_exp_date']);
              $('#inViewIssued_By').html(this.data[i]['Issued_By']);
              $('#inViewIssued_Date').html(this.data[i]['Issued_Date']);
              $('#inViewLrDate').html(this.data[i]['LrDate']);
              $('#inViewLrNumber').html(this.data[i]['LrNumber']);
              $('#inViewRemark_Field').html(this.data[i]['Remark_Field']);
              $('#inViewTime').html(this.data[i]['Time']);
              $('#inViewType').html(this.data[i]['Type']);

              let net_weight = (this.data[i]['Gross_Weight'] -0)+(this.data[i]['Tare_Weight']-0)
              $('#inViewNet_Weight').html(net_weight.toString());//$('#inViewNet_Weight').html(this.data[i]['Net_Weight']);
              $('#inViewGross_Weight').html(this.data[i]['Gross_Weight']);
              $('#inViewTare_Weight').html(this.data[i]['Tare_Weight']);
              $('#inViewGross_Wgh_Date_time').html(moment(this.data[i]['Gross_Wgh_Date_time']).format('DD-MM-YYYY'));
              $('#inViewTare_Wgh_Date_time').html(moment(this.data[i]['Tare_Wgh_Date_time']).format('DD-MM-YYYY'));
              if(this.data[i]['Document'] !== '' && this.data[i]['Document'] !== undefined && this.data[i]['Document'] !== null){
                $('#doc1NameIn').html(this.data[i]['Document']['Doc1_Name']);
                $('#docImage1In').attr('src','https://jbmapp.herokuapp.com'+this.data[i]['Document']['Doc1_Data']);
                $('#doc2NameIn').html(this.data[i]['Document']['Doc2_Name']);
                $('#docImage2In').attr('src','https://jbmapp.herokuapp.com'+this.data[i]['Document']['Doc2_Data']);
                $('#docViewStatusIn').html('');
              }else{
                $('#doc1NameIn').html('');
                $('#docImage1In').attr('src','assets/images/blankImg.jpg');
                $('#doc2NameIn').html('');
                $('#docImage2In').attr('src','assets/images/blankImg.jpg');
                // $('#docViewStatusIn').html('Documents Not Available.')
              }
            }
            if (source == 'edit') {
              $('.editInPopup1').show();
              $('.inViewPopup1').hide();
              // $('#editinvehicleMake').val(this.data[i]['VehicleNo']);
              // $('#editinvehicleInsurance_exp_date').val(this.data[i]['Insurance_exp_date'].split('T')[0]);
              $('#editinMaterial').val(this.data[i]['Material']);
              $('#editinIssued_By').val(this.data[i]['Issued_By']);
              $('#editinDriver_Name').val(this.data[i]['Driver_Name']);
              $('#editinConsignee_Name').val(this.data[i]['Consignee_Name']);
              $('#editqty_mt_Weight').val(this.data[i]['Qty_Mt_Weight']);
              $('#editinVnumber').val(this.data[i]['VehicleNo']);
              // $('#editinVehicleModel').val(this.data[i]['VehicleType']);
              // $('#editinVPUC_exp_date').val(this.data[i]['VehicleType']);
              // $('#editinMaterial_Type').val(this.data[i]['Material']);
              // $('#editinIssued_Date').val(this.data[i]['Issued_Date'].split('T')[0]);
              $('#editinDriver_Number').val(this.data[i]['Driver_Number']);
              $('#editinAddress').val(this.data[i]['Address']);
              $('#editinTime').val(this.data[i]['Time']);
              $('#editinTrip').val(this.data[i]['Trip_No']);
              if(this.serviceCall.Material.length >0){
                $('#editinMaterial_Type').empty();
                $('#editinMaterial_Type').append("<option value=''>Select Material Type</option>");
                for(var a in this.serviceCall.Material){
                  $('#editinMaterial_Type').append("<option value='"+this.serviceCall.Material[a]['MaterialName']+"'>"+this.serviceCall.Material[a]['MaterialName']+"</option>")
              }
              }
              $('#editinlrDate').val(moment(this.data[i]['LrDate']).format('YYYY-MM-DD'));
              $('#editinlrNumber').val(this.data[i]['LrNumber']);
              $('#editinMaterial_Type').val(this.data[i]['Material']);
            }
          }
        }
      }
    }
  }
  hideMessagePopup() {
    $('.inPopup1message').hide();
    this.Edited = true;
    // this.getData();
    window.location.reload();
  }
  hideView() {
    $('.inViewPopup1').hide();
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
  ValidateNumber(event) {
    if (!(/^[0-9]*$/.test(event.target.value))) {
      event.target.value = "";
    }
  }
  navigate(path){
    this.Router.navigate([path], { queryParams:{sessionID:this.serviceCall.sessionID}})
  }
}


