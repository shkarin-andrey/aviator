import { HTMLProps } from 'react';

export type MoneyProps = {
  classNameText?: HTMLProps<HTMLElement>['className'];
  money: number;
  moneyWidth?: string;
  moneyHeight?: string;
};
