import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {interval} from 'rxjs';
import {map, share, take} from 'rxjs/operators';
import {NumbericService} from '../../numberic.service';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent implements OnInit {
  result;
  resultRound;
  formula: string[];
  timer$ = interval(1000).pipe(take(this.nService.countStandard), map(i => (i + 1), share()));
  milli$ = interval(100).pipe(take(this.nService.countStandard * 10), map(i => (i + 1) % 10), share());
  countStandard;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private nService: NumbericService) {
    this.countStandard = this.nService.countStandard;
  }

  ngOnInit() {

    this.result = this.data.result.toFixed(1);
    this.resultRound = Math.round(this.result);
    this.formula = this.data.formulaArray;
  }

}
