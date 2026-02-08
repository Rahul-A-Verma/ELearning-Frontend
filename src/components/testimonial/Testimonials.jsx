import React from "react";
import "./testimonial.css";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "Alice Johnson",
      position: "Student",
      message:
        "Highly recommend! Very structured and beginner-friendly courses. Loved the UI too!",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 4,
      name: "Michael Brown",
      position: "Student",
      message:
        "The certifications really helped me boost my resume. The mentors are very responsive!",
      image:
        "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];

  return (
    <section className="testimonials">
      <h2>What Our Students Say</h2>
      <div className="testimonials-cards">
        {testimonialsData.map((e, index) => (
          <div
            className="testimonial-card"
            key={e.id}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="student-image">
              <img src={e.image} alt={e.name} />
            </div>
            <p className="message">{e.message}</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="position">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
