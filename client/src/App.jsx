import { useMemo, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState('')

  const apiBaseUrl = useMemo(
    () => import.meta.env.VITE_API_URL || '/api',
    [],
  )

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
    { id: 'achievements', title: 'Achievements' },
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
      name: 'Dr. Janaka Wijekoon',
      role: 'Supervisor',
      org: 'Sri Lanka Institute of Information Technology',
      photo: '/team/dr-janaka-wijekoon.jpg',
    },
    {
      name: 'Ms. Dilani Lunugalage',
      role: 'Co-Supervisor',
      org: 'Sri Lanka Institute of Information Technology',
      photo: '/team/ms-dilani-lunugalage.jpg',
    },
    {
      name: 'Dr. Nayanie S Aratchige',
      role: 'External Supervisor',
      org: 'Coconut Research Institute of Sri Lanka',
      photo: '/team/dr-nayanie-aratchige.jpg',
    },
    {
      name: 'Team Member 01',
      role: 'Researcher',
      org: 'Undergraduate Researcher',
      photo: '/team/member-01.jpg',
    },
    {
      name: 'Team Member 02',
      role: 'Researcher',
      org: 'Undergraduate Researcher',
      photo: '/team/member-02.jpg',
    },
    {
      name: 'Team Member 03',
      role: 'Researcher',
      org: 'Undergraduate Researcher',
      photo: '/team/member-03.jpg',
    },
    {
      name: 'Team Member 04',
      role: 'Researcher',
      org: 'Undergraduate Researcher',
      photo: '/team/member-04.jpg',
    },
  ]

  const supervisors = team.filter((member) => member.role.toLowerCase().includes('supervisor'))
  const studentMembers = team.filter((member) => member.role === 'Researcher')

  const getFallbackAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=dce9b2&color=1d2d1f&size=256&bold=true`

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
    <div className="page-shell">
      <header className="hero" id="home">
        <nav className="top-nav" aria-label="Main">
          <p className="brand">CocoSmart Research</p>
          <div className="nav-links">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
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
      </header>

      <main>
        <section id="scope" className="content-section two-col">
          <div>
            <h2>Project Scope</h2>
            <p className="section-kicker">What this project is designed to solve</p>
            <p>
              This research focuses on improving coconut plantation productivity by providing intelligent decision support for farmers. The system addresses key agricultural challenges such as inefficient irrigation, lack of accurate yield prediction, delayed disease detection, and absence of a unified monitoring system. It enables better communication between farmers, researchers, and agricultural authorities through a centralized smart platform.
            </p>
          </div>
          <div>
            <img
              src="https://samitha-vidhanaarachchi.github.io/Research-Website/Images/other/skeleton.png"
              alt="Project overview"
            />
          </div>
        </section>

        <section id="literature" className="content-section">
          <h2>Literature Survey</h2>
          <p className="section-kicker">What current studies already demonstrate</p>
          <p>
            Sri Lanka is one of the leading coconut producers, yet environmental changes, resource mismanagement, and disease spread continue to impact production. Existing studies show that machine learning models can improve yield prediction accuracy, while deep learning models such as CNNs are effective for plant disease detection. However, most research focuses on individual solutions rather than integrated systems, limiting practical usability.
          </p>
        </section>

        <section id="gap" className="content-section">
          <h2>Research Gap</h2>
          <p className="section-kicker">What existing systems still miss</p>
          <div className="grid-3">
            <article>
              <h3>Integration of Multiple Functions</h3>
              <p>
                Most existing systems focus on a single feature such as disease detection or yield prediction, without providing a complete decision-support system for farmers.
              </p>
            </article>
            <article>
              <h3>Limited Real-Time Data Usage</h3>
              <p>
                Many solutions rely on historical datasets and do not incorporate real-time field data, reducing accuracy and adaptability.
              </p>
            </article>
            <article>
              <h3>Lack of Farmer Interaction</h3>
              <p>
                Existing systems provide limited support for farmers to input and update farm-level data such as soil and environmental conditions.
              </p>
            </article>
          </div>
        </section>

        <section id="problem" className="content-section highlight">
          <h2>Research Problem & Solution</h2>
          <p className="question">
            How can we provide intelligent, real-time advisory support for coconut farmers using AI and IoT?
          </p>
          <p>
            The proposed system integrates a web and mobile-based platform with machine learning models and an IoT-based data collection device. It provides irrigation recommendations, crop advisory and yield prediction, disease detection with notifications, and plantation health scoring.
</p>
          <p>The IoT device enables real-time collection of soil moisture, temperature, and humidity data, which improves prediction accuracy in the Crop Advisory and Yield Prediction Engine. The system delivers actionable insights, alerts, and recommendations to farmers, supporting efficient and data-driven decision-making.
          </p>
        </section>

        <section id="objectives" className="content-section">
          <h2>Research Objectives</h2>
          <p className="section-kicker">The four outcomes this research targets</p>
          <div className="grid-2">
            {objectiveCards.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="methodology" className="content-section two-col">
          <div>
            <h2>Methodology</h2>
            <p className="section-kicker">How the end-to-end system operates</p>
            <p>
              The proposed system follows an integrated architecture consisting of data collection, processing, and intelligent decision-making modules. Farmers can input farm data manually, while environmental data is collected from external sources. In addition, an IoT-based device collects real-time soil and weather data, which is specifically used in the Crop Advisory and Yield Prediction Engine.
            </p>
            <p>The system processes data using machine learning and deep learning models to generate predictions and recommendations. The Irrigation Recommendation Engine provides optimal watering schedules, while the Crop Advisory and Yield Prediction Engine predicts yield and offers advisory insights. The Disease Detection module analyzes leaf images using CNN models and sends alerts to farmers. Finally, the Plantation Health Scoring System combines all outputs to provide an overall health status of the plantation.
            </p>
          </div>
          <div>
            <img
              src="https://samitha-vidhanaarachchi.github.io/Research-Website/Images/other/architecture.jpg"
              alt="System architecture"
            />
          </div>
        </section>

        <section id="tech" className="content-section">
          <h2>Technologies Used</h2>
          <p className="section-kicker">Tools powering model training and deployment</p>
          <div className="chips">
            {['MongoDB', 'Express', 'React', 'Node.js', 'TensorFlow', 'Keras', 'YOLOv5', 'Google Maps API'].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </section>

        <section id="timeline" className="content-section">
          <h2>Timeline in Brief</h2>
          <ul className="timeline">
            <li>
              <span>June 2021</span>
              <p>Project Proposal</p>
            </li>
            <li>
              <span>July 2021</span>
              <p>Progress Presentation I</p>
            </li>
            <li>
              <span>September 2021</span>
              <p>Research Paper</p>
            </li>
            <li>
              <span>October 2021</span>
              <p>Progress Presentation II</p>
            </li>
            <li>
              <span>November 2021</span>
              <p>Final Presentation & Viva</p>
            </li>
          </ul>
        </section>

        <section id="team" className="content-section">
          <h2>Meet Our Team</h2>
          <p className="section-kicker">Academic and research collaboration</p>
          <div className="grid-2 team-grid">
            {supervisors.map((member) => (
              <article key={member.name} className="team-card">
                <img
                  className="team-photo"
                  src={member.photo}
                  alt={`${member.name} profile`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = getFallbackAvatar(member.name)
                  }}
                />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p className="muted">{member.org}</p>
              </article>
            ))}
          </div>

          <div className="grid-2 student-grid">
            {studentMembers.map((member) => (
              <article key={member.name} className="team-card">
                <img
                  className="team-photo"
                  src={member.photo}
                  alt={`${member.name} profile`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null
                    event.currentTarget.src = getFallbackAvatar(member.name)
                  }}
                />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p className="muted">{member.org}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="achievements" className="content-section">
          <h2>Achievements</h2>
          <p className="section-kicker">Recognition for impact and innovation</p>
          <p>
            The project was recognized among finalists at major national ICT
            competitions and nominated for international representation.
          </p>
        </section>

        <section id="contact" className="content-section contact-section">
          <h2>Get in Touch</h2>
          <form onSubmit={handleFormSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Name"
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
              placeholder="Message or query"
              rows="5"
              value={formData.message}
              onChange={handleFormChange}
              required
            />
            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          {feedback && <p className="feedback">{feedback}</p>}
          <p className="muted">For further queries: researchcoco@gmail.com</p>
        </section>
      </main>

      <footer>
        <p>Team CocoRemedy - Coconut Pest and Disease Surveillance System</p>
        <a href="#home">Back to top</a>
      </footer>
    </div>
  )
}

export default App
