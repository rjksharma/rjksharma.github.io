import { useEffect, useRef, useState } from 'react'
import './App.css'

const profile = {
  name: 'Raj Kumar',
  role: 'Full Stack Engineer',
  location: 'Bangalore 560077',
  email: 'rjksharma23@gmail.com',
  phone: '+91 9845145571',
  linkedin: 'https://www.linkedin.com/in/rjksharma33',
  resume: `${import.meta.env.BASE_URL}RAJKUMAR_CV.pdf`,
  socials: [
    {
      name: 'YouTube',
      href: 'https://youtube.com/@rjksharma',
      icon: 'youtube',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/rjksharma_',
      icon: 'instagram',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rjksharma33',
      icon: 'linkedin',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/rjksharma',
      icon: 'github',
    },
  ],
  availability:
    'Open to technical roles and challenging opportunities where I can contribute with full stack development, problem solving, and scalable product thinking.',
  summary:
    'Detail-oriented full stack web developer with 2+ years of professional experience creating and managing web applications. I focus on secure workflows, user-friendly interfaces, and backend systems that improve how teams operate every day.',
}

const tickerItems = [
  'ReactJS',
  'Python',
  'Laravel',
  'Spring Boot',
  'REST APIs',
  'MySQL',
  'AWS workflows',
  'CI/CD mindset',
]

const stats = [
  {
    value: '2+',
    label: 'Years of experience',
    copy: 'Hands-on professional work across frontend, backend, databases, and production workflows.',
  },
  {
    value: '45%',
    label: 'Workflow efficiency gain',
    copy: 'Improved project operations through better access control and centralized data management.',
  },
  {
    value: '60%',
    label: 'Access errors reduced',
    copy: 'Built role-based authentication and secure data control for business-critical workflows.',
  },
  {
    value: '7.54',
    label: 'MCA CGPA',
    copy: 'Master of Computer Application from Kristu Jayanti College completed in 2025.',
  },
]

const skills = [
  {
    title: 'Frontend Development',
    text: 'Building responsive, user-friendly interfaces with clean structure, reusable components, and polished interaction patterns.',
    tags: ['ReactJS', 'HTML5', 'CSS3', 'JavaScript', 'Material UI', 'Bootstrap', 'Tailwind'],
  },
  {
    title: 'Backend and APIs',
    text: 'Designing logic, authentication flows, and API-driven systems that support real workflows and secure data handling.',
    tags: ['Python', 'PHP', 'Java', 'NodeJS', 'Django', 'Laravel', 'Spring Boot', 'REST APIs'],
  },
  {
    title: 'Database and Cloud',
    text: 'Working with storage, deployment, and infrastructure pieces needed to support modern web applications.',
    tags: ['MySQL', 'SQL', 'AWS S3', 'EC2', 'Microservices', 'CI/CD', 'GitHub Actions', 'Jenkins'],
  },
  {
    title: 'Tools and Delivery',
    text: 'Comfortable moving from development to testing, debugging, documentation, collaboration, and production support.',
    tags: ['Git', 'Postman', 'VS Code', 'Linux', 'PowerBI', 'Debugging', 'Performance', 'Teamwork'],
  },
]

