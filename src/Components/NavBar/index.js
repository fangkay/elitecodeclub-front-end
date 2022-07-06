export const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <h1>This is the navbar</h1>
      </div>
      <div>
        <ul className="navbar-links">
          <li className="navbar-item">FAQ</li>
          <li className="navbar-item">
            <a href="http://localhost:3000/">MAIN MENU</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
