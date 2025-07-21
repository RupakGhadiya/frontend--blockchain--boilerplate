/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from "react";
import { Modal } from "antd";

import "./modal.css";
const PopupModal: FC<any> = (props) => {
  const {
    headerTitle,
    onCloseModal,
    isOpen,
    children,
    isSuccess,
    fixwidth,
    isSignatureMessage,
    showClose,
    headingVariant,
  } = props;
  const width = typeof window !== "undefined" ? window.innerWidth : 0;

  return (
    <Modal
      centered
      open={isOpen}
      footer={null}
      mousePosition={{ x: width / 2, y: width / 2 }}
      className="p[40px] bg-background-light dark:bg-background-dark rounded-[20px]"
      width={fixwidth}
    >
      <div className="w-full h-full rounded-[20px] relative">
        {isSuccess && !isSignatureMessage ? (
          <div className="flex justify-between flex-row text-primary-dark dark:text-primary-light text-[24px] mt-[-8px]">
            {headerTitle &&
              (headingVariant === 2 ? (
                <h2 className="w-full h-[20px] text-center text-[18px] text-primary-dark dark:text-primary-light mt-[10px] flex flex-row justify-center items-center gap-[12px] ">
                  {headerTitle}{" "}
                </h2>
              ) : (
                <strong className="font-size--20 text--center">
                  {headerTitle}
                </strong>
              ))}

            {showClose && (
              <h1
                className="cursor-pointer z-100 !text-[24px]"
                onClick={() => {
                  onCloseModal();
                }}
              >
                X
              </h1>
            )}
          </div>
        ) : null}
        <div className={"modal-body"}>{children}</div>
      </div>
    </Modal>
  );
};

export default PopupModal;
