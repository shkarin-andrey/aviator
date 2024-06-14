export interface IModal {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactNode;
}
