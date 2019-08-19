// import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
// import {Log} from '../../models/log';
// import {HttpService} from '../../services/http-service/http.service';
// import {Router} from '@angular/router';
//
// // enum formatEnum {
// //   table,
// //   text
// // }
//
// @Component({
//   selector: 'app-log-view',
//   templateUrl: './log-view.component.html',
//   styleUrls: ['./log-view.component.css']
// })
// export class LogViewComponent implements OnInit {
//
//   @Input() table: boolean;
//   @Input() pageNum;
//   logs: Log[];
//   sources: string[];
//   source: string;
//   totalItems: number;
//   pageSize = 20;
//
//   constructor(protected httpService: HttpService) {
//     this.pageNum = 1;
//   }
//
//   setPageNum(pageNum: number) {
//     this.pageNum = pageNum;
//     this.getLogs();
//   }
//
//   ngOnInit() {
//     this.getLogs();
//     this.getSources();
//     this.getTotalItems(this.source);
//   }
//
//   protected getTotalItems(source: string): void {
//     this.httpService.getTotalItems(source).subscribe(totalItems => {
//       this.totalItems = totalItems;
//     });
//   }
//
//   protected getSources(): void {
//     this.httpService.getSources().subscribe(sources => {
//       this.sources = sources;
//       this.sources.push('not specified');
//     });
//   }
//
//   protected getLogs(): void {
//     this.httpService.getLogs(this.pageNum, this.pageSize).subscribe(logs => this.logs = logs);
//   }
//
//   protected getLogsBySource(): void {
//     if (this.source === 'not specified') {
//       this.httpService.getLogs(this.pageNum, this.pageSize).subscribe(logs => this.logs = logs);
//     } else {
//       this.httpService.getLogsBySource(this.source, this.pageNum, this.pageSize).subscribe(logs => this.logs = logs);
//     }
//     this.getTotalItems(this.source);
//   }
//
//   selectedSource(source) {
//     this.source = source;
//     this.getLogsBySource();
//   }
// }
