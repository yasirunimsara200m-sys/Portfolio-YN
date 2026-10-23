import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Create or update Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'yasiru01nimsara@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Yazi_boy021224';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      name: 'Yasiru Nimsara',
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: 'Yasiru Nimsara',
    },
  });
  console.log(`✅ Admin user seeded: ${adminEmail} (Password: ${adminPassword})`);

  // 2. Profile
  const existingProfile = await prisma.profile.findFirst();
  const profileData = {
    fullName: 'T. K. Yasiru Nimsara',
    title: 'Full Stack Software Engineer',
    bio: 'Software Engineering undergraduate (HNDIT) & Full-Stack Developer specializing in modern web applications with React, Next.js, Django, Nest.js, and cloud technologies.',
    about: 'Software Engineering undergraduate (HNDIT) and IT professional with hands-on experience in full-stack web development and digital operations. Currently working in a technical SEO role at PortCity BPO and Associate Full-Stack Developer at Network WIZARD SDN BHD, gaining strong exposure to website monitoring, system reporting, and cloud-based tools like Cloudflare. Proven track record in developing, testing, and debugging full-stack web applications using React, Next.js, Django, and Nest.js. Possesses strong problem-solving skills, attention to detail, and cross-functional team coordination. Seeking opportunities to leverage technical expertise in system performance, scalable development, and operational excellence.',
    email: 'yasiru01nimsara@gmail.com',
    phone: '+94 78 479 8095',
    location: 'Matara, Sri Lanka',
    githubUrl: 'https://github.com/Yazi0',
    linkedinUrl: 'https://www.linkedin.com/in/yasiru-nimsara/',
    websiteUrl: 'https://www.yasirunimsara.netlify.app',
    resumeUrl: '/Yasiru_Nimsara_CV.pdf',
    avatarUrl: '/profile.jpg',
    yearsExperience: '1+ Years',
    isAvailableForHire: true,
  };

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: profileData,
    });
  } else {
    await prisma.profile.create({
      data: profileData,
    });
  }
  console.log('✅ Profile data seeded');

  // 3. Skills
  await prisma.skill.deleteMany();
  const skills = [
    // Frontend
    { name: 'React', category: 'Frontend', proficiency: 92, order: 1 },
    { name: 'Next.js', category: 'Frontend', proficiency: 90, order: 2 },
    { name: 'TypeScript', category: 'Frontend', proficiency: 88, order: 3 },
    { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 94, order: 4 },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 95, order: 5 },
    { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 96, order: 6 },

    // Backend & Database
    { name: 'Nest.js', category: 'Backend & Database', proficiency: 88, order: 7 },
    { name: 'Django & Python', category: 'Backend & Database', proficiency: 90, order: 8 },
    { name: 'Node.js & Express', category: 'Backend & Database', proficiency: 85, order: 9 },
    { name: 'PostgreSQL', category: 'Backend & Database', proficiency: 84, order: 10 },
    { name: 'MySQL', category: 'Backend & Database', proficiency: 86, order: 11 },
    { name: 'SQLite', category: 'Backend & Database', proficiency: 90, order: 12 },
    { name: 'Supabase & Firebase', category: 'Backend & Database', proficiency: 82, order: 13 },
    { name: 'SQL Server', category: 'Backend & Database', proficiency: 80, order: 14 },

    // Programming Languages
    { name: 'Python', category: 'Programming Languages', proficiency: 90, order: 15 },
    { name: 'TypeScript', category: 'Programming Languages', proficiency: 88, order: 16 },
    { name: 'JavaScript', category: 'Programming Languages', proficiency: 94, order: 17 },
    { name: 'Java', category: 'Programming Languages', proficiency: 78, order: 18 },
    { name: 'C#', category: 'Programming Languages', proficiency: 76, order: 19 },
    { name: 'Dart', category: 'Programming Languages', proficiency: 74, order: 20 },
    { name: 'SQL', category: 'Programming Languages', proficiency: 88, order: 21 },

    // Tools & Workflow
    { name: 'Git & GitHub', category: 'Tools & Workflow', proficiency: 92, order: 22 },
    { name: 'Cloudflare', category: 'Tools & Workflow', proficiency: 85, order: 23 },
    { name: 'VS Code', category: 'Tools & Workflow', proficiency: 95, order: 24 },
    { name: 'Figma', category: 'Tools & Workflow', proficiency: 80, order: 25 },
    { name: 'Canva', category: 'Tools & Workflow', proficiency: 85, order: 26 },

    // Concepts
    { name: 'RESTful API Design', category: 'Concepts', proficiency: 92, order: 27 },
    { name: 'MVC Architecture', category: 'Concepts', proficiency: 90, order: 28 },
    { name: 'CRUD Operations', category: 'Concepts', proficiency: 95, order: 29 },
    { name: 'Agile & Scrum Practices', category: 'Concepts', proficiency: 86, order: 30 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`✅ ${skills.length} Skills seeded`);

  // 4. Experience
  await prisma.experience.deleteMany();
  const experiences = [
    {
      role: 'Associate Full-Stack Developer',
      company: 'Network WIZARD SDN BHD',
      period: '04/2026 – Present',
      isCurrent: true,
      description: JSON.stringify([
        'Monitored website performance, visibility, and technical status across multiple web platforms.',
        'Used tools like Cloudflare for basic website monitoring, DNS checks, and availability tracking.',
        'Performed website history analysis using Wayback Machine to track content changes and identify inconsistencies.',
        'Reported and documented technical issues, suspicious domains, and brand misuse cases.',
        'Coordinated with internal teams to update website-related tasks and resolve issues.',
        'Ensured accuracy and consistency of digital records and online brand presence.',
      ]),
      technologies: 'Cloudflare, DNS Monitoring, Web Operations, Full-Stack Architecture, Wayback Machine',
      order: 1,
    },
    {
      role: 'Full Stack Software Engineer Intern',
      company: 'National Apprentice and Industrial Training Authority (NAITA) – Digital Strategic & Systems Division',
      period: '09/2025 – 03/2026',
      isCurrent: false,
      description: JSON.stringify([
        'Contributed to the development and maintenance of internal software systems used within the organization.',
        'Developed responsive and reusable frontend UI components using React, TypeScript, and Tailwind CSS, ensuring consistent design and performance across devices.',
        'Implemented backend logic using Django, including models, views, and database operations.',
        'Designed and managed RESTful APIs to support efficient CRUD functionalities between frontend and backend systems.',
        'Worked with SQLite for database management during development and testing phases.',
        'Collaborated with team members using Git and GitHub for version control, code reviews, and collaborative development.',
        'Participated in testing, debugging, and optimization to improve system stability and user experience.',
      ]),
      technologies: 'React, TypeScript, JavaScript, Tailwind CSS, Django, Python, SQLite, Git, GitHub',
      order: 2,
    },
  ];

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp });
  }
  console.log(`✅ ${experiences.length} Experience items seeded`);

  // 5. Projects
  await prisma.project.deleteMany();
  const projects = [
    {
      title: 'AETI Website',
      subtitle: 'Full-Stack Institutional Web Application',
      description: 'A full-stack web application with a modern responsive frontend, robust backend APIs, and relational database integration. Features role-based authentication, dynamic content management, and performance-tuned queries.',
      tags: 'React, TypeScript, Tailwind CSS, REST APIs, Relational DB, Auth',
      category: 'Full-Stack',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
      demoUrl: 'https://www.yasirunimsara.netlify.app',
      githubUrl: 'https://github.com/Yazi0',
      isFeatured: true,
      order: 1,
    },
    {
      title: 'IETI Website',
      subtitle: 'Dynamic Educational Portal & CMS',
      description: 'Comprehensive educational platform featuring role-based access control, institutional content management, course listings, and automated database sync.',
      tags: 'React, TypeScript, Node.js, Express, MySQL, Tailwind CSS',
      category: 'Full-Stack',
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      demoUrl: 'https://www.yasirunimsara.netlify.app',
      githubUrl: 'https://github.com/Yazi0',
      isFeatured: true,
      order: 2,
    },
    {
      title: 'Service Desk System',
      subtitle: 'Enterprise IT Ticketing & Workflow System',
      description: 'End-to-end ticketing platform with custom status workflows, ticket routing, real-time status updates, RESTful APIs, error boundaries, and detailed analytics dashboard.',
      tags: 'Django, Python, React, RESTful APIs, SQLite, Tailwind CSS',
      category: 'Full-Stack',
      imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
      demoUrl: 'https://www.yasirunimsara.netlify.app',
      githubUrl: 'https://github.com/Yazi0',
      isFeatured: true,
      order: 3,
    },
    {
      title: 'Institute of Nursing & Healthcare Training',
      subtitle: 'Academic Admissions & Healthcare Portal',
      description: 'Responsive, highly accessible frontend web application presenting academic programs, entrance requirements, faculty information, and applicant guidelines with a clean UI.',
      tags: 'React, TypeScript, Tailwind CSS, Responsive Design',
      category: 'Frontend',
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      demoUrl: 'https://www.yasirunimsara.netlify.app',
      githubUrl: 'https://github.com/Yazi0',
      isFeatured: false,
      order: 4,
    },
    {
      title: 'Smart Tuition Manager',
      subtitle: 'Student, Batch & Payment Management',
      description: 'Tuition management system to oversee students, batches, classes, fee collections, and monthly revenue records with an intuitive administrative panel.',
      tags: 'Django, Python, SQLite, HTML5, CSS3, Data Modeling',
      category: 'Backend',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
      demoUrl: '',
      githubUrl: 'https://github.com/Yazi0',
      isFeatured: false,
      order: 5,
    },
    {
      title: 'Food Ordering Web Application',
      subtitle: 'Restaurant E-commerce & Cart Ordering',
      description: 'Full-stack food ordering platform designed with menu cataloging, cart state management, checkout validation, and secure administrative order fulfillment.',
      tags: 'PHP, MySQL, JavaScript, HTML5, CSS3, Authentication',
      category: 'Full-Stack',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      demoUrl: '',
      githubUrl: 'https://github.com/Yazi0',
      isFeatured: false,
      order: 6,
    },
    {
      title: 'Education Management System',
      subtitle: 'School & Course Administration System',
      description: 'Full-stack education management portal featuring dynamic React UI, decoupled backend services for student lifecycle tracking, marks administration, and teacher schedules.',
      tags: 'React, JavaScript, Django, REST APIs, Relational DB',
      category: 'Full-Stack',
      imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      demoUrl: '',
      githubUrl: 'https://github.com/Yazi0',
      isFeatured: false,
      order: 7,
    },
  ];

  for (const proj of projects) {
    await prisma.project.create({ data: proj });
  }
  console.log(`✅ ${projects.length} Projects seeded`);

  // 6. Education
  await prisma.education.deleteMany();
  const educations = [
    {
      degree: 'Higher National Diploma in Information Technology (HNDIT)',
      institution: 'Sri Lanka Institute of Advanced Technological Education (SLIATE)',
      period: 'Present',
      status: 'Following',
      details: 'Focusing on Advanced Software Engineering, Database Systems, Web Application Development, System Analysis and Data Structures.',
      order: 1,
    },
    {
      degree: 'G.C.E. Advanced Level (A/L)',
      institution: 'MR/Denipitiya M.M.V.',
      period: '2021',
      status: 'Completed',
      details: 'Physical Science / Technology Stream',
      order: 2,
    },
    {
      degree: 'G.C.E. Ordinary Level (O/L)',
      institution: 'MR/Warakapitiya M.V.',
      period: '2018',
      status: 'Completed',
      details: 'Passed with high distinction in Mathematics and Science.',
      order: 3,
    },
  ];

  for (const edu of educations) {
    await prisma.education.create({ data: edu });
  }
  console.log(`✅ ${educations.length} Education entries seeded`);

  // 7. Seed an initial welcome message
  await prisma.message.deleteMany();
  await prisma.message.create({
    data: {
      name: 'System Welcome',
      email: 'visitor@example.com',
      subject: 'Welcome to your Portfolio Admin Panel',
      message: 'Hello Yasiru! Your portfolio and admin panel are ready. You can edit projects, skills, and profile details anytime from here.',
      isRead: false,
    },
  });

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
