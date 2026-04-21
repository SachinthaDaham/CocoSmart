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
    { id: 'scope', title: 'Project Scope' },
    { id: 'literature', title: 'Literature Survey' },
    { id: 'gap', title: 'Research Gap' },
    { id: 'problem', title: 'Problem & Solution' },
    { id: 'objectives', title: 'Objectives' },
    { id: 'methodology', title: 'Methodology' },
    { id: 'tech', title: 'Technologies' },
    { id: 'timeline', title: 'Timeline' },
    { id: 'team', title: 'Team' },
    { id: 'achievements', title: 'Achievements' },
    { id: 'contact', title: 'Contact' },
  ]

  const objectiveCards = [
    {
      title: 'Classify WCLWD',
      description:
        'Distinguish WCLWD yellowing from related leaf symptoms and assess severity with CNN-based models.',
    },
    {
      title: 'Identify CCI',
      description:
        'Detect coconut caterpillar infestation and estimate progression level to support early intervention.',
    },
    {
      title: 'Differentiate Deficiencies',
      description:
        'Separate magnesium deficiency and leaf scorching from disease symptoms while identifying nearby water resources.',
    },
    {
      title: 'Enable Crowdsourcing',
      description:
        'Share real-time alerts and map-based reports between growers, officers, and researchers.',
    },
  ]

  const team = [
    {
      name: 'Dr. Janaka Wijekoon',
      role: 'Supervisor',
      org: 'Sri Lanka Institute of Information Technology',
    },
    {
      name: 'Ms. Dilani Lunugalage',
      role: 'Co-Supervisor',
      org: 'Sri Lanka Institute of Information Technology',
    },
    {
      name: 'Dr. Nayanie S Aratchige',
      role: 'External Supervisor',
      org: 'Coconut Research Institute of Sri Lanka',
    },
    {
      name: 'Team CocoRemedy',
      role: 'Research Team',
      org: 'Undergraduate Researchers',
    },
  ]

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
        <nav className="top-nav">
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
          <p className="eyebrow">Coconut Pest and Disease Surveillance System</p>
          <h1>AI-assisted field surveillance for healthy coconut cultivation</h1>
          <p>
            A research-driven platform for identifying WCLWD and CCI, estimating
            severity, and delivering real-time alerts to growers and authorities.
          </p>
          <a className="cta" href="#problem">
            Explore Solution
          </a>
        </div>
      </header>

      <main>
        <section id="scope" className="content-section two-col">
          <div>
            <h2>Project Scope</h2>
            <p>
              This research focuses on early identification of coconut pest and
              disease conditions and improving communication among growers,
              extension officers, and researchers.
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
          <p>
            Sri Lanka is one of the leading coconut exporters, yet climate change
            and disease spread continue to impact production. Existing studies show
            CNN-based disease detection can reach high accuracy and support faster
            mitigation.
          </p>
        </section>

        <section id="gap" className="content-section">
          <h2>Research Gap</h2>
          <div className="grid-3">
            <article>
              <h3>Identification & Classification</h3>
              <p>
                Limited smart solutions specifically address coconut pest and
                disease identification in Sri Lankan conditions.
              </p>
            </article>
            <article>
              <h3>Severity Assessment</h3>
              <p>
                Existing work rarely quantifies disease severity and progression
                for practical field intervention.
              </p>
            </article>
            <article>
              <h3>Information Sharing</h3>
              <p>
                Real-time reporting between farmers, CRI researchers, and CDOs is
                still not widely integrated.
              </p>
            </article>
          </div>
        </section>

        <section id="problem" className="content-section highlight">
          <h2>Research Problem & Solution</h2>
          <p className="question">
            How can we classify coconut pest and disease conditions and provide
            surveillance to people in real time?
          </p>
          <p>
            The proposed system combines mobile and web interfaces, CNN-based image
            classification, and map-based alerts. It identifies WCLWD and CCI,
            estimates symptom severity, and supports location-based notifications.
          </p>
        </section>

        <section id="objectives" className="content-section">
          <h2>Research Objectives</h2>
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
            <p>
              The architecture consists of detection, severity analysis, deficiency
              identification, and crowdsourced geospatial reporting. Captured leaf
              images are processed through deep learning models and results are
              shared to stakeholders.
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
          <div className="chips">
            {['MongoDB', 'Express', 'React', 'Node.js', 'TensorFlow', 'Keras', 'YOLOv5', 'Google Maps API'].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </section>

        <section id="timeline" className="content-section">
          <h2>Timeline in Brief</h2>
          <ul className="timeline">
            <li>Project Proposal - June 2021</li>
            <li>Progress Presentation I - July 2021</li>
            <li>Research Paper - September 2021</li>
            <li>Progress Presentation II - October 2021</li>
            <li>Final Presentation & Viva - November 2021</li>
          </ul>
        </section>

        <section id="team" className="content-section">
          <h2>Meet Our Team</h2>
          <div className="grid-2">
            {team.map((member) => (
              <article key={member.name}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p className="muted">{member.org}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="achievements" className="content-section">
          <h2>Achievements</h2>
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
      </footer>
    </div>
  )
}

export default App
