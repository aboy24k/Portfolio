/**
 * SINGLE SOURCE OF TRUTH FOR PERSONAL DETAILS
 * ----------------------------------------------------------------------------
 * Edit this file to change the hero, skills matrix, and timeline.
 * Project case studies live separately in src/content/projects/*.md
 */

export const profile = {
  name: 'Abhishek Tjo Andrew Prasanth',
  // Line breaks for the big hero title (purely visual).
  nameLines: ['Abhishek Tjo', 'Andrew Prasanth'],
  role: 'Mechanical & Mechatronics Engineering Student',
  school: 'Anderson University',
  gpa: '4.0',
  degree: 'BS Mechanical Engineering',
  // Used for <title> and social previews.
  headline:
    'Mechanical & Mechatronics Engineering Student (GPA: 4.0) | Anderson University',
  intro:
    'I like the moment a design leaves the screen: a printed part that fits, a signal that finally decodes, a joint that closes when the code says it should. I work across CAD, embedded electronics, and Python.',
  seeking: 'Hands-on mechanical and robotics internships',
  focus: [
    'Kinematics',
    'Dynamic controls testing',
    'Rapid prototyping',
    'CAD design',
    'Embedded mechatronics',
    'PV solar systems',
  ],

  email: 'aaprasanth@anderson.edu',
  // TODO: replace with your real LinkedIn profile URL.
  linkedin: 'https://www.linkedin.com/in/YOUR-LINKEDIN-HANDLE',
  location: 'Anderson, IN',
  // Drop your PDF at public/resume.pdf (or change this path).
  resume: 'resume.pdf',
} as const;

/**
 * SKILLS MATRIX
 * Each skill is a pin. Clicking one highlights every project whose `tags` or
 * `alsoUses` frontmatter contains the same word (case-insensitive).
 * Spoken languages are not linked to projects, so they are display-only.
 */
export interface SkillGroup {
  title: string;
  note?: string;
  interactive: boolean;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'CAD and mechanical',
    interactive: true,
    skills: ['Autodesk Inventor', 'AutoCAD', 'Kinematics', 'Tolerancing'],
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
      'Project Management',
    ],
  },
  {
    title: 'Software and controls',
    interactive: true,
    skills: [
      'Python',
      'C++',
      'Pandas',
      'REST APIs',
      'Telemetry',
      'Dynamic Controls Testing',
      'Motion Tracking',
      'PX4 and QGroundControl',
    ],
  },
  {
    title: 'Fabrication',
    interactive: true,
    skills: ['3D Printing', 'Shop Machining', 'Hand Soldering', 'Rapid Prototyping'],
  },
  {
    title: 'Languages',
    note: 'Spoken',
    interactive: false,
    skills: ['English', 'German', 'Hindi', 'Tamil', 'Malayalam'],
  },
];

/**
 * EXPERIENCE AND EDUCATION TIMELINE
 * `period` is optional. Fill it in (e.g. "2023 to present") and it will appear.
 * `projectId` links an entry to a case study (the .md filename without ".md").
 */
export interface TimelineEntry {
  kind: 'education' | 'experience';
  title: string;
  org: string;
  period?: string;
  badges?: string[];
  bullets?: string[];
  projectId?: string;
}

export const timeline: TimelineEntry[] = [
  {
    kind: 'experience',
    title: 'Engineering Co-op',
    org: 'Leo Flight',
    // TODO: period: 'Summer 2025',
    period: '',
    bullets: [
      'Designed and 3D printed a gyroscope test rig with tight tolerances.',
      'Built a Python tool that streams real-time dynamic motion telemetry.',
      'Analyzed SBUS protocol signals on a digital oscilloscope.',
      'Hand-soldered wiring harnesses and integrated ESCs.',
    ],
    projectId: 'flight-controls-gyro-rig',
  },
  {
    kind: 'education',
    title: 'BS Mechanical Engineering',
    org: 'Anderson University',
    // TODO: period: '2023 to 2027',
    period: '',
    badges: ['4.0 GPA', "Dean's List", 'Honors Program'],
  },
];
