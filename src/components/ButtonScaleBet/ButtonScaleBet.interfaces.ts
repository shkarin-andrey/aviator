import { HTMLProps } from 'react';

export type PropsButtonScaleBet = {
  onClick: () => void;
  text: string;
  className?: HTMLProps<HTMLElement>['className'];
};