const projects = [
  {
    slug: 'project-data-management',
    type: 'Professional application',
    year: '2025 - Present',
    title: 'Project Data Management Web Application',
    description:
      'Developed a secure project data management platform with separate admin and user login flows, centralized oversight, and better day-to-day project tracking.',
    result: 'Improved workflow efficiency by 45% and reduced access errors by 60% with stronger role-based control.',
    tags: ['Laravel', 'Flask', 'PHP', 'Python', 'MySQL', 'AWS'],
    lines: ['88%', '74%', '96%'],
    accent: 'project-violet',
    role: 'Full Stack Engineer at Y-Not Design & Mfg',
    headline: 'A secure internal system for project tracking, access control, and centralized data management.',
    overview:
      'This application was built to make project information easier to organize, access, and control across the company. The core focus was creating a reliable admin and user workflow that improved collaboration while reducing access mistakes.',
    challenge:
      'The company needed a structured system to manage project data with better security boundaries and clearer access rules. Manual or fragmented workflows were slowing oversight and increasing the chance of permission errors.',
    solution:
      'I worked on a role-based project data management application with separate admin and user flows, secure data control, and a cleaner interface for tracking and collaboration. The product combined backend logic, access control, and a practical day-to-day user experience.',
    highlights: [
      'Built role-based authentication and access control for separate admin and user usage.',
      'Improved internal workflow efficiency by 45% through better organization and visibility.',
      'Reduced access-related errors by 60% with stronger permission handling.',
      'Improved collaboration and oversight by 35% with centralized project information.',
    ],
    stackGroups: [
      { title: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript'] },
      { title: 'Backend', items: ['PHP', 'Python', 'REST APIs'] },
      { title: 'Frameworks', items: ['Laravel', 'Flask'] },
      { title: 'Infrastructure', items: ['MySQL', 'AWS S3', 'AWS EC2', 'Ubuntu', 'Postman'] },
    ],
    metrics: [
      { label: 'Workflow efficiency', value: '45%' },
      { label: 'Access errors reduced', value: '60%' },
      { label: 'Collaboration improvement', value: '35%' },
    ],
  },
  {
    slug: 'royals-aerotech-website',
    type: 'Client website',
    year: '2024',
    title: 'Royals Aerotech Startup Website',
    description:
      'Designed and developed a responsive website for Royals Aerotech to improve online presence, communicate services clearly, and create a stronger digital identity.',
    result: 'Delivered a user-friendly experience and received positive feedback from the client for quality and professionalism.',
    tags: ['ReactJS', 'HTML', 'CSS', 'JavaScript', 'Responsive UI'],
    lines: ['79%', '92%', '67%'],
    accent: 'project-orchid',
    role: 'Website Design and Development Project',
    headline: 'A responsive startup website built to strengthen brand presence and clearly present services online.',
    overview:
      'Royals Aerotech needed a professional online presence that could represent the company more confidently and help communicate its services in a clean, modern way. The focus was on clarity, responsiveness, and trust.',
    challenge:
      'As a startup, the company needed a strong digital identity that looked reliable and polished while still being simple for visitors to navigate and understand quickly.',
    solution:
      'I designed and developed a responsive marketing website with a user-friendly structure, clearer service presentation, and a more polished interface. The goal was to help the client look established and credible from the first visit.',
    highlights: [
      'Designed a responsive website tailored for a startup brand presence.',
      'Used ReactJS, HTML, CSS, and JavaScript for a modern front-end experience.',
      'Created a more professional digital identity for the company.',
      'Received positive client feedback for quality and presentation.',
    ],
    stackGroups: [
      { title: 'Frontend', items: ['ReactJS', 'HTML', 'CSS', 'JavaScript'] },
      { title: 'UX focus', items: ['Responsive layout', 'Service storytelling', 'Client presentation'] },
    ],
    metrics: [
      { label: 'Responsive experience', value: '100%' },
      { label: 'Client satisfaction', value: 'High' },
      { label: 'Brand clarity', value: 'Improved' },
    ],
  },
  {
    slug: 'healthcare-compliance-portal',
    type: 'Healthcare platform',
    year: '2023',
    title: 'Integrated Healthcare Compliance Portal',
    description:
      'Worked on a healthcare portal concept aligned with IRDAI guidelines for patients, doctors, and hospitals, including appointment and telemedicine flows.',
    result: 'Focused on creating a more convenient, interactive, and user-friendly healthcare experience across web and mobile access.',
    tags: ['Healthcare', 'Portal UX', 'Web App', 'Telemedicine'],
    lines: ['71%', '85%', '94%'],
    accent: 'project-plum',
    role: 'Healthcare platform concept and development work',
    headline: 'A healthcare portal concept for patients, doctors, and hospitals with compliance-aware workflows.',
    overview:
      'This project focused on a healthcare experience aligned with IRDAI guidelines, bringing patients, doctors, and hospitals into one connected digital flow. It was designed as an interactive and convenient platform across app and website access.',
    challenge:
      'Healthcare journeys are often fragmented across appointments, communication, and service discovery. The system needed to feel more seamless while supporting multiple user groups and compliance-aware structure.',
    solution:
      'The portal concept connected healthcare participants through a unified interface for appointments, telemedicine, and service access. The experience was shaped around usability, convenience, and better coordination between stakeholders.',
    highlights: [
      'Designed for patients, doctors, and hospitals in one integrated platform.',
      'Included appointment scheduling and telemedicine-oriented user flows.',
      'Focused on improving convenience and accessibility through web and app experiences.',
      'Approached the product with healthcare compliance in mind.',
    ],
    stackGroups: [
      { title: 'Product focus', items: ['Portal UX', 'Healthcare workflows', 'Telemedicine'] },
      { title: 'Experience goals', items: ['Accessibility', 'Interactive UI', 'Convenience', 'Multi-user flows'] },
    ],
    metrics: [
      { label: 'User groups', value: '3' },
      { label: 'Access modes', value: 'Web + App' },
      { label: 'Experience goal', value: 'Seamless' },
    ],
  },
]

const experiences = [
  {
    period: 'Aug 2025 - Present',
    role: 'Full Stack Engineer',
    company: 'Y-Not Design & Mfg',
    text: 'Built a secure and user-friendly project data management application that improved tracking, access control, and centralized collaboration.',
    impact:
      'Designed role-based workflows that improved efficiency by 45%, reduced access errors by 60%, and increased collaboration visibility by 35%.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Python', 'Laravel', 'Flask', 'MySQL', 'AWS', 'Postman'],
  },
  {
    period: 'Aug 2023 - Jul 2024',
    role: 'Software Developer',
    company: 'Auwave Technology',
    text: 'Delivered a secure project data management application with dedicated admin and user access, focusing on reliability and a smoother internal workflow.',
    impact:
      'Worked across frontend, backend, and database layers using ReactJS, Spring Boot, MySQL, and RESTful APIs for a production-oriented business application.',
    stack: ['ReactJS', 'Material UI', 'JavaScript', 'Java', 'Spring Boot', 'REST APIs', 'MySQL', 'Postman'],
  },
  {
    period: 'Jan 2023 - Apr 2023',
    role: 'Python Intern',
    company: 'Codezeal Technology Pvt. Ltd.',
    text: 'Contributed to a Health Management System under the Ayushman Bharath Mission while collaborating with teams to gather requirements and improve design choices.',
    impact:
      'Built early experience in understanding business workflows, turning user feedback into improvements, and collaborating across departments.',
    stack: ['Python', 'Team collaboration', 'Requirement gathering', 'Workflow analysis'],
  },
]

