import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { StyleSystem } from "../styles";
import { Iconify } from "./Iconify";

type Props = {
  button: ReactNode;
  header?: string | ReactNode;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export function FlyoutBase({
  button,
  header,
  subtitle,
  children,
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <div onClick={() => setOpen(true)} className="w-full cursor-pointer">
        {button}
      </div>

      <Dialog open={open} onClose={setOpen} className={clsx("relative z-50")}>
        <DialogBackdrop
          transition
          className={clsx(
            "fixed inset-0 bg-black-100/80 backdrop-blur data-[closed]:opacity-0",
            StyleSystem.transition.fade,
          )}
        />

        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-0 md:pl-10">
              <DialogPanel
                transition
                className={clsx(
                  "pointer-events-auto w-screen max-w-lg transform data-[closed]:translate-x-full bg-background-secondary backdrop-blur-3xl",
                  StyleSystem.transition.slide,
                )}
              >
                <div className="flex h-full flex-col overflow-y-scroll shadow-xl">
                  <div>
                    <div className="flex items-start justify-between px-6 pt-6">
                      <div className="flex flex-col gap-2 items-start ">
                        {header && (
                          <DialogTitle className="text-white-100 text-2xl font-semibold">
                            {header}
                          </DialogTitle>
                        )}

                        {subtitle && (
                          <p className="text-white-100 text-lg font-medium">
                            {subtitle}
                          </p>
                        )}
                      </div>

                      <div className="ml-3 flex h-7 items-center">
                        <button type="button" onClick={() => setOpen(false)}>
                          <Iconify icon="mdi:close" className="text-2xl" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-6 flex-1 flex flex-col items-start border-t border-white-100/30 pt-6 text-white-100 px-4">
                    {children}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
