import React from "react";
// import { Link } from "react-router-dom";

const Home = (props = {}) => {
  return (
    <div>
      <div>{props.text || 'Homepage'}</div>
      {/* <Link to="/users">To user page</Link> */}
      <button onClick={() => console.log("click me")}>click me</button>
    </div>
  );
};

export default Home;
