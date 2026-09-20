/**
 * SINGLE SOURCE OF TRUTH FOR PERSONAL DETAILS
 * ----------------------------------------------------------------------------
 * Edit this file to change the hero, skills matrix, and timeline.
 * Project case studies live separately in src/content/projects/*.md
 */

export const profile = {
  name: 'Abhishek Tijo Andrew Prasanth',
  // Line breaks for the big hero title (purely visual).
  nameLines: ['Abhishek Tijo', 'Andrew Prasanth'],
  role: 'Mechanical & Mechatronics Engineering Student',
  school: 'Anderson University',
  gpa: '4.0',
  degree: 'BS Mechanical Engineering',
  // Used for <title> and social previews.
  headline:
    'Mechanical & Mechatronics Engineering Student (GPA: 4.0) | Anderson University',
  intro:
    'I like the moment a design leaves the screen: a printed part that fits, a signal that finally decodes, a joint that closes when the code says it should. I work across CAD modeling, rapid prototyping, and sensor integration with Python, Arduino, and oscilloscopes.',
  seeking: 'A summer robotics or mechanical engineering internship',
  focus: [
    'Kinematics',
    'Dynamic controls testing',
    'Rapid prototyping',
    'CAD design',
    'Embedded mechatronics',
    'PV solar systems',
  ],

  email: 'aaprasanth@anderson.edu',
  linkedin: 'https://www.linkedin.com/in/abhishek-prasanth-055037322',
  location: 'Anderson, IN',
  // The Download button serves public/resume.pdf.
  resume: 'resume.pdf',
} as const;

/**
 * SKILLS MATRIX
 * Each skill is a pin. Clicking one highlights every project whose `tags` or
 * `alsoUses` frontmatter contains the same word (case-insensitive).
 * `plain` skills are display-only pins (no project is tagged with them yet),
 * and spoken languages are display-only too.
 */
export interface SkillGroup {
  title: string;
  note?: string;
  interactive: boolean;
  skills: string[];
  plain?: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'CAD and mechanical',
    interactive: true,
    skills: [
      'Autodesk Inventor',
      'AutoCAD',
      'Kinematics',
      'Linkage Design',
      'Technical Drawing',
      'Tolerancing',
    ],
  },
  {
    title: 'Embedded systems',
    interactive: true,
    skills: [
      'Arduino',
      'SBUS Protocol',
      'ESC Integration',
      'Actuators',
      'Digital Oscilloscope',
      'Mechatronics',
    ],
  },
  {
    title: 'Circuits and solar power',
    interactive: true,
    skills: [
      'KiCAD',
      'LTspice',
      'Circuit Design',
      'Power Circuitry',
      'PV Solar Systems',
      'Solar Load Profiling',
      'Battery Systems',
      'MPPT Charge Controllers',
    ],
  },
  {
    title: 'Software and controls',
    interactive: true,
    skills: [
      'Python',
      'C',
      'C++',
      'Pandas',
      'REST APIs',
      'Telemetry',
      'Dynamic Controls Testing',
      'Motion Tracking',
      'PX4 and QGroundControl',
    ],
    plain: ['Java'],
  },
  {
    title: 'Analysis and planning',
    interactive: true,
    skills: [
      'Dynamics Analysis',
      'Spreadsheet Modeling',
      'Financial Modeling',
      'Decision Matrices',
      'Site Evaluation',
      'ADA Standards',
      'Project Management',
      'Technical Writing',
    ],
  },
  {
    title: 'Fabrication',
    interactive: true,
    skills: [
      '3D Printing',
      'Laser Cutting',
      'Shop Machining',
      'Wood Construction',
      'Hand Soldering',
      'Rapid Prototyping',
    ],
  },
  {
    title: 'Languages',
    note: 'Spoken',
    interactive: false,
    skills: ['English', 'German', 'Hindi', 'Tamil', 'Malayalam'],
  },
];

/**
 * EXPERIENCE AND EDUCATION TIMELINE (most recent first)
 * `period` is optional. `note` is one line of extra text on an index card.
 * `projectId` links an entry to a case study (the .md filename without ".md").
 */
export interface TimelineEntry {
  kind: 'education' | 'experience';
  title: string;
  org: string;
  period?: string;
  badges?: string[];
  bullets?: string[];
  note?: string;
  // Small word printed on the ticket stub of an experience entry (default: co-op).
  stub?: string;
  projectId?: string;
}

export const timeline: TimelineEntry[] = [
  {
    kind: 'experience',
    title: 'Engineering Mission Trip',
    org: 'Costa Rica',
    period: 'January 2026 to May 2026',
    bullets: [
      'Calculated electrical power load profiles and evaluated solar irradiance data to design an off-grid PV system for tropical field conditions.',
      'Simulated circuit behavior in LTspice and drafted standardized system schematics for modular replication across future community installations.',
      'Managed the project budget and field logistics to source components, build hardware, and present technical proposals to local leadership.',
    ],
    stub: 'trip',
    projectId: 'costa-rica-solar-pv',
  },
  {
    kind: 'experience',
    title: 'Flight Controls and Hardware Co-op (Intern)',
    org: 'Leo Flight and Anderson University, Indiana',
    period: 'May 2024 to present',
    bullets: [
      'Designed and 3D printed a gyroscope test rig with precise dimensional tolerances for flight stabilization testing.',
      'Built a real-time motion telemetry tool in Python to track dynamic controls and flight stability metrics.',
      'Analyzed SBUS protocol controller signals and debugged Arduino hardware interfaces with a digital oscilloscope.',
      'Hand-soldered wiring harnesses and integrated electronic speed controllers (ESCs) for power delivery and motor regulation.',
    ],
    projectId: 'flight-controls-gyro-rig',
  },
  {
    kind: 'education',
    title: 'BS Mechanical Engineering',
    org: 'Anderson University',
    period: 'August 2024 to May 2028',
    badges: ['4.0 GPA', "Dean's List", 'Honors Program Scholar'],
    note: 'Coursework: Kinematics and Robotics, Signals and Controls, Dynamics, Solid Mechanics, Digital Electronics, Circuit Analysis, Differential Equations, Linear Algebra.',
  },
  {
    kind: 'education',
    title: 'Certifications',
    org: '',
    badges: ['Python, Scope India', 'Arduino and Robotics, MyRobo Trivandrum, India'],
  },
];
