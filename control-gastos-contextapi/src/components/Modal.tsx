import { ReactNode, forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from 'react-dom';

type ModalProps = {
  children: ReactNode;
}

type ModalHandle = {
  open() : void;
}

export const Modal = forwardRef<ModalHandle, ModalProps>(function Modal({ children }, ref ) {

  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle( ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },

      close() {
        dialog.current?.close();
      }
    }
  })

  const modalRoot = document.getElementById('modal-root')!;

  return createPortal(
    <dialog ref={ dialog } className=" backdrop:bg-stone-900/90 p-4 rounded-md shadow-md w-1/2 mx-auto py-10">
      { children }
      <form method="dialog" className="mt-4 text-right">
        <button className="px-4 py-1 bg-stone-900 shadow-md hover:bg-stone-950 text-stone-50 rounded-md">Close</button>
      </form>
    </dialog>, modalRoot
  )
});

