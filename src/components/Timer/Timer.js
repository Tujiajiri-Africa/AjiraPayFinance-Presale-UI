import { useEffect, useState, useContext } from 'react';
import { PresaleContext }  from '../../context/PresaleContext';


const useCountdown = (targetDate) => {
  const { tokenSaleDuration } = useContext(PresaleContext);
  const presaleTimer = new Date(parseInt(tokenSaleDuration) * 1000)
  const countDownDate = presaleTimer.getTime(); //targetDate //March 21, 2023 00:00:00

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };