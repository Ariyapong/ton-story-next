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
    <div className="container">
      <div>hello world FunStaff</div>

      <style jsx>{``}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
