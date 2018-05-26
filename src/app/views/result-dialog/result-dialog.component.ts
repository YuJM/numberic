import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {interval, timer} from 'rxjs';
import {map, share, take} from 'rxjs/operators';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent implements OnInit {
  result;
  formula: string[];
  timer$ = interval(1000).pipe(take(5), map(i => (i + 1), share()));
  milli$ = interval(100).pipe(take(50), map(i => (i + 1) % 10), share());

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit() {

    this.result = this.data.result.toFixed(1);
    this.formula = this.data.formulaArray;
  }

}
