import React from 'react';

export const ScalePodsLogoCustom = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 400 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="75" fontFamily="sans-serif" fontWeight="800" fontSize="72" letterSpacing="-2" fill="#fff">ScaleP</text>
    <g transform="translate(245, 50)">
      {/* Outer circle of dots */}
      {[...Array(8)].map((_, i) => (
        <circle key={'out'+i} cx={22 * Math.cos(i * Math.PI / 4)} cy={22 * Math.sin(i * Math.PI / 4)} r="3.5" fill="#fff" />
      ))}
      {/* Inner single dot */}
      <circle cx="0" cy="0" r="4.5" fill="#fff" />
    </g>
    <text x="275" y="75" fontFamily="sans-serif" fontWeight="800" fontSize="72" letterSpacing="-2" fill="#fff">ds</text>
  </svg>
);

export const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

export const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
