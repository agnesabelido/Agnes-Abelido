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
  name: "Agnes Abelido",
  preferredName: "Agnes",
  avatarUrl: "/agnes_portrait.svg",
  wallpaperUrl: "/agnes_wallpaper.jpg",
  eyebrow: "[ i'm a student ] · [ i'm a social media manager! ]",
  role: "Graphic Design · Pubmats · Video Editing · Merch Mockups · DP Blasts · Copywriting",
  heroTitle: "get to know me!",
  heroDescription: "I'm a student and social media manager passionate about turning ideas into eye-catching content. I create engaging visuals and social media content designed to help brands stand out, connect with their audience, and grow their online presence.",
  email: "agnesabelido17@gmail.com",
  phone: "09951482072",
  location: "General Trias City, Cavite, 4107, Philippines",
  availability: "Open for freelance projects, social media management & creative collaborations",
  experienceYears: "4 Years",
  experienceContext: "in making graphics through school organizations",
  projectsCompleted: "35+ Org Pubmats & Campaigns",

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
      school: "Academy of Saint John La Salle Greenhills Supervised",
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

  // Technical Skills from Resume
  technicalSkills: [
    { name: "Canva", level: "Advanced", category: "Graphic Design & Pubmats" },
    { name: "MS Word", level: "Advanced", category: "Documentation & Copy" },
    { name: "MS Excel", level: "Proficient", category: "Data & Spreadsheets" },
    { name: "Google Sheets", level: "Proficient", category: "Data Organization" },
    { name: "Basic Video Editing (CapCut)", level: "Basic / Intermediate", category: "Reels & Videos" },
    { name: "Social Media Management", level: "Specialist", category: "Planning & Captions" }
  ],

  // Certifications from Resume
  certifications: [
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
    dateOrTag: "October 5, 2023 · CoSA Family",
    quote: "“Teaching is more than imparting knowledge. It is inspiring change.” — William Arthur Ward",
    body: "On this day, October 5, 2023, we celebrate Teacher's Day in honor of educators all around the world whose passion and dedication towards their work inspire and ignite the minds of many.\n\nHere's to the teachers who make learning an enjoyable experience with their unmatched patience and excellence at their work! On behalf of the Lasallian community, your CoSA Family would like to thank all teachers for the efforts they have put in in order to share their wisdom and knowledge and educate this new generation.",
    language: "English"
  },
  {
    id: "copy-2",
    title: "Belated Birthday Greeting for Officer Chiralexi",
    category: "Community & Appreciation",
    dateOrTag: "Officer Birthday Post · CoSA",
    quote: "“Belated Happy Birthday to the wonderful and inspiring Chiralexi Tejada!”",
    body: "We may be a little late, but our wishes for you are just as heartfelt! Hoping that your special day was filled with love, laughter, and all the beautiful moments that you truly deserve. You are such a dedicated and passionate individual, and your work as the Junior Officer for Outreach Activities is truly admirable.\n\nAs you step into another year of your life, I hope it brings you countless blessings, exciting opportunities, and endless success. May you always find joy in the things you love and continue to shine as brightly as ever! Keep being the amazing person that you are, making a difference in the lives of others and spreading positivity wherever you go.\n\nWishing you nothing but happiness, good health, and success in all that you do!",
    language: "English"
  },
  {
    id: "copy-3",
    title: "Graduation Tribute for Former Officers",
    category: "Milestone & Recognition",
    dateOrTag: "Graduation Commendation · CoSA",
    quote: "“A journey of a thousand miles begins with a single step.” — Sun Tzu",
    body: "Congratulations to our former officers on their graduation!\n\nWe're incredibly proud of your achievements and thankful for your dedicated service to our organization. Your hard work and commitment have made a real difference, leaving a lasting impact on our community.\n\nWe've witnessed your growth and development firsthand, and we're excited to see what you accomplish next.\n\nAs you embark on new chapters, know that you'll always have a special place in our hearts.\n\nWe wish you all the best in your future endeavors!\nLove, CoSA",
    language: "English"
  },
  {
    id: "copy-4",
    title: "Inside Out Committee Launch Campaign",
    category: "Recruitment & Culture",
    dateOrTag: "Committee Orientation · CoSA",
    quote: "“Step into the diverse world of our organization's committees!”",
    body: "As you navigate through these corridors of creativity, you will find joy radiating from collaborative projects, sadness that fuels empathy and understanding, and the fiery passion of ambition and drive.\n\nEach committee is a unique blend of these emotional hues, merging to form a kaleidoscope of opportunities for our students. Just as Joy, Sadness, Anger, Fear, and Disgust harmonize within Riley's mind, our committees offer a space where different perspectives and talents converge to create something truly extraordinary.\n\nSo, come join us on this enriching journey where every emotion finds its place, and every student discovers their own colorful path towards growth and success.",
    language: "English"
  },
  {
    id: "copy-5",
    title: "Christmas Community Reflection",
    category: "Holiday & Warmth",
    dateOrTag: "Holiday Season Post · CoSA",
    quote: "“Spread kindness to those around us and appreciate the simple joys.”",
    body: "As we celebrate this beautiful season, let's take a moment to spread kindness to those around us and appreciate the simple joys that make Christmas so special.\n\nIt's a time to reflect on the blessings of the year, cherish the traditions that bring us together, and create new memories with those we hold dear.\n\nMay the Christmas spirit fill our hearts not just today, but throughout the entire year. Wishing everyone love, joy, and peace this holiday season!",
    language: "English"
  },
  {
    id: "copy-6",
    title: "Ninoy Aquino Day Commemoration",
    category: "Historical & National",
    dateOrTag: "National Commemoration · ASJ & CoSA",
    quote: "“Remember the courage. Honor the sacrifice. Carry the legacy.”",
    body: "Today, we remember Ninoy Aquino and the courage he showed in standing up for the Filipino people. His sacrifice reminds us that loving our country means having the courage to stand for what is right, even in the face of challenges and adversity.\n\nHis story will forever remain a meaningful part of our history, reminding us of the importance of freedom, courage, and patriotism. May his legacy continue to inspire us to value and protect the freedom we have today.",
    language: "English"
  },
  {
    id: "copy-7",
    title: "Easter Sunday Reflection",
    category: "Inspirational & Faith",
    dateOrTag: "Easter Sunday · CoSA",
    quote: "“He is not here; He has risen, just as He said.” — Matthew 28:6",
    body: "Easter Sunday reminds us that hope is never buried for long. The resurrection of Christ is a powerful promise that even in our darkest moments, light will always break through. It speaks of renewal, grace, and the unshakable truth that love conquers all.\n\nMay this day fill your heart with peace and quiet joy, knowing that new beginnings are always possible through faith. Let the miracle of the resurrection inspire you to rise above every challenge and walk forward with hope, courage, and a renewed spirit.",
    language: "English"
  },
  {
    id: "copy-8",
    title: "End of March Mindful Reflection (Tagalog)",
    category: "Student Life & Reflection",
    dateOrTag: "Monthly Check-in · CoSA Community",
    quote: "“Patapos na ang March, kamusta ka naman?”",
    body: "Naging magaan ba ang buwan mo, o medyo mabigat? Marami ka bang natupad sa mga plano mo, o may mga bagay na gusto mo pang habulin bago tuluyang magsara ang buwan? Minsan, ang bilis lang talaga ng panahon na hindi natin namamalayan kung nasaan na tayo.\n\nHabang papalapit ang bagong buwan, ano ang gusto mong dalhin at ano ang handa mo nang iwan? May small wins ka ba this March na proud ka, kahit gaano pa kaliit? At kung may pagkakataon ka pang gawin o sabihin ang isang bagay bago matapos ang buwan, ano iyon?\n\nShare your thoughts, let's reflect together.",
    language: "Filipino"
  },
  {
    id: "copy-9",
    title: "Araw ng Kalayaan (128th Independence Day)",
    category: "National Day & Pride",
    dateOrTag: "Araw ng Kalayaan · CoSA & DLSUD",
    quote: "“Walang tunay na kalayaan kung walang kaginhawaan.” — Andrés Bonifacio y de Castro",
    body: "Ang ating watawat na winawagayway ay isang simbolo ng mga kwento ng pakikibaka na ating ginugunita. Ang kalayaan na bunga ng tapang, pagkakaisa, at pagmamahal sa bayan.\n\nNawa'y magsilbi itong paalala na ang tunay na kalayaan ay hindi lamang isang pamana ng nakaraan, kundi isang responsibilidad na dapat nating pangalagaan at ipagpatuloy para sa susunod na henerasyon. Sapagkat ang kalayaan ay hindi lamang alaala ng nakaraan, ito ay pananagutang isinasabuhay sa kasalukuyan.\n\nNgayon, higit kailanman, nawa'y maging inspirasyon ang ating kasaysayan upang patuloy na mahalin, paglingkuran, at ipaglaban ang bayan.\n\nMaligayang ika-128 na Araw ng Kalayaan, Pilipinas!",
    language: "Filipino"
  },
  {
    id: "copy-10",
    title: "Monday Motivation for Ka-CoSA",
    category: "Campus Humor & Motivation",
    dateOrTag: "Monday Motivation Series · CoSA",
    quote: "“New day, new struggles—but we move.”",
    body: "Happy Monday Ka-CoSA!\n\nNew day, new struggles—but we move. If your alarm clock felt like your biggest enemy today, just know you're not alone. Show up, do what you can, and pretend you understood the lesson (we'll figure it out later).\n\nRemember: passing is passing, and coffee is basically a personality at this point.\n\nHave a nice Monday—stay awake, stay submitting, and may your Wi-Fi be strong and your deadlines be forgiving!",
    language: "English"
  }
];

