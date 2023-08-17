import { HTMLProps } from 'react';

export type PropsPlayButton = {
  text: string;
  onClick: () => void;
  className?: HTMLProps<HTMLElement>['className'];
  disabled?: boolean;
};
