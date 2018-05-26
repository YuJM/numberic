import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {Subject} from 'rxjs';
import {scan, share} from 'rxjs/operators';
import {MathType, OperatorType, OperatorValue} from '../../numberic.enum';
import {IMathItem, MathMeta} from '../../numberic.interface';
import * as mathjs from 'mathjs';
import {ResultDialogComponent} from '../result-dialog/result-dialog.component';

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

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
    this.addMatItem$
      .pipe(
        scan<IMathItem, MathMeta>((acc, c) => {
          const result = acc.result;
          const beforeIndex = result.length - 1;

          if (c.type === MathType.Init) {
            return {
              priorityIndex: [],
              matrix: [],
              result: []
            };
          } else if (c.type === MathType.Operator) {
            if (c.value <= OperatorType.mod) {
              acc.priorityIndex.push(result.length);
              acc.matrix[beforeIndex]++;
              // acc.matrix.push(1);
            }
            acc.matrix.push(0);

          } else if (c.type === MathType.Number) {
            if (result.length && result[beforeIndex].type === MathType.Number) {
              result[beforeIndex].value = parseInt(`${result[beforeIndex].value}${c.value}`, 10);
              return acc;
            }
            acc.matrix.push(acc.matrix[beforeIndex - 1] || 0);
          }
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
      value: OperatorValue[this.getRandomInt(8) % 4]
    });
  }

  addNumber() {
    // this.mathArray.push({
    //   type: MathType.Number,
    //   value: this.getRandomInt(9)
    // });
    this.addMatItem$.next({
      type: MathType.Number,
      value: this.getRandomInt(8) + 1
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
    const formulaArray = this.math.result.map(i => i.value);
    const mathStr = formulaArray.join('');
    const result = mathjs.eval(mathStr);


    const ref = this.dialog.open(ResultDialogComponent, {
      width: '90%',
      height: '80%',
      data: {result, formulaArray}
    });
    ref.afterClosed()
      .subscribe((data) => {
        this.addMatItem$.next({type: MathType.Init});
      });

  }

  calc(mathMeta: MathMeta) {
    const fomula = mathMeta.result;

  }

  readOper(oper: OperatorType, x: number, y: number) {
    switch (oper) {
      case OperatorType.puls:
        return x + y;
      case OperatorType.minus:
        return x - y;
      case  OperatorType.multi:
        return x * y;
      case  OperatorType.divide:
        return x / y;
      case  OperatorType.mod:
        return x % y;

    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
