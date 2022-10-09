
const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
      <div className={isDanger ? 'countdown danger' : 'countdown'}>
        <p className="text-white">{value}</p>
        <span className="text-white">{type}</span>
      </div>
    );
  };
  
  export default DateTimeDisplay;
