import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";
const makeNavLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
const Navigation = () => {
  return (
    <header className={css.header}>
      <nav>
        <NavLink className={makeNavLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={makeNavLinkClass} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
};
export default Navigation;
