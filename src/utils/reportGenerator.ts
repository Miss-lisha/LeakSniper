import jsPDF from 'jspdf';
import { Breach } from '../data/breaches';

export const generatePDFReport = (
  query: string,
  breaches: Breach[],
  isEmail: boolean
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  let yPosition = margin;

  // Header with Logo
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 58, 138); // Blue color
  doc.text('LeakSniper', margin, yPosition);
  yPosition += 8;
  
  doc.setFontSize(16);
  doc.setTextColor(71, 85, 105); // Slate color
  doc.text('Security Report', margin, yPosition);
  yPosition += 15;

  // Reset color
  doc.setTextColor(0, 0, 0);

  // Report metadata
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Report ID: LSR-${Date.now()}`, margin, yPosition);
  yPosition += 15;

  // Executive Summary
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(`${isEmail ? 'Email' : 'Phone'}: ${query}`, margin, yPosition);
  yPosition += 6;
  doc.text(`Breaches Found: ${breaches.length}`, margin, yPosition);
  yPosition += 6;

  // Risk Assessment
  const riskScore = calculateRiskScore(breaches);
  const riskLevel = getRiskLevel(riskScore);
  doc.text(`Risk Score: ${riskScore}/100 (${riskLevel})`, margin, yPosition);
  yPosition += 15;

  // Breach Details
  if (breaches.length > 0) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Breach Details', margin, yPosition);
    yPosition += 10;

    breaches.forEach((breach, index) => {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${breach.name} (${breach.year})`, margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      // Risk level with color
      if (breach.riskLevel === 'high') {
        doc.setTextColor(220, 38, 38); // Red
      } else if (breach.riskLevel === 'medium') {
        doc.setTextColor(245, 158, 11); // Amber
      } else {
        doc.setTextColor(34, 197, 94); // Green
      }
      doc.text(`Risk Level: ${breach.riskLevel.toUpperCase()}`, margin + 5, yPosition);
      doc.setTextColor(0, 0, 0); // Reset to black
      yPosition += 6;
      
      doc.text(`Records Affected: ${breach.recordCount}`, margin + 5, yPosition);
      yPosition += 6;

      // Description
      const descLines = doc.splitTextToSize(breach.description, pageWidth - margin * 2 - 10);
      doc.text('Description:', margin + 5, yPosition);
      yPosition += 5;
      descLines.forEach((line: string) => {
        doc.text(line, margin + 10, yPosition);
        yPosition += 4;
      });
      yPosition += 3;

      // Compromised data
      doc.text('Compromised Data:', margin + 5, yPosition);
      yPosition += 5;
      breach.compromisedData.forEach(data => {
        doc.text(`• ${data}`, margin + 10, yPosition);
        yPosition += 4;
      });
      yPosition += 3;

      // Advice
      doc.text('Recommended Actions:', margin + 5, yPosition);
      yPosition += 5;
      const adviceLines = doc.splitTextToSize(breach.advice, pageWidth - margin * 2 - 10);
      adviceLines.forEach((line: string) => {
        doc.text(line, margin + 10, yPosition);
        yPosition += 4;
      });
      yPosition += 10;
    });

    // Recommendations section
    if (yPosition > 200) {
      doc.addPage();
      yPosition = margin;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Immediate Action Plan', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const recommendations = [
      '1. Change passwords for all affected accounts immediately',
      '2. Enable two-factor authentication (2FA) on all accounts',
      '3. Monitor your accounts for suspicious activity',
      '4. Consider using a password manager',
      '5. Set up credit monitoring if personal information was exposed',
      '6. Be vigilant for phishing attempts using your exposed data'
    ];

    recommendations.forEach(rec => {
      doc.text(rec, margin, yPosition);
      yPosition += 6;
    });

  } else {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(34, 197, 94); // Green
    doc.text('Good News!', margin, yPosition);
    yPosition += 10;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('No breaches found for this query.', margin, yPosition);
    yPosition += 6;
    doc.text('Your data appears to be safe from known major breaches.', margin, yPosition);
    yPosition += 10;

    doc.text('Continue to stay safe by:', margin, yPosition);
    yPosition += 6;
    doc.text('• Using unique passwords for each account', margin + 5, yPosition);
    yPosition += 5;
    doc.text('• Enabling two-factor authentication', margin + 5, yPosition);
    yPosition += 5;
    doc.text('• Regularly monitoring your accounts', margin + 5, yPosition);
  }

  // Footer
  yPosition = doc.internal.pageSize.height - 30;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(107, 114, 128); // Gray
  doc.text('LeakSniper - Client-side security awareness tool', margin, yPosition);
  doc.text('This report was generated locally in your browser. No data was transmitted.', margin, yPosition + 5);
  doc.text('For the latest security updates, visit LeakSniper regularly.', margin, yPosition + 10);

  // Save the PDF
  doc.save(`LeakSniper-Security-Report-${new Date().toISOString().split('T')[0]}.pdf`);
};

