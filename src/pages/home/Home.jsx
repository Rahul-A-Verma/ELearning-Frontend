import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonial/Testimonials.jsx";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="home">
        <div className="overlay">
          <div className="home-content">
            <h1>Unlock Your Potential with Us</h1>
            <p>Master new skills and shape your future with our E-learning platform.</p>
            <button onClick={() => navigate("/courses")} className="common-btn">
              Explore Courses
            </button>
          </div>
        </div>
      </section>
      <Testimonials />
    </div>
  );
};

export default Home;
