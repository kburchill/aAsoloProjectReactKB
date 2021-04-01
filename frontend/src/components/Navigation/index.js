// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <NavLink className="navLinkEl" to="/parks">Home</NavLink>
      <NavLink className="navLinkEl" to="/bookings">Current Bookings</NavLink>
      <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="navLinkEl" to="/login">Log In</NavLink>
        <NavLink className="navLinkEl"to="/signup">Sign Up</NavLink>
        <NavLink className="navLinkEl" to="/parks">Home</NavLink>
      </>
    );
  }

  return (
    <ul className="navBar">
      <li className="navLinks">
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