export const PROJECTS: ProjectItem[] = [
  // Pubmats
  {
    id: "pubmat-1",
    templateCardId: "pubmat-card-one",
    templateImageId: "pubmat-image-one",
    templateTitleId: "pubmat-title-one",
    templateDescId: "pubmat-description-one",
    category: "pubmats",
    title: "Eunoia: Cultivating Bright Minds, Shaping Future",
    shortDescription: "Official flagship event publication material for DLSU-D Circle of Student Assistants.",
    fullDescription: "Flagship educational leadership poster and social publication material created for the DLSU-D Circle of Student Assistants (CoSA). Designed to inspire student scholars through warm character illustrations, structured typographic hierarchy, and clear partnership accreditations.",
    imageUrl: "/src/assets/images/pubmat_campaign_showcase_1791448592913.jpg",
    client: "DLSU-D Circle of Student Assistants (CoSA)",
    year: "2023 - 2024",
    deliverables: ["Official Facebook Pubmat", "Event Poster", "Social Announcement Blast"],
    tools: ["Canva", "Graphic Assets", "Typography Layout"],
    metrics: "High engagement & event participation across DLSU-D scholars",
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
    shortDescription: "Dramatic Squid Game-inspired narrative pubmat with red carpet & silhouette doorway framing.",
    fullDescription: "Themed promotional graphic featuring high-contrast geometric symbols and cinematic perspective, capturing the spirit of overcoming academic challenges together. Created for student assistant milestone celebrations.",
    imageUrl: "/src/assets/images/pubmat_event_poster_1791448702010.jpg",
    client: "DLSU-D Circle of Student Assistants (CoSA)",
    year: "2024",
    deliverables: ["Thematic Social Banner", "Story Teaser", "Poster Print"],
    tools: ["Canva", "Photo Compositing", "Color Tuning"],
    metrics: "Shared across organization officer channels",
    accentColor: "#8e44ad"
  },
  {
    id: "pubmat-3",
    category: "pubmats",
    title: "Beep Me Baby! Retro Celebration Pubmat",
    shortDescription: "Playful Betty Boop retro aesthetic pubmat with disco chrome typography and vintage charm.",
    fullDescription: "Vintage pop-culture themed publication material designed for celebratory organization announcements. Features custom retro disco typography, stylized character integration, and vibrant cherry-red accents.",
    imageUrl: "/src/assets/images/pubmat_campaign_showcase_1791448592913.jpg",
    client: "DLSU-D Circle of Student Assistants",
    year: "2024",
    deliverables: ["Square Facebook Pubmat", "Instagram Story Teaser"],
    tools: ["Canva", "Retro Type Styling"],
    accentColor: "#e74c3c"
  },
  {
    id: "pubmat-4",
    category: "pubmats",
    title: "Ninoy Aquino Day: Daily News Vintage Layout",
    shortDescription: "Hand-holding historical newspaper design commemorating national hero Ninoy Aquino.",
    fullDescription: "Editorial newspaper layout pubmat created for ASJ High School Library. Featuring monochrome journalistic typography, realistic paper textures, and commemorative historical copy.",
    imageUrl: "/src/assets/images/copywriting_editorial_1791448671344.jpg",
    client: "ASJ High School Library",
    year: "2023",
    deliverables: ["Library Social Pubmat", "Campus Bulletin Print"],
    tools: ["Canva", "Newspaper Layout Grid"],
    accentColor: "#34495e"
  },
  {
    id: "pubmat-5",
    category: "pubmats",
    title: "Handa Ka Na Bang Makisaya Sa Ating Muling Pagkikita?",
    shortDescription: "Traditional Filipiniana cultural pubmat celebrating Buwan ng Wika with festive fan motifs.",
    fullDescription: "Warm cultural celebration pubmat welcoming students to Buwan ng Wika activities. Blends traditional Baro't Saya aesthetics with welcoming Lasallian community messaging.",
    imageUrl: "/src/assets/images/pubmat_event_poster_1791448702010.jpg",
    client: "DLSU-D Circle of Student Assistants",
    year: "2023",
    deliverables: ["Buwan ng Wika Banner", "Facebook Feed Announcement"],
    tools: ["Canva", "Cultural Illustration Layout"],
    accentColor: "#c0392b"
  },
  {
    id: "pubmat-6",
    category: "pubmats",
    title: "Good Morning Ka-CoSA: Capybara Monday Motivation",
    shortDescription: "Whimsical capybara meadow meme pubmat bringing cheer to Monday student mornings.",
    fullDescription: "Lighthearted weekly social media post designed to connect with students during hectic academic weeks. Created with vibrant bubbly typography, cozy scenery, and friendly tone of voice.",
    imageUrl: "/src/assets/images/pubmat_campaign_showcase_1791448592913.jpg",
    client: "DLSU-D Circle of Student Assistants",
    year: "2024",
    deliverables: ["Weekly Facebook Pubmat", "Meme Campaign"],
    tools: ["Canva", "Meme Culture Design"],
    accentColor: "#27ae60"
  },

  // Videos
  {
    id: "video-1",
    templateCardId: "video-card-one",
    templateImageId: "video-image-one",
    templateTitleId: "video-title-one",
    templateDescId: "video-description-one",
    category: "videos",
    title: "DLSU-D Intramurals 2025 by Agnes Abelido (Campus Video)",
    shortDescription: "Dynamic campus life video documenting student spirit, sports matches, and behind-the-scenes energy.",
    fullDescription: "Edited with upbeat pacing, on-screen kinetic titles, energetic soundtrack transitions, and real campus footage. Highlights student life and community bonding at De La Salle University–Dasmariñas.",
    imageUrl: "/src/assets/images/video_creator_reel_1791448653222.jpg",
    client: "DLSU-D Student Life / Campus Video",
    year: "2025",
    deliverables: ["Campus Video Edit", "TikTok/Reels Teasers", "Music Synchronization"],
    tools: ["CapCut", "Color Pacing", "Audio Mixing"],
    metrics: "Loved by classmates and organization peers",
    accentColor: "#e67e22"
  },
  {
    id: "video-2",
    templateCardId: "video-card-two",
    templateImageId: "video-image-two",
    templateTitleId: "video-title-two",
    templateDescId: "video-description-two",
    category: "videos",
    title: "Good Day: Good Energy For Your Next Chapter",
    shortDescription: "Aesthetic lifestyle student reel with warm morning coffee, desk setups, and motivational pacing.",
    fullDescription: "Short-form video edit emphasizing cozy student daily routines, morning coffee ritual, study session ambience, and warm lo-fi aesthetic overlays.",
    imageUrl: "/src/assets/images/video_food_promo_1791448759741.jpg",
    client: "Content Creator Project",
    year: "2024",
    deliverables: ["Vertical 9:16 Reel", "Subtitles & Hook Formatting"],
    tools: ["CapCut", "Audio Design"],
    metrics: "Viral aesthetic student format",
    accentColor: "#d35400"
  },

  // AI Art
  {
    id: "ai-1",
    templateCardId: "ai-card-one",
    templateImageId: "ai-image-one",
    templateTitleId: "ai-title-one",
    templateDescId: "ai-description-one",
    category: "ai",
    title: "Cosmic Odyssey: Deep Space & Asteroid Field",
    shortDescription: "AI generative art exploration of deep space nebulae, celestial rings, and cosmic crystals.",
    fullDescription: "Generated exploring prompt engineering for science fiction concepts. Captures volumetric space dust, ringed planets, and vibrant starlight using detailed prompt parameter formulas.",
    imageUrl: "/src/assets/images/ai_dreamscape_art_1791448614839.jpg",
    client: "Personal AI Concept Portfolio",
    year: "2024",
    deliverables: ["Concept Artwork", "Prompt Documentation"],
    tools: ["ChatGPT", "Generative AI Prompting"],
    accentColor: "#9b59b6"
  },
  {
    id: "ai-2",
    templateCardId: "ai-card-two",
    templateImageId: "ai-image-two",
    templateTitleId: "ai-title-two",
    templateDescId: "ai-description-two",
    category: "ai",
    title: "Whimsical Mushroom Cottage & Enchanted Forest",
    shortDescription: "Fairy-tale fantasy architectural concept with warm lantern glow and magical woodland moss.",
    fullDescription: "Whimsical digital art created to test fantasy lighting, organic textures, and storybook compositions for creative storytelling projects.",
    imageUrl: "/src/assets/images/ai_character_portrait_1791448744268.jpg",
    client: "Storybook Concept Project",
    year: "2024",
    deliverables: ["High-Res Digital Concept", "Prompt Variations"],
    tools: ["AI Prompt Engineering", "Canva Retouching"],
    accentColor: "#27ae60"
  },

  // Merch Mockups
  {
    id: "mockup-1",
    templateCardId: "mockup-card-one",
    templateImageId: "mockup-image-one",
    templateTitleId: "mockup-title-one",
    templateDescId: "mockup-description-one",
    category: "mockups",
    title: "Iskolar Ako, Prawd Ako: DLSU-D Pin & T-Shirt Suite",
    shortDescription: "DLSU-D student assistant enamel pin button badges and minimalist typography t-shirt merch mockups.",
    fullDescription: "Complete merchandise mockup collection designed for the Circle of Student Assistants at De La Salle University–Dasmariñas. Includes enamel pin badges ('Iskolar Ako, Prawd Ako', 'Iska! Mascot', and 'Animo La Salle') plus clean back-print streetwear shirt layouts.",
    imageUrl: "/src/assets/images/brand_mockup_showcase_1791448633645.jpg",
    client: "DLSU-D Circle of Student Assistants (CoSA)",
    year: "2023 - 2024",
    deliverables: ["3x Pin Button Badge Mockups", "Front & Back T-Shirt Mockups", "Print-Ready Vector Files"],
    tools: ["Canva", "Apparel Mockup Templates", "Typography"],
    metrics: "Produced and worn by DLSU-D student assistants",
    accentColor: "#27ae60"
  },
  {
    id: "mockup-2",
    templateCardId: "mockup-card-two",
    templateImageId: "mockup-image-two",
    templateTitleId: "mockup-title-two",
    templateDescId: "mockup-description-two",
    category: "mockups",
    title: "CoSA Organization Tote Bag & Lanyard Mockup Suite",
    shortDescription: "Canvas tote bags and officer IDs mockup presentations with custom typography for campus organizations.",
    fullDescription: "Clean apparel and merchandise mockup presentations showing student organization branding on canvas tote bags and ID lanyards for campus events and officer recruitment drives.",
    imageUrl: "/src/assets/images/mockup_coffee_packaging_1791448720524.jpg",
    client: "DLSU-D Circle of Student Assistants (CoSA)",
    year: "2024",
    deliverables: ["Canvas Tote Bag Mockup", "Officer Lanyard Layout", "Merch Presentation Board"],
    tools: ["Canva", "Merch Layout", "Mockup Framing"],
    accentColor: "#8e44ad"
  },

  // DP Blasts
  {
    id: "dpblast-1",
    templateCardId: "dpblast-card-one",
    templateImageId: "dpblast-image-one",
    templateTitleId: "dpblast-title-one",
    templateDescId: "dpblast-description-one",
    category: "dpblasts",
    title: "CoSA Inside Out & Care Bears DP Blast Frames",
    shortDescription: "Interactive Facebook profile picture blast campaign frames designed for student assistant onboarding.",
    fullDescription: "Campus-wide display picture blast campaign suite with vibrant themes: Pixar's 'Inside Out' ('Where Joy Meets Opportunity and Purpose'), Care Bears 'Bear the Love', and tropical 'Co-Shopee for a Cause'. Used by hundreds of student scholars.",
    imageUrl: "/src/assets/images/pubmat_campaign_showcase_1791448592913.jpg",
    client: "DLSU-D Circle of Student Assistants (CoSA)",
    year: "2023 - 2025",
    deliverables: ["5x Facebook DP Blast Frames", "Avatar Overlays", "Announcement Guidelines"],
    tools: ["Canva", "Frame Templates", "Brand Graphics"],
    metrics: "Over 200+ students blasting frames simultaneously across Facebook",
    accentColor: "#2980b9"
  },
  {
    id: "dpblast-2",
    templateCardId: "dpblast-card-two",
    templateImageId: "dpblast-image-two",
    templateTitleId: "dpblast-title-two",
    templateDescId: "dpblast-description-two",
    category: "dpblasts",
    title: "PAWS Campus Volunteer Membership DP Blast",
    shortDescription: "Heartwarming pet-advocate Facebook avatar frame designed for volunteer student recruitment.",
    fullDescription: "Custom campaign profile picture frame designed for DLSUD Patriots of Animal Welfare & Support to mobilize volunteer members during campus orientation week, featuring friendly paw illustrations and Lasallian organization colors.",
    imageUrl: "/src/assets/images/pubmat_event_poster_1791448702010.jpg",
    client: "DLSUD Patriots of Animal Welfare & Support",
    year: "2024",
    deliverables: ["Transparent PNG Frame", "Mobile Placement Guide", "Campaign Caption Copy"],
    tools: ["Canva", "Photo Overlay Design", "Color Grading"],
    metrics: "Mobilized campus volunteer sign-ups",
    accentColor: "#e67e22"
  },

  // Copywriting
  {
    id: "copy-1",
    templateCardId: "copy-card-one",
    templateImageId: "copy-image-one",
    templateTitleId: "copy-title-one",
    templateDescId: "copy-description-one",
    category: "copywriting",
    title: "World Teacher's Day 2023 Tribute Copy",
    shortDescription: "Heartfelt tribute honoring educators with quote from William Arthur Ward on behalf of Lasallian community.",
    fullDescription: "Published on the official DLSU-D CoSA social channels for World Teacher's Day. Blends gratitude, reverence for pedagogy, and community warmth to honor professors.",
    imageUrl: "/src/assets/images/copy_email_newsletter_1791448781926.jpg",
    client: "Circle of Student Assistants (CoSA)",
    year: "2023",
    deliverables: ["Social Media Caption Copy", "Quote Selection", "Community Hashtags"],
    tools: ["Microsoft Word", "CoSA Social Media Desk"],
    accentColor: "#2980b9"
  },
  {
    id: "copy-2",
    templateCardId: "copy-card-two",
    templateImageId: "copy-image-two",
    templateTitleId: "copy-title-two",
    templateDescId: "copy-description-two",
    category: "copywriting",
    title: "Inside Out Committee Recruitment Copy",
    shortDescription: "Creative narrative mapping Riley's emotions (Joy, Sadness, Anger, Fear, Disgust) to organization committees.",
    fullDescription: "Engaging student recruitment copy written to demystify organization committees using Pixar's Inside Out metaphor. Highlights empathy, creative synergy, and personal growth for incoming scholars.",
    imageUrl: "/src/assets/images/copywriting_editorial_1791448671344.jpg",
    client: "Circle of Student Assistants (CoSA)",
    year: "2024",
    deliverables: ["Recruitment Copy Deck", "Committee Descriptions"],
    tools: ["Word", "Creative Storytelling"],
    accentColor: "#8e44ad"
  }
];

