import style from "./FunStaff.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch } from "store";
import BaseButton from "@/components/atoms/Button";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function FunStaff(props) {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log("mounted page FunStaff", props);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.text}>hello world FunStaff</div>
      <ThemeSwitcher />
      <h3 className="tw-text-xl">Test eiei</h3>
      {/* <BaseButton disabled={false} eventClick={handleSwitchTheme}>
        Test toggle
      </BaseButton> */}
    </div>
  );
}
