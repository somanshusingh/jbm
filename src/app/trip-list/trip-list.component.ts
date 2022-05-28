import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { ApiService } from '../api.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
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
    var url = "/history/getData"
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

}
