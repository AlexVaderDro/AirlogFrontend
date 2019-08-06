import {Component, OnInit} from '@angular/core';
import {SourceService} from '../../services/source.service';

@Component({
  selector: 'app-source-selection',
  templateUrl: './source-selection.component.html',
  styleUrls: ['./source-selection.component.css']
})
export class SourceSelectionComponent implements OnInit {
  sources: string[];
  currentSource: string;

  constructor(private sourceService: SourceService) {}

  private getSources() {
    this.sourceService.getSources().subscribe(sources => this.sources = sources);
  }

  setCurrentSource(source: string){
    this.currentSource = source;
  }

  ngOnInit() {
    this.getSources();
  }
}
