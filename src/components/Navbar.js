import React from "react";
import {
  HiOutlineInbox,
  HiOutlineCalendar,
  HiCalendar,
  HiOutlineViewGridAdd,
} from "react-icons/hi";
import { AiFillCaretRight } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="navbarContainer">
      <div className="constants">
        <ul>
          <li>
            <HiOutlineInbox className="icon" />
            Inbox
          </li>
          <li>
            <HiOutlineCalendar className="icon" />
            Today
          </li>
          <li>
            <HiCalendar className="icon" />
            Upcoming
          </li>
          <li>
            <HiOutlineViewGridAdd className="icon" />
            Filters / Labels
          </li>
        </ul>
      </div>
      <div className="projectContainer">
        <ul>
          <li>
            <AiFillCaretRight className="icon" />
            Projects
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
