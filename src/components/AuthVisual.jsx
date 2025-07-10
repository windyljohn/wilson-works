import classes from "./AuthVisual.module.css";

export default function AuthVisual() {
  return (
    <div className={classes["container-left"]}>
      <img
        className={classes.background}
        src="https://static.wixstatic.com/media/cfbdf7_44150c7cb5bc40ae872a8025e19570c0f000.jpg/v1/fill/w_1785,h_866,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/cfbdf7_44150c7cb5bc40ae872a8025e19570c0f000.jpg"
      />
      <img
        className={classes["company-logo"]}
        src="https://static.wixstatic.com/media/cfbdf7_e70ecba9aeee4db7a5e8275af188aa60~mv2.png/v1/crop/x_0,y_134,w_500,h_153/fill/w_464,h_142,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cfbdf7_e70ecba9aeee4db7a5e8275af188aa60~mv2.png"
      />
      <div>
        <p className={classes["company-text"]}>
          Intelligent Systems for Maximized Efficiency
        </p>
        <a className={classes.home} href="https://www.wilsonworksph.com/">
          Back
        </a>
      </div>
    </div>
  );
}
