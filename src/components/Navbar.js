import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getStyles = (route) =>
    route === location.pathname
      ? ["#2c2c2c", "navbarListItemNameActive"]
      : ["#8f8f8f", "navbarListItemName"];

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
        <ul className='navbarListItems'>
          <li className='navbarListItem' onClick={() => navigate("/")}>
            <ExploreIcon fill={getStyles("/")[0]} width='36px' height='36px' />
            <p className={getStyles("/")[1]}>Explore</p>
          </li>
          <li className='navbarListItem' onClick={() => navigate("/offers")}>
            <OfferIcon
              fill={getStyles("/offers")[0]}
              width='36px'
              height='36px'
            />
            <p className={getStyles("/offers")[1]}>Offers</p>
          </li>
          <li className='navbarListItem' onClick={() => navigate("/profile")}>
            <PersonOutlineIcon
              fill={getStyles("/profile")[0]}
              width='36px'
              height='36px'
            />
            <p className={getStyles("/profile")[1]}>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
