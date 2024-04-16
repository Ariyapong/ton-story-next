import type { NextPage, NextComponentType } from "next";
import { useState, useRef } from "react";
// import { useButton } from "@react-aria/button";

const BaseButton: NextComponentType = (props: any) => {
  let ref = useRef();
  // let { buttonProps } = useButton(props, ref);
  const classBtn = props.btnClassName ? props.btnClassName : "";
  // console.log("buttonProps : ", props);
  const { eventClick } = props;
  return (
    props && (
      <button
        // {...buttonProps}
        aria-label="action-button"
        className={`tw-text-red-600 tw-font-bold ${classBtn}`}
        disabled={props.disabled}
        // ref={ref}
        onClick={eventClick}
      >
        {props.children}
      </button>
    )
  );
};

export default BaseButton;
