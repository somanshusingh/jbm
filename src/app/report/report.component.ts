import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  data = [];
  original_data = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Message;
  tripNo: any;
  Edited = false;
  constructor(private serviceCall: ApiService, private Router: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      lengthChange: false,
      searching: false,
      ordering: false,
      destroy: true,
      responsive: true,
      scrollX: true,
      processing: true,
      paging:false,
      info: false
    }
    $('#startDate, #endDate').val(moment().format('YYYY-MM-DD'));
    this.filter();
  }
  download() {
    let url = '/history/downloadReport'
    let post_data = {
      fromDate: $('#startDate').val(),
        toDate: $('#endDate').val(),
        status: $('#Status').val()
    }
    this.serviceCall.signin(url, post_data).subscribe(data => {
      if (data['status'] == 1) {
        this.Message = 'Report downloaded successfully.';
        $('.statusPopup').show();
      } else if (data['status'] == 0) {
        this.Message = 'No data available.';
        $('.statusPopup').show();
      } else {
        this.Message = 'Something went wrong.';
        $('.statusPopup').show();
      }
    }, (error) => {
      this.Message = 'Something went wrong.';
      $('.statusPopup').show();
    })
  }
  hideStatusPopup() {
    $('.statusPopup').hide();
  }
  filter() {
    var err = 0;
    if ($('#startDate').val() == '') {
      $('#startDate').addClass('errDisplay');
      err++;
    } else {
      $('#startDate').removeClass('errDisplay');
    }
    if ($('#endDate').val() == '') {
      $('#endDate').addClass('errDisplay');
      err++
    } else {
      $('#endDate').removeClass('errDisplay');
    }
    if (err == 0) {
      let url = '/history/report';
      let post_data = {
        fromDate: $('#startDate').val(),
        toDate: $('#endDate').val(),
        status: $('#Status').val()
      }
      this.serviceCall.signin(url, post_data).subscribe(data => {
        if (data['status'] == 1) {
          this.data = data['msg'];
        } else if (data['status'] == 0) {
          this.data = [];
        } else {
          this.Message = 'Something went wrong.';
          $('.statusPopup').show();
        }
      }, (error) => {
        this.Message = 'Something went wrong.';
        $('.statusPopup').show();
      })
    }
  }

}
