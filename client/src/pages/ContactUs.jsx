// import React, { useState } from "react";
// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaInstagram } from "react-icons/fa";
// import { Send, CheckCircle, User, FileText, MessageSquare } from 'lucide-react';
// import axios from "axios";
// import { getUserId } from "../../../client/src/utils/auth.js";

// const ContactUs = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
//   const [submitted, setSubmitted] = useState(false);
//   const userId = getUserId();
//   const userRole = JSON.parse(localStorage.getItem("user") || "{}")?.role || "guest";

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userId) { toast.error("User not authenticated", { position: "top-center" }); return; }
//     try {
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/queries/user/${userId}`, { ...formData, role: userRole });
//       setSubmitted(true);
//       setTimeout(() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }, 3000);
//     } catch (error) { console.error("Query submit error:", error); }
//   };

//   return (
//     <div className="cu-root">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         /* ─── PAGE SHELL ─── */
//         .cu-root {
//           min-height: 100vh;
//           background: linear-gradient(135deg, #060729 0%, #0c248d 100%);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 32px 20px;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           position: relative;
//           overflow: hidden;
//         }

//         /* decorative blobs */
//         .cu-root::before, .cu-root::after {
//           content: '';
//           position: fixed;
//           border-radius: 50%;
//           pointer-events: none;
//         }
//         .cu-root::before {
//           width: 500px; height: 500px;
//           top: -180px; right: -160px;
//           background: radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 68%);
//         }
//         .cu-root::after {
//           width: 400px; height: 400px;
//           bottom: -140px; left: -120px;
//           background: radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 68%);
//         }

//         /* ─── OUTER CARD ─── */
//         .cu-shell {
//           width: 100%;
//           max-width: 900px;
//           border-radius: 32px;
//           overflow: hidden;
//           box-shadow: 0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.07);
//           position: relative;
//           z-index: 1;
//           display: flex;
//         }

//         /* ══════════════════════════════════════
//            LEFT PANEL  (desktop)
//         ══════════════════════════════════════ */
//         .cu-panel {
//           flex: 0 0 38%;
//           background: linear-gradient(170deg, #07093a 0%, #0d1fa8 100%);
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           padding: 44px 32px 36px;
//           position: relative;
//           overflow: hidden;
//         }

//         /* mesh circles behind left panel */
//         .cu-panel::before {
//           content: '';
//           position: absolute;
//           width: 280px; height: 280px;
//           border-radius: 50%;
//           border: 1px solid rgba(255,255,255,0.07);
//           top: -60px; right: -60px;
//           pointer-events: none;
//         }
//         .cu-panel::after {
//           content: '';
//           position: absolute;
//           width: 180px; height: 180px;
//           border-radius: 50%;
//           border: 1px solid rgba(255,255,255,0.06);
//           bottom: 30px; left: -50px;
//           pointer-events: none;
//         }

//         .cu-panel-top { position: relative; z-index: 1; }

//         .cu-panel-eyebrow {
//           font-size: 0.65rem;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(147,197,253,0.85);
//           margin-bottom: 10px;
//         }

//         .cu-panel-heading {
//           font-size: 1.55rem;
//           font-weight: 800;
//           color: #ffffff;
//           line-height: 1.25;
//           margin-bottom: 10px;
//         }

//         .cu-panel-desc {
//           font-size: 0.78rem;
//           color: rgba(255,255,255,0.52);
//           line-height: 1.6;
//           font-weight: 400;
//         }

//         /* contact info list */
//         .cu-contact-list {
//           position: relative;
//           z-index: 1;
//           margin-top: 36px;
//           display: flex;
//           flex-direction: column;
//           gap: 18px;
//         }

//         .cu-contact-row {
//           display: flex;
//           align-items: flex-start;
//           gap: 13px;
//         }

//         .cu-contact-icon {
//           width: 36px; height: 36px;
//           border-radius: 10px;
//           background: rgba(255,255,255,0.10);
//           border: 1px solid rgba(255,255,255,0.13);
//           display: flex; align-items: center; justify-content: center;
//           flex-shrink: 0;
//           color: #93c5fd;
//           font-size: 0.82rem;
//         }

//         .cu-contact-label {
//           font-size: 0.63rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.09em;
//           color: rgba(147,197,253,0.7);
//           margin-bottom: 2px;
//         }

//         .cu-contact-val {
//           font-size: 0.78rem;
//           color: rgba(255,255,255,0.85);
//           font-weight: 500;
//           line-height: 1.45;
//         }

//         /* socials */
//         .cu-panel-bottom { position: relative; z-index: 1; }

//         .cu-socials-label {
//           font-size: 0.63rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.09em;
//           color: rgba(147,197,253,0.55);
//           margin-bottom: 10px;
//         }

//         .cu-socials {
//           display: flex;
//           gap: 10px;
//         }

//         .cu-social-btn {
//           display: flex; align-items: center; gap: 7px;
//           padding: 7px 14px;
//           border-radius: 50px;
//           font-size: 0.74rem;
//           font-weight: 600;
//           text-decoration: none;
//           transition: transform 0.18s, opacity 0.18s;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//         }
//         .cu-social-btn:hover { transform: translateY(-2px); opacity: 0.88; }
//         .cu-social-btn.wa { background: rgba(37,211,102,0.14); color: #4ade80; border: 1px solid rgba(37,211,102,0.25); }
//         .cu-social-btn.ig { background: rgba(228,64,95,0.14); color: #fb7185; border: 1px solid rgba(228,64,95,0.25); }

//         /* ══════════════════════════════════════
//            RIGHT FORM
//         ══════════════════════════════════════ */
//         .cu-form-wrap {
//           flex: 1;
//           background: #ffffff;
//           padding: 44px 44px 40px;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//         }

//         .cu-form-tag {
//           display: inline-flex;
//           align-items: center;
//           gap: 6px;
//           background: #eff6ff;
//           color: #0c248d;
//           font-size: 0.64rem;
//           font-weight: 700;
//           letter-spacing: 0.1em;
//           text-transform: uppercase;
//           padding: 4px 12px;
//           border-radius: 50px;
//           margin-bottom: 12px;
//           width: fit-content;
//           border: 1px solid #dbeafe;
//         }

//         .cu-form-title {
//           font-size: 1.6rem;
//           font-weight: 800;
//           color: #0a0f2e;
//           line-height: 1.2;
//           margin-bottom: 4px;
//         }

//         .cu-form-sub {
//           font-size: 0.77rem;
//           color: #94a3b8;
//           margin-bottom: 24px;
//           font-weight: 400;
//         }

//         /* 2-col grid for name + email */
//         .cu-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

//         .cu-field { margin-bottom: 14px; }
//         .cu-field:last-child { margin-bottom: 0; }

//         .cu-field label {
//           display: flex;
//           align-items: center;
//           gap: 6px;
//           font-size: 0.68rem;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.07em;
//           color: #64748b;
//           margin-bottom: 6px;
//         }
//         .cu-field label svg { opacity: 0.55; }

//         .cu-field input, .cu-field textarea {
//           width: 100%;
//           padding: 10px 14px;
//           background: #f8fafc;
//           border: 1.5px solid #e2e8f0;
//           border-radius: 11px;
//           font-size: 0.82rem;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           color: #0f172a;
//           outline: none;
//           transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
//           resize: none;
//           -webkit-appearance: none;
//         }
//         .cu-field input::placeholder, .cu-field textarea::placeholder { color: #c4cdd9; font-size: 0.8rem; }
//         .cu-field input:focus, .cu-field textarea:focus {
//           border-color: #0c248d;
//           background: #fff;
//           box-shadow: 0 0 0 3px rgba(12,36,141,0.09);
//         }

//         .cu-btn {
//           width: 100%;
//           padding: 13px 22px;
//           background: linear-gradient(135deg, #0c248d 0%, #1d4ed8 60%, #2563eb 100%);
//           color: #fff;
//           border: none;
//           border-radius: 50px;
//           font-family: 'Plus Jakarta Sans', sans-serif;
//           font-size: 0.86rem;
//           font-weight: 700;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           letter-spacing: 0.03em;
//           transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
//           box-shadow: 0 6px 22px rgba(12,36,141,0.38);
//           margin-top: 18px;
//         }
//         .cu-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(12,36,141,0.45); }
//         .cu-btn.success { background: linear-gradient(135deg, #059669, #10b981); box-shadow: 0 6px 22px rgba(16,185,129,0.35); }
//         .cu-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

//         /* ══════════════════════════════════════
//            TABLET  768px
//         ══════════════════════════════════════ */
//         @media (max-width: 768px) {
//           .cu-shell {
//             flex-direction: column;
//             border-radius: 26px;
//             max-width: 480px;
//             margin: 0 auto;
//           }

//           /* On mobile: panel becomes a branded header */
//           .cu-panel {
//             flex: none;
//             padding: 28px 22px 24px;
//             border-radius: 0;
//           }

//           .cu-panel-heading { font-size: 1.2rem; }
//           .cu-panel-desc { font-size: 0.73rem; }

//           /* Horizontal chips for contact info on mobile */
//           .cu-contact-list {
//             flex-direction: row;
//             flex-wrap: wrap;
//             gap: 8px;
//             margin-top: 18px;
//           }

//           .cu-contact-row {
//             background: rgba(255,255,255,0.08);
//             border: 1px solid rgba(255,255,255,0.12);
//             border-radius: 50px;
//             padding: 6px 12px 6px 8px;
//             gap: 7px;
//             align-items: center;
//           }

//           .cu-contact-icon {
//             width: 26px; height: 26px;
//             border-radius: 50%;
//             border: none;
//             background: rgba(255,255,255,0.13);
//             font-size: 0.7rem;
//           }

//           .cu-contact-label { display: none; }

//           .cu-contact-val {
//             font-size: 0.7rem;
//             color: rgba(255,255,255,0.9);
//           }

//           .cu-socials-label { margin-top: 14px; }
//           .cu-panel-bottom { margin-top: 4px; }

//           .cu-form-wrap {
//             padding: 28px 22px 28px;
//           }

//           .cu-form-title { font-size: 1.25rem; }
//           .cu-form-sub { font-size: 0.73rem; margin-bottom: 18px; }

//           .cu-row { grid-template-columns: 1fr; gap: 0; }
//         }

//         /* ══════════════════════════════════════
//            MOBILE  480px
//         ══════════════════════════════════════ */
//         @media (max-width: 480px) {
//           .cu-root { padding: 16px 12px; }

//           .cu-shell { border-radius: 20px; }

//           .cu-panel { padding: 22px 18px 20px; }
//           .cu-panel-eyebrow { font-size: 0.6rem; }
//           .cu-panel-heading { font-size: 1.08rem; }
//           .cu-panel-desc { font-size: 0.69rem; }

//           .cu-contact-list { gap: 6px; margin-top: 14px; }
//           .cu-contact-row { padding: 5px 10px 5px 6px; gap: 6px; }
//           .cu-contact-icon { width: 24px; height: 24px; font-size: 0.64rem; }
//           .cu-contact-val { font-size: 0.66rem; }

//           .cu-social-btn { font-size: 0.68rem; padding: 6px 11px; gap: 5px; }
//           .cu-socials-label { font-size: 0.58rem; }

//           .cu-form-wrap { padding: 24px 16px 24px; }

//           .cu-form-tag { font-size: 0.58rem; padding: 3px 10px; }
//           .cu-form-title { font-size: 1.08rem; margin-bottom: 3px; }
//           .cu-form-sub { font-size: 0.69rem; margin-bottom: 14px; }

//           .cu-field { margin-bottom: 11px; }
//           .cu-field label { font-size: 0.62rem; letter-spacing: 0.06em; margin-bottom: 5px; }
//           .cu-field input, .cu-field textarea {
//             padding: 9px 12px;
//             font-size: 0.78rem;
//             border-radius: 9px;
//           }
//           .cu-field input::placeholder, .cu-field textarea::placeholder { font-size: 0.75rem; }

//           .cu-btn {
//             padding: 11px 18px;
//             font-size: 0.8rem;
//             margin-top: 12px;
//           }
//         }

//         /* ══════════════════════════════════════
//            VERY SMALL  360px
//         ══════════════════════════════════════ */
//         @media (max-width: 360px) {
//           .cu-panel-heading { font-size: 0.98rem; }
//           .cu-contact-val { font-size: 0.62rem; }
//           .cu-form-title { font-size: 0.98rem; }
//           .cu-field input, .cu-field textarea { font-size: 0.74rem; }
//           .cu-btn { font-size: 0.76rem; }
//         }
//       `}</style>

