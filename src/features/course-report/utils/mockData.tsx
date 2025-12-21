import { ReportCardData, LessonReportData } from '../types';
import ProfileIcon from "@icons/ProfileIcon";
import TimerIcon from "@icons/TimerIcon";
import SandTimerIcon from "@icons/SandTimerIcon";
import TickCircleIcon from "@icons/TickCircleIcon";
import TimeProgressIcon from "@icons/TimeProgressIcon";
import ClockIcon from "@icons/ClockIcon";
import React from "react";

export const reportsData: ReportCardData[] = [
  {
    id: 1,
    value: 1,
    label: "Total Learner",
    icon: <ProfileIcon />,
    bgColor: "#EDE7FF",
  },
  {
    id: 2,
    value: 1,
    label: "Yet to Start",
    icon: <TimerIcon />,
    bgColor: "#FEECE1",
  },
  {
    id: 3,
    value: 2,
    label: "In Progress",
    icon: <SandTimerIcon />,
    bgColor: "#FFF3D0",
  },
  {
    id: 4,
    value: 3,
    label: "Completed",
    icon: <TickCircleIcon />,
    bgColor: "#DAFBEA",
  },
];

export const reportsAverageData: ReportCardData[] = [
  {
    id: 1,
    value: "0%",
    label: "Average Progress",
    icon: <TimeProgressIcon />,
    bgColor: "#FFEDF3",
  },
  {
    id: 2,
    value: React.createElement(React.Fragment, null, 
      "0",
      React.createElement("span", { style: { color: "#666666" } }, " Seconds")
    ),
    label: "Average Time Spent",
    icon: React.createElement(ClockIcon),
    bgColor: "#E5EAFF",
  },
];

export const lessonReportData: LessonReportData[] = [
  {
    id: 1,
    lessonName: "Introduction to JavaScript",
    yetToStart: 5,
    inProgress: 12,
    completed: 8,
    timeSpent: "2h 30m"
  },
  {
    id: 2,
    lessonName: "Variables and Data Types",
    yetToStart: 3,
    inProgress: 8,
    completed: 14,
    timeSpent: "1h 45m"
  },
  {
    id: 3,
    lessonName: "Functions and Scope",
    yetToStart: 7,
    inProgress: 6,
    completed: 12,
    timeSpent: "3h 15m"
  }
];


