import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { scan, share } from 'rxjs/operators';
import { MathItemType } from '../../numberic.enum';
import { IMathItem } from '../../numberic.interface';

@Component({
  selector: 'app-p1',
  templateUrl: './p1.component.html',
  styleUrls: ['./p1.component.scss']
})
export class P1Component implements OnInit {
  math$: IMathItem[];
  mathType = MathItemType;
  addMatItem$ = new Subject<IMathItem>();

  constructor() {}

  ngOnInit() {
    this.addMatItem$
        .pipe(
          scan<IMathItem>((acc, c) => {
            if (c.type === MathItemType.Init) {
              return [];
            }
            acc.push(c);
            return acc;
          }, []),
          share()
        )
        .subscribe(data => {
          this.math$ = data;
        });
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

  onCheckDialog() {
    console.log('maht', this.math$);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
