import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {opToCode} from '../../numberic.enum';

/*
'+' = '&#43;',
  '-' = '&#8722;',
  '*' = '&#215;',
  '/' = '&#247;'*/
@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss']
})
export class ResultDialogComponent implements OnInit {
  result;
formula: string[];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {

    this.result = this.data.result;
    this.formula = this.data.formulaArray;
  }

}
