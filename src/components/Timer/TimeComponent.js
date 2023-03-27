import React,{ useContext } from "react";
import CountdownTimer from "./CountDownTimer";
import './Time.css';
import { PresaleContext }  from '../../context/PresaleContext';


const TimeComponent = () => {
  const { tokenSaleDuration } = useContext(PresaleContext);
  const THIRTY_DAYS_IN_MS = 40 * 24 * 60 * 60 * 1000;
  // let daysToCount;
  // if(tokenSaleDuration !== undefined || tokenSaleDuration >0){
  //   daysToCount = tokenSaleDuration * 1000;
  // }else{
  //   daysToCount = THIRTY_DAYS_IN_MS;
  // }
  
  const NOW_IN_MS = new Date().getTime() ;
  const TimeCountDownFromPresale = NOW_IN_MS + new Date(tokenSaleDuration)
  const dateTimeAfterThirtyDays = NOW_IN_MS + tokenSaleDuration;
  const defaultTimeAfterThirtyDays = NOW_IN_MS + THIRTY_DAYS_IN_MS;
  var delta = Math.abs(tokenSaleDuration - NOW_IN_MS) / 1000;
  return (
    <>
    {tokenSaleDuration  > 0 ?
      <CountdownTimer targetDate={dateTimeAfterThirtyDays} /> //dateTimeAfterThirtyDays
      :
      <CountdownTimer targetDate={defaultTimeAfterThirtyDays} /> //defaultTimeAfterThirtyDays
    }
    </>
  );
};

export default TimeComponent;
