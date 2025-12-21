import React from "react";

interface FilterIconProps {
  color?: string;
  size?: number | string; // accepts 20, "20px", "1em", etc.
}

const FilterIcon: React.FC<FilterIconProps> = ({
  color = "#ffffff",
  size = 28,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.30001 2.45H21.7C22.9833 2.45 24.0333 3.5 24.0333 4.78333V7.35C24.0333 8.28333 23.45 9.45 22.8667 10.0333L17.85 14.4667C17.15 15.05 16.6833 16.2167 16.6833 17.15V22.1667C16.6833 22.8667 16.2167 23.8 15.6333 24.15L14 25.2C12.4833 26.1333 10.3833 25.0833 10.3833 23.2167V17.0333C10.3833 16.2167 9.91667 15.1667 9.45001 14.5833L5.01667 9.91667C4.43334 9.33333 3.96667 8.28333 3.96667 7.58333V4.9C3.96667 3.5 5.01667 2.45 6.30001 2.45Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7517 2.45L7 11.6667"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FilterIcon;
