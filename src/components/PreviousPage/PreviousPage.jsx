import { useNavigate, useLocation } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import css from "./PreviousPage.module.css";

const PreviousPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlePreviousPage = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate("/movies");
    }
  };

  if (!location.state || !location.state.from) {
    return null;
  }

  return (
    <button className={css.previousPage} onClick={handlePreviousPage}>
      <GoArrowLeft />
      Previous page
    </button>
  );
};

export default PreviousPage;
