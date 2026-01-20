const TimerIcon = ({ color = "#E47934", size = "40px" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 41 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.2507 22.0833C35.2507 30.1333 28.7173 36.6667 20.6673 36.6667C12.6173 36.6667 6.08398 30.1333 6.08398 22.0833C6.08398 14.0333 12.6173 7.5 20.6673 7.5C28.7173 7.5 35.2507 14.0333 35.2507 22.0833Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.667 13.333V21.6663"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.667 3.33301H25.667"
        stroke={color}
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TimerIcon;
