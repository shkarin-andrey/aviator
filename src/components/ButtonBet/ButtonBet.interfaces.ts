export enum TypeButton {
  Minus = 'minus',
  Plus = 'plus',
}

export type PropsButtonBet = {
  typeButton: TypeButton;
  onClick: () => void;
};
