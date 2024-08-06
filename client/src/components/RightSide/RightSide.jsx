import React, { useState } from "react";
import {Link} from "react-router-dom"
import "./RightSide.css";

import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "./TrendCard/TrendCard";
import ShareModal from "./ShareModal/ShareModal";

const RightSide = () => {
   const [modalOpened, setModalOpened] = useState();
   return (
      <section className="RightSide">
         <div className="NavIcons">
            <Link to = '../home'>
            <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <img src={Comment} alt="" />
         </div>
         <TrendCard />
         <button
            className="Button Btn--Right"
            onClick={() => setModalOpened(true)}>
            Share
         </button>
         <ShareModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
         />
      </section>
   );
};

export default RightSide;
