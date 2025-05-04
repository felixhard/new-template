"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import Text from "./Text";

type Props = {
  bg?: string;
  border?: string;
  title?: string;
  button: ReactNode;
  maxWidth?: string;
  isOpenProp?: boolean;
  textColor?: string;
  description?: string;
  buttonWidth?: string;
  children: ReactNode;
  onOpenChangeProp?: (open: boolean) => void;
};

export function Modal({
  bg = "bg-accent",
  title,
  button,
  border,
  maxWidth = "sm:max-w-2xl",
  textColor,
  description,
  buttonWidth = "w-fit",
  children,
  isOpenProp,
  onOpenChangeProp,
}: Props) {
  // This modal is super easy to use. Just import it and use the button prop to pass in a button or link and it will control the modal.
  const [isOpenInternal, setIsOpenInternal] = useState(false);

  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenInternal;

  const handleOpenChange = (open: boolean) => {
    if (isOpenProp === undefined) {
      setIsOpenInternal(open);
    }
    onOpenChangeProp?.(open);
  };

  return (
    <>
      <div
        onClick={() => handleOpenChange(true)}
        className={clsx("cursor-pointer", buttonWidth)}
      >
        {button}
      </div>

      <Dialog
        open={isOpen}
        onClose={() => handleOpenChange(false)}
        className="relative z-[999990]"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-opacity-75 backdrop-blur transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <DialogPanel
              transition
              className={clsx(
                bg,
                maxWidth,
                "relative flex w-full transform flex-col gap-4 rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95",
              )}
            >
              <div className="flex items-center justify-between">
                {title && <Text textStyle="h3">{title}</Text>}

                <div className="absolute right-0 top-0 block pr-4 pt-4">
                  <button
                    type="button"
                    onClick={() => handleOpenChange(false)}
                    className={clsx(
                      textColor,
                      "rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                    )}
                  >
                    <span className="sr-only">Close</span>

                    <XMarkIcon
                      aria-hidden="true"
                      className={clsx(textColor, "h-6 w-6")}
                    />
                  </button>
                </div>
              </div>

              {description && (
                <Text textStyle="body2" color="text-gray-500">
                  {description}
                </Text>
              )}

              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
