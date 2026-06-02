import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsRobot } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./css/Page3.css";

const Page3 = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const slides = [
    {
      role: "Data Structures & Algorithms",
      company: "Coding",
      color: "#0f3460",
      accentColor: "#00d4aa",
      icon: "🧠",
      description: "Master arrays, trees, graphs and dynamic programming for top tech interviews.",
      notesPath: "/dsaNotes",
      mcqPath: "/dsa",
    },
    {
      role: "Technical Aptitude",
      company: "Interviews",
      color: "#1a1a5e",
      accentColor: "#f5a623",
      icon: "⚡",
      description: "Sharpen your quantitative and logical reasoning for placement rounds.",
      notesPath: "/aptitudeNotes",
      mcqPath: "/aptitude",
    },
    {
      role: "Object Oriented Programming",
      company: "Theory",
      color: "#2d0a6e",
      accentColor: "#a78bfa",
      icon: "🔷",
      description: "Deep dive into classes, inheritance, polymorphism and design patterns.",
      notesPath: "/oopsNotes",
      mcqPath: "/oops",
    },
    {
      role: "Communication Skills",
      company: "Soft Skills",
      color: "#3b0764",
      accentColor: "#f472b6",
      icon: "🗣️",
      description: "Build confidence in spoken and written English for HR rounds.",
      notesPath: "/englishNotes",
      mcqPath: "/english",
    },
    {
      role: "JavaScript",
      company: "Coding",
      color: "#0c1a4a",
      accentColor: "#fbbf24",
      icon: "🟨",
      description: "Learn ES6+, async/await, closures and DOM manipulation in depth.",
      notesPath: "/dbmsNotes",
      mcqPath: "/dbms",
    },
    {
      role: "React.js Mastery",
      company: "Coding",
      color: "#0a2a5e",
      accentColor: "#38bdf8",
      icon: "⚛️",
      description: "Hooks, context, performance and building production-ready React apps.",
      notesPath: "/reactNotes",
      mcqPath: "/react",
    },
    {
      role: "MERN Stack",
      company: "Coding",
      color: "#0d3b4a",
      accentColor: "#34d399",
      icon: "🌐",
      description: "Full-stack development with MongoDB, Express, React and Node.js.",
      notesPath: "/mernNotes",
      mcqPath: "/mern",
    },
  ];

  const next = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIndex((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 450);
    }
  };

  const prev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 450);
    }
  };

  const goTo = (i) => {
    if (!isAnimating && i !== index) {
      setIsAnimating(true);
      setIndex(i);
      setTimeout(() => setIsAnimating(false), 450);
    }
  };

  const current = slides[index];

  return (
    <section className="p3-section">
      <div className="p3-bg-orb p3-orb-1" />
      <div className="p3-bg-orb p3-orb-2" />

      <Container className="p3-container">
        <Row className="justify-content-center align-items-center g-4 g-lg-5">

          {/* LEFT CONTENT */}
          <Col xs={12} lg={6} className="text-center text-lg-start">
            <div className={`p3-left ${isVisible ? "p3-visible" : ""}`}>

              <div className="p3-badge">
                <BsRobot className="p3-badge-icon" aria-hidden="true" />
                <span>Learn With AI</span>
              </div>

              <h1 className="p3-heading">Job Preparation</h1>

              <p className="p3-subheading">
                Practice interviews with AI{" "}
                <span className="p3-accent">Interview Coach</span>
              </p>

              <Button
                className="p3-cta-btn"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "instant" });
                  navigate("/jobPrep");
                }}
              >
                View all Preparations <span className="p3-btn-arrow">→</span>
              </Button>

              <div className="p3-stats">
                {[
                  { num: "7", label: "Course Modules" },
                  { num: "95%", label: "Success Rate" },
                  { num: "24/7", label: "AI Support" },
                ].map((s, i) => (
                  <div key={i} className="p3-stat" style={{ transitionDelay: `${i * 0.12}s` }}>
                    <span className="p3-stat-num">{s.num}</span>
                    <span className="p3-stat-lbl">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* RIGHT CAROUSEL */}
          <Col xs={12} lg={6}>
            <div className={`p3-right ${isVisible ? "p3-visible" : ""}`}>

              <div className="p3-carousel">

                <button
                  onClick={prev}
                  disabled={isAnimating}
                  className="p3-nav-btn"
                  aria-label="Previous slide"
                >
                  <FaChevronLeft />
                </button>

                <div className="p3-stack">
                  {slides.map((slide, i) => (
                    <div
                      key={i}
                      className={`p3-card ${i === index ? "p3-card-active" : ""}`}
                      style={{
                        background: `linear-gradient(145deg, ${slide.color} 0%, #090a3a 100%)`,
                        borderColor: i === index ? slide.accentColor + "55" : "transparent",
                      }}
                    >
                      <div
                        className="p3-card-glow"
                        style={{ background: slide.accentColor + "22" }}
                      />

                      <div className="p3-card-body">
                        <div className="p3-card-icon-wrap" style={{ background: slide.accentColor + "22" }}>
                          <span className="p3-card-icon">{slide.icon}</span>
                        </div>

                        <div className="p3-card-tag" style={{ color: slide.accentColor }}>
                          {slide.company}
                        </div>

                        <h3 className="p3-card-title">{slide.role}</h3>
                        <p className="p3-card-desc">{slide.description}</p>
                      </div>

                      <div className="p3-card-actions">
                        <button
                          onClick={() => navigate(slide.notesPath)}
                          className="p3-btn-notes"
                          style={{ borderColor: slide.accentColor + "66", color: slide.accentColor }}
                        >
                          📖 Notes
                        </button>
                        <button
                          onClick={() => navigate(slide.mcqPath)}
                          className="p3-btn-mcq"
                          style={{ background: slide.accentColor, color: "#0a0a2e" }}
                        >
                          📝 MCQs
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={next}
                  disabled={isAnimating}
                  className="p3-nav-btn"
                  aria-label="Next slide"
                >
                  <FaChevronRight />
                </button>
              </div>

              {/* Dots */}
              <div className="p3-dots" role="tablist" aria-label="Slide navigation">
                {slides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`p3-dot ${i === index ? "p3-dot-active" : ""}`}
                    style={i === index ? { background: current.accentColor } : {}}
                    aria-label={`Go to slide ${i + 1}`}
                    role="tab"
                    aria-selected={i === index}
                  />
                ))}
              </div>

            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default Page3;