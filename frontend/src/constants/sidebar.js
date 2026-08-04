 import { MdDashboard } from "react-icons/md";
 import { PiStudent } from "react-icons/pi";
 import { FaChalkboardTeacher } from "react-icons/fa";
 import { FaBookOpen } from "react-icons/fa";
 import { RiPresentationFill } from "react-icons/ri";
 import { BiMoneyWithdraw } from "react-icons/bi";
 import { GrUserSettings } from "react-icons/gr";

 
 export const AdminSideBar = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: MdDashboard
    },
    {
        name: "Students",
        path: "/admin/students",
        icon: PiStudent
    },
    {
        name: "Teachers",
        path: "/admin/teachers",
        icon: FaChalkboardTeacher
    },
    {
        name: "Courses",
        path: "/admin/courses",
        icon: FaBookOpen
    },
    {
        name: "Attendance",
        path: "/admin/attendance",
        icon: RiPresentationFill
    },
    {
        name: "Fees",
        path: "/admin/fees",
        icon: BiMoneyWithdraw
    },
    {
        name: "Settings",
        path: "/admin/settings",
        icon: GrUserSettings
    },
   
 ]

 
 export const TeacherSideBar = [
    {
        name: "Dashboard",
        path: "/teacher/dashboard",
        icon: ""
    },
    {
        name: "Attendance",
        path: "/admin/attendance",
        icon: ""
    },
    {
        name: "Students",
        path: "/teacher/students",
        icon: ""
    },
    {
        name: "Fees",
        path: "/admin/fees",
        icon: ""
    },
    {
        name: "Settings",
        path: "/admin/settings",
        icon: ""
    },
   
 ]

 const CurrenrUserSideBarMenu = ()=>{
    
 }