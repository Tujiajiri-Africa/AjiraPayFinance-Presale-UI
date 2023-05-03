import React from 'react';
import { useCountdown } from './Timer';
import DateTimeDisplay from './ShowCounter';
import './Time.css';


const ExpiredNotice = () => {
    return (
      <div className="expired-notice">
        <span>Presale Closed!!!</span>
        <p className='text-white'>Presale Moved To Pinksale</p>
        <p className='text-white'>
          <a href="https://www.pinksale.finance/launchpad/0x940C7295d1b96FA1098fc60e5A7820B6428aB045?chain=BSC">
            Click here to buy $AJP from Pinksale Presale
          </a>
        </p>
      </div>
    );
  }

  const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="show-counter">
        <a
          href='https://portal.ajirapay.finance'
          rel="noopener noreferrer"
          className="countdown-link"
          
        >
          <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
          <p>:</p>
          <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
          <p>:</p>
          <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </a>
      </div>
    );
  };

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;