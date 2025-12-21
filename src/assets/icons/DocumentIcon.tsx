import { SVGProps } from "react";

interface DocumentIconProps extends SVGProps<SVGSVGElement> {
  strokeColor?: string;
}

const DocumentIcon = ({
  strokeColor = "#666666",
  width = 16,
  height = 17,
  ...props
}: DocumentIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.6666 7.16668V10.5C14.6666 13.8333 13.3333 15.1667 9.99998 15.1667H5.99998C2.66665 15.1667 1.33331 13.8333 1.33331 10.5V6.50001C1.33331 3.16668 2.66665 1.83334 5.99998 1.83334H9.33331"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6666 7.16668H12C9.99998 7.16668 9.33331 6.50001 9.33331 4.50001V1.83334L14.6666 7.16668Z"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66669 9.16666H8.66669"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66669 11.8333H7.33335"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DocumentIcon;
