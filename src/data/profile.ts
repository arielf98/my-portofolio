export type ResumeEntry = {
  title: string;
  organization?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  highlights?: string[];
};

export type Profile = {
  isSample: boolean;
  name?: string;
  headline?: string;
  location?: string;
  summary?: string;
  email?: string;
  cvPdf?: string;
  socialLinks: { label: string; url: string }[];
  experience: ResumeEntry[];
  education: ResumeEntry[];
  projects: ResumeEntry[];
  certifications: ResumeEntry[];
  awards: ResumeEntry[];
  skills: string[];
};

const socialLinks = [
  { label: 'GitHub', url: 'https://github.com/arielf98' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ariel-febrian98/' },
];

export const profileByLocale: Record<'id' | 'en', Profile> = {
  id: {
    isSample: false,
    name: 'Ariel Febrian',
    headline: 'Software Engineer',
    location: 'Tangerang Selatan, Banten, Indonesia',
    summary:
      'Software engineer yang membangun aplikasi web dan sistem backend di sektor keuangan dan pendidikan. Berfokus pada keandalan data, alur kerja yang mudah dipelihara, dan perbaikan operasional yang terukur melalui QRIS, pembayaran virtual account, aplikasi mobile, dan Odoo ERP.',
    socialLinks,
    experience: [
      {
        title: 'Backend Engineer',
        organization: 'OCBC Indonesia',
        startDate: 'Jan 2026',
        endDate: 'Sekarang',
        description:
          'Mengembangkan sistem backend onboarding QRIS UMKM dengan fokus pada keandalan data dan alur operasional.',
        highlights: [
          'Membangun alur impor/ekspor data, pembukaan akun, dan akses nasabah.',
          'Merefaktor modul agar mendukung unit testing dan lebih mudah dipelihara, sekaligus memperbaiki bug untuk meningkatkan stabilitas.',
          'Mengganti proses onboarding manual berbasis Excel dengan sistem digital untuk menangani parameter yang kompleks.',
        ],
      },
      {
        title: 'Frontend Web Developer',
        organization: 'OCBC Indonesia',
        startDate: 'Jan 2024',
        endDate: 'Des 2025',
        description:
          'Membangun dashboard internal dan alur digital untuk aplikasi QRIS merchant.',
        highlights: [
          'Membangun dan mengintegrasikan alur pendaftaran mandiri QRIS yang memangkas waktu onboarding merchant dari 3 hari menjadi kurang dari 10 menit.',
          'Mengotomatisasi pembayaran nasabah bisnis melalui sistem virtual account.',
          'Mempercepat pembaruan nomor telepon merchant dari 1 minggu menjadi kurang dari 1 hari.',
        ],
      },
      {
        title: 'Frontend Developer',
        organization: 'BTPN Syariah',
        startDate: 'Jul 2023',
        endDate: 'Jan 2024',
        highlights: [
          'Mengembangkan aplikasi web untuk mendukung program inklusi keuangan UMKM.',
          'Berkolaborasi dalam sprint Agile melalui Jira, dari perencanaan hingga retrospektif.',
          'Memperbaiki dan memelihara aplikasi Android Warung Tepat untuk pinjaman UMKM.',
        ],
      },
      {
        title: 'Front End Engineer',
        organization: 'PT Bank Raya Indonesia Tbk.',
        startDate: 'Sep 2022',
        endDate: 'Jul 2023',
        highlights: [
          'Memelihara dashboard internal yang digunakan oleh tim terkait.',
          'Mengembangkan fitur WebView Dana Siaga (Pinang Flexi) dan mengintegrasikannya dengan aplikasi JMO.',
        ],
      },
      {
        title: 'Android Engineer',
        organization: 'Medan Digital Innovation',
        startDate: 'Mar 2021',
        endDate: 'Sep 2022',
        highlights: [
          'Mengembangkan aplikasi e-commerce Mahkota Store untuk retailer smartphone di Binjai, Sumatera Utara.',
          'Membangun aplikasi Guest and Monitoring Security untuk PLN UPT Medan.',
          'Mengintegrasikan API dengan sistem backend.',
        ],
      },
      {
        title: 'Front End Engineer — Generasi GIGIH 2021',
        organization: 'GoTo Impact Foundation',
        startDate: 'Mei 2021',
        endDate: 'Sep 2021',
        highlights: [
          'Menyelesaikan program Front End Engineering bersama para ahli dari Gojek.',
          'Membangun aplikasi playlist mini dengan data Spotify, React-Redux, dan Redux Toolkit.',
          'Membuat aplikasi web untuk mencari GIF melalui Giphy berdasarkan permintaan pengguna.',
        ],
      },
    ],
    education: [
      {
        title: 'Sarjana Teknologi Informasi',
        organization: 'Universitas Sumatera Utara',
        startDate: '2017',
        endDate: '2022',
        description: 'IPK 3,60. Proyek akhir berfokus pada Computer Vision.',
      },
    ],
    projects: [
      {
        title: 'Digital Transformation Initiative',
        organization: 'Sekolah Alam Purwakarta',
        startDate: 'Jul 2025',
        endDate: 'Sekarang',
        description:
          'Memimpin transformasi digital sekolah berbasis komunitas menggunakan Odoo ERP untuk meningkatkan efisiensi operasional.',
      },
      {
        title: 'Mahkota Store',
        startDate: 'Mei 2022',
        endDate: 'Sep 2022',
        description:
          'Aplikasi e-commerce mobile dengan React Native, Redux Toolkit, React Navigation, dan RTK Query.',
      },
      {
        title: 'My Album',
        startDate: 'Sep 2021',
        endDate: 'Sep 2021',
        description:
          'Aplikasi playlist dengan Spotify API yang mendukung pembuatan dan penghapusan album; dibuat dengan TypeScript dan Redux Toolkit.',
      },
      {
        title: 'E-Monitoring Security PLN UPT Medan',
        startDate: 'Mar 2021',
        endDate: 'Sep 2021',
        description:
          'Aplikasi mobile untuk e-monitoring keamanan dengan React Navigation dan Context.',
      },
      {
        title: 'Quiz App',
        startDate: 'Mei 2020',
        endDate: 'Mei 2020',
        description:
          'Aplikasi kuis dengan Open Trivia Database API, React, dan TypeScript.',
      },
      {
        title: 'CoViDonation',
        description:
          'Marketplace konten digital untuk mengumpulkan donasi COVID-19 di Indonesia; dibuat dengan React Native dan Firebase.',
      },
    ],
    certifications: [
      {
        title: 'TOEFL ITP',
        organization: 'ETS',
        startDate: 'Feb 2026',
        endDate: 'Feb 2028',
        description: 'Skor 553. ID kredensial: 15457160.',
      },
      {
        title: 'Master the Fundamentals of Math',
        organization: 'Udemy',
        startDate: 'Jul 2023',
        description: 'ID kredensial: UC-51d8b169-bf03-4c8e-9dc5-0f41aeaf5cfc.',
      },
      {
        title: 'Generasi GIGIH Certificate',
        organization: 'Yayasan Anak Bangsa Bisa',
        startDate: 'Sep 2021',
      },
    ],
    awards: [
      {
        title: 'Finalis Business IT Case Competition IT FEST 2020',
        organization: 'Himatif',
        startDate: 'Agu 2020',
      },
    ],
    skills: [
      'Backend development',
      'Frontend development',
      'API integration',
      'React',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Redux Toolkit',
      'Android',
      'Odoo ERP',
      'Firebase',
      'Jira',
      'AI-assisted development (OpenAI Codex)',
    ],
  },
  en: {
    isSample: false,
    name: 'Ariel Febrian',
    headline: 'Software Engineer',
    location: 'South Tangerang, Banten, Indonesia',
    summary:
      'Software engineer building web applications and backend systems across financial services and education. Focused on reliable data, maintainable workflows, and measurable operational improvements through QRIS, virtual account payments, mobile apps, and Odoo ERP.',
    socialLinks,
    experience: [
      {
        title: 'Backend Engineer',
        organization: 'OCBC Indonesia',
        startDate: 'Jan 2026',
        endDate: 'Present',
        description:
          'Developing backend systems for MSME QRIS onboarding, focused on reliable data and operational workflows.',
        highlights: [
          'Building data import/export, account setup, and customer access flows.',
          'Refactoring modules for unit testing and maintainability while fixing bugs to improve stability.',
          'Replacing manual Excel-based onboarding with a digital workflow for complex parameters.',
        ],
      },
      {
        title: 'Frontend Web Developer',
        organization: 'OCBC Indonesia',
        startDate: 'Jan 2024',
        endDate: 'Dec 2025',
        description:
          'Built internal dashboards and digital workflows for merchant QRIS applications.',
        highlights: [
          'Built and integrated a self-service QRIS registration flow that cut merchant onboarding time from 3 days to under 10 minutes.',
          'Automated business customer payments through a virtual account system.',
          'Reduced merchant phone number update turnaround from 1 week to under 1 day.',
        ],
      },
      {
        title: 'Frontend Developer',
        organization: 'BTPN Syariah',
        startDate: 'Jul 2023',
        endDate: 'Jan 2024',
        highlights: [
          'Developed a web application supporting an MSME financial inclusion program.',
          'Collaborated in Jira-based Agile sprints from planning through retrospectives.',
          'Fixed and maintained Warung Tepat, an Android app for MSME loans.',
        ],
      },
      {
        title: 'Front End Engineer',
        organization: 'PT Bank Raya Indonesia Tbk.',
        startDate: 'Sep 2022',
        endDate: 'Jul 2023',
        highlights: [
          'Maintained an internal dashboard used by business teams.',
          'Built a WebView feature for Dana Siaga (Pinang Flexi) and integrated it with the JMO app.',
        ],
      },
      {
        title: 'Android Engineer',
        organization: 'Medan Digital Innovation',
        startDate: 'Mar 2021',
        endDate: 'Sep 2022',
        highlights: [
          'Developed the Mahkota Store e-commerce app for a smartphone retailer in Binjai, North Sumatra.',
          'Built the Guest and Monitoring Security app for PLN UPT Medan.',
          'Integrated APIs with backend systems.',
        ],
      },
      {
        title: 'Front End Engineer — Generasi GIGIH 2021',
        organization: 'GoTo Impact Foundation',
        startDate: 'May 2021',
        endDate: 'Sep 2021',
        highlights: [
          'Completed the Front End Engineering program with Gojek experts.',
          'Built a mini playlist app using Spotify data, React-Redux, and Redux Toolkit.',
          'Created a web app to search Giphy based on user queries.',
        ],
      },
    ],
    education: [
      {
        title: 'Bachelor of Information Technology',
        organization: 'Universitas Sumatera Utara',
        startDate: '2017',
        endDate: '2022',
        description: 'GPA 3.60. Final project focused on Computer Vision.',
      },
    ],
    projects: [
      {
        title: 'Digital Transformation Initiative',
        organization: 'Sekolah Alam Purwakarta',
        startDate: 'Jul 2025',
        endDate: 'Present',
        description:
          'Leading a digital transformation at a community-based school, using Odoo ERP to improve operational efficiency.',
      },
      {
        title: 'Mahkota Store',
        startDate: 'May 2022',
        endDate: 'Sep 2022',
        description:
          'Mobile e-commerce app built with React Native, Redux Toolkit, React Navigation, and RTK Query.',
      },
      {
        title: 'My Album',
        startDate: 'Sep 2021',
        endDate: 'Sep 2021',
        description:
          'Spotify playlist app with album creation and deletion, built with TypeScript and Redux Toolkit.',
      },
      {
        title: 'E-Monitoring Security PLN UPT Medan',
        startDate: 'Mar 2021',
        endDate: 'Sep 2021',
        description:
          'Mobile security monitoring app built with React Navigation and Context.',
      },
      {
        title: 'Quiz App',
        startDate: 'May 2020',
        endDate: 'May 2020',
        description:
          'Quiz app using the Open Trivia Database API, React, and TypeScript.',
      },
      {
        title: 'CoViDonation',
        description:
          'Digital content marketplace to collect COVID-19 donations in Indonesia, built with React Native and Firebase.',
      },
    ],
    certifications: [
      {
        title: 'TOEFL ITP',
        organization: 'ETS',
        startDate: 'Feb 2026',
        endDate: 'Feb 2028',
        description: 'Score: 553. Credential ID: 15457160.',
      },
      {
        title: 'Master the Fundamentals of Math',
        organization: 'Udemy',
        startDate: 'Jul 2023',
        description: 'Credential ID: UC-51d8b169-bf03-4c8e-9dc5-0f41aeaf5cfc.',
      },
      {
        title: 'Generasi GIGIH Certificate',
        organization: 'Yayasan Anak Bangsa Bisa',
        startDate: 'Sep 2021',
      },
    ],
    awards: [
      {
        title: 'Finalist, Business IT Case Competition IT FEST 2020',
        organization: 'Himatif',
        startDate: 'Aug 2020',
      },
    ],
    skills: [
      'Backend development',
      'Frontend development',
      'API integration',
      'React',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Redux Toolkit',
      'Android',
      'Odoo ERP',
      'Firebase',
      'Jira',
      'AI-assisted development (OpenAI Codex)',
    ],
  },
};
