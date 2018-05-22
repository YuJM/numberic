import { MathType } from './numberic.enum';

export interface IMathItem {
  type: MathType;
  value: any;
}

export interface MathMeta {
  priorityIndex: any[];
  matrix: any[];
  result: IMathItem[];
}
