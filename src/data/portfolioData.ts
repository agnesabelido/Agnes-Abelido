export interface ProjectItem {
  id: string;
  templateCardId?: string;
  templateImageId?: string;
  templateTitleId?: string;
  templateDescId?: string;
  category: 'pubmats' | 'videos' | 'ai' | 'mockups' | 'dpblasts' | 'copywriting';
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  videoUrl?: string;
  client: string;
  year: string;
  deliverables: string[];
  tools: string[];
  metrics?: string;
  accentColor: string;
}

export interface CopywritingItem {
  id: string;
  title: string;
  category: string;
  quote?: string;
  body: string;
  language: 'English' | 'Filipino';
  dateOrTag: string;
}

export interface OrgInvolvement {
  organization: string;
  committeeOrTeam?: string;
  role: string;
  period: string;
  bulletPoints: string[];
}

export interface WorkExperienceItem {
  company: string;
  role: string;
  period: string;
  bulletPoints: string[];
}

export interface EducationItem {
  school: string;
  degreeOrLevel: string;
  period: string;
}

export const FREELANCER_INFO = {
  fullName: "Agnes Grace J. Abelido",
  name: "Agnes Grace J. Abelido",
  preferredName: "Agnes",
  avatarUrl: "/agnes_portrait.svg",
  wallpaperUrl: "/agnes_wallpaper.jpg",
  eyebrow: "[ i'm a student ] · [ i'm a social media manager! ]",
  role: "Social Media Manager · Content Strategy · Video Editing · Copywriting",
  heroTitle: "get to know me!",
  heroDescription: "I'm a student and social media manager focused on page management, content planning, and digital storytelling. I help student organizations, brands, and creators build engaging online communities through structured posting, short-form reels, and compelling captions.",
  email: "agnesabelido17@gmail.com",
  phone: "09951482072",
  location: "General Trias City, Cavite, 4107, Philippines",
  availability: "Available for Social Media Management & Creative Roles",
  experienceYears: "4 Years",
  experienceContext: "in social media page support, student campaigns & content",
  projectsCompleted: "30 Projects & Social Campaigns",

  // Professional Summary exactly from Resume
  professionalSummary: "Business Economics student with experience in organizational leadership, public relations, and creative campaign development. Has worked with university organizations to lead creative teams, coordinate projects, and create content for different audiences. Brings a strong business foundation along with practical experience in communication, project coordination, and digital content creation.",

  // Education exactly from Resume
  educationHistory: [
    {
      school: "De La Salle University - Dasmariñas",
      degreeOrLevel: "Bachelor of Science in Business Administration major in Business Economics",
      period: "August 2022 - Present"
    },
    {
      school: "San Sebastian College - Recoletos de Cavite",
      degreeOrLevel: "Senior High School",
      period: "August 2020 - July 2022"
    },
    {
      school: "Academy of Saint John - La Salle Greenhills Supervised",
      degreeOrLevel: "Junior High School",
      period: "June 2016 - March 2020"
    },
    {
      school: "John Isabel Learning Center",
      degreeOrLevel: "Pre-school to Elementary",
      period: "June 2007 - March 2016"
    }
  ] as EducationItem[],

  // Internship & Work Experience from Resume
  workExperience: [
    {
      company: "BSP - Commission on Audit",
      role: "On-the-Job Trainee",
      period: "January 2026 - May 2026",
      bulletPoints: [
        "Assisted in the preparation document checklists for procurement activities",
        "Organize and maintain records and documents in both hard and soft copies."
      ]
    },
    {
      company: "De La Salle University - Dasmariñas",
      role: "Student Assistant",
      period: "August 2022 - December 2023",
      bulletPoints: [
        "Handled incoming calls and recorded messages for staff members when they were unavailable.",
        "Provided administrative support by assisting with errands, purchasing supplies, and delivering items as needed."
      ]
    }
  ] as WorkExperienceItem[],

  // Leadership & Campus Involvement (Organizations) exactly from Resume
  orgInvolvements: [
    {
      organization: "DLSUD Patriots of Animal Welfare & Support",
      role: "Junior Officer for Public Relations",
      period: "September 2025 - July 2026",
      bulletPoints: [
        "Collaborated with team members to develop engaging captions for social media publication materials.",
        "Addressed the announcements, updates, and important information through appropriate communication channels."
      ]
    },
    {
      organization: "Circle of Student Assistants",
      role: "Director for Creatives",
      period: "August 2023 - July 2026",
      bulletPoints: [
        "Led creative brainstorming sessions to develop innovative marketing campaigns, enhancing brand visibility and engagement.",
        "Mentored junior officers, providing guidance and feedback to refine their skills and elevate overall team performance."
      ]
    },
    {
      organization: "Allied Business Students Collective",
      role: "Junior Officer for Membership & Sponsorship",
      period: "August 2024 - December 2024",
      bulletPoints: [
        "Coordinated sponsorship efforts, resulting in increased support and resources for student-led projects and events.",
        "Assisted in the execution of membership drives, successfully increasing participation and awareness of organizational benefits."
      ]
    },
    {
      organization: "DLSUD Lifters",
      committeeOrTeam: "WeInspire Committee",
      role: "WeInspire Committee Member",
      period: "August 2024 - December 2024",
      bulletPoints: [
        "Crafted engaging and audience-appropriate captions that enhanced the organization's online presence and event visibility.",
        "Helped establish a recognizable and professional organizational identity through well-curated social media communication."
      ]
    },
    {
      organization: "DLSUD Lifters",
      committeeOrTeam: "WeCreate Committee",
      role: "WeCreate Committee Member",
      period: "August 2023 - December 2023",
      bulletPoints: [
        "Coordinated creative campaigns, resulting in increased engagement and visibility for student-led projects and events.",
        "Streamlined creative production efforts, delivering consistent and impactful visuals for student events and campaigns."
      ]
    },
    {
      organization: "Allied Business Student Collective",
      role: "Junior Officer for Creatives",
      period: "August 2023 - December 2023",
      bulletPoints: [
        "Developed and implemented creative strategies for promotional campaigns, enhancing brand visibility and engagement among target audiences.",
        "Assisted in the development of marketing materials, ensuring adherence to brand guidelines and enhancing overall presentation quality."
      ]
    },
    {
      organization: "Circle of Student Assistants",
      role: "Director for Creatives OIC",
      period: "January 2023 - August 2023",
      bulletPoints: [
        "Supervised the creatives team in producing visual materials for organizational campaigns and university events.",
        "Delegated design tasks, guided team members, and maintained workflow efficiency under tight deadlines."
      ]
    },
    {
      organization: "Circle of Student Assistants",
      role: "Junior Officer for Creatives",
      period: "August 2022 - January 2023",
      bulletPoints: [
        "Developed creative concepts that effectively conveyed event themes and messages to the target audience.",
        "Utilized tools such as Canva and CapCut to create engaging content for both online and offline platforms."
      ]
    }
  ] as OrgInvolvement[],

  // Skills from Resume
  technicalSkills: [
    { name: "Social Media Management", level: "Primary Role", category: "Strategy & Page Management" },
    { name: "Content Planning & Scheduling", level: "Proficient", category: "Social Strategy" },
    { name: "Basic Video Editing (CapCut)", level: "Proficient", category: "Reels & TikToks" },
    { name: "Social Media Copywriting", level: "Proficient", category: "Captions & Hooks" },
    { name: "Canva", level: "Proficient", category: "Content Assets & Layouts" },
    { name: "Google Sheets & MS Excel", level: "Proficient", category: "Data & Organization" }
  ],

  // Certifications from Resume
  certifications: [
    { title: "Work Smarter with AI", year: "2026" },
    { title: "Graphic Design Essential", year: "2026" },
    { title: "AI Essentials 2026", year: "2026" },
    { title: "Marketing with Canva", year: "2026" },
    { title: "Scale Creative Campaigns", year: "2026" },
    { title: "AI Skills for Students", year: "2026" },
    { title: "Basic Graphics Editing", year: "2026" },
    { title: "Social Media Management", year: "2026" },
    { title: "Copywriting Training", year: "2026" },
    { title: "Basic Video Editing", year: "2026" }
  ],

  // Awards & Recognition from Resume
  awards: [
    { title: "Best Counterpart for Creatives", year: "2024" },
    { title: "Creative Excellence Award", year: "2024" },
    { title: "Promising LASO Member", year: "2019" }
  ],

  languages: ["English", "Filipino"],

  socialLinks: {
    facebook: "https://www.facebook.com/",
    gmail: "mailto:agnesabelido17@gmail.com",
    telegram: "https://t.me/",
    whatsapp: "https://wa.me/",
    onlinejobs: "https://www.onlinejobs.ph/",
    linkedin: "https://www.linkedin.com/"
  }
};

