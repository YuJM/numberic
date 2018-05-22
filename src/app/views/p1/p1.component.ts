import { Component, OnInit } from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { scan, share } from 'rxjs/operators';

export enum MathItemType {
  Init = 0,
  Number = 1,
  Operator = 2,
}

enum Operator {
  puls,
  minus,
  divid,
  mult,
  mod
}

export interface IMathItem {
  type: MathItemType;
  value?: any;
}

@Component({
  selector: 'app-p1',
  templateUrl: './p1.component.html',
  styleUrls: ['./p1.component.scss']
})
export class P1Component implements OnInit {
  mathArray = [];
  math$: Observable<IMathItem[]>;
  mathType = MathItemType;
  addMatItem$ = new Subject<IMathItem>();

  constructor() { }

  ngOnInit() {
    this.math$ = this.addMatItem$.pipe(
      scan<IMathItem>((acc, c) => {
        if (c.type === MathItemType.Init) {
          return [];
        }
        acc.push(c);
        return acc;
      }, []),
      share()
    );
  }

  addOperator(addOk?: boolean) {

    // this.mathArray.push({
    //   type: MathItemType.Operator,
    //   value: this.getRandomInt(4)
    // });
    this.addMatItem$.next({
      type: MathItemType.Operator,
      value: this.getRandomInt(4)
    });
  }

  addNumber() {

    // this.mathArray.push({
    //   type: MathItemType.Number,
    //   value: this.getRandomInt(9)
    // });
    this.addMatItem$.next({
      type: MathItemType.Number,
      value: this.getRandomInt(9)
    });
  }

  reset() {
    this.addMatItem$.next({type: MathItemType.Init});
    // this.mathArray = [];
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