const education = [
  {
    school: 'Kristu Jayanti University',
    degree: 'Master of Computer Application',
    period: 'Dec 2023 - Apr 2025',
    score: 'CGPA: 7.54',
  },
  {
    school: 'Radha Govind University',
    degree: 'Bachelor of Computer Application',
    period: 'Oct 2020 - May 2023',
    score: 'CGPA: 8.42',
  },
  {
    school: 'Indian Academy PU College',
    degree: 'PUC (PCMB)',
    period: 'Jun 2018 - Mar 2020',
    score: 'Percentage: 71.84',
  },
  {
    school: "St. Peter's English High School",
    degree: 'SSLC',
    period: 'Mar 2017 - Apr 2018',
    score: 'Percentage: 75.04%',
  },
]

const certifications = ['Full Stack Java Development course - Uttara Info Pvt Limited']

const strengths = [
  'Problem solving and debugging',
  'Performance optimization',
  'Cross-team collaboration',
  'Team leadership support and R&D mindset',
  'Focus on scalable and efficient engineering solutions',
]

const heroGraphValues = [92, 74, 86, 68]
const heroGraphLabels = ['Workflow', 'Security', 'Delivery', 'Cloud']
const backgroundParticles = [
  { size: '0.42rem', top: '8%', left: '7%', duration: '14s', delay: '0s', opacity: 0.55 },
  { size: '0.58rem', top: '16%', left: '18%', duration: '18s', delay: '1.5s', opacity: 0.42 },
  { size: '0.36rem', top: '10%', left: '42%', duration: '12s', delay: '0.8s', opacity: 0.6 },
  { size: '0.72rem', top: '22%', left: '78%', duration: '20s', delay: '2.2s', opacity: 0.38 },
  { size: '0.4rem', top: '36%', left: '88%', duration: '15s', delay: '1.1s', opacity: 0.52 },
  { size: '0.52rem', top: '48%', left: '12%', duration: '19s', delay: '2.8s', opacity: 0.4 },
  { size: '0.34rem', top: '54%', left: '36%', duration: '13s', delay: '0.6s', opacity: 0.62 },
  { size: '0.64rem', top: '64%', left: '67%', duration: '22s', delay: '3.4s', opacity: 0.36 },
  { size: '0.46rem', top: '72%', left: '84%', duration: '16s', delay: '0.9s', opacity: 0.5 },
  { size: '0.38rem', top: '82%', left: '26%', duration: '14s', delay: '2s', opacity: 0.48 },
  { size: '0.68rem', top: '88%', left: '54%', duration: '21s', delay: '3s', opacity: 0.34 },
  { size: '0.44rem', top: '26%', left: '58%', duration: '17s', delay: '1.7s', opacity: 0.46 },
]

function buildGraph(values, labels = []) {
  const lastIndex = Math.max(values.length - 1, 1)

  return values.map((value, index) => {
    const numeric = Number.parseInt(value, 10)
    const x = 12 + (74 / lastIndex) * index
    const y = Math.max(14, 100 - numeric)

    return {
      key: `${labels[index] ?? 'point'}-${index}`,
      label: labels[index] ?? `Point ${index + 1}`,
      value: `${numeric}%`,
      x,
      y,
    }
  })
}

function getLinePoints(nodes) {
  return nodes.map((node) => `${node.x},${node.y}`).join(' ')
}

function getAreaPoints(nodes) {
  if (!nodes.length) {
    return ''
  }

  return `${nodes[0].x},100 ${getLinePoints(nodes)} ${nodes[nodes.length - 1].x},100`
}

function getRouteFromHash(hash) {
  const cleanHash = hash || window.location.hash || ''

  if (cleanHash.startsWith('#/projects/')) {
    return {
      view: 'project',
      slug: cleanHash.replace('#/projects/', '').replace(/\/+$/, ''),
    }
  }

  return { view: 'home', slug: null }
}

