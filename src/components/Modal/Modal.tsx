import { FC, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactPortal from '../ReactPortal';
import { IModal } from './Modal.interface';
import './modalStyles.css';

const Modal: FC<IModal> = ({ children, isOpen, handleClose, title }) => {
  const nodeRef = useRef(null);
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <CSSTransition in={isOpen} timeout={{ enter: 0, exit: 300 }} unmountOnExit classNames="modal" nodeRef={nodeRef}>
      <ReactPortal wrapperId="modal" ref={nodeRef}>
        <div className="modal-content !font-mono">
          <h2 className="text-[#5754FD] text-[24px] font-medium text-center">{title}</h2>
          {children}
        </div>
      </ReactPortal>
    </CSSTransition>
  );
};
export default Modal;
