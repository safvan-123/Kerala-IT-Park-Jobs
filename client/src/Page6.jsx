// import React, { useState, useEffect } from "react";
// import { Container, Row, Col } from "react-bootstrap";

// export default function Page6() {
//   const [scrollY, setScrollY] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//     document.body.style.background = "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)";
//     document.body.style.minHeight = "100vh";
//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       document.body.style.background = "";
//       document.body.style.minHeight = "";
//     };
//   }, []);

//   const [appliedJobs, setAppliedJobs] = useState([]);
//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/applications/my`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const data = await res.json();
//        setAppliedJobs(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Failed to load applications");
//       }
//     };

//     fetchApplications();
//   }, []);

//   const safeJobs = Array.isArray(appliedJobs) ? appliedJobs : [];
//   const safeAppliedJobs = Array.isArray(appliedJobs) ? appliedJobs : [];

//   const countStatus = {
//     Applied: safeJobs.filter((job) => job.status === "Applied").length,
//     Interview: safeJobs.filter((job) => job.status === "Interview").length,
//     Offer: safeJobs.filter((job) => job.status === "Offer").length,
//     Rejected: safeJobs.filter((job) => job.status === "Rejected").length,
//   };

//   const chartData = [
//     { name: "Applied", value: countStatus.Applied, color: "#3b82f6" },
//     { name: "Interview", value: countStatus.Interview, color: "#f59e0b" },
//     { name: "Rejected", value: countStatus.Rejected, color: "#ef4444" },
//     { name: "Offer", value: countStatus.Offer, color: "#10b981" },
//   ];

//   const statusColors = {
//     Applied: "#1d4ed8",
//     Interview: "#b45309",
//     Rejected: "#b91c1c",
//     Offer: "#047857",
//   };

//   const stats = [
//     {
//       label: "Total Applications",
//       value: appliedJobs.length,
//       icon: "📊",
//       color: "#667eea",
//     },
//     {
//       label: "Interviews",
//       value: countStatus.Interview,
//       icon: "💼",
//       color: "#f59e0b",
//     },
//     {
//       label: "Offers Received",
//       value: countStatus.Offer,
//       icon: "🎉",
//       color: "#10b981",
//     },
//     {
//       label: "In Progress",
//       value: countStatus.Applied,
//       icon: "⏳",
//       color: "#3b82f6",
//     },
//   ];

//   // Responsive Donut Chart Component
//   const DonutChart = ({ data }) => {
//     const total = data.reduce((sum, item) => sum + item.value, 0);
//     let currentAngle = -90;
//     const totalApplications = safeJobs.length;

//     if (totalApplications === 0) {
//       return <p>No applications yet</p>;
//     }

//     return (
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "30px",
//           width: "100%",
//         }}
//       >
//         <svg
//           width="100%"
//           height="300"
//           viewBox="0 0 300 300"
//           style={{ maxWidth: "300px" }}
//         >
//           <g transform="translate(150, 150)">
//             {data.map((item, index) => {
//               if (total === 0) return null;
//               const percentage = (item.value / total) * 100;
//               const angle = (percentage / 100) * 360;
//               const startAngle = currentAngle;
//               const endAngle = currentAngle + angle;

//               const startX = 90 * Math.cos((Math.PI * startAngle) / 180);
//               const startY = 90 * Math.sin((Math.PI * startAngle) / 180);
//               const endX = 90 * Math.cos((Math.PI * endAngle) / 180);
//               const endY = 90 * Math.sin((Math.PI * endAngle) / 180);

//               const largeArc = angle > 180 ? 1 : 0;

//               const pathData = [
//                 `M ${startX} ${startY}`,
//                 `A 90 90 0 ${largeArc} 1 ${endX} ${endY}`,
//                 `L ${endX * 0.6} ${endY * 0.6}`,
//                 `A 54 54 0 ${largeArc} 0 ${startX * 0.6} ${startY * 0.6}`,
//                 "Z",
//               ].join(" ");

//               currentAngle = endAngle;

