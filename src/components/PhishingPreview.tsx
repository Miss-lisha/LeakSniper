import React from 'react';
import { X, Mail, AlertTriangle, ExternalLink, Calendar, User } from 'lucide-react';

interface PhishingPreviewProps {
  onClose: () => void;
}

const PhishingPreview: React.FC<PhishingPreviewProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sample Phishing Email</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Learn to recognize scam attempts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Close preview"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Email Preview */}
        <div className="p-6 overflow-y-auto">
          {/* Warning Banner */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-medium mb-2">
              <AlertTriangle className="w-4 h-4" />
              This is a simulated phishing email for educational purposes
            </div>
            <p className="text-sm text-red-600 dark:text-red-400">
              Never click links or download attachments from suspicious emails
            </p>
          </div>

          {/* Fake Email */}
          <div className="bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
            {/* Email Header */}
            <div className="bg-white dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-600">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-slate-900 dark:text-white">Urgent Security Alert</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-400">From:</span>
                  <span className="text-red-600 dark:text-red-400 font-medium">security-noreply@gmail-security.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-600 dark:text-slate-400">Date:</span>
                  <span className="text-slate-900 dark:text-white">Today, 2:47 PM</span>
                </div>
              </div>
            </div>

            {/* Email Body */}
            <div className="p-6 space-y-4">
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                🚨 URGENT: Your Account Has Been Compromised
              </h4>
              
              <p className="text-slate-700 dark:text-slate-300">
                Dear User,
              </p>
              
              <p className="text-slate-700 dark:text-slate-300">
                We detected suspicious activity on your account. Your email was found in the recent MOAB data breach. 
                Immediate action is required to secure your account.
              </p>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-yellow-800 dark:text-yellow-300 font-medium">
                  ⚠️ Your account will be suspended in 24 hours unless you verify your identity.
                </p>
              </div>
              
              <p className="text-slate-700 dark:text-slate-300">
                Click the link below to secure your account immediately:
              </p>
              
              {/* Fake Malicious Link */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                  <ExternalLink className="w-4 h-4" />
                  <span className="font-mono text-sm break-all">
                    https://gmail-security-verification.suspicious-domain.ru/verify?token=abc123
                  </span>
                </div>
              </div>
              
              <p className="text-slate-700 dark:text-slate-300">
                If you don't take action within 24 hours, your account will be permanently deleted.
              </p>
              
              <p className="text-slate-700 dark:text-slate-300">
                Best regards,<br />
                Gmail Security Team
              </p>
            </div>
          </div>

          {/* Red Flags Explanation */}
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-bold text-blue-900 dark:text-blue-300 mb-3">🚩 Red Flags in This Email:</h4>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <li>• Suspicious sender domain (gmail-security.com instead of google.com)</li>
              <li>• Creates false urgency ("24 hours", "permanently deleted")</li>
              <li>• Suspicious link to a non-Google domain (.ru)</li>
              <li>• Generic greeting ("Dear User" instead of your name)</li>
              <li>• Threatens account suspension/deletion</li>
              <li>• Poor grammar and formatting</li>
            </ul>
          </div>

          {/* Safety Tips */}
          <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-bold text-green-900 dark:text-green-300 mb-3">✅ Stay Safe:</h4>
            <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
              <li>• Always verify sender email addresses carefully</li>
              <li>• Hover over links to see the real destination</li>
              <li>• Go directly to the official website instead of clicking links</li>
              <li>• Be suspicious of urgent threats and deadlines</li>
              <li>• When in doubt, contact the company directly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingPreview;