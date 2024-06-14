export type TypeButton = 'purple' | 'blue' | 'dark-blue' | 'green' | 'orange' | 'yellow' | 'red' | 'dark-red';

type TypeSize = 's' | 'l';

export interface IButton extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  type?: TypeButton;
  isFill?: boolean;
  size?: TypeSize;
}