//               return (
//                 <g key={index}>
//                   <path
//                     d={pathData}
//                     fill={item.color}
//                     style={{
//                       opacity: 0,
//                       animation: `fadeIn 0.6s ease-out ${index * 0.15}s forwards`,
//                       cursor: "pointer",
//                       transition: "all 0.3s ease",
//                     }}
//                     onMouseOver={(e) => {
//                       e.target.style.opacity = "0.8";
//                       e.target.style.transform = "scale(1.05)";
//                     }}
//                     onMouseOut={(e) => {
//                       e.target.style.opacity = "1";
//                       e.target.style.transform = "scale(1)";
//                     }}
//                   />
//                   {percentage > 5 && (
//                     <text
//                       x={
//                         72 *
//                         Math.cos(
//                           (Math.PI * (startAngle + angle / 2)) / 180
//                         )
//                       }
//                       y={
//                         72 *
//                         Math.sin(
//                           (Math.PI * (startAngle + angle / 2)) / 180
//                         )
//                       }
//                       textAnchor="middle"
//                       dominantBaseline="middle"
//                       fill="white"
//                       fontSize="18"
//                       fontWeight="700"
//                       style={{
//                         opacity: 0,
//                         animation: `fadeIn 0.6s ease-out ${
//                           index * 0.15 + 0.3
//                         }s forwards`,
//                       }}
//                     >
//                       {item.value}
//                     </text>
//                   )}
//                 </g>
//               );
//             })}

//             {/* Center circle with total */}
//             <circle r="50" fill="white" />
//             <text
//               textAnchor="middle"
//               dominantBaseline="middle"
//               fontSize="32"
//               fontWeight="800"
//               fill="#667eea"
//             >
//               {total}
//             </text>
//             <text
//               y="22"
//               textAnchor="middle"
//               dominantBaseline="middle"
//               fontSize="13"
//               fontWeight="600"
//               fill="#6c757d"
//             >
//               Total
//             </text>
//           </g>
//         </svg>

//         <style>{`
//           @keyframes fadeIn {
//             from {
//               opacity: 0;
//               transform: scale(0.8);
//             }
//             to {
//               opacity: 1;
//               transform: scale(1);
//             }
//           }
//         `}</style>

//         {/* Responsive Legend */}
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             gap: "12px",
//             justifyContent: "center",
//             width: "100%",
//           }}
//         >
//           {data.map((item, index) => (
//             <div
//               key={index}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 padding: "10px 16px",
//                 background: `${item.color}15`,
//                 borderRadius: "20px",
//                 border: `2px solid ${item.color}30`,
//                 transition: "all 0.3s ease",
//                 cursor: "pointer",
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = "scale(1.05)";
//                 e.currentTarget.style.borderColor = item.color;
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = "scale(1)";
//                 e.currentTarget.style.borderColor = `${item.color}30`;
//               }}
//             >
//               <div
//                 style={{
//                   width: "14px",
//                   height: "14px",
//                   borderRadius: "50%",
//                   background: item.color,
//                 }}
//               />
//               <span
//                 style={{
//                   fontSize: "14px",
//                   fontWeight: "600",
//                   color: "#495057",
//                 }}
//               >
//                 {item.name}: {item.value}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
//         padding: "clamp(20px, 3vw, 40px)",
//       }}
//     >
//       <Container fluid style={{ maxWidth: "1600px", padding: "40px 20px" }}>
//         <Row className="justify-content-center">
//           <Col xs={12}>
//             <div
//               style={{
//                 transform: `translateY(${Math.min(scrollY * 0.3, 50)}px)`,
//                 transition: "transform 0.1s ease-out",
//               }}
//             >
//               {/* Header */}
//               <div
//                 style={{
//                   textAlign: "center",
//                   marginBottom: "50px",
//                   opacity: isVisible ? 1 : 0,
//                   transform: isVisible ? "translateY(0)" : "translateY(-30px)",
//                   transition: "all 0.8s ease-out",
//                 }}
//               >
//                 <h1
//                   style={{
//                     color: "white",
//                     fontSize: "clamp(28px, 5vw, 48px)",
//                     fontWeight: "800",
//                     marginBottom: "15px",
//                     textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
//                   }}
//                 >
//                   📈 Application Dashboard
//                 </h1>
//                 <p
//                   style={{
//                     color: "rgba(255,255,255,0.9)",
//                     fontSize: "clamp(14px, 2vw, 18px)",
//                     fontWeight: "500",
//                   }}
//                 >
//                   Track your job applications and interview progress
//                 </p>
//               </div>

