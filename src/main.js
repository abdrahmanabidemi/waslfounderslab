/* 
 * Wasl Founders Lab - Interactivity & Logic
 * Mobile Navigation, FAQ Accordions, Scroll Effects, and Waitlist Modal
 */

import { 
  createIcons, 
  ArrowRight, 
  Lightbulb, 
  Rocket, 
  TrendingUp, 
  Check, 
  Users2, 
  MessagesSquare, 
  Coins, 
  Presentation, 
  Network, 
  CalendarDays, 
  Award, 
  ShieldCheck, 
  Scale, 
  HeartHandshake, 
  BookOpen, 
  Boxes, 
  CheckCircle, 
  Clock, 
  CircleDot, 
  ChevronDown, 
  Linkedin, 
  Twitter, 
  Mail 
} from 'lucide';

// Initialize Lucide Icons
createIcons({
  icons: {
    ArrowRight, 
    Lightbulb, 
    Rocket, 
    TrendingUp, 
    Check, 
    Users2, 
    MessagesSquare, 
    Coins, 
    Presentation, 
    Network, 
    CalendarDays, 
    Award, 
    ShieldCheck, 
    Scale, 
    HeartHandshake, 
    BookOpen, 
    Boxes, 
    CheckCircle, 
    Clock, 
    CircleDot, 
    ChevronDown, 
    Linkedin, 
    Twitter, 
    Mail 
  }
});

document.addEventListener('DOMContentLoaded', () => {
  setupStickyHeader();
  setupMobileNavigation();
  setupFaqAccordion();
  setupScrollReveal();
});

/* Sticky Header on Scroll */
function setupStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
}

/* Mobile Menu & Drawer Operations */
function setupMobileNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!menuToggle || !mobileNav) return;

  const toggleMenu = () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', toggleMenu);

  // Close drawer when links are clicked
  const mobileLinks = mobileNav.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

/* Accessible Accordions for FAQs */
function setupFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items first
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherPanel = otherItem.querySelector('.faq-panel');
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherPanel.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

/* Scroll Animations via Intersection Observer */
function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger only once
      }
    });
  };

  const observerOptions = {
    root: null,
    threshold: 0.1, // trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // offset to trigger slightly before coming fully into viewport
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);
  
  revealElements.forEach(el => {
    observer.observe(el);
  });
}


