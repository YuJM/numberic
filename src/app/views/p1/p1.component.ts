import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs';
import { filter, scan, share } from 'rxjs/operators';
import { MathType, OperatorType } from '../../numberic.enum';
import { IMathItem } from '../../numberic.interface';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';

interface MathMeta {
  mata: {ka: any[]};
  result: IMathItem[];
}

@Component({
  selector: 'app-p1',
  templateUrl: './p1.component.html',
  styleUrls: ['./p1.component.scss']
})
export class P1Component implements OnInit {
  math$: IMathItem[];
  mathType = MathType;
  addMatItem$ = new Subject<IMathItem>();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {

    const init: MathMeta = {
      mata: {ka: []},
      result: []
    };
    this.addMatItem$
        .pipe(
          scan<IMathItem, MathMeta>((acc, c) => {
            const result = acc.result;
            const beforeIndex = result.length - 1;
            if (c.type === MathType.Init) {
              return {
                mata: {ka: []},
                result: []
              };
            } else if (c.type === MathType.Operator && c.value <= OperatorType.mod) {
              acc.mata.ka.push(result.length);
            } else if (result.length && result[beforeIndex].type === MathType.Number && c.type === MathType.Number) {
              result[beforeIndex].value = `${result[beforeIndex].value}${c.value}`;
              return acc;
            }
            result.push(c);
            acc.result = result;
            return acc;
          }, {
            mata: {ka: []},
            result: []
          }),
          share()
        )
        .subscribe(data => {
          console.log('data', data);
          this.math$ = data.result;
        });
  }

  addOperator(addOk?: boolean) {
    // this.mathArray.push({
    //   type: MathType.Operator,
    //   value: this.getRandomInt(4)
    // });
    this.addMatItem$.next({
      type: MathType.Operator,
      value: this.getRandomInt(4)
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
    console.log('math', this.math$);

    const ref = this.dialog.open(ResultDialogComponent, {
      width: '90%',
      height: '80%',
      data: {mathArray: this.math$}
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
