import { 
  FaRocket, FaBriefcase, FaCheckCircle, FaBuilding, 
  FaCalendarDay, FaUserPlus, FaSearch, FaPaperPlane, 
  FaMapMarkerAlt, FaCode, FaDatabase, FaMobileAlt, 
  FaCloud, FaShieldAlt, FaChartLine, FaArrowRight, 
  FaFire, FaGraduationCap, FaLaptopCode 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "./css/LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role || "guest";
  const [countersStarted, setCountersStarted] = useState(false);
  const [counts, setCounts] = useState({ jobs: 0, companies: 0, seekers: 0, placed: 0 });
  const jobSectionRef = useRef(null);

  useEffect(() => {
    if (role !== "guest") return;
    const timer = setTimeout(() => {
      toast.info(
        <div className="guest-toast">
          <div className="toast-title">🚀 Welcome to Kerala's IT Hub</div>
          <div className="toast-body">Create a free account to apply for Technopark & Infopark jobs!</div>
          <button onClick={() => { navigate("/login"); toast.dismiss(); }} className="toast-btn">
            Get Started →
          </button>
        </div>,
        { position: "bottom-right", autoClose: 8000, toastId: "guest-prompt" }
      );
    }, 6000);
    return () => clearTimeout(timer);
  }, [role, navigate]);

  // Counter animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );
    if (jobSectionRef.current) observer.observe(jobSectionRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  const animateCounters = () => {
    const targets = { jobs: 5000, companies: 450, seekers: 100000, placed: 12000 };
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounts({
        jobs: Math.floor(targets.jobs * ease),
        companies: Math.floor(targets.companies * ease),
        seekers: Math.floor(targets.seekers * ease),
        placed: Math.floor(targets.placed * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
  };

  const scrollToJobs = () => {
    const el = document.getElementById("jobs-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-container">
      {/* Soft corporate layout branding orbs */}
      <div className="blob blob-1" aria-hidden="true"></div>
      <div className="blob blob-2" aria-hidden="true"></div>

      <div className="content-wrapper">
        {/* ================= HERO SECTION ================= */}
        <header className="hero-section">
          <div className="hero-badge animate-float">
            <span className="hero-badge__dot"></span>
            <span>#1 Job Portal in Kerala</span>
          </div>

          <h1 className="hero-title">
            Kerala Jobs &amp; <br />
            <span className="text-gradient">IT Careers Portal</span>
          </h1>

          <p className="hero-subtitle">
            Find the latest software roles, internships, and fresher vacancies across{" "}
            <strong>Technopark, Infopark, and Cyberpark.</strong> Join 100K+ candidates
            building their future in Kerala.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn-primary"
              onClick={role === "recruiters" ? () => navigate("/addJobForm") : scrollToJobs}
            >
              <span className="btn-primary__text">{role === "recruiters" ? "Post a Vacancy" : "Find Jobs Now"}</span>
              <FaArrowRight size={13} className="btn-primary__arrow" />
            </button>
            <button className="btn-secondary" onClick={() => navigate("/companies")}>
              Explore Companies
            </button>
          </div>

          <div className="hero-tags">
            <span><FaCheckCircle /> Daily Updates</span>
            <span><FaCheckCircle /> Freshers &amp; Pro</span>
            <span><FaCheckCircle /> IT &amp; Non-IT</span>
          </div>
        </header>

        {/* ================= HOW IT WORKS ================= */}
        {(role === "guest" || role === "job seekers") && (
          <section className="how-it-works" ref={jobSectionRef}>
            <h2 className="section-title">Start Your IT Career in Kerala in 3 Simple Steps</h2>
            <div className="steps-container">
              {[
                { icon: <FaUserPlus />, title: "Create Profile", desc: "Build your professional profile and apply for IT & Non-IT jobs in Kerala, including opportunities from Technopark, Infopark, and leading software companies." },
                { icon: <FaSearch />, title: "Smart Search", desc: "Search and filter jobs by location, experience level, or remote work opportunities." },
                { icon: <FaPaperPlane />, title: "Apply Directly", desc: "Apply to software developer, website developer & Non-IT jobs with one click and receive interview updates instantly." },
              ].map((step, i) => (
                <div key={i} className="step-card">
                  <div className="step-number">{i + 1}</div>
                  <div className="step-icon-box">{step.icon}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default LandingPage;