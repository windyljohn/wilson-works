import AuthVisual from "./AuthVisual";
import classes from "./AuthLayout.module.css";

export default function AuthLayout({ children }) {
  return (
    <section className={classes.section}>
      <AuthVisual />
      <div className={classes["container-right"]}>
        <div className={classes.wrapper}>{children}</div>
      </div>
    </section>
  );
}
