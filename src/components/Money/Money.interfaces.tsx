import { HTMLProps } from 'react';

export type MoneyProps = {
  classNameText?: HTMLProps<HTMLElement>['className'];
  classNameButton?: HTMLProps<HTMLElement>['className'];
  money: number | string;
  moneyWidth?: string;
  moneyHeight?: string;
};
