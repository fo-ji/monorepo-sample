import { useRef, ReactElement, cloneElement, useEffect } from 'react';
import type { FC } from 'react';

import { Button } from '@/components/Elements/Button';
import { Dialog, DialogTitle } from '@/components/Elements/Dialog';
import { useDisclosure } from '@/hooks/useDisclosure';

export interface ConfirmationDialogProps {
  triggerButton: ReactElement;
  confirmButton: ReactElement;
  title: string;
  body?: string;
  cancelButtonText?: string;
  icon?: 'danger' | 'info';
  isDone?: boolean;
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  triggerButton,
  confirmButton,
  title,
  body,
  cancelButtonText = 'キャンセル',
  icon = 'danger',
  isDone = false,
}) => {
  const { isOpen, open, close } = useDisclosure();

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (isDone) close();
  }, [isDone, close]);

  const trigger = cloneElement(triggerButton, {
    onClick: open,
  });

  return (
    <>
      {trigger}
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div className="inline-block overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
          <div className="sm:flex sm:items-start">
            {icon === 'danger' && (
              <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <span className="text-red-200">danger!</span>
              </div>
            )}

            {icon === 'info' && (
              <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <span className="text-blue-200">info</span>
              </div>
            )}

            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {title}
              </DialogTitle>
              {body !== undefined && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{body}</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <Button
              type="button"
              className="inline-flex w-full justify-center rounded-md border focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={close}
              ref={cancelButtonRef}
            >
              {cancelButtonText}
            </Button>
            {confirmButton}
          </div>
        </div>
      </Dialog>
    </>
  );
};