export const SERVICES = [
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
  },
  {
    title: "Short-Form Video Editing (CapCut)",
    iconName: "Video",
    description: "Simple, engaging short video edits for TikTok, Facebook, and Instagram reels with smooth cuts, on-screen text, and trending audio.",
    turnaround: "Flexible",
    deliverables: ["Vertical 9:16 reels & clips", "Clear captions and text", "Background music synchronization"]
  },
  {
    title: "Social Media Copywriting",
    iconName: "PenTool",
    description: "Friendly, well-written captions for event announcements, holiday greetings, and student posts in clear English or Filipino.",
    turnaround: "Flexible",
    deliverables: ["Captions ready to copy & paste", "Helpful hashtags and hooks", "English or Tagalog tone"]
  },
  {
    title: "Admin VA",
    iconName: "CheckCircle2",
    description: "Reliable virtual assistance focusing on data encoding, replying to emails politely, and arranging files and folders neatly.",
    turnaround: "Flexible",
    deliverables: ["Accurate data encoding (Excel / Sheets)", "Replying to emails & inquiries", "Files & Google Drive arranging"]
  },
  {
    title: "Social Media Management & Support",
    iconName: "Sparkles",
    description: "Beginner-friendly page support to help schedule posts, keep media folders organized, and keep your club's page updated.",
    turnaround: "Flexible",
    deliverables: ["Content posting schedule", "Media files organization", "Friendly page assistance"]
  }
];
