import React from "react";
import { Link } from "react-router-dom";

function Home() {
 return (
  <div className="home-container">
   <header className="home-header">
    <h1>Welcome to Cricket Shot Tracker</h1>
    <p>Learn, Practice, Improve your cricket shots every day!</p>
   </header>

   <main className="home-main">
   <Link to="/login"> <button className="primary-btn">Get Started</button></Link>
   </main>
  </div>
 );
}

export default Home;