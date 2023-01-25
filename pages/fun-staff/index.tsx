import style from "./FunStaff.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "store";
import BaseButton from "@/components/atoms/Button";

export default function FunStaff(props) {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log("mounted page FunStaff", props);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.text}>hello world FunStaff</div>
    </div>
  );
}