//               {/* Stats Cards - Full Width Grid */}
//               <Row className="g-4 mb-5">
//                 {stats.map((stat, index) => (
//                   <Col xs={12} sm={6} lg={3} key={index}>
//                     <div
//                       style={{
//                         background: "white",
//                         borderRadius: "20px",
//                         padding: "30px",
//                         boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
//                         opacity: isVisible ? 1 : 0,
//                         transform: isVisible
//                           ? "translateY(0)"
//                           : "translateY(30px)",
//                         transition: `all 0.6s ease-out ${index * 0.1}s`,
//                         cursor: "pointer",
//                         height: "100%",
//                         minHeight: "140px",
//                       }}
//                       onMouseOver={(e) => {
//                         e.currentTarget.style.transform = "translateY(-8px)";
//                         e.currentTarget.style.boxShadow =
//                           "0 15px 40px rgba(0,0,0,0.25)";
//                       }}
//                       onMouseOut={(e) => {
//                         e.currentTarget.style.transform = "translateY(0)";
//                         e.currentTarget.style.boxShadow =
//                           "0 10px 30px rgba(0,0,0,0.15)";
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <div>
//                           <p
//                             style={{
//                               color: "#6c757d",
//                               fontSize: "14px",
//                               margin: "0 0 12px 0",
//                               fontWeight: "600",
//                             }}
//                           >
//                             {stat.label}
//                           </p>
//                           <h2
//                             style={{
//                               color: stat.color,
//                               fontSize: "clamp(32px, 5vw, 42px)",
//                               fontWeight: "800",
//                               margin: 0,
//                               textShadow:
//                                 "1px 1px 2px rgba(0,0,0,0.1)",
//                             }}
//                           >
//                             {stat.value}
//                           </h2>
//                         </div>
//                         <div style={{ fontSize: "48px" }}>{stat.icon}</div>
//                       </div>
//                     </div>
//                   </Col>
//                 ))}
//               </Row>

//               {/* Main Content - Wide Table Layout */}
//               <Row className="g-4">
//                 {/* Table Section - Takes More Width */}
//                 <Col xs={12} xl={8}>
//                   <div
//                     style={{
//                       background: "white",
//                       borderRadius: "20px",
//                       padding: "35px",
//                       boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
//                       opacity: isVisible ? 1 : 0,
//                       transform: isVisible
//                         ? "translateX(0)"
//                         : "translateX(-50px)",
//                       transition: "all 0.8s ease-out 0.3s",
//                       overflow: "hidden",
//                     }}
//                   >
//                     <h2
//                       style={{
//                         color: "#667eea",
//                         fontSize: "clamp(22px, 3vw, 28px)",
//                         fontWeight: "700",
//                         marginBottom: "25px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "10px",
//                       }}
//                     >
//                       📋 Recent Applications
//                     </h2>

