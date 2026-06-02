import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import {
  FaBriefcase,
  FaLaptopCode, FaUsers, FaIndustry, FaGraduationCap,
  FaArrowRight, FaChartLine,
  FaCode, FaRobot, FaHeadset, FaPenNib, FaDatabase,
  FaUserTie, FaCogs, FaBullhorn
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./css/Page1.css";

const ROLE_STYLES = [
  { keyword: "data",      color: "#6366f1", bgColor: "#eef2ff", gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", icon: <FaDatabase /> },
  { keyword: "developer", color: "#0ea5e9", bgColor: "#f0f9ff", gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)", icon: <FaCode /> },
  { keyword: "engineer",  color: "#8b5cf6", bgColor: "#f5f3ff", gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)", icon: <FaCogs /> },
  { keyword: "design",    color: "#ec4899", bgColor: "#fdf2f8", gradient: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)", icon: <FaPenNib /> },
  { keyword: "sales",     color: "#f97316", bgColor: "#fff7ed", gradient: "linear-gradient(135deg, #f97316 0%, #eab308 100%)", icon: <FaUserTie /> },
  { keyword: "hr",        color: "#14b8a6", bgColor: "#f0fdfa", gradient: "linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)", icon: <FaUsers /> },
  { keyword: "manager",   color: "#10b981", bgColor: "#ecfdf5", gradient: "linear-gradient(135deg, #10b981 0%, #0ea5e9 100%)", icon: <FaChartLine /> },
  { keyword: "analyst",   color: "#0ea5e9", bgColor: "#f0f9ff", gradient: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)", icon: <FaChartLine /> },
  { keyword: "intern",    color: "#10b981", bgColor: "#ecfdf5", gradient: "linear-gradient(135deg, #10b981 0%, #84cc16 100%)", icon: <FaGraduationCap /> },
  { keyword: "marketing", color: "#ef4444", bgColor: "#fef2f2", gradient: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)", icon: <FaBullhorn /> },
  { keyword: "support",   color: "#06b6d4", bgColor: "#ecfeff", gradient: "linear-gradient(135deg, #06b6d4 0%, #6366f1 100%)", icon: <FaHeadset /> },
  { keyword: "ai",        color: "#7c3aed", bgColor: "#f5f3ff", gradient: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)", icon: <FaRobot /> },
  { keyword: "it",        color: "#3b82f6", bgColor: "#eff6ff", gradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)", icon: <FaLaptopCode /> },
];

const DEFAULT_STYLE = {
  color: "#6366f1", bgColor: "#eef2ff",
  gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", icon: <FaBriefcase />
};

const getStyle = (title = "") => {
  const lower = title.toLowerCase();
  return ROLE_STYLES.find((s) => lower.includes(s.keyword)) || DEFAULT_STYLE;
};

const CAN_VIEW_SEARCH = (role) => role === "job seekers";
const IS_RECRUITER    = (role) => role?.toLowerCase().includes("recruiter");

export default function JobSearchPage() {
  const [role, setRole]               = useState("guest");
  const [roleLoading, setRoleLoading] = useState(true);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredCompany,  setHoveredCompany]  = useState(null);
  const navigate = useNavigate();

  const [realCategories, setRealCategories] = useState([]);
  const [realCompanies,  setRealCompanies]  = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingCompanies,  setLoadingCompanies]  = useState(true);

  /* ── Auth / role ── */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setRole(storedUser?.role || "guest");
    setRoleLoading(false);
  }, []);

  /* ── Fetch categories ── */
  useEffect(() => {
    setLoadingCategories(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/jobs`)
      .then((res) => {
        const jobs = res.data.jobs || [];
        const countMap = {};
        jobs.forEach((j) => {
          const t = j.jobTitle?.trim();
          if (t) countMap[t] = (countMap[t] || 0) + 1;
        });
        const cats = Object.entries(countMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([title, count]) => {
            const s = getStyle(title);
            return { title, jobs: count.toLocaleString(), ...s };
          });
        setRealCategories(cats);
      })
      .catch((err) => console.error("Category fetch error:", err))
      .finally(() => setLoadingCategories(false));
  }, []);

  /* ── Fetch companies ── */
  useEffect(() => {
    setLoadingCompanies(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/companies`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setRealCompanies(data);
      })
      .catch((err) => console.error("Companies fetch error:", err))
      .finally(() => setLoadingCompanies(false));
  }, []);

  /* ── Dummy / fallback data ── */
  const dummyCategories = [
    { icon: <FaGraduationCap />, title: "Freshers",     jobs: "21,442", color: "#10b981", bgColor: "#ecfdf5", gradient: "linear-gradient(135deg, #10b981 0%, #84cc16 100%)" },
    { icon: <FaLaptopCode />,    title: "IT",            jobs: "43,456", color: "#3b82f6", bgColor: "#eff6ff", gradient: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)" },
    { icon: <FaUsers />,         title: "HR",            jobs: "14,125", color: "#14b8a6", bgColor: "#f0fdfa", gradient: "linear-gradient(135deg, #14b8a6 0%, #6366f1 100%)" },
    { icon: <FaIndustry />,      title: "Manufacturing", jobs: "12,878", color: "#8b5cf6", bgColor: "#f5f3ff", gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)" },
    { icon: <FaCode />,          title: "Developer",     jobs: "38,210", color: "#0ea5e9", bgColor: "#f0f9ff", gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)" },
    { icon: <FaRobot />,         title: "AI/ML",         jobs: "9,340",  color: "#7c3aed", bgColor: "#f5f3ff", gradient: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)" },
    { icon: <FaBullhorn />,      title: "Marketing",     jobs: "17,560", color: "#ef4444", bgColor: "#fef2f2", gradient: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)" },
    { icon: <FaDatabase />,      title: "Data Science",  jobs: "22,100", color: "#6366f1", bgColor: "#eef2ff", gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" },
  ];

  const displayCategories = realCategories.length > 0 ? realCategories : dummyCategories;
  /* Triple the list so the -33.333% translateX loop is seamless */
  const loopedCategories  = [...displayCategories, ...displayCategories, ...displayCategories];

  const buildCompanyList = () => {
    if (realCompanies.length > 0) {
      return realCompanies.map((c, i) => ({
        name:  c.name || c.companyName || "Company",
        logo:  c.logo || null,
        color: "#6366f1",
        _id:   c._id || i,
      }));
    }
    return [
      { name: "Walmart",    logo: null, color: "#0071ce" },
      { name: "HCLTech",    logo: null, color: "#0066b2" },
      { name: "TCS",        logo: null, color: "#2a3a8f" },
      { name: "Amazon",     logo: null, color: "#f97316" },
      { name: "DirectAxis", logo: null, color: "#1e40af" },
      { name: "Accenture",  logo: null, color: "#7c3aed" },
      { name: "Infosys",    logo: null, color: "#0ea5e9" },
      { name: "Wipro",      logo: null, color: "#10b981" },
    ];
  };

  const companyList     = buildCompanyList();
  const loopedCompanies = [...companyList, ...companyList, ...companyList];

  /* ── Guards ── */
  if (roleLoading)         return null;
  if (IS_RECRUITER(role))  return null;
  if (!CAN_VIEW_SEARCH(role)) return null;

  /* ── Render ── */
  return (
    <div className="p1-root">
      {/* Decorative background orbs */}
      <div className="p1-orb p1-orb-1" />
      <div className="p1-orb p1-orb-2" />
      <div className="p1-orb p1-orb-3" />

      <Container fluid className="p1-container">

        {/* ══ CATEGORY SECTION HEADER ══ */}
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <div className="p1-section-header">
              <span className="p1-pill">🔥 Live Listings</span>
              <h2 className="p1-section-title">Browse by Category</h2>
              <p className="p1-section-sub">
                {loadingCategories
                  ? "Fetching latest job data…"
                  : `Explore top ${displayCategories.length} categories from live postings`}
              </p>
            </div>
          </Col>
        </Row>

        {/* ══ CATEGORY MARQUEE ══
            KEY FIX: use a full-width div OUTSIDE Bootstrap col padding,
            so flex track never gets clipped or wrapped by col constraints. */}
        <div style={{ marginBottom: "3rem" }}>
          <div className="p1-marquee-wrap">
            <div className="p1-fade-left" />
            <div className="p1-fade-right" />
            <div className="p1-track p1-track-cats">
              {(loadingCategories ? dummyCategories : loopedCategories).map((cat, i) => (
                <div
                  key={i}
                  className={`p1-cat-card${hoveredCategory === i ? " p1-cat-card--hovered" : ""}`}
                  style={{
                    "--cat-color": cat.color,
                    "--cat-bg":    cat.bgColor,
                    "--cat-grad":  cat.gradient,
                  }}
                  onMouseEnter={() => setHoveredCategory(i)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => navigate(`/jobs?title=${encodeURIComponent(cat.title)}`)}
                >
                  <div className="p1-cat-icon">{cat.icon}</div>
                  <h5 className="p1-cat-title">{cat.title}</h5>
                  <p className="p1-cat-count">
                    {cat.jobs}{" "}
                    {parseInt(String(cat.jobs).replace(/,/g, "")) === 1 ? "Job" : "Jobs"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ COMPANIES SECTION HEADER ══ */}
        <Row className="justify-content-center">
          <Col xs={12} lg={10}>
            <div className="p1-section-header">
              <span className="p1-pill p1-pill--green">🏢 Now Hiring</span>
              <h2 className="p1-section-title">Top Companies</h2>
              <p className="p1-section-sub">
                {loadingCompanies
                  ? "Loading companies…"
                  : realCompanies.length > 0
                    ? `${realCompanies.length} companies actively hiring`
                    : "Join the world's most innovative organizations"}
              </p>
            </div>
          </Col>
        </Row>

        {/* ══ COMPANY MARQUEE ══ */}
        <div style={{ marginBottom: "3rem" }}>
          <div className="p1-marquee-wrap">
            <div className="p1-fade-left" />
            <div className="p1-fade-right" />
            <div className="p1-track p1-track-companies">
              {loopedCompanies.map((c, i) => (
                <div
                  key={i}
                  className={`p1-company-card${hoveredCompany === i ? " p1-company-card--hovered" : ""}`}
                  style={{ "--co-color": c.color }}
                  onMouseEnter={() => setHoveredCompany(i)}
                  onMouseLeave={() => setHoveredCompany(null)}
                  onClick={() =>
                    navigate(`/companies?company=${encodeURIComponent(c.name)}`)
                  }
                >
                  {c.logo ? (
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="p1-co-logo"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <div className="p1-co-initial">
                      {c.name?.[0]?.toUpperCase()}
                    </div>
                  )}
                  <span className="p1-co-name">{c.name}</span>
                  <FaArrowRight className="p1-co-arrow" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </Container>
    </div>
  );
}