export const COPYWRITING_PIECES: CopywritingItem[] = [
  {
    id: "copy-1",
    title: "Teacher's Day Tribute",
    category: "Event & Advocacy",
    dateOrTag: "October 5, 2023",
    quote: "“Teaching is more than imparting knowledge. It is inspiring change.” — William Arthur Ward",
    body: "On this day, October 5, 2023, we celebrate Teacher's Day in honor of educators all around the world whose passion and dedication towards their work inspire and ignite the minds of many.\n\nHere's to the teachers who make learning an enjoyable experience with their unmatched patience and excellence at their work! On behalf of the community, we would like to thank all teachers for the efforts they have put in in order to share their wisdom and knowledge and educate this new generation.",
    language: "English"
  },
  {
    id: "copy-2",
    title: "Belated Birthday Greeting for Student Officer",
    category: "Community & Appreciation",
    dateOrTag: "Officer Birthday Post",
    quote: "“Belated Happy Birthday to our inspiring and dedicated student officer!”",
    body: "We may be a little late, but our wishes for you are just as heartfelt! Hoping that your special day was filled with love, laughter, and all the beautiful moments that you truly deserve. You are such a dedicated and passionate individual, and your work as a Junior Officer for Outreach Activities is truly admirable.\n\nAs you step into another year of your life, I hope it brings you countless blessings, exciting opportunities, and endless success. May you always find joy in the things you love and continue to shine as brightly as ever! Keep being the amazing person that you are, making a difference in the lives of others and spreading positivity wherever you go.\n\nWishing you nothing but happiness, good health, and success in all that you do!",
    language: "English"
  },
  {
    id: "copy-3",
    title: "Graduation Tribute for Former Officers",
    category: "Milestone & Recognition",
    dateOrTag: "Graduation Commendation",
    quote: "“A journey of a thousand miles begins with a single step.” — Sun Tzu",
    body: "Congratulations to our former officers on their graduation!\n\nWe're incredibly proud of your achievements and thankful for your dedicated service to our organization. Your hard work and commitment have made a real difference, leaving a lasting impact on our community.\n\nWe've witnessed your growth and development firsthand, and we're excited to see what you accomplish next.\n\nAs you embark on new chapters, know that you'll always have a special place in our hearts.\n\nWe wish you all the best in your future endeavors!\nWith warm appreciation,",
    language: "English"
  },
  {
    id: "copy-4",
    title: "Inside Out Committee Launch Campaign",
    category: "Recruitment & Culture",
    dateOrTag: "Committee Orientation",
    quote: "“Step into the diverse world of our organization's committees!”",
    body: "As you navigate through these corridors of creativity, you will find joy radiating from collaborative projects, sadness that fuels empathy and understanding, and the fiery passion of ambition and drive.\n\nEach committee is a unique blend of these emotional hues, merging to form a kaleidoscope of opportunities for our students. Just as Joy, Sadness, Anger, Fear, and Disgust harmonize within Riley's mind, our committees offer a space where different perspectives and talents converge to create something truly extraordinary.\n\nSo, come join us on this enriching journey where every emotion finds its place, and every student discovers their own colorful path towards growth and success.",
    language: "English"
  },
  {
    id: "copy-5",
    title: "Christmas Community Reflection",
    category: "Holiday & Warmth",
    dateOrTag: "Holiday Season Post",
    quote: "“Spread kindness to those around us and appreciate the simple joys.”",
    body: "As we celebrate this beautiful season, let's take a moment to spread kindness to those around us and appreciate the simple joys that make Christmas so special.\n\nIt's a time to reflect on the blessings of the year, cherish the traditions that bring us together, and create new memories with those we hold dear.\n\nMay the Christmas spirit fill our hearts not just today, but throughout the entire year. Wishing everyone love, joy, and peace this holiday season!",
    language: "English"
  },
  {
    id: "copy-6",
    title: "Ninoy Aquino Day Commemoration",
    category: "Historical & National",
    dateOrTag: "National Commemoration",
    quote: "“Remember the courage. Honor the sacrifice. Carry the legacy.”",
    body: "Today, we remember Ninoy Aquino and the courage he showed in standing up for the Filipino people. His sacrifice reminds us that loving our country means having the courage to stand for what is right, even in the face of challenges and adversity.\n\nHis story will forever remain a meaningful part of our history, reminding us of the importance of freedom, courage, and patriotism. May his legacy continue to inspire us to value and protect the freedom we have today.",
    language: "English"
  },
  {
    id: "copy-7",
    title: "Easter Sunday Reflection",
    category: "Inspirational & Faith",
    dateOrTag: "Easter Sunday",
    quote: "“He is not here; He has risen, just as He said.” — Matthew 28:6",
    body: "Easter Sunday reminds us that hope is never buried for long. The resurrection of Christ is a powerful promise that even in our darkest moments, light will always break through. It speaks of renewal, grace, and the unshakable truth that love conquers all.\n\nMay this day fill your heart with peace and quiet joy, knowing that new beginnings are always possible through faith. Let the miracle of the resurrection inspire you to rise above every challenge and walk forward with hope, courage, and a renewed spirit.",
    language: "English"
  },
  {
    id: "copy-8",
    title: "End of March Mindful Reflection (Tagalog)",
    category: "Student Life & Reflection",
    dateOrTag: "Monthly Check-in",
    quote: "“Patapos na ang March, kamusta ka naman?”",
    body: "Naging magaan ba ang buwan mo, o medyo mabigat? Marami ka bang natupad sa mga plano mo, o may mga bagay na gusto mo pang habulin bago tuluyang magsara ang buwan? Minsan, ang bilis lang talaga ng panahon na hindi natin namamalayan kung nasaan na tayo.\n\nHabang papalapit ang bagong buwan, ano ang gusto mong dalhin at ano ang handa mo nang iwan? May small wins ka ba this March na proud ka, kahit gaano pa kaliit? At kung may pagkakataon ka pang gawin o sabihin ang isang bagay bago matapos ang buwan, ano iyon?\n\nShare your thoughts, let's reflect together.",
    language: "Filipino"
  },
  {
    id: "copy-9",
    title: "Araw ng Kalayaan (128th Independence Day)",
    category: "National Day & Pride",
    dateOrTag: "Araw ng Kalayaan",
    quote: "“Walang tunay na kalayaan kung walang kaginhawaan.” — Andrés Bonifacio y de Castro",
    body: "Ang ating watawat na winawagayway ay isang simbolo ng mga kwento ng pakikibaka na ating ginugunita. Ang kalayaan na bunga ng tapang, pagkakaisa, at pagmamahal sa bayan.\n\nNawa'y magsilbi itong paalala na ang tunay na kalayaan ay hindi lamang isang pamana ng nakaraan, kundi isang responsibilidad na dapat nating pangalagaan at ipagpatuloy para sa susunod na henerasyon. Sapagkat ang kalayaan ay hindi lamang alaala ng nakaraan, ito ay pananagutang isinasabuhay sa kasalukuyan.\n\nNgayon, higit kailanman, nawa'y maging inspirasyon ang ating kasaysayan upang patuloy na mahalin, paglingkuran, at ipaglaban ang bayan.\n\nMaligayang ika-128 na Araw ng Kalayaan, Pilipinas!",
    language: "Filipino"
  },
  {
    id: "copy-10",
    title: "Monday Motivation",
    category: "Campus Humor & Motivation",
    dateOrTag: "Monday Motivation Series",
    quote: "“New day, new struggles—but we move.”",
    body: "Happy Monday!\n\nNew day, new struggles—but we move. If your alarm clock felt like your biggest enemy today, just know you're not alone. Show up, do what you can, and pretend you understood the lesson (we'll figure it out later).\n\nRemember: passing is passing, and coffee is basically a personality at this point.\n\nHave a nice Monday—stay awake, stay submitting, and may your Wi-Fi be strong and your deadlines be forgiving!",
    language: "English"
  }
];

