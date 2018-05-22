import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { filter, scan, share } from 'rxjs/operators';
import { MathType, OperatorType } from '../../numberic.enum';
import { IMathItem, MathMeta } from '../../numberic.interface';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';

@Component({
  selector: 'app-p1',
  templateUrl: './p1.component.html',
  styleUrls: ['./p1.component.scss']
})
export class P1Component implements OnInit {
  math: MathMeta = {
    priorityIndex: [],
    matrix: [],
    result: []
  };
  mathType = MathType;
  addMatItem$ = new Subject<IMathItem>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {

    this.addMatItem$
        .pipe(
          scan<IMathItem, MathMeta>((acc, c) => {
            const result = acc.result;
            const beforeIndex = result.length - 1;
            let pushValue = 0;
            if (c.type === MathType.Init) {
              return {
                priorityIndex: [],
                matrix: [],
                result: []
              };
            } else if (c.type === MathType.Operator && c.value <= OperatorType.mod) {
              acc.priorityIndex.push(result.length);
              acc.matrix[beforeIndex]++;
              pushValue = 1;
            } else if (c.type === MathType.Number) {
              if (result.length && result[beforeIndex].type === MathType.Number) {
                result[beforeIndex].value = `${result[beforeIndex].value}${c.value}`;
                return acc;
              }

            }
            acc.matrix.push(pushValue);
            result.push(c);
            acc.result = result;
            return acc;
          }, {
            priorityIndex: [],
            matrix: [],
            result: []
          }),
          share()
        )
        .subscribe(data => {
          this.math = data;
        });
  }

  addOperator(addOk?: boolean) {
    // this.mathArray.push({
    //   type: MathType.Operator,
    //   value: this.getRandomInt(4)
    // });
    this.addMatItem$.next({
      type: MathType.Operator,
      value: this.getRandomInt(9) % 5
    });
  }

  addNumber() {
    // this.mathArray.push({
    //   type: MathType.Number,
    //   value: this.getRandomInt(9)
    // });
    this.addMatItem$.next({
      type: MathType.Number,
      value: `${this.getRandomInt(9)}`
    });
  }

  reset() {
    this.addMatItem$.next({
      type: MathType.Init,
      value: ''
    });
    // this.mathArray = [];
  }

  onCheckDialog() {
    console.log('결과 ', this.math);
    const ref = this.dialog.open(ResultDialogComponent, {
      width: '90%',
      height: '80%',
      data: {mathArray: this.math}
    });
    ref.afterClosed()
       .pipe(filter(x => !!x))
       .subscribe((data) => {
         console.log('닫을 때 데이터', data);
       });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
