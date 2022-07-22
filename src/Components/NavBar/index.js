import logo from "../../Logo.svg";

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <a href="https://main--bidbybid.netlify.app/">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div>
        <ul className="navbar-links">
          <li className="navbar-item">
            <a href="https://main--bidbybid.netlify.app/rules">RULES</a>
          </li>
          <li className="navbar-item">
            <a href="https://main--bidbybid.netlify.app/faq">FAQ</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