//       <div className="cu-shell">

//         {/* ── LEFT / HEADER PANEL ── */}
//         <div className="cu-panel">
//           <div className="cu-panel-top">
//             <p className="cu-panel-eyebrow">Kerala IT Park Jobs</p>
//             <h1 className="cu-panel-heading">Let's Talk &amp;<br/>Get in Touch</h1>
//             <p className="cu-panel-desc">Reach out for job queries, partnerships or any support. We respond within 24 hours.</p>

//             <div className="cu-contact-list">
//               <div className="cu-contact-row">
//                 <div className="cu-contact-icon"><FaMapMarkerAlt /></div>
//                 <div>
//                   <p className="cu-contact-label">Location</p>
//                   <p className="cu-contact-val">Technopark · Infopark · Cyberpark, Kerala</p>
//                 </div>
//               </div>
//               <div className="cu-contact-row">
//                 <div className="cu-contact-icon"><FaEnvelope /></div>
//                 <div>
//                   <p className="cu-contact-label">Email</p>
//                   <p className="cu-contact-val">kerlaitparkjobs@gmail.com</p>
//                 </div>
//               </div>
//               <div className="cu-contact-row">
//                 <div className="cu-contact-icon"><FaPhoneAlt /></div>
//                 <div>
//                   <p className="cu-contact-label">Phone</p>
//                   <p className="cu-contact-val">+91 7560929242</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="cu-panel-bottom">
//             <p className="cu-socials-label">Follow Us</p>
//             <div className="cu-socials">
//               <a href="https://wa.me/+917560929242" target="_blank" rel="noreferrer" className="cu-social-btn wa">
//                 <FaWhatsapp /> WhatsApp
//               </a>
//               <a href="https://www.instagram.com/kerala_it_park_jobs_?igsh=MWZuajhleXRianJ2ZA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="cu-social-btn ig">
//                 <FaInstagram /> Instagram
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* ── RIGHT FORM ── */}
//         <div className="cu-form-wrap">
//           <span className="cu-form-tag">✦ Support &amp; Queries</span>
//           <h2 className="cu-form-title">Submit Your Query</h2>
//           <p className="cu-form-sub">Fill in the details below and we'll get back to you soon.</p>

