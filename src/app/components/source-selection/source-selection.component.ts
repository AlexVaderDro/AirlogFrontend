import { Component, OnInit } from '@angular/core';
import {SourceService} from '../../services/source.service';
import { MOCK_SOURCE_LIST} from '../../mockdata';

@Component({
  selector: 'app-source-selection',
  templateUrl: './source-selection.component.html',
  styleUrls: ['./source-selection.component.css']
})
export class SourceSelectionComponent implements OnInit {
  sources: string[];

  constructor(private sourceService: SourceService) { }

  private getSources() {
    this.sourceService.getSources().subscribe(sources => this.sources = sources);
  }

  ngOnInit() {
    this.getSources();
    // this.sources = MOCK_SOURCE_LIST;
  }

}
