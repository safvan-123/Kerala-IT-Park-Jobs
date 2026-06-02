import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaDatabase, FaChartLine, FaUserTie, FaJava,
  FaChevronRight, FaCode, FaRobot, FaHeadset,
  FaPenNib, FaBriefcase, FaChevronLeft, FaArrowRight
} from "react-icons/fa";
import "./css/Page2.css";

const ROLE_STYLES = [
  { keyword: "data",      icon: <FaDatabase />,  color: "#2563eb" }, // Royal Blue
  { keyword: "analyst",   icon: <FaChartLine />, color: "#0ea5e9" }, // Sky Blue
  { keyword: "sales",     icon: <FaUserTie />,   color: "#f59e0b" }, 
  { keyword: "java",      icon: <FaJava />,      color: "#ef4444" }, 
  { keyword: "frontend",  icon: <FaCode />,      color: "#06b6d4" }, 
  { keyword: "ai",        icon: <FaRobot />,     color: "#7c3aed" }, 
  { keyword: "customer",  icon: <FaHeadset />,   color: "#f97316" }, 
  { keyword: "design",    icon: <FaPenNib />,    color: "#ec4899" }, 
  { keyword: "backend",   icon: <FaCode />,      color: "#10b981" }, 
  { keyword: "engineer",  icon: <FaRobot />,     color: "#6366f1" }, 
];

// Fallback style matches the Logo's Primary Deep Blue
const DEFAULT_STYLE = { icon: <FaBriefcase />, color: "#0d107a" };

const getStyle = (title = "") => {
  const lower = title.toLowerCase();
  return ROLE_STYLES.find((s) => lower.includes(s.keyword)) || DEFAULT_STYLE;
};

const PAGINATION_THRESHOLD = 12;

export default function Page2() {
  const [allRoles, setAllRoles]       = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [animKey, setAnimKey]         = useState(0);
  const itemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/jobs`)
      .then((res) => {
        const jobs = res.data.jobs || [];
        const countMap = {};
        jobs.forEach((j) => {
          const t = j.jobTitle?.trim();
          if (t) countMap[t] = (countMap[t] || 0) + 1;
        });
        const roles = Object.entries(countMap)
          .sort((a, b) => b[1] - a[1])
          .map(([title, count]) => {
            const style = getStyle(title);
            return { title, count: `${count} Job${count !== 1 ? "s" : ""}`, icon: style.icon, color: style.color };
          });
        setAllRoles(roles);
      })
      .catch((err) => console.error("Page2 fetch error:", err));
  }, []);

  const totalPages   = Math.ceil(allRoles.length / itemsPerPage);
  const currentRoles = allRoles.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const showPagination = totalPages > PAGINATION_THRESHOLD;

  const changePage = (page) => {
    setCurrentPage(page);
    setAnimKey(k => k + 1);
  };

  const scrollToJobs = () => {
    const el = document.getElementById("jobs-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleRoleClick = (title) => {
    navigate(`/jobs?title=${encodeURIComponent(title)}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;
    for (let i = 0; i < totalPages; i++) {
      if (
        i === 0 ||
        i === totalPages - 1 ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <section className="p2-section">
      {/* Brand logo-inspired soft backdrop orbs */}
      <div className="p2-blob p2-blob--1" aria-hidden="true" />
      <div className="p2-blob p2-blob--2" aria-hidden="true" />

      <Container className="p2-container">
        <Row className="align-items-center g-4 gy-5">

          {/* ── LEFT COLUMN ── */}
          <Col lg={5} md={12} className="p2-left">
            <div className="p2-eyebrow">
              <span className="p2-eyebrow__dot" />
              Opportunities
            </div>

            <h2 className="p2-heading">
              Explore Jobs in<br />
              <span className="p2-heading__accent">Popular Roles</span>
            </h2>

            <p className="p2-subtext">
              {allRoles.length > 0
                ? `${allRoles.length} unique roles found · Page ${currentPage + 1} of ${totalPages || 1}`
                : "Loading available roles…"}
            </p>

            <button className="p2-cta" onClick={scrollToJobs}>
              <span>Explore All Jobs</span>
              <span className="p2-cta__arrow">
                <FaArrowRight size={13} />
              </span>
            </button>

            {/* Stats strip */}
            {allRoles.length > 0 && (
              <div className="p2-stats">
                <div className="p2-stat">
                  <span className="p2-stat__num">{allRoles.length}</span>
                  <span className="p2-stat__label">Roles</span>
                </div>
                <div className="p2-stat__divider" />
                <div className="p2-stat">
                  <span className="p2-stat__num">{allRoles.reduce((s, r) => s + parseInt(r.count), 0)}</span>
                  <span className="p2-stat__label">Openings</span>
                </div>
                <div className="p2-stat__divider" />
                <div className="p2-stat">
                  <span className="p2-stat__num">Live</span>
                  <span className="p2-stat__label">Updated</span>
                </div>
              </div>
            )}
          </Col>

          {/* ── RIGHT COLUMN ── */}
          <Col lg={7} md={12} className="p2-right">
            {allRoles.length === 0 ? (
              <div className="p2-loading">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p2-skeleton" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            ) : (
              <>
                <div className="p2-cards" key={animKey}>
                  {currentRoles.map((role, index) => (
                    <button
                      key={index}
                      className="p2-card"
                      style={{ "--role-color": role.color, animationDelay: `${index * 0.06}s` }}
                      onClick={() => handleRoleClick(role.title)}
                      aria-label={`${role.title} – ${role.count}`}
                    >
                      <div className="p2-card__icon" style={{ "--role-color": role.color }}>
                        {role.icon}
                      </div>
                      <div className="p2-card__body">
                        <span className="p2-card__title">{role.title}</span>
                        <span className="p2-card__count">{role.count}</span>
                      </div>
                      <div className="p2-card__arrow">
                        <FaChevronRight size={12} />
                      </div>
                      {/* Brand-colored dynamic slide accent */}
                      <span className="p2-card__bar" style={{ background: role.color }} />
                    </button>
                  ))}
                </div>

                {/* Dot pagination */}
                {!showPagination && totalPages > 1 && (
                  <div className="p2-dots">
                    {[...Array(totalPages)].map((_, idx) => (
                      <button
                        key={idx}
                        className={`p2-dot${currentPage === idx ? " p2-dot--active" : ""}`}
                        onClick={() => changePage(idx)}
                        aria-label={`Page ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Numbered pagination */}
                {showPagination && (
                  <div className="p2-pager">
                    <button
                      className="p2-pager__btn p2-pager__btn--nav"
                      onClick={() => changePage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      aria-label="Previous"
                    >
                      <FaChevronLeft size={11} />
                    </button>

                    {getPageNumbers().map((page, idx) =>
                      page === "..." ? (
                        <span key={`e-${idx}`} className="p2-pager__ellipsis">…</span>
                      ) : (
                        <button
                          key={page}
                          className={`p2-pager__btn${currentPage === page ? " p2-pager__btn--active" : ""}`}
                          onClick={() => changePage(page)}
                        >
                          {page + 1}
                        </button>
                      )
                    )}

                    <button
                      className="p2-pager__btn p2-pager__btn--nav"
                      onClick={() => changePage(Math.min(totalPages - 1, currentPage + 1))}
                      disabled={currentPage === totalPages - 1}
                      aria-label="Next"
                    >
                      <FaChevronRight size={11} />
                    </button>
                  </div>
                )}
              </>
            )}
          </Col>

        </Row>
      </Container>
    </section>
  );
}