export const generateTextReport = (
  query: string,
  breaches: Breach[],
  isEmail: boolean
) => {
  let report = '═══════════════════════════════════════════════════════════════\n';
  report += '                    LEAKSNIPER SECURITY REPORT\n';
  report += '═══════════════════════════════════════════════════════════════\n\n';
  
  report += `Generated: ${new Date().toLocaleString()}\n`;
  report += `Report ID: LSR-${Date.now()}\n`;
  report += `${isEmail ? 'Email' : 'Phone'}: ${query}\n`;
  report += `Breaches Found: ${breaches.length}\n`;
  
  const riskScore = calculateRiskScore(breaches);
  const riskLevel = getRiskLevel(riskScore);
  report += `Risk Score: ${riskScore}/100 (${riskLevel})\n\n`;

  if (breaches.length > 0) {
    report += '───────────────────────────────────────────────────────────────\n';
    report += '                        BREACH DETAILS\n';
    report += '───────────────────────────────────────────────────────────────\n\n';

    breaches.forEach((breach, index) => {
      report += `${index + 1}. ${breach.name} (${breach.year})\n`;
      report += `   Risk Level: ${breach.riskLevel.toUpperCase()}\n`;
      report += `   Records Affected: ${breach.recordCount}\n`;
      report += `   Description: ${breach.description}\n`;
      report += `   Compromised Data: ${breach.compromisedData.join(', ')}\n`;
      report += `   Recommended Actions: ${breach.advice}\n\n`;
    });

    report += '───────────────────────────────────────────────────────────────\n';
    report += '                    IMMEDIATE ACTION PLAN\n';
    report += '───────────────────────────────────────────────────────────────\n\n';
    report += '1. Change passwords for all affected accounts immediately\n';
    report += '2. Enable two-factor authentication (2FA) on all accounts\n';
    report += '3. Monitor your accounts for suspicious activity\n';
    report += '4. Consider using a password manager\n';
    report += '5. Set up credit monitoring if personal information was exposed\n';
    report += '6. Be vigilant for phishing attempts using your exposed data\n\n';
  } else {
    report += '───────────────────────────────────────────────────────────────\n';
    report += '                         GOOD NEWS!\n';
    report += '───────────────────────────────────────────────────────────────\n\n';
    report += 'No breaches found for this query.\n';
    report += 'Your data appears to be safe from known major breaches.\n\n';
    report += 'Continue to stay safe by:\n';
    report += '• Using unique passwords for each account\n';
    report += '• Enabling two-factor authentication\n';
    report += '• Regularly monitoring your accounts\n\n';
  }

  report += '───────────────────────────────────────────────────────────────\n';
  report += '                      IMPORTANT NOTICE\n';
  report += '───────────────────────────────────────────────────────────────\n\n';
  report += 'LeakSniper is a client-side security awareness tool.\n';
  report += 'This report was generated locally in your browser.\n';
  report += 'No data was transmitted to external servers.\n';
  report += 'For the latest security updates, visit LeakSniper regularly.\n\n';
  report += 'Stay vigilant and stay secure!\n';

  // Create and download text file
  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `LeakSniper-Security-Report-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Helper functions
const calculateRiskScore = (breaches: Breach[]): number => {
  if (breaches.length === 0) return 0;
  
  let score = 0;
  breaches.forEach(breach => {
    score += 20; // Base score for being in a breach
    
    if (breach.riskLevel === 'high') score += 30;
    else if (breach.riskLevel === 'medium') score += 15;
    else score += 5;
    
    if (breach.compromisedData.some(data => data.toLowerCase().includes('password'))) {
      score += 25;
    }
    
    if (breach.id === 'moab-2024') score += 20;
  });
  
  return Math.min(score, 100);
};

const getRiskLevel = (score: number): string => {
  if (score >= 80) return 'Critical';
  if (score >= 60) return 'High';
  if (score >= 40) return 'Medium';
  if (score >= 20) return 'Low';
  return 'Minimal';
};