import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements AfterViewInit, OnInit, OnDestroy {
  data = [];
  original_data = [];
  dtOptions: any = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: DataTables.Api;
  dtTrigger: Subject<any> = new Subject<any>();
  Message;
  tripNo: any;
  Edited = false;
  constructor(private serviceCall: ApiService, private Router: Router) { }

  ngOnInit(): void {
    // this.dtOptions = {
    //   lengthChange: false,
    //   searching: false,
    //   ordering: false,
    //   destroy: true,
    //   responsive: true,
    //   scrollX: true,
    //   processing: true,
    //   paging:true,
    //   info: false
    // }
    this.dtOptions = {
      pagingType: 'full_numbers',
      // pageLength: 3,
      searching:false,
      processing: true,
      responsive: true,
    scrollX: true,
      dom: 'Bfrtip',
      buttons: [
        // 'copy', 
        // 'csv', 
        'excel', 
        // 'print'
      ]
    };
    $('#startDate, #endDate').val(moment().format('YYYY-MM-DD'));
    // $('#startDate').val(moment('2022-01-02').format('YYYY-MM-DD'));
    this.filter();
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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
        // this.Message = 'Report downloaded successfully.';
        // $('.statusPopup').show();
        window.open(data['msg']);
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
          this.rerender();
        } else if (data['status'] == 0) {
          this.data = [];
          this.rerender();
        } else {
          this.Message = 'Something went wrong.';
          $('.statusPopup').show();
          this.rerender();
        }
      }, (error) => {
        this.Message = 'Something went wrong.';
        $('.statusPopup').show();
        this.rerender();
      })
    }
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    // Destroy the table first
    dtInstance.destroy();
    // Call the dtTrigger to rerender again
    this.dtTrigger.next();
    var x = window.matchMedia("(max-width: 700px)")

    setTimeout(() => {  
      if (x.matches) { // If media query matches
        $('.buttons-excel').attr('style','color: white;width: 2.5cm;background-color: #0067ac;height: 35px;border-radius: 7px;float: right;position: absolute;top: -35px;')
      } else {
        $('.buttons-excel').attr('style','color: white;width: 2.5cm;background-color: #0067ac;height: 35px;border-radius: 7px;float: right;position: absolute;left: 20cm;top: -49px;')
      }
    }, 400);
      });}

}
