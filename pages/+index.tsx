import Head from "next/head";
import CakeIcon from "~icons/heroicons-solid/cake.jsx";
import CakeBD from "~icons/heroicons-solid/cake";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { increment, incrementAsync } from "store/features/counter/counterSlice";

import { AppDispatch } from "store";
import BaseButton from "@/components/atoms/Button";

export default function Home() {
  const counterVal = useSelector((state: any) => state.counter.value);
  const dispatch: AppDispatch = useDispatch();
  const incrementValue = Number("2") || 0;

  useEffect(() => {
    console.log("counterVal : ", counterVal);
    console.log("theme : ", window.__theme);
  }, [counterVal]);

  const handleSwitchTheme = () => {
    console.log("switch theme : ", window.__theme);
    if (window.__theme === "dark") {
      window.__setPreferredTheme("light");
    } else {
      window.__setPreferredTheme("dark");
    }
  };

  return (
    <div className="container">
      <div>hello world</div>
      {/* <style jsx global>{`
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
      `}</style> */}
    </div>
  );
}
