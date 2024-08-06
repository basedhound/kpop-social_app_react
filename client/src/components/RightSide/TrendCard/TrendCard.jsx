import React from "react";
import "./TrendCard.css";
import { TrendData } from "../../../Data/TrendData";

const TrendCard = () => {
   return (
      <section className="TrendCard">
         <h2>Trends for you</h2>
         {TrendData.map((trend) => {
            return (
               <div className="Trend">
                  <span>#{trend.name}</span>
                  <span>{trend.shares}k shares</span>
               </div>
            );
         })}
      </section>
   );
};

export default TrendCard;
