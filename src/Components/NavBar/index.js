import logo from "../../Logo.svg";

export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <a href="http://localhost:3000/">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div>
        <ul className="navbar-links">
          <li className="navbar-item">RULES</li>
          <li className="navbar-item">FAQ</li>
          <li className="navbar-item">
            <a href="http://localhost:3000/">HOME</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
