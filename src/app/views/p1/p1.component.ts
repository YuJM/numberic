import { Component, OnInit } from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

export enum MathItemType {
  Number = 0,
  Operator = 1,
}

export interface IMathItem {
  type: MathItemType;
  value: string;
}

@Component({
  selector: 'app-p1',
  templateUrl: './p1.component.html',
  styleUrls: ['./p1.component.scss']
})
export class P1Component implements OnInit {
  mathArray = [];
  math$: Observable<IMathItem[]>;
  addNum$ = new Subject<IMathItem>();

  constructor() { }

  ngOnInit() {
    this.math$ = merge(this.addNum$).pipe(
      scan<IMathItem>((acc, c) => {
        acc.push(c);
        return acc;
      }, [])
    );
  }

  addOperator() {

    this.mathArray.push({
      type: MathItemType.Operator,
      value: '1'
    });
  }

  addNumber() {
    this.mathArray.push({
      type: MathItemType.Number,
      value: '1'
    });
    // this.addNum$.next({
    //   type: MathItemType.Number,
    //   value: '1'
    // });
  }

}
