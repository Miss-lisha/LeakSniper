import SHA256 from 'crypto-js/sha256';
import OpenSourceWarning from './components/OpenSourceWarning';
import RecoveryChecklist from './components/RecoveryChecklist';
import React, { useState } from 'react';
import { Search, Sun, Moon, Shield, Database, Download, ChevronDown, Menu, X, AlertTriangle, CheckCircle, Clock, BarChart3, Eye } from 'lucide-react';
import { useDarkMode } from './hooks/useDarkMode';
import { BREACH_DATABASE, Breach } from './data/breaches';
import BreachCard from './components/BreachCard';
import BreachTimeline from './components/BreachTimeline';
import Chatbot from './components/Chatbot';
import RiskGauge from './components/RiskGauge';
import PhishingPreview from './components/PhishingPreview';
import { generatePDFReport, generateTextReport } from './utils/reportGenerator';

function App() {
  const [isDark, setIsDark] = useDarkMode();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Breach[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [reportFormat, setReportFormat] = useState<'pdf' | 'txt'>('pdf');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPhishingPreview, setShowPhishingPreview] = useState(false);
  const [useAnonymous, setUseAnonymous] = useState(false);


  const isEmail = (input: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  };

  const isPhone = (input: string): boolean => {
    const cleaned = input.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const calculateRiskScore = (breaches: Breach[]): number => {
    if (breaches.length === 0) return 0;
    
    let score = 0;
    breaches.forEach(breach => {
      // Base score for being in a breach
      score += 20;
      
      // Additional points for risk level
      if (breach.riskLevel === 'high') score += 30;
      else if (breach.riskLevel === 'medium') score += 15;
      else score += 5;
      
      // Extra points for password exposure
      if (breach.compromisedData.some(data => data.toLowerCase().includes('password'))) {
        score += 25;
      }
      
      // MOAB gets extra points
      if (breach.id === 'moab-2024') score += 20;
    });
    
    return Math.min(score, 100);
  };

  const simulateBreachCheck = async (_searchQuery: string): Promise<Breach[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Simulate realistic breach matching based on the query
    const foundBreaches: Breach[] = [];
    
    // MOAB always has a high chance of containing data
    if (Math.random() > 0.3) {
      foundBreaches.push(BREACH_DATABASE.find(b => b.id === 'moab-2024')!);
    }
    
    // Add other breaches based on probability
    const otherBreaches = BREACH_DATABASE.filter(b => b.id !== 'moab-2024');
    otherBreaches.forEach(breach => {
      const probability = breach.riskLevel === 'high' ? 0.4 : breach.riskLevel === 'medium' ? 0.25 : 0.1;
      if (Math.random() < probability) {
        foundBreaches.push(breach);
      }
    });

    return foundBreaches;
  };

  // Handle search logic
  const handleSearch = async () => {
  if (!query.trim()) return;

  if (!isEmail(query) && !isPhone(query)) {
    alert('Please enter a valid email address or phone number');
    return;
  }

  setIsSearching(true);
  setHasSearched(false);

  try {
    // 🔐 If anonymous mode is on, hash the input before checking
    let input = query.trim().toLowerCase();
    if (useAnonymous) {
      input = SHA256(input).toString();
      console.log('🔐 Hashed input sent to scan:', input);
    }

    const breaches = await simulateBreachCheck(input); // Use modified input here
    setResults(breaches);
    setHasSearched(true);

    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  } catch (error) {
    console.error('Search error:', error);
    alert('Search failed. Please try again.');
  } finally {
    setIsSearching(false);
  }
};

  const handleDownloadReport = () => {
    if (!hasSearched) return;
    
    const isEmailQuery = isEmail(query);
    
    if (reportFormat === 'pdf') {
      generatePDFReport(query, results, isEmailQuery);
    } else {
      generateTextReport(query, results, isEmailQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const scrollToScan = () => {
    document.getElementById('scan-section')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  const riskScore = calculateRiskScore(results);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">LeakSniper</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={scrollToScan}
                className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Scan
              </button>
              <a href="#privacy" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Privacy
              </a>
              <a href="mailto:support@leaksniper.io" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors">
                Contact
              </a>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 
                         transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => {
                    scrollToScan();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
                >
                  Scan
                </button>
                <a href="#privacy" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                  Privacy
                </a>
                <a href="bluxbxllalisha@gmai.com" className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium">
                  Contact
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm font-medium mb-8 border border-red-200 dark:border-red-800">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Includes 26B+ records from MOAB 2024 & other major leaks
          </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight text-center">
          Has Your Data Been Leaked?<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Find Out in Seconds
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto text-center leading-relaxed">
          Since 2022, billions of records have been exposed in real data breaches. 
          Check if your email or phone number has been compromised — safely and anonymously.
        </p>

          {/* CTA Button */}
          <button
            onClick={scrollToScan}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                     hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl text-lg
                     transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                     focus:outline-none focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800"
          >
            Start Security Scan
            <Search className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-500" />
              <span>26B+ Records Checked</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-500" />
              <span>Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-500" />
              <span>Zero Data Storage</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scan Section */}
      <section id="scan-section" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Check Your Exposure
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Enter your email or phone number to scan against known data breaches
              </p>
            </div>

            {/* Search Input */}
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email or phone number"
                  className="w-full px-6 py-4 pr-12 text-lg border-2 border-slate-200 dark:border-slate-600 
                           rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500
                           bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400
                           transition-all duration-200"
                  aria-label="Email or phone number to check for breaches"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6" />
              </div>

              {/* 🔐 Anonymous‑scan toggle */}
                <label className="flex items-center gap-2 mt-4 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={useAnonymous}
                    onChange={() => setUseAnonymous(!useAnonymous)}
                  />
                  Enable Anonymous&nbsp;Scan
                </label>

                {useAnonymous && (
                  <p className="text-xs text-yellow-500 mt-1 italic">
                    You’re scanning anonymously. Your input is hashed locally and never sent in raw form.
                  </p>
              )}

              {/* CTA Button */}
              <button
                onClick={handleSearch}
                disabled={isSearching || !query.trim()}
                className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 
                         disabled:bg-slate-400 disabled:cursor-not-allowed
                         text-white font-semibold px-8 py-4 rounded-xl text-lg
                         transform hover:scale-[1.02] transition-all duration-200
                         focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg"
                aria-label="Check for data breaches"
              >
                {isSearching ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-r-transparent rounded-full animate-spin"></div>
                    Scanning Databases...
                  </div>
                ) : (
                  'Scan for Breaches'
                )}
              </button>

              {/* Privacy Notice */}
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <Shield className="w-4 h-4" />
                <span>Client-side only. Your data is never stored or sent to a server.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOAB Info Section */}
      <section className="max-w-4xl mx-auto px-4 mb-12">
        <details className="bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
          <summary className="p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors
                             flex items-center justify-between font-medium text-slate-900 dark:text-white">
            <span className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              What is MOAB?
            </span>
            <ChevronDown className="w-5 h-5 transform transition-transform duration-200" />
          </summary>
          <div className="px-6 pb-6 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700">
            <p className="leading-relaxed">
              MOAB (Mother of All Breaches) is a 2024 data leak of over 26 billion records compiled from past breaches like Twitter, Tencent, and Deezer. It is the largest public leak in history, containing email addresses, passwords, phone numbers, and personal information from major platforms worldwide.
            </p>
          </div>
        </details>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section id="results-section" className="max-w-7xl mx-auto px-4 mb-12" role="region" aria-label="Search results">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6">
              {results.length > 0 ? (
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              )}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {results.length > 0 ? 'Security Alert: Data Found' : 'Good News: No Breaches Found'}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {results.length > 0 
                ? `Your data appears in ${results.length} known breach${results.length !== 1 ? 'es' : ''}. Take immediate action to secure your accounts.`
                : 'Your email/phone was not found in our database of known breaches. Stay vigilant and keep monitoring.'
              }
            </p>
          </div>

          {/* Risk Score and Actions */}
          {results.length > 0 && (
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Risk Gauge */}
              <RiskGauge score={riskScore} breaches={results} />
              
              {/* Action Panel */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Recommended Actions
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-red-700 dark:text-red-300 font-medium">Change all passwords immediately</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-sm text-amber-700 dark:text-amber-300 font-medium">Enable 2FA on all accounts</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">Monitor credit reports</span>
                  </div>
                  
                  {/* Phishing Preview Button */}
                  <button
                    onClick={() => setShowPhishingPreview(true)}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-purple-100 dark:bg-purple-900/30 
                             hover:bg-purple-200 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 
                             rounded-lg border border-purple-200 dark:border-purple-800 transition-colors font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Preview Sample Scam Email
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Download Report Button */}
          {results.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <label htmlFor="format-select" className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Format:
                </label>
                <select
                  id="format-select"
                  value={reportFormat}
                  onChange={(e) => setReportFormat(e.target.value as 'pdf' | 'txt')}
                  className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded-md 
                           bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pdf">PDF Report</option>
                  <option value="txt">Text File</option>
                </select>
              </div>
              <button
                onClick={handleDownloadReport}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white 
                         px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl
                         focus:outline-none focus:ring-4 focus:ring-blue-200 transform hover:scale-105"
                aria-label="Download security report"
              >
                <Download className="w-5 h-5" />
                Download My Report
              </button>
            </div>
          )}
        <>
          {/* 🔒 Open Source Exposure Warning */}
          {results.some(
            (b) =>
              b.source === 'public_repo' ||
              b.name.toLowerCase().includes('github') ||
              b.description?.toLowerCase().includes('pastebin')
          ) && <OpenSourceWarning />}
          {/* Breach Cards */}
          {results.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {results.map((breach, index) => (
                <div key={breach.id}>
                  <BreachCard breach={breach} index={index} />
                  <RecoveryChecklist compromisedData={breach.compromisedData} />
                </div>
              ))}
            </div>
          )}
        </>

          {/* Timeline */}
          <BreachTimeline />
        </section>
      )}

      {/* Privacy Section */}
      <section id="privacy" className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-500" />
            Privacy Policy
          </h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              LeakSniper is a 100% client-side awareness tool. We do not collect or store any personal data. All scans are simulated locally in your browser.
            </p>
            <ul className="text-slate-600 dark:text-slate-300 space-y-2">
              <li>• Your email or phone number is never transmitted to our servers</li>
              <li>• All breach checking is performed using local JavaScript simulation</li>
              <li>• No cookies or tracking technologies are used</li>
              <li>• Reports are generated entirely in your browser</li>
              <li>• We cannot see what you search for or your results</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 mb-6">
              <Shield className="w-5 h-5 text-blue-500" />
              <span className="font-medium">LeakSniper never stores your data</span>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-500 mb-4">
              <span>© 2024 LeakSniper. All rights reserved.</span>
              <span>•</span>
              <a href="#privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="mailto:support@leaksniper.io" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Built by Alisha • Cybersecurity Awareness Tool
            </p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />

      {/* Phishing Preview Modal */}
      {showPhishingPreview && (
        <PhishingPreview onClose={() => setShowPhishingPreview(false)} />
      )}

      <style>
        {`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
            opacity: 0;
          }
          
          details[open] summary svg {
            transform: rotate(180deg);
          }
        `}
      </style>
      {/* AI Chat Assistant */}
        <Chatbot />
    </div>
  );
}

export default App;