//                    {/* Desktop Table */}
//                 <div className="desktop-table" style={{
//                   maxHeight: "600px",
//                   overflowY: "auto",
//                   borderRadius: "12px",
//                   border: "1px solid #e9ecef",
//                 }}>
//                   <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
//                     <thead style={{
//                       background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                       position: "sticky", top: 0, zIndex: 10,
//                     }}>
//                       <tr>
//                         <th style={{ padding: "18px 20px", textAlign: "left", color: "white", fontWeight: "600", fontSize: "15px", width: "25%" }}>Company</th>
//                         <th style={{ padding: "18px 20px", textAlign: "left", color: "white", fontWeight: "600", fontSize: "15px", width: "35%" }}>Role</th>
//                         <th style={{ padding: "18px 20px", textAlign: "left", color: "white", fontWeight: "600", fontSize: "15px", width: "22%" }}>Applied Date</th>
//                         <th style={{ padding: "18px 20px", textAlign: "center", color: "white", fontWeight: "600", fontSize: "15px", width: "18%" }}>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {safeJobs.map((job, index) => (
//                         <tr key={index} style={{ borderBottom: "1px solid #f1f3f5", transition: "all 0.3s ease" }}
//                           onMouseOver={(e) => { e.currentTarget.style.background = "#f8f9fa"; }}
//                           onMouseOut={(e) => { e.currentTarget.style.background = "white"; }}
//                         >
//                           <td style={{ padding: "20px", fontWeight: "700", color: "#495057", fontSize: "15px" }}>{job.company || "-"}</td>
//                           <td style={{ padding: "20px", color: "#6c757d", fontSize: "15px", fontWeight: "500" }}>{job.role || "-"}</td>
//                           <td style={{ padding: "20px", color: "#6c757d", fontSize: "14px" }}>{job.date || "-"}</td>
//                           <td style={{ padding: "20px", textAlign: "center" }}>
//                             <span style={{
//                               padding: "8px 16px", borderRadius: "20px", fontSize: "13px",
//                               fontWeight: "600", color: "white", background: statusColors[job.status],
//                               display: "inline-block", boxShadow: `0 3px 10px ${statusColors[job.status]}40`, minWidth: "90px",
//                             }}>{job.status}</span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Mobile Cards */}
//                 <div className="mobile-cards">
//                   {safeJobs.map((job, index) => (
//                     <div key={index} style={{
//                       border: "1px solid #e9ecef", borderRadius: "12px",
//                       padding: "16px", marginBottom: "12px", background: "#fafafa",
//                     }}>
//                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
//                         <div>
//                           <div style={{ fontWeight: "700", color: "#495057", fontSize: "15px" }}>{job.company || "-"}</div>
//                           <div style={{ color: "#6c757d", fontSize: "14px", marginTop: "4px" }}>{job.role || "-"}</div>
//                         </div>
//                         <span style={{
//                           padding: "6px 14px", borderRadius: "20px", fontSize: "12px",
//                           fontWeight: "600", color: "white", background: statusColors[job.status],
//                           whiteSpace: "nowrap", marginLeft: "10px",
//                           boxShadow: `0 3px 10px ${statusColors[job.status]}40`,
//                         }}>{job.status}</span>
//                       </div>
//                       <div style={{ fontSize: "13px", color: "#94a3b8" }}>📅 {job.date || "-"}</div>
//                     </div>
//                   ))}
//                 </div>

//                 <style>{`
//                   .desktop-table { display: block; }
//                   .mobile-cards { display: none; }

//                   @media (max-width: 768px) {
//                     .desktop-table { display: none; }
//                     .mobile-cards { display: block; }
//                   }
//                 `}</style>
//                   </div>
//                 </Col>

//                 {/* Donut Chart Section - Takes Less Width */}
//                 <Col xs={12} xl={4}>
//                   <div
//                     style={{
//                       background: "white",
//                       borderRadius: "20px",
//                       padding: "35px",
//                       boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
//                       opacity: isVisible ? 1 : 0,
//                       transform: isVisible
//                         ? "translateX(0)"
//                         : "translateX(50px)",
//                       transition: "all 0.8s ease-out 0.3s",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       height: "100%",
//                     }}
//                   >
//                     <h2
//                       style={{
//                         color: "#667eea",
//                         fontSize: "clamp(22px, 3vw, 28px)",
//                         fontWeight: "700",
//                         marginBottom: "25px",
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "10px",
//                         width: "100%",
//                       }}
//                     >
//                       📊 Status Distribution
//                     </h2>
//                     <DonutChart data={chartData} />
//                   </div>
//                 </Col>
//               </Row>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }






