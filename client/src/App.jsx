import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './App.css'
import imashaPhoto from './assets/Imasha.jpeg'
import inoshPhoto from './assets/Inosh.jpeg'
import tharushiPhoto from './assets/Tharushi.png'
import dahamPhoto from './assets/Daham.jpeg'
import udithaPhoto from './assets/uditha.jpeg'
import dinithiPhoto from './assets/dinithi.png'
import roshanPhoto from './assets/roshan.png'
import logoPhoto from './assets/logo.jpeg'

// Documents from client assets folder
const DOCUMENTS_DATA = [
  {
    _id: 'leaflet-design',
    title: 'Leaflet Design',
    originalName: 'Leaflet Design - Cocosmart.pdf',
    size: 0,
    url: '/CocoSmart/assets/Documents/Leaflet Design - Cocosmart.pdf',
  },
  {
    _id: 'taf-252602-space',
    title: 'TAF 25-26J-202',
    originalName: 'TAF_25-26J-202 .pdf',
    size: 0,
    url: '/CocoSmart/assets/Documents/TAF_25-26J-202 .pdf',
  },
  {
    _id: 'smart-agriculture',
    title: 'Smart Agriculture Platform',
    originalName: 'SMART AGRICULTURE PLATFORM FOR COCONUT PLANTATIONS IN SRI LANKA.pdf',
    size: 0,
    url: '/CocoSmart/assets/Documents/SMART AGRICULTURE PLATFORM FOR COCONUT PLANTATIONS IN SRI LANKA.pdf',
  },
  {
    _id: 'progress-1',
    title: 'Progress Presentation 1',
    originalName: 'Progress Presentation 1.pdf',
    size: 0,
    url: '/CocoSmart/assets/Documents/Progress Presentation 1.pdf',
  },
  {
    _id: 'progress-2',
    title: 'Progress Presentation 2',
    originalName: 'Progress Presentation 2.pdf',
    size: 0,
    url: '/CocoSmart/assets/Documents/Progress Presentation 2.pdf',
  },
  {
    _id: 'project-proposal',
    title: 'Project Proposal',
    originalName: 'Project proposal.zip',
    size: 0,
    url: '/CocoSmart/assets/Documents/Project proposal.zip',
  },
  {
    _id: 'readme',
    title: 'README',
    originalName: 'README_document.md',
    size: 0,
    url: '/CocoSmart/assets/Documents/README_document.md',
  },
]

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState('')

  const [documents, setDocuments] = useState([])
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const apiBaseUrl = useMemo(
    () => import.meta.env.VITE_API_URL || '/api',
    [],
  )

  useEffect(() => {
    // Load documents from client assets
    setDocuments(DOCUMENTS_DATA)
  }, [])

  const sections = [
    { id: 'scope', title: 'Scope' },
    { id: 'literature', title: 'Survey' },
    { id: 'gap', title: 'Gap' },
    { id: 'problem', title: 'Solution' },
    { id: 'objectives', title: 'Objectives' },
    { id: 'methodology', title: 'Methodology' },
    { id: 'tech', title: 'Tech Stack' },
    { id: 'timeline', title: 'Timeline' },
    { id: 'team', title: 'Team' },
    // { id: 'achievements', title: 'Achievements' },
    { id: 'documents', title: 'Documents' },
    { id: 'contact', title: 'Contact' },
  ]

  const highlights = [
    {
      value: '4',
      label: 'Core Research Objectives',
      detail: 'Irrigation, yield prediction, disease detection, and plantation health scoring.',
    },
    {
      value: 'IoT',
      label: 'Real-Time Farm Data',
      detail: 'Soil, weather, and farm data collected for crop advisory and yield prediction.',
    },
    {
      value: 'AI',
      label: 'Smart Farmer Decisions',
      detail: 'Machine learning-based recommendations, alerts, and plantation insights.',
    },
  ]

  const objectiveCards = [
    {
      title: 'Optimize Irrigation',
      description:
        'Provide intelligent irrigation recommendations based on environmental conditions to reduce water wastage and improve crop growth.',
    },
    {
      title: 'Enhance Yield Prediction',
      description:
        'Use machine learning models combined with real-time IoT data (soil, temperature, humidity) to accurately predict coconut yield and provide crop advisory support.',
    },
    {
      title: 'Detect Diseases Early',
      description:
        'Identify coconut plant diseases using image-based deep learning models and notify farmers in real time for early intervention.',
    },
    {
      title: 'Evaluate Plantation Health',
      description:
        'Generate a comprehensive plantation health score by combining environmental, crop, and disease data for better decision-making.',
    },
  ]

  const team = [
    {
      name: 'Mr. Uditha Dharmakeerthi',
      role: 'Supervisor',
      org: 'Sri Lanka Institute of Information Technology',
      photo: udithaPhoto,
      photoPosition: 'center 16%',
    },
    {
      name: 'Ms. Dinithi Pandithage',
      role: 'Co-Supervisor',
      org: 'Sri Lanka Institute of Information Technology',
      photo: dinithiPhoto,
      photoPosition: 'center 16%',
    },
    {
      name: 'Dr. Roshan De Silva',
      role: 'External Supervisor',
      org: 'Coconut Research Institute of Sri Lanka',
      photo: roshanPhoto,
      photoPosition: 'center 16%',
    },
    {
      name: ' W.K.K.I Prasangi',
      role: 'Group Leader',
      org: 'Undergraduate Researcher',
      photo: imashaPhoto,
    },
    {
      name: 'W.P.I Niwantha',
      role: 'Team Member',
      org: 'Undergraduate Researcher',
      photo: inoshPhoto,
      photoPosition: 'center 18%',
    },
    {
      name: 'W.T.T.S Fernando',
      role: 'Team Member',
      org: 'Undergraduate Researcher',
      photo: tharushiPhoto,
      photoPosition: 'center 18%',
    },
    {
      name: 'T.W.K.S.D Sankalpa',
      role: 'Team Member',
      org: 'Undergraduate Researcher',
      photo: dahamPhoto,
      photoPosition: 'center 18%',
    },
  ]

  const supervisors = team.filter((member) => member.role.toLowerCase().includes('supervisor'))
  const studentMembers = team.filter((member) => !member.role.toLowerCase().includes('supervisor'))

  const getFallbackAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=dce9b2&color=1d2d1f&size=256&bold=true`

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setFeedback('')

    try {
      const response = await axios.post(`${apiBaseUrl}/contact`, formData)
      setFeedback(response.data.message || 'Message submitted successfully.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit message.'
      setFeedback(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <nav className={`sticky-nav${scrolled ? ' sticky-nav--visible' : ''}`} aria-label="Sticky">
        <div className="brand sticky-brand">
          <img src={logoPhoto} alt="CocoSmart logo" className="brand-logo" loading="lazy" />
          <span>CocoSmart Research</span>
        </div>
        <div className="nav-links sticky-nav-links">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>{section.title}</a>
          ))}
        </div>
      </nav>

      <header className="hero" id="home">
        <div className="hero-inner">
          <nav className="top-nav" aria-label="Main">
            <div className="brand">
              <img src={logoPhoto} alt="CocoSmart logo" className="brand-logo" loading="lazy" />
              <span>CocoSmart Research</span>
            </div>
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
            <div className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} onClick={() => setMenuOpen(false)}>
                  {section.title}
                </a>
              ))}
            </div>
          </nav>

          <div className="hero-content">
            <p className="eyebrow">SMART AGRICULTURE ADVISORY PLATFORM FOR COCONUT PLANTATIONS</p>
            <h1>AI and IoT-powered advisory system for smarter coconut farming</h1>
            <p>
              A research-driven platform for irrigation recommendation, crop advisory, yield prediction, disease detection, farmer notifications, and plantation health scoring.
            </p>
            <div className="hero-actions">
              <a className="cta primary" href="#problem">
                Explore Solution
              </a>
              <a className="cta secondary" href="#contact">
                Contact Research Team
              </a>
            </div>

            <div className="highlights" aria-label="Project highlights">
              {highlights.map((item) => (
                <article key={item.label}>
                  <p className="highlight-value">{item.value}</p>
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="page-shell">
      <main>
        <section id="scope" className="content-section scope-section">
          <div className="scope-text">
            <h2>Project Scope</h2>
            <p className="section-kicker">What this project is designed to solve</p>
            <p className="scope-lead">
              This research focuses on improving coconut plantation productivity by providing intelligent decision support for farmers.
            </p>
            <div className="scope-pills">
              {['Irrigation Optimization', 'Yield Prediction', 'Disease Detection', 'Plantation Health Scoring', 'Farmer Notifications', 'IoT Integration'].map((tag) => (
                <span key={tag} className="scope-pill">{tag}</span>
              ))}
            </div>
            <p className="scope-body">
              The system addresses key agricultural challenges such as inefficient irrigation, lack of accurate yield prediction, delayed disease detection, and absence of a unified monitoring system. It enables better communication between farmers, researchers, and agricultural authorities through a centralized smart platform.
            </p>
          </div>
          <div className="scope-image">
            <img
              src="https://samitha-vidhanaarachchi.github.io/Research-Website/Images/other/skeleton.png"
              alt="Project overview"
            />
          </div>
        </section>

        <section id="literature" className="content-section">
          <h2>Literature Survey</h2>
          <p className="section-kicker">What current studies already demonstrate</p>
          <div className="literature-layout">
            <div className="literature-stat-col">
              {[
                { value: '#1',  label: 'Coconut producer in South Asia',        sub: 'Sri Lanka' },
                { value: 'CNN', label: 'Most effective for disease detection',  sub: 'Deep Learning' },
                { value: 'ML',  label: 'Improves yield prediction accuracy',    sub: 'Machine Learning' },
              ].map((s) => (
                <div key={s.label} className="lit-stat">
                  <span className="lit-stat-value">{s.value}</span>
                  <div>
                    <p className="lit-stat-label">{s.label}</p>
                    <p className="lit-stat-sub">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="literature-text">
              <p>
                Sri Lanka is one of the leading coconut producers, yet environmental changes, resource mismanagement, and disease spread continue to impact production. Existing studies show that machine learning models can improve yield prediction accuracy, while deep learning models such as CNNs are effective for plant disease detection.
              </p>
              <p className="lit-finding">
                However, most research focuses on individual solutions rather than integrated systems — limiting practical usability for farmers in the field.
              </p>
            </div>
          </div>
        </section>

        <section id="gap" className="content-section">
          <h2>Research Gap</h2>
          <p className="section-kicker">What existing systems still miss</p>
          <div className="gap-grid">
            {[
              { icon: '🧩', title: 'Integration of Multiple Functions', desc: 'Most existing systems focus on a single feature such as disease detection or yield prediction, without providing a complete decision-support system for farmers.' },
              { icon: '⚡', title: 'Limited Real-Time Data Usage',       desc: 'Many solutions rely on historical datasets and do not incorporate real-time field data, reducing accuracy and adaptability.' },
              { icon: '👤', title: 'Lack of Farmer Interaction',         desc: 'Existing systems provide limited support for farmers to input and update farm-level data such as soil and environmental conditions.' },
            ].map((item) => (
              <article key={item.title} className="gap-card">
                <div className="gap-icon">{item.icon}</div>
                <div className="gap-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="problem" className="content-section problem-section">
          <div className="problem-question">
            <span className="problem-label">Research Problem</span>
            <h2>How can we provide intelligent, real-time advisory support for coconut farmers using AI and IoT?</h2>
          </div>
          <div className="problem-solution">
            <div className="solution-header">
              <span className="solution-badge">Our Solution</span>
            </div>
            <div className="solution-cards">
              {[
                { icon: '💦', title: 'Irrigation Engine',       desc: 'Smart recommendations based on real-time soil and weather data.' },
                { icon: '📈', title: 'Yield Prediction',        desc: 'ML models combined with IoT data for accurate crop advisory.' },
                { icon: '🦠', title: 'Disease Detection',       desc: 'CNN-based leaf image analysis with instant farmer alerts.' },
                { icon: '🌱', title: 'Health Scoring',          desc: 'Unified plantation health score from all data sources.' },
              ].map((s) => (
                <div key={s.title} className="solution-card">
                  <span className="solution-icon">{s.icon}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="objectives" className="content-section">
          <h2>Research Objectives</h2>
          <p className="section-kicker">The four outcomes this research targets</p>
          <div className="objectives-grid">
            {[
              { num: '01', icon: '💧', title: 'Optimize Irrigation',          desc: 'Provide intelligent irrigation recommendations based on environmental conditions to reduce water wastage and improve crop growth.' },
              { num: '02', icon: '📊', title: 'Enhance Yield Prediction',      desc: 'Use machine learning models combined with real-time IoT data (soil, temperature, humidity) to accurately predict coconut yield and provide crop advisory support.' },
              { num: '03', icon: '🔬', title: 'Detect Diseases Early',         desc: 'Identify coconut plant diseases using image-based deep learning models and notify farmers in real time for early intervention.' },
              { num: '04', icon: '🌿', title: 'Evaluate Plantation Health',    desc: 'Generate a comprehensive plantation health score by combining environmental, crop, and disease data for better decision-making.' },
            ].map((item) => (
              <article key={item.num} className="objective-card">
                <div className="objective-header">
                  <span className="objective-num">{item.num}</span>
                  <span className="objective-icon">{item.icon}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="methodology" className="content-section">
          <h2>Methodology</h2>
          <p className="section-kicker">How the end-to-end system operates</p>

          <div className="methodology-layout">
            <div className="methodology-steps">
              {[
                { step: '01', icon: '📡', title: 'Data Collection',       desc: 'Farmers input farm data manually. Environmental data is sourced externally. An IoT device collects real-time soil moisture, temperature, and humidity from the field.' },
                { step: '02', icon: '⚙️', title: 'Data Processing',       desc: 'Collected data is cleaned, normalized, and fed into machine learning and deep learning pipelines for prediction and analysis.' },
                { step: '03', icon: '🤖', title: 'Intelligent Engines',   desc: 'The Irrigation Engine provides watering schedules. The Yield Prediction Engine forecasts crop output. The Disease Detection module analyses leaf images via CNN models.' },
                { step: '04', icon: '📲', title: 'Output & Alerts',       desc: 'Actionable recommendations, alerts, and a unified Plantation Health Score are delivered to farmers through the web and mobile platform.' },
              ].map((item, i) => (
                <div key={item.step} className="method-step">
                  <div className="method-step-left">
                    <div className="method-dot">
                      <span>{item.icon}</span>
                    </div>
                    {i < 3 && <div className="method-connector" />}
                  </div>
                  <div className="method-step-body">
                    <span className="method-step-num">{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="methodology-image">
              <img
                src="https://samitha-vidhanaarachchi.github.io/Research-Website/Images/other/architecture.jpg"
                alt="System architecture"
              />
              <p className="methodology-img-caption">System Architecture Diagram</p>
            </div>
          </div>
        </section>

        <section id="tech" className="content-section">
          <h2>Technologies Used</h2>
          <p className="section-kicker">Tools powering model training and deployment</p>
          <div className="tech-grid">
            {[
              { name: 'Flutter', category: 'Mobile App', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
              { name: 'Firebase (Firestore and Realtime)', category: 'Cloud Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
              { name: 'Google Cloud Services', category: 'Cloud Platform', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
              { name: 'Keras', category: 'AI / ML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg' },
              { name: 'Arduino', category: 'IoT Hardware', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/arduino/arduino-original.svg' },
              { name: 'Python', category: 'Programming Language', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
            ].map((tech) => (
              <article key={tech.name} className="tech-card">
                <div className={`tech-logo-wrap${tech.dark ? ' tech-logo-dark' : ''}`}>
                  <img src={tech.logo} alt={tech.name} loading="lazy" />
                </div>
                <p className="tech-name">{tech.name}</p>
                <span className="tech-category">{tech.category}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="timeline" className="content-section">
          <h2>Timeline in Brief</h2>
          <p className="section-kicker">Research milestones from proposal to final presentation</p>
          <div className="timeline-wrapper">
            <div className="timeline-track" />
            <ol className="timeline">
              {[
                { date: '28 Aug 2025',  step: '01', label: 'Project Proposal' },
                { date: '05 Jan 2026',  step: '02', label: 'Progress Presentation I' },
                { date: '09 Mar 2026',  step: '03', label: 'Research Paper' },
                { date: '09 Mar 2026',  step: '04', label: 'Progress Presentation II' },
                { date: '04 May 2026',  step: '05', label: 'Final Presentation & Viva' },
              ].map((item, i) => (
                <li key={item.step} className="timeline-item">
                  <div className="timeline-left">
                    {i % 2 === 0 && (
                      <div className="timeline-card">
                        <span className="timeline-date">{item.date}</span>
                        <p>{item.label}</p>
                      </div>
                    )}
                  </div>
                  <div className="timeline-dot"><span>{item.step}</span></div>
                  <div className="timeline-right">
                    {i % 2 !== 0 && (
                      <div className="timeline-card">
                        <span className="timeline-date">{item.date}</span>
                        <p>{item.label}</p>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="team" className="content-section">
          <h2>Meet Our Team</h2>
          <p className="section-kicker">Academic and research collaboration</p>

          <div className="team-supervisors">
            {supervisors.map((member) => (
              <article key={member.name} className="supervisor-card">
                <div className="supervisor-photo-wrap">
                  <img
                    src={member.photo}
                    alt={`${member.name} profile`}
                    loading="lazy"
                    style={{ objectPosition: member.photoPosition || 'center 16%' }}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getFallbackAvatar(member.name) }}
                  />
                </div>
                <div className="supervisor-info">
                  <span className="role-badge">{member.role}</span>
                  <h3>{member.name}</h3>
                  <p className="muted">{member.org}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="team-divider">
            <span>Undergraduate Researchers</span>
          </div>

          <div className="team-students">
            {studentMembers.map((member) => (
              <article key={member.name} className="student-card">
                <div className="student-photo-wrap">
                  <img
                    src={member.photo}
                    alt={`${member.name} profile`}
                    loading="lazy"
                    style={{ objectPosition: member.photoPosition || 'center' }}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = getFallbackAvatar(member.name) }}
                  />
                </div>
                <h3>{member.name}</h3>
                <p className="muted">{member.org}</p>
              </article>
            ))}
          </div>
        </section>

        {/* <section id="achievements" className="content-section">
          <h2>Achievements</h2>
          <p className="section-kicker">Recognition for impact and innovation</p>
          <div className="achievements-grid">
            {[
              {
                icon: '🏆',
                title: 'National ICT Finalist',
                desc: 'Recognized among finalists at major national ICT competitions for innovation in smart agriculture.',
              },
              {
                icon: '🌐',
                title: 'International Nomination',
                desc: 'Nominated for international representation showcasing the platform on a global research stage.',
              },
              {
                icon: '📄',
                title: 'Research Publication',
                desc: 'Research findings documented and presented at academic forums within Sri Lanka.',
              },
            ].map((item) => (
              <article key={item.title} className="achievement-card">
                <div className="achievement-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section> */}

        <section id="documents" className="content-section">
          <h2>Research Documents</h2>
          <p className="section-kicker">Download project reports, papers and presentations</p>

          {documents.length === 0 ? (
            <div className="docs-empty">
              <span className="docs-empty-icon">📂</span>
              <p>No documents uploaded yet.</p>
            </div>
          ) : (
            <div className="tech-grid">
              {documents.map((doc) => {
                const ext = doc.originalName.split('.').pop().toUpperCase()
                return (
                  <article key={doc._id} className="tech-card">
                    <div className="doc-icon-wrap">
                      <span className="doc-ext">{ext}</span>
                    </div>
                    <p className="tech-name">{doc.title}</p>
                    <span className="tech-category">{doc.originalName}</span>
                    <a
                      className="download-btn"
                      href={doc.url}
                      download={doc.originalName}
                    >
                      ↓ Download
                    </a>
                  </article>
                )
              })}
            </div>
          )}
        </section>

        <section id="contact" className="content-section">
          <h2>Get in Touch</h2>
          <p className="section-kicker">We'd love to hear from you</p>
          <div className="contact-layout">
            <div className="contact-info">
              <div className="contact-info-inner">
                <p className="contact-info-heading">Reach out to the research team</p>
                <p className="contact-info-sub">Have a question, collaboration idea, or feedback? Send us a message and we'll get back to you.</p>
                <div className="contact-detail">
                  <span className="contact-icon">✉</span>
                  <span>researchcoco@gmail.com</span>
                </div>
                <div className="contact-detail">
                  <span className="contact-icon">🏛</span>
                  <span>Sri Lanka Institute of Information Technology</span>
                </div>
              </div>
            </div>
            <div className="contact-form-wrap">
              <form onSubmit={handleFormSubmit} className="contact-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleFormChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your message or query"
                  rows="5"
                  value={formData.message}
                  onChange={handleFormChange}
                  required
                />
                <button type="submit" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
              {feedback && <p className="feedback">{feedback}</p>}
            </div>
          </div>
        </section>
      </main>
      </div>

      <footer>
        <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img src={logoPhoto} alt="CocoSmart logo" className="footer-brand-logo" loading="lazy" />
              <p className="footer-logo">CocoSmart</p>
            </div>
            <p className="footer-tagline">AI and IoT-powered advisory system for smarter coconut farming in Sri Lanka.</p>
            <p className="footer-email">✉ researchcoco@gmail.com</p>
          </div>
          <div className="footer-nav">
            <h4>Quick Links</h4>
            <div className="footer-nav-cols">
              <ul>
                {sections.slice(0, 6).map((s) => (
                  <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                ))}
              </ul>
              <ul>
                {sections.slice(6).map((s) => (
                  <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="footer-info">
            <h4>Research Team</h4>
            <p>Team CocoRemedy</p>
            <p>Coconut Pest & Disease Surveillance System</p>
            <p>Sri Lanka Institute of Information Technology</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Team CocoRemedy. All rights reserved.</p>
          <a href="#home" className="footer-top-btn">↑ Back to top</a>
        </div>
        </div>
      </footer>
    </>
  )
}

export default App