export const PROJECTS: ProjectItem[] = [
  // Pubmats & Graphics (Human Works)
  {
    id: "pubmat-1",
    templateCardId: "pubmat-card-one",
    templateImageId: "pubmat-image-one",
    templateTitleId: "pubmat-title-one",
    templateDescId: "pubmat-description-one",
    category: "pubmats",
    title: "Eunoia: Cultivating Bright Minds, Shaping Future",
    shortDescription: "Flagship educational leadership poster and publication material.",
    fullDescription: "Flagship educational leadership poster and publication material created for the university scholar community.",
    imageUrl: "/src/assets/images/eunoia_cultivating_pubmat_1791521830021.jpg",
    client: "Circle of Student Assistants",
    year: "2023 - 2024",
    deliverables: ["Official Facebook Pubmat", "Event Poster"],
    tools: ["Canva", "Graphic Design"],
    accentColor: "#b75078"
  },
  {
    id: "pubmat-2",
    templateCardId: "pubmat-card-two",
    templateImageId: "pubmat-image-two",
    templateTitleId: "pubmat-title-two",
    templateDescId: "pubmat-description-two",
    category: "pubmats",
    title: "CoSA Chronicles: Complete, Overcome, Succeed All",
    shortDescription: "Dramatic Squid Game-inspired narrative event pubmat.",
    fullDescription: "Dramatic Squid Game-inspired narrative event pubmat with red carpet perspective and symbolic framing.",
    imageUrl: "/src/assets/images/pubmat_event_poster_1791448702010.jpg",
    client: "Circle of Student Assistants",
    year: "2024",
    deliverables: ["Thematic Banner", "Social Teaser"],
    tools: ["Canva", "Graphic Layout"],
    accentColor: "#8e44ad"
  },
  {
    id: "pubmat-3",
    category: "pubmats",
    title: "Boop Me Baby! Retro Celebration Pubmat",
    shortDescription: "Playful Betty Boop retro pop-culture aesthetic pubmat.",
    fullDescription: "Playful Betty Boop retro pop-culture aesthetic pubmat with disco chrome typography and vintage charm.",
    imageUrl: "/src/assets/images/boop_me_baby_pubmat_1791521757078.jpg",
    client: "Student Organization Campaign",
    year: "2024",
    deliverables: ["Square Facebook Pubmat", "Story Teaser"],
    tools: ["Canva", "Typography Layout"],
    accentColor: "#e74c3c"
  },
  {
    id: "pubmat-4",
    category: "pubmats",
    title: "Handa Ka Na Bang Makisaya Sa Ating Muling Pagkikita?",
    shortDescription: "Traditional Filipiniana cultural celebration pubmat.",
    fullDescription: "Traditional Filipiniana cultural celebration pubmat with Barong and Filipiniana dress illustration and warm heritage hall.",
    imageUrl: "/src/assets/images/filipiniana_muling_pagkikita_1791640568518.jpg",
    client: "Student Organization Campaign",
    year: "2024",
    deliverables: ["Cultural Event Poster", "Social Announcement"],
    tools: ["Canva", "Illustration Composition"],
    accentColor: "#c0392b"
  },
  {
    id: "pubmat-5",
    category: "pubmats",
    title: "Ninoy Aquino Day: Daily News Commemorative Edition",
    shortDescription: "Historical newspaper editorial commemorative layout.",
    fullDescription: "Historical newspaper editorial commemorative layout with classic monochrome journalistic typography.",
    imageUrl: "/src/assets/images/asj_pubmat_edition_1791521794274.jpg",
    client: "High School Library",
    year: "2023",
    deliverables: ["Library Social Pubmat", "Bulletin Print"],
    tools: ["Canva", "Newspaper Grid Layout"],
    accentColor: "#34495e"
  },

  // Merch Mockups (Human Works)
  {
    id: "mockup-1",
    templateCardId: "mockup-card-one",
    templateImageId: "mockup-image-one",
    templateTitleId: "mockup-title-one",
    templateDescId: "mockup-description-one",
    category: "mockups",
    title: "Round Button Pin Badges Collection",
    shortDescription: "Enamel and button pin badges: Animo La Salle, Iska Mascot, and Iskolar Ako Prawd Ako.",
    fullDescription: "Complete button pin badges set: Animo La Salle green star pin, Iska mascot cute badge, and Iskolar Ako Prawd Ako emblem.",
    imageUrl: "/src/assets/images/merch_button_pins_1791640751271.jpg",
    client: "Circle of Student Assistants",
    year: "2023 - 2024",
    deliverables: ["3x Button Pin Badges", "Production Vector Files"],
    tools: ["Canva", "Badge Mockup"],
    accentColor: "#27ae60"
  },
  {
    id: "mockup-2",
    templateCardId: "mockup-card-two",
    templateImageId: "mockup-image-two",
    templateTitleId: "mockup-title-two",
    templateDescId: "mockup-description-two",
    category: "mockups",
    title: "Iskolar Apparel Streetwear T-Shirts",
    shortDescription: "Streetwear black pocket tee and white back-print typography shirts.",
    fullDescription: "Clean apparel mockups showing student assistant merchandise: black pocket shirt 'I am proud to be an Iskolar' and white shirt back print 'Iskolar Ako, Prawd Ako'.",
    imageUrl: "/src/assets/images/merch_apparel_shirts_1791640767754.jpg",
    client: "Circle of Student Assistants",
    year: "2024",
    deliverables: ["Front & Back T-Shirt Mockups", "Print Ready Specs"],
    tools: ["Canva", "Apparel Design"],
    accentColor: "#2c3e50"
  },
  {
    id: "mockup-3",
    category: "mockups",
    title: "Campus Merchandise Suite: Lanyard, Tote Bag & Jacket",
    shortDescription: "Complete university merchandise showcase featuring lanyard, tote bag, hoodie jacket and shirt.",
    fullDescription: "Merchandise design presentations displaying organization branding across lanyards, tote bags, hoodies, and shirts for university event drives.",
    imageUrl: "/src/assets/images/brand_mockup_showcase_1791448633645.jpg",
    client: "Student Organization Merchandise",
    year: "2024",
    deliverables: ["Lanyard Mockup", "Tote Bag Mockup", "Jacket Mockup"],
    tools: ["Canva", "Product Mockup Templates"],
    accentColor: "#16a085"
  },
  {
    id: "mockup-4",
    category: "mockups",
    title: "Artisan Coffee Packaging & Cup Mockup",
    shortDescription: "Specialty coffee bean pouch and paper cup branding for campus cafe kiosk.",
    fullDescription: "Branded coffee packaging preview showing modern kraft pouch layout and stamped hot cup sleeve.",
    imageUrl: "/src/assets/images/mockup_coffee_packaging_1791448720524.jpg",
    client: "Student Entrepreneur Hub",
    year: "2024",
    deliverables: ["Coffee Pouch Mockup", "Takeaway Cup Sleeve"],
    tools: ["Canva", "Packaging Mockup"],
    accentColor: "#d35400"
  },
  {
    id: "mockup-5",
    category: "mockups",
    title: "Scholar Pride Enamel Pin Badges",
    shortDescription: "Collectible metallic enamel badge series for student leaders.",
    fullDescription: "Glossy hard-enamel pin badge previews with gold metal trim and organization colors.",
    imageUrl: "/src/assets/images/merch_button_pins_1791640751271.jpg",
    client: "Circle of Student Assistants",
    year: "2024",
    deliverables: ["Enamel Pin Renders", "Backing Card Design"],
    tools: ["Canva", "Pin Design"],
    accentColor: "#8e44ad"
  },

  // DP Blasts (Human Works - Facebook Profile Picture Frames)
  {
    id: "dpblast-1",
    templateCardId: "dpblast-card-one",
    templateImageId: "dpblast-image-one",
    templateTitleId: "dpblast-title-one",
    templateDescId: "dpblast-description-one",
    category: "dpblasts",
    title: "Bear the Love: Care Bears DP Blast Frame",
    shortDescription: "Playful Care Bears Facebook profile picture blast frame with rainbow cloud banner.",
    fullDescription: "Custom Facebook avatar frame featuring colorful Care Bears welcoming new scholars during student recruitment fest.",
    imageUrl: "/src/assets/images/dp_blast_carebears_1791640541713.jpg",
    client: "Circle of Student Assistants",
    year: "2024 - 2025",
    deliverables: ["Facebook DP Frame", "Avatar Overlay Guide"],
    tools: ["Canva", "Profile Frame Template"],
    accentColor: "#b75078"
  },
  {
    id: "dpblast-2",
    templateCardId: "dpblast-card-two",
    templateImageId: "dpblast-image-two",
    templateTitleId: "dpblast-title-two",
    templateDescId: "dpblast-description-two",
    category: "dpblasts",
    title: "Eunoia: Cultivating Bright Minds Profile Frame",
    shortDescription: "Pastel stars polaroid profile blast frame with clean Lasallian org accreditation.",
    fullDescription: "Polaroid-inspired display picture frame designed for scholar leadership event participant avatars.",
    imageUrl: "/src/assets/images/pubmat_campaign_showcase_1791448592913.jpg",
    client: "Circle of Student Assistants",
    year: "2023",
    deliverables: ["Polaroid Frame Overlay", "Social Media Launch Post"],
    tools: ["Canva", "Photo Frame Design"],
    accentColor: "#2980b9"
  },
  {
    id: "dpblast-3",
    category: "dpblasts",
    title: "Co-Shopee for a Cause Tropical Frame",
    shortDescription: "Tropical beach summer photo frame with starfish and monstera leaves.",
    fullDescription: "Fundraising display picture frame with tropical floral border and student assistant badges.",
    imageUrl: "/src/assets/images/mac_finder_picnic_1791449582098.jpg",
    client: "Circle of Student Assistants",
    year: "2023",
    deliverables: ["Fundraising DP Frame", "Instruction Blast"],
    tools: ["Canva", "Tropical Graphic Design"],
    accentColor: "#27ae60"
  },
  {
    id: "dpblast-4",
    category: "dpblasts",
    title: "Buwan ng Wika Cultural Heritage Avatar Frame",
    shortDescription: "Traditional Baybayin and heritage border for cultural month profile pictures.",
    fullDescription: "Filipino cultural heritage Facebook avatar frame with woven patterns and traditional typography.",
    imageUrl: "/src/assets/images/filipiniana_muling_pagkikita_1791640568518.jpg",
    client: "Student Organization Campaign",
    year: "2024",
    deliverables: ["Cultural DP Frame", "Profile Campaign Post"],
    tools: ["Canva", "Heritage Design"],
    accentColor: "#c0392b"
  },
  {
    id: "dpblast-5",
    category: "dpblasts",
    title: "Retro Disco Vibes Celebration Frame",
    shortDescription: "Glitter chrome frame for student organization anniversary bash.",
    fullDescription: "Playful retro disco display picture frame with sparkling chrome stars and party banners.",
    imageUrl: "/src/assets/images/boop_me_baby_pubmat_1791521757078.jpg",
    client: "Student Organization Campaign",
    year: "2024",
    deliverables: ["Anniversary DP Frame", "Story Overlay"],
    tools: ["Canva", "Pop Graphic Design"],
    accentColor: "#e74c3c"
  },

  // Videos (Human Campus & Motion Works)
  {
    id: "video-1",
    templateCardId: "video-card-one",
    templateImageId: "video-image-one",
    templateTitleId: "video-title-one",
    templateDescId: "video-description-one",
    category: "videos",
    title: "Intramurals 2025: Palarong Lasalyano Gym Festival Vlog",
    shortDescription: "Vlog documenting student spirit, cheer dance routines, torch lighting, and arena crowd energy.",
    fullDescription: "Full campus event vlog documentation of Intramurals 2025: Palarong Lasalyano, edited with cheer dance pacing, kinetic titles, and stadium cheers by Agnes Abelido.",
    imageUrl: "/src/assets/images/video_intramurals_2025_1791641053948.jpg",
    client: "Campus Life & Intramurals",
    year: "2025",
    deliverables: ["Campus Vlog Edit", "Highlight Reels", "Audio Mixing"],
    tools: ["CapCut", "Video Editing", "Pacing"],
    accentColor: "#27ae60"
  },
  {
    id: "video-2",
    templateCardId: "video-card-two",
    templateImageId: "video-image-two",
    templateTitleId: "video-title-two",
    templateDescId: "video-description-two",
    category: "videos",
    title: "Level Up Your Financial Game Retro Arcade Animation",
    shortDescription: "Pixel-art Pac-Man retro arcade machine motion screen animation for student finance seminar.",
    fullDescription: "Retro 8-bit arcade machine motion graphic created for financial literacy campaign announcement, featuring animated arcade CRT maze screen and joystick controls.",
    imageUrl: "/src/assets/images/video_arcade_financial_1791640952477.jpg",
    client: "Circle of Student Assistants",
    year: "2025",
    deliverables: ["Arcade Screen Animation", "Square Video Motion", "Sound Effects Sync"],
    tools: ["CapCut", "Pixel Art Motion", "Sound FX"],
    accentColor: "#f39c12"
  },
  {
    id: "video-3",
    category: "videos",
    title: "Midterms Campus Celebration Dance Reel",
    shortDescription: "Upbeat student celebration reel set to Beyonce choreography marking the end of midterms.",
    fullDescription: "Energetic short-form campus celebration video created for student relief after midterm examinations, featuring synchronized choreography and student community humor.",
    imageUrl: "/src/assets/images/video_creator_reel_1791448653222.jpg",
    client: "Student Community Reel",
    year: "2024",
    deliverables: ["Vertical 9:16 Reel", "Caption & Hashtag Hook"],
    tools: ["CapCut", "Beat Syncing"],
    accentColor: "#e67e22"
  },
  {
    id: "video-4",
    category: "videos",
    title: "University Food Fest & Street Market Reel",
    shortDescription: "Mouthwatering food crawl reel spotlighting student food trucks and bake sales.",
    fullDescription: "Dynamic food tasting recap reel with jump cuts, trending audio, and appetizing color grading.",
    imageUrl: "/src/assets/images/video_food_promo_1791448759741.jpg",
    client: "Campus Food Committee",
    year: "2024",
    deliverables: ["Food Crawl Reel", "Story Cuts"],
    tools: ["CapCut", "Color Grading", "Pacing"],
    accentColor: "#d35400"
  },
  {
    id: "video-5",
    category: "videos",
    title: "Pep Rally & Torch Lighting Ceremony Highlights",
    shortDescription: "Slow-motion recap of the torch lighting ceremony and stadium drumlines.",
    fullDescription: "Cinematic sports fest hype video edited with energetic rhythmic cuts and arena cheers.",
    imageUrl: "/src/assets/images/video_intramurals_2025_1791641053948.jpg",
    client: "Athletics Directorate",
    year: "2025",
    deliverables: ["Ceremony Teaser", "Audio Sync"],
    tools: ["CapCut", "Speed Ramping"],
    accentColor: "#27ae60"
  },

  // AI Concepts (AI Generated Images & Videos)
  // --- The 5 AI Generated Images ---
  {
    id: "ai-1",
    templateCardId: "ai-card-one",
    templateImageId: "ai-image-one",
    templateTitleId: "ai-title-one",
    templateDescId: "ai-description-one",
    category: "ai",
    title: "CalmLeaf Herbal Tea: Lavender & Lemon Balm",
    shortDescription: "AI commercial concept: 'Pause. Breathe. Begin Again.' soothing herbal tea campaign.",
    fullDescription: "AI product commercial concept photograph featuring CalmLeaf Herbal Tea packaging, pyramid tea bag, and student sipping tea in warm morning sun.",
    imageUrl: "/src/assets/images/ai_calmleaf_tea_1791640421961.jpg",
    client: "AI Brand Concept",
    year: "2026",
    deliverables: ["Product Commercial Visual", "Package Concept"],
    tools: ["Generative AI", "Prompt Engineering"],
    accentColor: "#27ae60"
  },
  {
    id: "ai-2",
    templateCardId: "ai-card-two",
    templateImageId: "ai-image-two",
    templateTitleId: "ai-title-two",
    templateDescId: "ai-description-two",
    category: "ai",
    title: "StudyRise Focus Cocoa: Ready For The Next Challenge",
    shortDescription: "AI commercial concept: Lion's Mane cocoa drink for late-night study sessions.",
    fullDescription: "AI commercial concept visual highlighting StudyRise Focus Cocoa canister on a warm study desk with textbooks, laptop, and cozy desk lamp.",
    imageUrl: "/src/assets/images/ai_studyrise_cocoa_1791640440051.jpg",
    client: "AI Brand Concept",
    year: "2026",
    deliverables: ["Night Study Ad Visual", "Canister Product Render"],
    tools: ["Generative AI", "Lighting Tuning"],
    accentColor: "#d35400"
  },
  {
    id: "ai-3",
    category: "ai",
    title: "CreatePop Citrus Spark: Make Room For Ideas",
    shortDescription: "AI commercial concept: Sparkling drink for student creators and illustrators.",
    fullDescription: "AI commercial concept visual capturing CreatePop Citrus Spark bottle alongside a creative student drawing in a sunlit art studio.",
    imageUrl: "/src/assets/images/ai_createpop_citrus_1791640456224.jpg",
    client: "AI Brand Concept",
    year: "2026",
    deliverables: ["Creative Studio Ad Visual", "Beverage Bottle Concept"],
    tools: ["Generative AI", "Artistic Direction"],
    accentColor: "#f1c40f"
  },
  {
    id: "ai-4",
    category: "ai",
    title: "GoodDay Funtastic Mocca: Good Energy For Your Next Chapter",
    shortDescription: "AI commercial concept: Energizing coffee milk drink for morning routines.",
    fullDescription: "AI commercial visual displaying GoodDay Funtastic Mocca bottle on a bright morning desk with a smiling student looking ahead.",
    imageUrl: "/src/assets/images/ai_goodday_mocca_1791640472027.jpg",
    client: "AI Brand Concept",
    year: "2026",
    deliverables: ["Morning Energy Ad Visual", "Packaging Concept"],
    tools: ["Generative AI", "Commercial Staging"],
    accentColor: "#e67e22"
  },
  {
    id: "ai-5",
    category: "ai",
    title: "DLSU Student Life: Future Economist Study Room",
    shortDescription: "AI student lifestyle visual: Economics student in green DLSU sweatshirt studying at sunset.",
    fullDescription: "AI student lifestyle photography featuring a university student in green DLSU sweatshirt reviewing economics textbooks with laptop and sunset horizon.",
    imageUrl: "/src/assets/images/ai_dlsu_economist_1791640522742.jpg",
    client: "AI Campus Concept",
    year: "2026",
    deliverables: ["Campus Lifestyle Visual", "Lighting & Scene Synthesis"],
    tools: ["Generative AI", "Concept Design"],
    accentColor: "#1e824c"
  },
  // --- AI Generated Videos ---
  {
    id: "ai-6",
    category: "ai",
    title: "Woodland Village Fantasy Journey",
    shortDescription: "AI video generation: Cozy journey through a whimsical fairy woodland village at golden hour.",
    fullDescription: "AI generative video exploration gliding through charming mossy cottages, tree trunk homes, and warm lantern-lit stone paths at sunset.",
    imageUrl: "/src/assets/images/woodland_village_video_thumb_1791521840694.jpg",
    client: "AI Video Concept",
    year: "2026",
    deliverables: ["Cinematic 3D Video", "Prompt Animation"],
    tools: ["AI Video Generation", "Prompt Design"],
    accentColor: "#27ae60"
  },
  {
    id: "ai-7",
    category: "ai",
    title: "Underwater Metropolis Descent",
    shortDescription: "AI video generation: Cinematic descent into a futuristic transparent domed city on the ocean floor.",
    fullDescription: "AI video generation diving beneath turquoise waters past glowing coral gardens and manta rays into a high-tech transparent domed city.",
    imageUrl: "/src/assets/images/underwater_city_video_thumb_1791521851381.jpg",
    client: "AI Video Concept",
    year: "2026",
    deliverables: ["Sci-Fi Cinematic Video", "Underwater Motion"],
    tools: ["AI Video Generation", "Fluid Simulation"],
    accentColor: "#2980b9"
  },
  {
    id: "ai-8",
    category: "ai",
    title: "StudyFuel Student Commercial",
    shortDescription: "AI video generation: Realistic lifestyle commercial in a sunlit student study room.",
    fullDescription: "AI generative commercial depicting a college student reaching for a sleek StudyFuel can beside notebooks and laptop in warm morning light.",
    imageUrl: "/src/assets/images/studyfuel_commercial_thumb_1791521862610.jpg",
    client: "AI Video Concept",
    year: "2026",
    deliverables: ["Commercial Video Spot", "Camera Move Synthesis"],
    tools: ["AI Video Generation", "Commercial Direction"],
    accentColor: "#e67e22"
  },
  {
    id: "ai-9",
    category: "ai",
    title: "Cosmic Odyssey Deep Space Voyage",
    shortDescription: "AI video generation: Cinematic journey from Earth past the Moon through asteroid fields and nebulae.",
    fullDescription: "AI space journey video sweeping from Earth orbit past lunar craters into colorful nebulae, ringed planets, and swirling galaxies.",
    imageUrl: "/src/assets/images/ai_dreamscape_art_1791448614839.jpg",
    client: "AI Video Concept",
    year: "2026",
    deliverables: ["Deep Space Video", "Astrophotography Simulation"],
    tools: ["AI Video Generation", "Cosmic Physics"],
    accentColor: "#8e44ad"
  },
  {
    id: "ai-10",
    category: "ai",
    title: "Cybernetic Botanical Garden Motion Simulation",
    shortDescription: "AI video generation: Glowing bioluminescent flowers and robotic butterflies floating in twilight.",
    fullDescription: "AI generative video loop visualizing futuristic bioluminescent flora and gentle light particles glowing in a glass greenhouse.",
    imageUrl: "/src/assets/images/ai_character_portrait_1791448744268.jpg",
    client: "AI Video Concept",
    year: "2026",
    deliverables: ["Motion Simulation", "Particle Lighting Synthesis"],
    tools: ["AI Video Generation", "Concept Lighting"],
    accentColor: "#9b59b6"
  }
];