function Reveal({ children, className = '', delay = 0, tiltStrength }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return undefined
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={['reveal', isVisible ? 'is-visible' : '', className]
        .filter(Boolean)
        .join(' ')}
      data-tilt={tiltStrength ? 'true' : undefined}
      data-tilt-strength={tiltStrength ?? undefined}
      style={{ '--delay': `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-copy">{text}</p>
    </div>
  )
}

function SocialIcon({ icon }) {
  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': 'true',
  }

  if (icon === 'youtube') {
    return (
      <svg {...commonProps}>
        <path
          d="M21.6 7.2C21.4 6.4 20.8 5.8 20 5.6C18.5 5.2 12 5.2 12 5.2C12 5.2 5.5 5.2 4 5.6C3.2 5.8 2.6 6.4 2.4 7.2C2 8.7 2 12 2 12C2 12 2 15.3 2.4 16.8C2.6 17.6 3.2 18.2 4 18.4C5.5 18.8 12 18.8 12 18.8C12 18.8 18.5 18.8 20 18.4C20.8 18.2 21.4 17.6 21.6 16.8C22 15.3 22 12 22 12C22 12 22 8.7 21.6 7.2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M10 15.3L15.2 12L10 8.7V15.3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (icon === 'instagram') {
    return (
      <svg {...commonProps}>
        <rect
          x="3.25"
          y="3.25"
          width="17.5"
          height="17.5"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.1" cy="6.9" r="0.95" fill="currentColor" />
      </svg>
    )
  }

  if (icon === 'linkedin') {
    return (
      <svg {...commonProps}>
        <path
          d="M7 9.5V17"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M12 17V12.6C12 11.1 12.9 9.8 14.8 9.8C16.4 9.8 17 10.9 17 12.6V17"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="7" cy="6.8" r="1.1" fill="currentColor" />
        <rect
          x="3.25"
          y="3.25"
          width="17.5"
          height="17.5"
          rx="4.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path
        d="M9 18C4.5 19.3 4.5 15.7 2.7 15.1M15.3 20V16.6C15.3 15.6 15.2 15 14.8 14.5C17.3 14.2 20 13.2 20 8.6C20 7.4 19.6 6.3 18.8 5.5C18.9 5.2 19.3 4 18.7 2.5C18.7 2.5 17.7 2.2 15.3 3.8C13.4 3.3 11.4 3.3 9.5 3.8C7.1 2.2 6.1 2.5 6.1 2.5C5.5 4 5.9 5.2 6 5.5C5.2 6.3 4.8 7.4 4.8 8.6C4.8 13.2 7.5 14.2 10 14.5C9.6 15 9.5 15.8 9.5 16.8V20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectDetailPage({ project }) {
  const detailNodes = buildGraph(project.lines, project.metrics.map((metric) => metric.label))

  return (
    <main className="project-detail-page">
      <section className="project-detail-hero container">
        <Reveal className="project-detail-copy" delay={0}>
          <a className="project-back-link" href="#projects">
            <span aria-hidden="true">&larr;</span>
            Back to Projects
          </a>
          <p className="eyebrow">{project.type}</p>
          <h1>{project.title}</h1>
          <p className="project-detail-role">{project.role}</p>
          <p className="project-detail-text">{project.headline}</p>

          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Work With Me
            </a>
            <a className="button button-ghost" href={profile.resume} download>
              Download Resume
            </a>
          </div>
        </Reveal>

        <Reveal
          className={`glass-card project-detail-stage ${project.accent}`}
          delay={120}
          tiltStrength={12}
        >
          <div className="project-detail-stage-head">
            <span>{project.year}</span>
            <span>Case Study</span>
          </div>

          <div className="project-detail-stage-body">
            <svg className="project-detail-graph" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon className="project-detail-area" points={getAreaPoints(detailNodes)}></polygon>
              <polyline className="project-detail-line" points={getLinePoints(detailNodes)}></polyline>
            </svg>

            <div className="project-detail-metrics">
              {project.metrics.map((metric) => (
                <article key={metric.label} className="project-detail-metric">
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section container project-detail-grid">
        <Reveal className="glass-card project-detail-panel panel-hover" delay={40} tiltStrength={5}>
          <p className="eyebrow">Overview</p>
          <h2>What this project is about</h2>
          <p>{project.overview}</p>
        </Reveal>

        <Reveal className="glass-card project-detail-panel panel-hover" delay={90} tiltStrength={5}>
          <p className="eyebrow">Challenge</p>
          <h2>The problem to solve</h2>
          <p>{project.challenge}</p>
        </Reveal>

        <Reveal className="glass-card project-detail-panel panel-hover" delay={140} tiltStrength={5}>
          <p className="eyebrow">Solution</p>
          <h2>How I approached it</h2>
          <p>{project.solution}</p>
        </Reveal>

        <Reveal className="glass-card project-detail-panel panel-hover" delay={190} tiltStrength={5}>
          <p className="eyebrow">Outcome</p>
          <h2>What it delivered</h2>
          <p>{project.result}</p>
        </Reveal>
      </section>

      <section className="section container detail-split">
        <Reveal className="glass-card detail-list-card panel-hover" delay={60} tiltStrength={6}>
          <p className="eyebrow">Highlights</p>
          <h2>Key contributions</h2>
          <ul className="detail-bullet-list">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="glass-card detail-list-card panel-hover" delay={120} tiltStrength={6}>
          <p className="eyebrow">Technology Stack</p>
          <h2>Tools and frameworks used</h2>
          <div className="detail-stack-groups">
            {project.stackGroups.map((group) => (
              <article key={group.title} className="detail-stack-group">
                <strong>{group.title}</strong>
                <ul className="tag-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section container">
        <Reveal className="glass-card cta-card panel-hover" delay={80} tiltStrength={6}>
          <p className="eyebrow">Next Step</p>
          <h2>Want this kind of project thinking in your product too?</h2>
          <p className="cta-copy">
            I work across frontend, backend, APIs, workflows, and practical business-focused web
            products. If you want to discuss a role or project, let&apos;s connect.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#contact">
              Contact Me
            </a>
            <a className="button button-ghost" href="#projects">
              More Projects
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}

function App() {
  const shellRef = useRef(null)
  const [route, setRoute] = useState(() => getRouteFromHash(window.location.hash))
  const heroNodes = buildGraph(heroGraphValues, heroGraphLabels)
  const activeProject = route.view === 'project'
    ? projects.find((project) => project.slug === route.slug) ?? null
    : null

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(getRouteFromHash(window.location.hash))
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (route.view === 'project') {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const currentHash = window.location.hash

    if (currentHash && !currentHash.startsWith('#/')) {
      window.requestAnimationFrame(() => {
        document.querySelector(currentHash)?.scrollIntoView({ behavior: 'auto', block: 'start' })
      })
    }
  }, [route])

  useEffect(() => {
    const shell = shellRef.current

    if (!shell) {
      return undefined
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const supportsHover = window.matchMedia('(hover: hover)').matches

    let pointerFrame = 0
    let scrollFrame = 0

    const setPointer = (x, y) => {
      cancelAnimationFrame(pointerFrame)
      pointerFrame = window.requestAnimationFrame(() => {
        shell.style.setProperty('--pointer-x', `${x}px`)
        shell.style.setProperty('--pointer-y', `${y}px`)
      })
    }

    const updateScroll = () => {
      cancelAnimationFrame(scrollFrame)
      scrollFrame = window.requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0

        shell.style.setProperty('--scroll-progress', progress.toFixed(4))
        shell.style.setProperty('--scroll-rotation', `${progress * 180}deg`)
      })
    }

    const handlePointerMove = (event) => {
      setPointer(event.clientX, event.clientY)
    }

    const tiltCleanups = []

    if (!reduceMotion && supportsHover) {
      setPointer(window.innerWidth * 0.68, window.innerHeight * 0.26)
      window.addEventListener('pointermove', handlePointerMove, { passive: true })

      shell.querySelectorAll('[data-tilt="true"]').forEach((element) => {
        const strength = Number(element.getAttribute('data-tilt-strength') ?? 10)
        let tiltFrame = 0

        const reset = () => {
          cancelAnimationFrame(tiltFrame)
          tiltFrame = window.requestAnimationFrame(() => {
            element.style.setProperty('--tilt-rotate-x', '0deg')
            element.style.setProperty('--tilt-rotate-y', '0deg')
            element.style.setProperty('--tilt-translate-x', '0px')
            element.style.setProperty('--tilt-translate-y', '0px')
            element.style.setProperty('--tilt-scale', '1')
            element.style.setProperty('--glow-x', '50%')
            element.style.setProperty('--glow-y', '50%')
          })
        }

        const handleTilt = (event) => {
          const rect = element.getBoundingClientRect()
          const relativeX = (event.clientX - rect.left) / rect.width
          const relativeY = (event.clientY - rect.top) / rect.height
          const rotateY = (relativeX - 0.5) * strength * 2
          const rotateX = (0.5 - relativeY) * strength * 1.6
          const shiftX = (relativeX - 0.5) * 12
          const shiftY = (relativeY - 0.5) * 12

          cancelAnimationFrame(tiltFrame)
          tiltFrame = window.requestAnimationFrame(() => {
            element.style.setProperty('--tilt-rotate-x', `${rotateX.toFixed(2)}deg`)
            element.style.setProperty('--tilt-rotate-y', `${rotateY.toFixed(2)}deg`)
            element.style.setProperty('--tilt-translate-x', `${shiftX.toFixed(2)}px`)
            element.style.setProperty('--tilt-translate-y', `${shiftY.toFixed(2)}px`)
            element.style.setProperty('--tilt-scale', '1.01')
            element.style.setProperty('--glow-x', `${(relativeX * 100).toFixed(2)}%`)
            element.style.setProperty('--glow-y', `${(relativeY * 100).toFixed(2)}%`)
          })
        }

        element.addEventListener('pointermove', handleTilt)
        element.addEventListener('pointerleave', reset)

        tiltCleanups.push(() => {
          cancelAnimationFrame(tiltFrame)
          element.removeEventListener('pointermove', handleTilt)
          element.removeEventListener('pointerleave', reset)
          reset()
        })
      })
    } else {
      setPointer(window.innerWidth * 0.5, window.innerHeight * 0.22)
    }

    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)

    return () => {
      cancelAnimationFrame(pointerFrame)
      cancelAnimationFrame(scrollFrame)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
      tiltCleanups.forEach((cleanup) => cleanup())
    }
  }, [route])

  return (
    <div className="page-shell" ref={shellRef}>
      <div className="scroll-progress" aria-hidden="true">
        <span className="scroll-progress-bar"></span>
      </div>
      <div className="scroll-orbiter" aria-hidden="true">
        <span className="scroll-orbiter-ring"></span>
        <span className="scroll-orbiter-track"></span>
        <span className="scroll-orbiter-dot"></span>
        <span className="scroll-orbiter-arrow"></span>
      </div>
      <div className="pointer-glow" aria-hidden="true"></div>
      <div className="pointer-glow pointer-glow-secondary" aria-hidden="true"></div>
      <div className="background-ribbons" aria-hidden="true">
        <span className="background-ribbon ribbon-one"></span>
        <span className="background-ribbon ribbon-two"></span>
        <span className="background-ribbon ribbon-three"></span>
      </div>
      <div className="background-particles" aria-hidden="true">
        {backgroundParticles.map((particle, index) => (
          <span
            key={`${particle.left}-${particle.top}-${index}`}
            className="background-particle"
            style={{
              '--particle-size': particle.size,
              '--particle-top': particle.top,
              '--particle-left': particle.left,
              '--particle-duration': particle.duration,
              '--particle-delay': particle.delay,
              '--particle-opacity': particle.opacity,
            }}
          ></span>
        ))}
      </div>
      <div className="ambient ambient-one" aria-hidden="true"></div>
      <div className="ambient ambient-two" aria-hidden="true"></div>
      <div className="ambient ambient-three" aria-hidden="true"></div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#hero">
            <span className="brand-mark">RK</span>
            <span className="brand-text">{profile.name}</span>
          </a>

          {route.view === 'home' ? (
            <nav className="site-nav" aria-label="Primary">
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </nav>
          ) : (
            <nav className="site-nav detail-nav" aria-label="Project">
              <a href="#projects">All Projects</a>
              <a href="#contact">Contact</a>
            </nav>
          )}

          <a className="button button-secondary header-button" href={profile.resume} download>
            Resume
          </a>
        </div>
      </header>

      {route.view === 'project' && activeProject ? (
        <ProjectDetailPage project={activeProject} />
      ) : route.view === 'project' ? (
        <main className="project-detail-page">
          <section className="section container">
            <Reveal className="glass-card cta-card panel-hover" delay={0} tiltStrength={6}>
              <p className="eyebrow">Project Not Found</p>
              <h2>This project detail page could not be found.</h2>
              <p className="cta-copy">
                The link may be outdated, but you can go back to the portfolio and open one of the
                available case studies.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Back to Projects
                </a>
              </div>
            </Reveal>
          </section>
        </main>
      ) : (
      <main>
        <section className="hero container" id="hero">
          <Reveal className="hero-copy" delay={0}>
            <p className="eyebrow">Full stack web developer with real project delivery experience</p>
            <h1>
              Secure <span>full stack</span> products with modern UI, clean structure, and
              business impact.
            </h1>
            <p className="hero-text">
              I&apos;m {profile.name}, a {profile.role} with 2+ years of professional experience
              creating web applications using ReactJS, Python, Java, PHP, REST APIs, and MySQL.
              I enjoy turning complex workflows into reliable digital experiences.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href={profile.resume} download>
                Download Resume
              </a>
              <a className="button button-ghost" href="#experience">
                View Experience
              </a>
            </div>

            <ul className="hero-points">
              <li>{profile.availability}</li>
              <li>Currently working as a Full Stack Engineer at Y-Not Design &amp; Mfg.</li>
              <li>Based in {profile.location} and available for full stack development opportunities.</li>
            </ul>

            <a className="scroll-cue" href="#about">
              <span className="scroll-cue-text">Scroll Down</span>
              <span className="scroll-cue-track"></span>
              <span className="scroll-cue-arrow">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 4.5V18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path
                    d="M6.5 13L12 18.5L17.5 13"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </Reveal>

          <Reveal className="hero-stage" delay={140}>
            <div className="floating-note note-top">
              <span className="note-dot"></span>
              2+ years of professional development
            </div>

            <div className="floating-note note-bottom">
              <span className="note-dot"></span>
              Resume included for download
            </div>

            <div className="glass-card stage-window" data-tilt="true" data-tilt-strength="14">
              <div className="stage-toolbar">
                <div className="toolbar-lights">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p>Raj Kumar Portfolio</p>
              </div>

              <div className="stage-body">
                <div className="stage-copy">
                  <p className="stage-kicker">Current focus</p>
                  <h2>Secure workflow-driven applications</h2>
                  <p>
                    Full stack development with strong frontend foundations, backend integration,
                    access control, and production-ready thinking.
                  </p>
                </div>

                <div className="stage-visual" aria-hidden="true">
                  <div className="graph-grid"></div>
                  <div className="graph-halo"></div>
                  <div className="orbital-ring"></div>
                  <div className="orbital-ring orbital-ring-delay"></div>
                  <div className="core-sphere"></div>
                  <svg className="graph-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon className="graph-area" points={getAreaPoints(heroNodes)}></polygon>
                    <polyline className="graph-line-shadow" points={getLinePoints(heroNodes)}></polyline>
                    <polyline className="graph-line" points={getLinePoints(heroNodes)}></polyline>
                  </svg>
                  {heroNodes.map((node, index) => (
                    <div
                      key={node.key}
                      className={`graph-node graph-node-${index + 1}`}
                      style={{ '--x': `${node.x}%`, '--y': `${node.y}%` }}
                    >
                      <span className="graph-node-dot"></span>
                      <strong>{node.value}</strong>
                    </div>
                  ))}
                  <div className="graph-badge graph-badge-left">Role-based access</div>
                  <div className="graph-badge graph-badge-right">API-driven delivery</div>
                  <div className="graph-axis">
                    {heroGraphLabels.map((label) => (
                      <span key={label}>{label}</span>
                    ))}
                  </div>
                  <div className="signal-bars">
                    {[92, 74, 86, 68].map((size, index) => (
                      <span
                        key={`${size}-${index}`}
                        className="signal-bar"
                        style={{ '--size': `${size}%`, '--bar-delay': `${index * 140}ms` }}
                      ></span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="stage-footer">
                <article className="stage-panel">
                  <strong>Frontend</strong>
                  <span>ReactJS, HTML5, CSS3, JavaScript</span>
                </article>
                <article className="stage-panel">
                  <strong>Backend</strong>
                  <span>Python, PHP, Java, REST APIs</span>
                </article>
                <article className="stage-panel">
                  <strong>Cloud and DB</strong>
                  <span>AWS workflows, MySQL, CI/CD mindset</span>
                </article>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="ticker" aria-label="Highlighted capabilities">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span className="ticker-item" key={`${item}-${index}`}>
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="section container" id="about">
          <Reveal delay={0}>
            <SectionHeading
              eyebrow="Professional summary"
              title="Building web applications that are secure, practical, and easy to use."
              text={profile.summary}
            />
          </Reveal>

          <div className="about-grid">
            <Reveal className="glass-card about-story panel-hover" delay={80} tiltStrength={5}>
              <p>
                My background combines full stack engineering, product workflow thinking, and
                strong collaboration. I have worked on project management systems, healthcare
                solutions, and client-facing websites while adapting to different frameworks and
                team environments.
              </p>
              <div className="story-divider"></div>
              <p>
                I am comfortable moving across frontend, backend, databases, tools, debugging, and
                delivery. The goal is always the same: build software that is reliable, intuitive,
                and valuable for the people using it.
              </p>
            </Reveal>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  className="glass-card stat-card panel-hover"
                  delay={120 + index * 70}
                  tiltStrength={8}
                >
                  <span className="stat-value">{stat.value}</span>
                  <h3>{stat.label}</h3>
                  <p>{stat.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section container" id="skills">
          <Reveal delay={0}>
            <SectionHeading
              eyebrow="Technical skills"
              title="A full stack toolkit shaped by real application work."
              text="My experience spans frontend interfaces, backend frameworks, databases, tools, APIs, and deployment concepts needed for modern product development."
            />
          </Reveal>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <Reveal
                key={skill.title}
                className="glass-card skill-card panel-hover"
                delay={80 + index * 80}
                tiltStrength={7}
              >
                <div className="skill-topline"></div>
                <h3>{skill.title}</h3>
                <p>{skill.text}</p>
                <ul className="tag-list">
                  {skill.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section section-split container" id="experience">
          <div className="split-column">
            <Reveal delay={0}>
              <SectionHeading
                eyebrow="Professional experience"
                title="Hands-on engineering across business apps, client websites, and healthcare systems."
                text="From internship work to full-time engineering roles, my focus has been building dependable applications, improving workflows, and collaborating effectively with teams."
              />
            </Reveal>

            <div className="timeline">
              {experiences.map((item, index) => (
                <Reveal
                  key={`${item.company}-${item.period}`}
                  className="glass-card timeline-item panel-hover"
                  delay={90 + index * 80}
                  tiltStrength={6}
                >
                  <span className="timeline-index">0{index + 1}</span>
                  <div>
                    <p className="experience-period">{item.period}</p>
                    <h3>
                      {item.role}
                      <span className="experience-company"> {item.company}</span>
                    </h3>
                    <p>{item.text}</p>
                    <p className="experience-impact">{item.impact}</p>
                    <ul className="tag-list compact-tags">
                      {item.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="split-column">
            <Reveal className="glass-card process-card panel-hover" delay={120} tiltStrength={4}>
              <p className="eyebrow">Education</p>
              <h3>Academic foundation in computer applications and software systems.</h3>
              <div className="resume-list">
                {education.map((item) => (
                  <article className="resume-row" key={`${item.school}-${item.degree}`}>
                    <div className="resume-row-top">
                      <strong>{item.degree}</strong>
                      <span>{item.period}</span>
                    </div>
                    <p>{item.school}</p>
                    <small>{item.score}</small>
                  </article>
                ))}
              </div>
            </Reveal>

            <Reveal className="glass-card launch-card panel-hover" delay={220} tiltStrength={4}>
              <p className="eyebrow">Certifications and strengths</p>
              <h3>Skills beyond coding that help me contribute better in teams.</h3>
              <ul className="service-list">
                {certifications.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="story-divider"></div>
              <ul className="service-list">
                {strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="section container" id="projects">
          <Reveal delay={0}>
            <SectionHeading
              eyebrow="Selected work"
              title="Projects and platforms that reflect my development range."
              text="These highlights combine professional application work, client delivery, and product-oriented thinking across different industries and technologies."
            />
          </Reveal>

          <div className="projects-grid">
            {projects.map((project, index) => {
              const projectNodes = buildGraph(project.lines)

              return (
                <Reveal
                  key={project.title}
                  className={`glass-card project-card panel-hover ${project.accent}`}
                  delay={100 + index * 90}
                  tiltStrength={10}
                >
                  <div className="project-meta">
                    <span>{project.type}</span>
                    <span>{project.year}</span>
                  </div>
                  <a
                    className="project-card-link"
                    href={`#/projects/${project.slug}`}
                    aria-label={`Open project details for ${project.title}`}
                  >
                    Open project details for {project.title}
                  </a>

                  <div className="project-visual" aria-hidden="true">
                    <div className="project-orb"></div>
                    <div className="project-window">
                      <svg
                        className="project-graph-svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <polygon
                          className="project-graph-area"
                          points={getAreaPoints(projectNodes)}
                        ></polygon>
                        <polyline
                          className="project-graph-line"
                          points={getLinePoints(projectNodes)}
                        ></polyline>
                      </svg>
                      <div className="project-window-head"></div>
                      <div className="project-lines">
                        {project.lines.map((line, lineIndex) => (
                          <span
                            key={`${project.title}-${lineIndex}`}
                            className="project-line"
                            style={{ '--line-size': line }}
                          ></span>
                        ))}
                      </div>
                      <div className="project-node-row">
                        {projectNodes.map((node) => (
                          <span key={node.key} className="project-node">
                            {node.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="tag-list">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>

                  <div className="project-footer">
                    <span>{project.result}</span>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </section>

        <section className="section container" id="contact">
          <Reveal className="glass-card cta-card panel-hover" delay={0} tiltStrength={6}>
            <p className="eyebrow">Contact</p>
            <h2>Let&apos;s build reliable web products with strong UI and practical engineering.</h2>
            <p className="cta-copy">
              If you are hiring for a full stack developer role or need support on a web
              application, portfolio, or internal product workflow, feel free to reach out.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href={profile.resume} download>
                Download Resume
              </a>
              <a className="button button-ghost" href={`mailto:${profile.email}`}>
                Email Me
              </a>
            </div>

            <div className="contact-links">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={`tel:${profile.phone.replace(/\s+/g, '')}`}>{profile.phone}</a>
              <span>{profile.location}</span>
            </div>
          </Reveal>
        </section>
      </main>
      )}

      <footer className="site-footer container">
        <div className="footer-socials" aria-label="Social media links">
          {profile.socials.map((social) => (
            <a
              key={social.name}
              className="footer-social-link"
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              title={social.name}
            >
              <span className="footer-social-icon">
                <SocialIcon icon={social.icon} />
              </span>
              <span className="footer-social-name">{social.name}</span>
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default App
