export enum MathType {
  Init = 0,
  Number = 1,
  Operator = 2
}

export enum OperatorType {
  divide,
  multi,
  mod,  // 여기서 부터
  puls,
  minus
}

export enum OperatorValue {
  '+' = 0,
  '-' = 1,
  '/' = 2,
  '*' = 3
}

export enum opToCode  {
  '+' = '&#43;',
  '-' = '&#8722;',
  '*' = '&#215;',
  '/' = '&#247;'
}