//           <form onSubmit={handleSubmit}>
//             <div className="cu-row">
//               <div className="cu-field">
//                 <label><User size={12} /> Full Name</label>
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
//               </div>
//               <div className="cu-field">
//                 <label><FaEnvelope size={11} /> Email Address</label>
//                 <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
//               </div>
//             </div>

//             <div className="cu-field">
//               <label><FileText size={12} /> Subject</label>
//               <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help you?" required />
//             </div>

//             <div className="cu-field">
//               <label><MessageSquare size={12} /> Your Message</label>
//               <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Describe your query in detail..." required />
//             </div>

//             <button type="submit" className={`cu-btn ${submitted ? 'success' : ''}`} disabled={submitted}>
//               {submitted
//                 ? <><CheckCircle size={17} /> Sent Successfully!</>
//                 : <><Send size={15} /> Send Message</>
//               }
//             </button>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ContactUs;



import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { Send, CheckCircle, User, FileText, MessageSquare } from 'lucide-react';
import axios from "axios";
import { getUserId } from "../../../client/src/utils/auth.js";

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const userId = getUserId();
  const userRole = JSON.parse(localStorage.getItem("user") || "{}")?.role || "guest";

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) { 
      alert("User not authenticated"); 
      return; 
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/queries/user/${userId}`, { ...formData, role: userRole });
      setSubmitted(true);
      setTimeout(() => { 
        setSubmitted(false); 
        setFormData({ name: "", email: "", subject: "", message: "" }); 
      }, 3000);
    } catch (error) { 
      console.error("Query submit error:", error); 
    }
  };

  return (
    <div className="cu-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ─── PAGE SHELL ─── */
        .cu-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #060729 0%, #0c248d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 20px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* decorative blobs */
        .cu-root::before, .cu-root::after {
          content: '';
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
        }
        .cu-root::before {
          width: 500px; height: 500px;
          top: -180px; right: -160px;
          background: radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 68%);
        }
        .cu-root::after {
          width: 400px; height: 400px;
          bottom: -140px; left: -120px;
          background: radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 68%);
        }

        /* ─── OUTER CARD ─── */
        .cu-shell {
          width: 100%;
          max-width: 900px;
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.07);
          position: relative;
          z-index: 1;
          display: flex;
        }

        /* ══════════════════════════════════════
           LEFT PANEL  (desktop)
        ══════════════════════════════════════ */
        .cu-panel {
          flex: 0 0 38%;
          background: linear-gradient(170deg, #07093a 0%, #0d1fa8 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 44px 32px 36px;
          position: relative;
          overflow: hidden;
        }

        /* mesh circles behind left panel */
        .cu-panel::before {
          content: '';
          position: absolute;
          width: 280px; height: 280px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.07);
          top: -60px; right: -60px;
          pointer-events: none;
        }
        .cu-panel::after {
          content: '';
          position: absolute;
          width: 180px; height: 180px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.06);
          bottom: 30px; left: -50px;
          pointer-events: none;
        }

        .cu-panel-top { position: relative; z-index: 1; }

        .cu-panel-eyebrow {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(147,197,253,0.85);
          margin-bottom: 10px;
        }

        .cu-panel-heading {
          font-size: 1.55rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.25;
          margin-bottom: 10px;
        }

        .cu-panel-desc {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.52);
          line-height: 1.6;
          font-weight: 400;
        }

        /* contact info list */
        .cu-contact-list {
          position: relative;
          z-index: 1;
          margin-top: 36px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .cu-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 13px;
        }

        .cu-contact-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.13);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: #93c5fd;
          font-size: 0.82rem;
        }

        .cu-contact-label {
          font-size: 0.63rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: rgba(147,197,253,0.7);
          margin-bottom: 2px;
        }

        .cu-contact-val {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.85);
          font-weight: 500;
          line-height: 1.45;
          word-break: break-all;
        }

        /* socials */
        .cu-panel-bottom { position: relative; z-index: 1; }

        .cu-socials-label {
          font-size: 0.63rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: rgba(147,197,253,0.55);
          margin-bottom: 10px;
        }

        .cu-socials {
          display: flex;
          gap: 10px;
        }

        .cu-social-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 14px;
          border-radius: 50px;
          font-size: 0.74rem;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.18s, opacity 0.18s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .cu-social-btn:hover { transform: translateY(-2px); opacity: 0.88; }
        .cu-social-btn.wa { background: rgba(37,211,102,0.14); color: #4ade80; border: 1px solid rgba(37,211,102,0.25); }
        .cu-social-btn.ig { background: rgba(228,64,95,0.14); color: #fb7185; border: 1px solid rgba(228,64,95,0.25); }

        /* ══════════════════════════════════════
           RIGHT FORM
        ══════════════════════════════════════ */
        .cu-form-wrap {
          flex: 1;
          background: #ffffff;
          padding: 44px 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .cu-form-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #eff6ff;
          color: #0c248d;
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 50px;
          margin-bottom: 12px;
          width: fit-content;
          border: 1px solid #dbeafe;
        }

        .cu-form-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0a0f2e;
          line-height: 1.2;
          margin-bottom: 4px;
        }

        .cu-form-sub {
          font-size: 0.77rem;
          color: #94a3b8;
          margin-bottom: 24px;
          font-weight: 400;
        }

        /* 2-col grid for name + email */
        .cu-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

        .cu-field { margin-bottom: 14px; }
        .cu-field:last-child { margin-bottom: 0; }

        .cu-field label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: #64748b;
          margin-bottom: 6px;
        }
        .cu-field label svg { opacity: 0.55; }

        .cu-field input, .cu-field textarea {
          width: 100%;
          padding: 10px 14px;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 11px;
          font-size: 0.82rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #0f172a;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          resize: none;
          -webkit-appearance: none;
        }
        .cu-field input::placeholder, .cu-field textarea::placeholder { color: #c4cdd9; font-size: 0.8rem; }
        .cu-field input:focus, .cu-field textarea:focus {
          border-color: #0c248d;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(12,36,141,0.09);
        }

        .cu-btn {
          width: 100%;
          padding: 13px 22px;
          background: linear-gradient(135deg, #0c248d 0%, #1d4ed8 60%, #2563eb 100%);
          color: #fff;
          border: none;
          border-radius: 50px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.86rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.03em;
          transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
          box-shadow: 0 6px 22px rgba(12,36,141,0.38);
          margin-top: 18px;
        }
        .cu-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(12,36,141,0.45); }
        .cu-btn.success { background: linear-gradient(135deg, #059669, #10b981); box-shadow: 0 6px 22px rgba(16,185,129,0.35); }
        .cu-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

        /* ══════════════════════════════════════
           TABLET & MOBILE BREAKPOINTS (UPDATED)
        ══════════════════════════════════════ */
        @media (max-width: 768px) {
          .cu-root {
            padding: 24px 16px;
          }

          .cu-shell {
            flex-direction: column;
            border-radius: 24px;
            max-width: 520px;
            margin: 0 auto;
          }

          /* Left panel now serves as standard vertical stacking header */
          .cu-panel {
            flex: none;
            padding: 32px 24px 28px;
            border-radius: 0;
          }

          .cu-panel-heading { font-size: 1.35rem; }
          .cu-panel-desc { font-size: 0.76rem; }

          /* Fixed overflowing list row with automatic clean stacking wrapping */
          .cu-contact-list {
            flex-direction: column;
            gap: 12px;
            margin-top: 22px;
          }

          .cu-contact-row {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 14px;
            padding: 10px 14px;
            gap: 12px;
            align-items: center;
            width: 100%;
          }

          .cu-contact-icon {
            width: 30px; height: 30px;
            border-radius: 8px;
            background: rgba(255,255,255,0.1);
            font-size: 0.75rem;
          }

          .cu-contact-label { 
            display: block;
            font-size: 0.58rem;
            margin-bottom: 1px;
          }

          .cu-contact-val {
            font-size: 0.76rem;
            color: rgba(255,255,255,0.95);
            word-break: break-word;
          }

          .cu-panel-bottom { 
            margin-top: 24px; 
          }
          
          .cu-socials-label { 
            margin-bottom: 8px; 
          }

          .cu-socials {
            flex-wrap: wrap;
            gap: 8px;
          }

          .cu-social-btn {
            flex: 1;
            min-width: 120px;
            justify-content: center;
          }

          /* Form updates */
          .cu-form-wrap {
            padding: 32px 24px;
          }

          .cu-form-title { font-size: 1.35rem; }
          .cu-form-sub { font-size: 0.76rem; margin-bottom: 20px; }
          .cu-row { grid-template-columns: 1fr; gap: 0; }
        }

        @media (max-width: 480px) {
          .cu-root { padding: 16px 12px; }
          .cu-shell { border-radius: 20px; }
          .cu-panel { padding: 24px 18px 22px; }
          
          .cu-panel-eyebrow { font-size: 0.6rem; }
          .cu-panel-heading { font-size: 1.2rem; }
          .cu-panel-desc { font-size: 0.72rem; }

          .cu-contact-list { gap: 10px; margin-top: 18px; }
          .cu-contact-row { padding: 8px 12px; gap: 10px; border-radius: 12px; }
          .cu-contact-icon { width: 28px; height: 28px; font-size: 0.7rem; }
          .cu-contact-val { font-size: 0.72rem; }

          .cu-socials-label { font-size: 0.58rem; }
          .cu-social-btn { font-size: 0.7rem; padding: 8px 12px; flex: 1 1 calc(50% - 4px); }

          .cu-form-wrap { padding: 24px 18px; }
          .cu-form-tag { font-size: 0.58rem; padding: 3px 10px; margin-bottom: 10px; }
          .cu-form-title { font-size: 1.2rem; }
          .cu-form-sub { font-size: 0.72rem; margin-bottom: 16px; }

          .cu-field { margin-bottom: 12px; }
          .cu-field label { font-size: 0.64rem; margin-bottom: 4px; }
          .cu-field input, .cu-field textarea {
            padding: 9px 12px;
            font-size: 0.78rem;
            border-radius: 9px;
          }

          .cu-btn {
            padding: 12px 20px;
            font-size: 0.82rem;
            margin-top: 14px;
          }
        }

        /* Small screen adjustments for seamless fit */
        @media (max-width: 360px) {
          .cu-panel-heading { font-size: 1.1rem; }
          .cu-contact-val { font-size: 0.68rem; }
          .cu-social-btn { min-width: 100%; }
          .cu-form-title { font-size: 1.1rem; }
        }
      `}</style>

      <div className="cu-shell">

        {/* ── LEFT / HEADER PANEL ── */}
        <div className="cu-panel">
          <div className="cu-panel-top">
            <p className="cu-panel-eyebrow">Kerala IT Park Jobs</p>
            <h1 className="cu-panel-heading">Let's Talk &amp;<br/>Get in Touch</h1>
            <p className="cu-panel-desc">Reach out for job queries, partnerships or any support. We respond within 24 hours.</p>

            <div className="cu-contact-list">
              <div className="cu-contact-row">
                <div className="cu-contact-icon"><FaMapMarkerAlt /></div>
                <div>
                  <p className="cu-contact-label">Location</p>
                  <p className="cu-contact-val">Technopark · Infopark · Cyberpark, Kerala</p>
                </div>
              </div>
              <div className="cu-contact-row">
                <div className="cu-contact-icon"><FaEnvelope /></div>
                <div>
                  <p className="cu-contact-label">Email</p>
                  <p className="cu-contact-val">kerlaitparkjobs@gmail.com</p>
                </div>
              </div>
              <div className="cu-contact-row">
                <div className="cu-contact-icon"><FaPhoneAlt /></div>
                <div>
                  <p className="cu-contact-label">Phone</p>
                  <p className="cu-contact-val">+91 7560929242</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cu-panel-bottom">
            <p className="cu-socials-label">Follow Us</p>
            <div className="cu-socials">
              <a href="https://wa.me/+917560929242" target="_blank" rel="noreferrer" className="cu-social-btn wa">
                <FaWhatsapp /> WhatsApp
              </a>
              <a href="https://www.instagram.com/kerala_it_park_jobs_?igsh=MWZuajhleXRianJ2ZA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" className="cu-social-btn ig">
                <FaInstagram /> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* ── RIGHT FORM ── */}
        <div className="cu-form-wrap">
          <span className="cu-form-tag">✦ Support &amp; Queries</span>
          <h2 className="cu-form-title">Submit Your Query</h2>
          <p className="cu-form-sub">Fill in the details below and we'll get back to you soon.</p>

          <form onSubmit={handleSubmit}>
            <div className="cu-row">
              <div className="cu-field">
                <label><User size={12} /> Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
              </div>
              <div className="cu-field">
                <label><FaEnvelope size={11} /> Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
            </div>

            <div className="cu-field">
              <label><FileText size={12} /> Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help you?" required />
            </div>

            <div className="cu-field">
              <label><MessageSquare size={12} /> Your Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Describe your query in detail..." required />
            </div>

            <button type="submit" className={`cu-btn ${submitted ? 'success' : ''}`} disabled={submitted}>
              {submitted
                ? <><CheckCircle size={17} /> Sent Successfully!</>
                : <><Send size={15} /> Send Message</>
              }
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;