export const SERVICES = [
  {
    title: "Social Media Management & Strategy (Primary Focus)",
    iconName: "Sparkles",
    description: "End-to-end page management, weekly content scheduling, feed curation, and audience engagement support to grow your brand or club's presence.",
    turnaround: "Flexible / Retainer",
    deliverables: ["Content posting calendar & schedule", "Page engagement & message handling", "Cohesive brand aesthetic", "Monthly activity check-ins"]
  },
  {
    title: "Social Media Copywriting & Captions",
    iconName: "PenTool",
    description: "Friendly, engaging captions for event announcements, holiday greetings, and student posts in clear English or Filipino.",
    turnaround: "Flexible",
    deliverables: ["Captions ready to copy & paste", "Helpful hashtags & hooks", "English or Tagalog tone"]
  },
  {
    title: "Short-Form Video Editing (CapCut)",
    iconName: "Video",
    description: "Simple, engaging short video edits for TikTok, Facebook, and Instagram reels with smooth cuts, on-screen text, and trending audio.",
    turnaround: "Flexible",
    deliverables: ["Vertical 9:16 reels & clips", "Clear captions and text", "Background music synchronization"]
  },
  {
    title: "Admin VA",
    iconName: "CheckCircle2",
    description: "Reliable virtual assistance focusing on data encoding, replying to emails politely, and arranging files and folders neatly.",
    turnaround: "Flexible",
    deliverables: ["Accurate data encoding (Excel / Sheets)", "Replying to emails & inquiries", "Files & Google Drive arranging"]
  },
  {
    title: "Publication Materials (Pubmats)",
    iconName: "Layout",
    description: "Simple and neat event posters, announcement flyers, and social media pubmats for school organizations, clubs, and student activities.",
    turnaround: "Flexible",
    deliverables: ["High-resolution PNG exports", "Canva editable link", "Colors matched to your theme"]
  },
  {
    title: "Merch Mockups",
    iconName: "Shirt",
    description: "Visual previews for t-shirt layouts, pin button badges, and tote bags so your organization can see how items look before printing.",
    turnaround: "Flexible",
    deliverables: ["T-shirt & pin button mockups", "Clear digital previews", "Print-ready layout help"]
  },
  {
    title: "DP Blasts (Display Picture Frames)",
    iconName: "Frame",
    description: "Custom Facebook profile picture frames for student org campaigns, welcoming new members, and campus events that anyone can easily use.",
    turnaround: "Flexible",
    deliverables: ["Transparent PNG frame overlays", "Easy frame instructions", "Thematic organization colors"]
  }
];