import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Page6() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.background =
      "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)";
    document.body.style.minHeight = "100vh";
    return () => {
      document.body.style.background = "";
      document.body.style.minHeight = "";
    };
  }, []);

  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/applications/my`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        setAppliedJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load applications");
      }
    };
    fetchApplications();
  }, []);

  const safeJobs = Array.isArray(appliedJobs) ? appliedJobs : [];

  const countStatus = {
    Applied: safeJobs.filter((j) => j.status === "Applied").length,
    Interview: safeJobs.filter((j) => j.status === "Interview").length,
    Offer: safeJobs.filter((j) => j.status === "Offer").length,
    Rejected: safeJobs.filter((j) => j.status === "Rejected").length,
  };

  const chartData = [
    { name: "Applied",   value: countStatus.Applied,   color: "#3b82f6" },
    { name: "Interview", value: countStatus.Interview,  color: "#f59e0b" },
    { name: "Rejected",  value: countStatus.Rejected,   color: "#ef4444" },
    { name: "Offer",     value: countStatus.Offer,      color: "#10b981" },
  ];

  const statusColors = {
    Applied:   "#1d4ed8",
    Interview: "#b45309",
    Rejected:  "#b91c1c",
    Offer:     "#047857",
  };

  const stats = [
    { label: "Total Applications", value: safeJobs.length,           icon: "📊", color: "#667eea" },
    { label: "Interviews",         value: countStatus.Interview,     icon: "💼", color: "#f59e0b" },
    { label: "Offers Received",    value: countStatus.Offer,         icon: "🎉", color: "#10b981" },
    { label: "In Progress",        value: countStatus.Applied,       icon: "⏳", color: "#3b82f6" },
  ];

  /* ── Donut Chart ── */
  const DonutChart = ({ data }) => {
    const total = data.reduce((s, i) => s + i.value, 0);
    if (total === 0) {
      return (
        <p style={{ color: "#94a3b8", textAlign: "center", padding: "24px 0" }}>
          No applications yet
        </p>
      );
    }

    let currentAngle = -90;
    const segments = data.map((item) => {
      const angle = (item.value / total) * 360;
      const start = currentAngle;
      const end = currentAngle + angle;
      currentAngle = end;
      return { ...item, start, end, angle };
    });

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", width: "100%" }}>
        <svg width="100%" height="220" viewBox="0 0 260 260" style={{ maxWidth: "260px" }}>
          <g transform="translate(130,130)">
            {segments.map((item, i) => {
              if (item.angle < 0.5) return null;
              const r = 80, ri = 50;
              const toRad = (d) => (Math.PI * d) / 180;
              const sx = r * Math.cos(toRad(item.start));
              const sy = r * Math.sin(toRad(item.start));
              const ex = r * Math.cos(toRad(item.end));
              const ey = r * Math.sin(toRad(item.end));
              const ix = ri * Math.cos(toRad(item.start));
              const iy = ri * Math.sin(toRad(item.start));
              const iex = ri * Math.cos(toRad(item.end));
              const iey = ri * Math.sin(toRad(item.end));
              const lg = item.angle > 180 ? 1 : 0;
              const d = `M${sx} ${sy} A${r} ${r} 0 ${lg} 1 ${ex} ${ey} L${iex} ${iey} A${ri} ${ri} 0 ${lg} 0 ${ix} ${iy} Z`;
              const mid = item.start + item.angle / 2;
              const tx = 66 * Math.cos(toRad(mid));
              const ty = 66 * Math.sin(toRad(mid));
              const pct = (item.value / total) * 100;
              return (
                <g key={i}>
                  <path
                    d={d}
                    fill={item.color}
                    style={{ opacity: 0, animation: `p6fadeIn 0.5s ease-out ${i * 0.12}s forwards`, cursor: "pointer" }}
                    onMouseOver={(e) => { e.target.style.opacity = "0.8"; }}
                    onMouseOut={(e) => { e.target.style.opacity = "1"; }}
                  />
                  {pct > 5 && (
                    <text x={tx} y={ty} textAnchor="middle" dominantBaseline="middle"
                      fill="white" fontSize="13" fontWeight="700"
                      style={{ opacity: 0, animation: `p6fadeIn 0.5s ease-out ${i * 0.12 + 0.25}s forwards` }}>
                      {item.value}
                    </text>
                  )}
                </g>
              );
            })}
            <circle r="46" fill="white" />
            <text textAnchor="middle" dominantBaseline="middle" fontSize="26" fontWeight="800" fill="#667eea">{total}</text>
            <text y="20" textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="600" fill="#94a3b8">Total</text>
          </g>
        </svg>

        <style>{`@keyframes p6fadeIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}`}</style>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", width: "100%" }}>
          {data.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "7px",
              padding: "7px 14px",
              background: `${item.color}15`,
              borderRadius: "20px",
              border: `1.5px solid ${item.color}35`,
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = `${item.color}35`; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: item.color, flexShrink: 0 }} />
              <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#495057" }}>
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        .p6-section {
          min-height: 100vh;
          background: linear-gradient(135deg, #060729 0%, #0c248d 100%);
          padding: clamp(24px, 4vw, 48px) clamp(12px, 3vw, 24px);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        .p6-header { text-align: center; margin-bottom: clamp(28px, 4vw, 48px); }
        .p6-header h1 {
          color: #fff;
          font-size: clamp(22px, 4vw, 42px);
          font-weight: 800;
          margin-bottom: 10px;
          letter-spacing: -0.03em;
          line-height: 1.15;
        }
        .p6-header p {
          color: rgba(255,255,255,0.8);
          font-size: clamp(13px, 1.8vw, 16px);
          font-weight: 400;
          margin: 0;
        }
        .p6-stat-card {
          background: #fff;
          border-radius: 16px;
          padding: clamp(18px, 2.5vw, 28px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          height: 100%;
          min-height: 120px;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .p6-stat-card:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(0,0,0,0.22); }
        .p6-stat-inner { display: flex; align-items: center; justify-content: space-between; }
        .p6-stat-label { color: #6c757d; font-size: clamp(11px, 1.4vw, 13px); font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.04em; }
        .p6-stat-value { font-size: clamp(28px, 4vw, 40px); font-weight: 800; margin: 0; letter-spacing: -0.03em; }
        .p6-stat-icon { font-size: clamp(32px, 4vw, 44px); flex-shrink: 0; }
        .p6-panel {
          background: #fff;
          border-radius: 16px;
          padding: clamp(20px, 3vw, 32px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          height: 100%;
        }
        .p6-panel-title {
          color: #667eea;
          font-size: clamp(16px, 2.2vw, 22px);
          font-weight: 700;
          margin-bottom: clamp(16px, 2vw, 24px);
          display: flex;
          align-items: center;
          gap: 8px;
          letter-spacing: -0.02em;
        }
        /* Desktop table */
        .p6-tbl-wrap {
          max-height: 520px;
          overflow-y: auto;
          border-radius: 10px;
          border: 1px solid #e9ecef;
        }
        .p6-tbl { width: 100%; border-collapse: collapse; min-width: 520px; }
        .p6-tbl thead { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); position: sticky; top: 0; z-index: 5; }
        .p6-tbl th { padding: 14px 16px; text-align: left; color: #fff; font-weight: 600; font-size: clamp(12px, 1.5vw, 14px); }
        .p6-tbl th:last-child { text-align: center; }
        .p6-tbl td { padding: 16px; font-size: clamp(12px, 1.4vw, 14px); border-bottom: 1px solid #f1f3f5; transition: background 0.2s; }
        .p6-tbl tr:hover td { background: #f8f9fa; }
        .p6-tbl .td-company { font-weight: 700; color: #374151; }
        .p6-tbl .td-role { color: #6c757d; font-weight: 500; }
        .p6-tbl .td-date { color: #94a3b8; }
        .p6-tbl .td-status { text-align: center; }
        .p6-badge { padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; color: #fff; display: inline-block; min-width: 80px; text-align: center; }
        /* Mobile cards */
        .p6-mob-card { border: 1px solid #e9ecef; border-radius: 12px; padding: 14px 16px; margin-bottom: 10px; background: #fafafa; }
        .p6-mob-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; gap: 10px; }
        .p6-mob-company { font-weight: 700; color: #374151; font-size: 14px; }
        .p6-mob-role { color: #6c757d; font-size: 12.5px; margin-top: 2px; }
        .p6-mob-date { color: #94a3b8; font-size: 12px; }
        .p6-badge-sm { padding: 5px 12px; border-radius: 20px; font-size: 11.5px; font-weight: 600; color: #fff; white-space: nowrap; flex-shrink: 0; }
        /* Show/hide by breakpoint */
        .p6-desktop { display: block; }
        .p6-mobile  { display: none; }
        @media (max-width: 640px) {
          .p6-desktop { display: none; }
          .p6-mobile  { display: block; }
        }
        /* Fade-in utility */
        .p6-fade { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .p6-fade.in { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="p6-section">
        <Container fluid style={{ maxWidth: "1400px", padding: 0 }}>

          {/* Header */}
          <div className={`p6-header p6-fade ${isVisible ? "in" : ""}`}>
            <h1>📈 Application Dashboard</h1>
            <p>Track your job applications and interview progress</p>
          </div>

          {/* Stats */}
          <Row className="g-3 mb-4">
            {stats.map((stat, i) => (
              <Col xs={6} sm={6} lg={3} key={i}>
                <div className={`p6-stat-card p6-fade ${isVisible ? "in" : ""}`}
                  style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="p6-stat-inner">
                    <div>
                      <p className="p6-stat-label">{stat.label}</p>
                      <h2 className="p6-stat-value" style={{ color: stat.color }}>{stat.value}</h2>
                    </div>
                    <span className="p6-stat-icon">{stat.icon}</span>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Table + Chart */}
          <Row className="g-3">
            <Col xs={12} xl={8}>
              <div className={`p6-panel p6-fade ${isVisible ? "in" : ""}`} style={{ transitionDelay: "0.28s" }}>
                <h2 className="p6-panel-title">📋 Recent Applications</h2>

                {/* Desktop table */}
                <div className="p6-desktop">
                  <div className="p6-tbl-wrap">
                    <table className="p6-tbl">
                      <thead>
                        <tr>
                          <th style={{ width: "26%" }}>Company</th>
                          <th style={{ width: "36%" }}>Role</th>
                          <th style={{ width: "22%" }}>Applied Date</th>
                          <th style={{ width: "16%" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {safeJobs.length === 0 ? (
                          <tr><td colSpan={4} style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>No applications yet</td></tr>
                        ) : (
                          safeJobs.map((job, i) => (
                            <tr key={i}>
                              <td className="td-company">{job.company || "—"}</td>
                              <td className="td-role">{job.role || "—"}</td>
                              <td className="td-date">{job.date || "—"}</td>
                              <td className="td-status">
                                <span className="p6-badge"
                                  style={{ background: statusColors[job.status] || "#6b7280",
                                    boxShadow: `0 3px 8px ${(statusColors[job.status] || "#6b7280")}40` }}>
                                  {job.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Mobile cards */}
                <div className="p6-mobile">
                  {safeJobs.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#94a3b8", padding: "24px 0" }}>No applications yet</p>
                  ) : (
                    safeJobs.map((job, i) => (
                      <div key={i} className="p6-mob-card">
                        <div className="p6-mob-top">
                          <div>
                            <div className="p6-mob-company">{job.company || "—"}</div>
                            <div className="p6-mob-role">{job.role || "—"}</div>
                          </div>
                          <span className="p6-badge-sm"
                            style={{ background: statusColors[job.status] || "#6b7280",
                              boxShadow: `0 2px 6px ${(statusColors[job.status] || "#6b7280")}40` }}>
                            {job.status}
                          </span>
                        </div>
                        <div className="p6-mob-date">📅 {job.date || "—"}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Col>

            <Col xs={12} xl={4}>
              <div className={`p6-panel p6-fade ${isVisible ? "in" : ""}`}
                style={{ transitionDelay: "0.36s", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2 className="p6-panel-title" style={{ width: "100%" }}>📊 Status Distribution</h2>
                <DonutChart data={chartData} />
              </div>
            </Col>
          </Row>

        </Container>
      </div>
    </>
  );
}