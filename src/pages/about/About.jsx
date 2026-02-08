import React from "react";
import "./about.css";

const About = () => {
  return (
    <section className="about">
      <div className="about-header">
        <h1>Welcome to LearnNest</h1>
        <p>
          LearnNest is an innovative e-learning platform that is revolutionizing
          the way education is delivered. We are dedicated to empowering learners
          with high-quality courses, expert instructors, and an engaging
          learning experience.
        </p>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <h3>Our Mission</h3>
          <p>
            Our mission is simple: to make learning accessible and affordable to
            everyone. We are committed to providing a diverse range of high-quality
            courses designed to help you achieve your personal and professional
            goals.
          </p>
        </div>

        <div className="about-card">
          <h3>What We Offer</h3>
          <p>
            We provide a wide variety of online courses across multiple domains
            including technology, business, personal development, and more. With
            interactive lessons and real-world applications, we ensure that each
            learner can grow and succeed.
          </p>
        </div>

        <div className="about-card">
          <h3>Get Involved</h3>
          <p>
            Whether you are a student eager to learn or an instructor passionate
            about teaching, LearnNest offers opportunities to help you expand your
            skills and share your expertise with others. Join us in making education
            better.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
