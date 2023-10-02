import { FaCircleUser, FaHouse } from "react-icons/fa6";


export default function Header() {
  return (
    <div className="Header">
      <a href="/" className="header--links"><FaCircleUser/></a>
      <h1 className="page--title">QuizPal</h1>
      <a href="/" className="header--links"><FaHouse/></a>
    </div>
  )
}