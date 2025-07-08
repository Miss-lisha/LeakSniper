export interface Breach {
  id: string;
  name: string;
  year: number;
  description: string;
  compromisedData: string[];
  recordCount: string;
  riskLevel: 'high' | 'medium' | 'low';
  advice: string;
  source?: string; // ✅ Add this line (optional to avoid errors if missing)
}

export const BREACH_DATABASE: Breach[] = [
  {
    id: "github-001",
    name: "GitHub Token Exposure",
    year: 2023,
    description: "Sensitive tokens exposed in public GitHub repository in 2023.",
    compromisedData: ["email", "token"],
    recordCount: "Unknown",
    riskLevel: "high",
    advice: "Revoke exposed tokens immediately. Rotate credentials and review repository access.",
    source: "public_repo"
  },
  {
    id: 'twitter-2022',
    name: 'Twitter Data Leak',
    year: 2022,
    description: 'Data of 5.4 million Twitter users leaked',
    compromisedData: ['Email addresses', 'Phone numbers', 'Usernames', 'Profile information'],
    recordCount: '5.4 million',
    riskLevel: 'high',
    advice: 'Change Twitter password. Enable two-factor authentication (2FA).'
  },
  {
    id: 'moab-2024',
    name: 'MOAB (Mother of All Breaches)',
    year: 2024,
    description: 'Massive compilation database containing 26+ billion records',
    compromisedData: ['Email addresses', 'Phone numbers', 'Passwords', 'Personal info', 'Social media data'],
    recordCount: '26+ billion',
    riskLevel: 'high',
    advice: 'Change all passwords immediately. Enable 2FA on all accounts. Monitor credit reports.'
  },
  {
    id: 'facebook-2021',
    name: 'Facebook Data Scraping',
    year: 2021,
    description: 'Personal data of 533 million Facebook users leaked',
    compromisedData: ['Phone numbers', 'Email addresses', 'Full names', 'Locations'],
    recordCount: '533 million',
    riskLevel: 'high',
    advice: 'Review Facebook privacy settings. Be cautious of phishing attempts using your data.'
  },
  {
    id: 'linkedin-2021',
    name: 'LinkedIn Data Breach',
    year: 2021,
    description: 'Professional data from 700 million LinkedIn users exposed',
    compromisedData: ['Email addresses', 'Phone numbers', 'Professional info', 'Social media links'],
    recordCount: '700 million',
    riskLevel: 'medium',
    advice: 'Update LinkedIn password. Review professional information visibility.'
  },
  {
    id: 'clubhouse-2021',
    name: 'Clubhouse Data Leak',
    year: 2021,
    description: 'Audio social network user data exposed',
    compromisedData: ['Phone numbers', 'Names', 'User IDs', 'Social connections'],
    recordCount: '1.3 million',
    riskLevel: 'medium',
    advice: 'Monitor for spam calls. Review app permissions on connected accounts.'
  },
  {
    id: 'deezer-2022',
    name: 'Deezer Music Service',
    year: 2022,
    description: 'Music streaming service user data compromised',
    compromisedData: ['Email addresses', 'Usernames', 'Account details'],
    recordCount: '240 million',
    riskLevel: 'medium',
    advice: 'Change Deezer password. Review connected payment methods.'
  },
  {
    id: 'discord-2023',
    name: 'Discord Server Breach',
    year: 2023,
    description: 'Gaming communication platform data exposure',
    compromisedData: ['Email addresses', 'Usernames', 'Server data', 'Messages'],
    recordCount: '760,000',
    riskLevel: 'low',
    advice: 'Update Discord password. Review server privacy settings.'
  },
  {
    id: 'tiktok-2023',
    name: 'TikTok User Data Breach',
    year: 2023,
    description: 'Personal data of TikTok users exposed',
    compromisedData: ['Email addresses', 'Phone numbers', 'User profiles', 'Video metadata'],
    recordCount: '200 million',
    riskLevel: 'medium',
    advice: 'Review TikTok privacy settings. Be cautious of suspicious links.'
  }
];

export const TIMELINE_BREACHES = [
  { year: 2021, name: 'Facebook', count: '533M', position: 20 },
  { year: 2022, name: 'Deezer', count: '240M', position: 40 },
  { year: 2023, name: 'Discord', count: '760K', position: 70 },
  { year: 2024, name: 'MOAB', count: '26B+', position: 90 }
];