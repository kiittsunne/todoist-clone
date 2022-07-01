import React from "react";
import { SiTodoist } from "react-icons/si";
import { HiPlus } from "react-icons/hi";
import { RiLightbulbFill } from "react-icons/ri";
import Avatar from "boring-avatars";

const Topbar = () => {
  return (
    <div className="topbarContainer">
      <div className="topbarContents">
        <SiTodoist className="logo" />
      </div>
      <div className="toggleContainer">
        <div className="iconContainer">
          <HiPlus className="icon" />
        </div>
        <div className="iconContainer">
          <RiLightbulbFill className="icon" />
        </div>
        <div>
          <Avatar
            size={22}
            variant="bauhaus"
            colors={["#FC284F", "#FF824A", "#FEA887", "#F6E7F7", "#D1D0D7"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
