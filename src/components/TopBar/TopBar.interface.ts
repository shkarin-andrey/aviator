export interface ITopBar extends React.HTMLAttributes<HTMLDivElement> {
  isStart: boolean;
  time: number;
  history: number[];
}
