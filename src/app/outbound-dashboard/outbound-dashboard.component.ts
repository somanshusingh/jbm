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
      this.dtTrigger.next();
    })
  }


}
