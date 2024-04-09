import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* strategy="afterInteractive" */}
        {/* <Script id="them-script" strategy="lazyOnload"> */}
        <Script id="them-script" strategy="afterInteractive">
          {`// Add dark / light detection that runs before next load
            (function() {
              window.__onThemeChange = function() {};
              
              function setTheme(newTheme) {
                window.__theme = newTheme;
                preferredTheme = newTheme;
                document.body.setAttribute("data-theme", newTheme);
                window.__onThemeChange(newTheme);
              }

              var preferredTheme;
              try {
                preferredTheme = localStorage.getItem("theme");
              } catch (err) {}

              window.__setPreferredTheme = function(newTheme) {
                setTheme(newTheme);
                try {
                  localStorage.setItem("theme", newTheme);
                } catch (err) {}
              };

              var darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

              darkQuery.addListener(function(e) {
                window.__setPreferredTheme(e.matches ? "dark" : "light");
              });

              setTheme(preferredTheme || (darkQuery.matches ? "dark" : "light"));
            })();
      `}
        </Script>
      </body>
    </Html>
  );
}
