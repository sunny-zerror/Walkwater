"use client";
import React from 'react';
import { useTransitionRouter } from 'next-view-transitions';
import { transitionPage } from './PageTransition';

const CustomLink = ({ href, label, children, className = "", onClick, ...props }) => {
  const router = useTransitionRouter();

  const handleNavigate = (e) => {
    e.preventDefault();
    
    if (onClick) {
      onClick(e);
    }
    
    // Determine the title to display during the transition
    let transitionTitle = label;
    if (!transitionTitle && typeof children === 'string') {
        transitionTitle = children;
    }
    if (!transitionTitle) {
        transitionTitle = ""; // Fallback if no string label is found
    }
    
    transitionPage(href, transitionTitle, router);
  };

  return (
    <a href={href} onClick={handleNavigate} className={className} {...props}>
      {children || label}
    </a>
  );
};

export default CustomLink;
