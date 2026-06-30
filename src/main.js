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
  setupWaitlistInteractive();
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

/* Interactive Waitlist Modal & Success Toast System */
function setupWaitlistInteractive() {
  // Select join triggers
  const ctaBtn = document.getElementById('cta-button');
  const navCtaBtn = document.querySelector('.nav-cta .btn');
  const heroCtaBtn = document.querySelector('.hero-content .btn-primary');
  const whyWaslCtaBtn = document.querySelector('.why-wasl-content .btn-primary');
  
  const buttonsToBind = [ctaBtn, navCtaBtn, heroCtaBtn, whyWaslCtaBtn].filter(Boolean);

  // Inject modal markup into the DOM dynamically
  const modalHTML = `
    <div id="waitlist-modal" style="
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background-color: rgba(15, 47, 36, 0.6); backdrop-filter: blur(8px);
      display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none; transition: opacity 0.3s ease; z-index: 2000;
      padding: 1.5rem;
    ">
      <div style="
        background-color: #FFFFFF; width: 100%; max-width: 480px;
        border-radius: 20px; padding: 2.5rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        position: relative; transform: translateY(20px); transition: transform 0.3s ease;
        border: 1px solid rgba(15, 47, 36, 0.08);
      " id="modal-container">
        <button id="close-modal" style="
          position: absolute; top: 1.25rem; right: 1.25rem;
          background: none; border: none; font-size: 1.5rem; cursor: pointer;
          color: #6B7280; line-height: 1; transition: color 0.15s;
        " aria-label="Close modal">&times;</button>
        <h3 style="font-family: 'Outfit', sans-serif; font-size: 1.5rem; color: #0F2F24; margin-bottom: 0.75rem;">
          Join the Founders Community
        </h3>
        <p style="font-size: 0.95rem; color: #4B5563; margin-bottom: 1.5rem;">
          Enter your details below to request access to the Wasl ecosystem. We review requests weekly.
        </p>
        <form id="waitlist-form" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #111827; margin-bottom: 0.35rem;" for="founder-name">Full Name</label>
            <input type="text" id="founder-name" required placeholder="Aisha Ibrahim" style="
              width: 100%; padding: 0.75rem 1rem; border: 1px solid #E5E7EB; border-radius: 8px;
              font-family: inherit; font-size: 0.95rem; outline: none; transition: border-color 0.2s;
            ">
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #111827; margin-bottom: 0.35rem;" for="founder-email">Work Email</label>
            <input type="email" id="founder-email" required placeholder="aisha@startup.com" style="
              width: 100%; padding: 0.75rem 1rem; border: 1px solid #E5E7EB; border-radius: 8px;
              font-family: inherit; font-size: 0.95rem; outline: none; transition: border-color 0.2s;
            ">
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; color: #111827; margin-bottom: 0.35rem;" for="founder-stage">Startup Stage</label>
            <select id="founder-stage" style="
              width: 100%; padding: 0.75rem 1rem; border: 1px solid #E5E7EB; border-radius: 8px;
              font-family: inherit; font-size: 0.95rem; outline: none; background-color: #FFFFFF;
            ">
              <option value="aspiring">Aspiring Founder (Idea Stage)</option>
              <option value="early">Early-Stage (MVP Built / Launching)</option>
              <option value="growing">Growing (Scaling / Fundraising)</option>
            </select>
          </div>
          <button type="submit" style="
            background-color: #0F2F24; color: #FFFFFF; font-weight: 600;
            padding: 0.85rem 1.5rem; border: none; border-radius: 8px; cursor: pointer;
            margin-top: 0.5rem; transition: background-color 0.2s; font-family: inherit;
          " id="submit-modal-btn">Submit Request</button>
        </form>
      </div>
    </div>
    <div id="success-toast" style="
      position: fixed; bottom: 2rem; right: 2rem;
      background-color: #0F2F24; color: #FFFFFF; border: 1px solid rgba(185, 145, 76, 0.3);
      padding: 1rem 1.5rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      display: flex; align-items: center; gap: 0.75rem; z-index: 2001;
      transform: translateY(100px); opacity: 0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    ">
      <div style="background-color: #B9914C; color: #0F2F24; border-radius: 50%; width: 1.5rem; height: 1.5rem; display: flex; align-items: center; justify-content: center; font-weight: bold;">✓</div>
      <div>
        <h4 style="color: #FFFFFF; font-size: 0.9rem; font-weight: 600; font-family: 'Outfit', sans-serif;">Request Submitted!</h4>
        <p style="color: #E5E7EB; font-size: 0.8rem; margin: 0;">We will contact you within 3 business days.</p>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.getElementById('waitlist-modal');
  const modalContainer = document.getElementById('modal-container');
  const closeModal = document.getElementById('close-modal');
  const waitlistForm = document.getElementById('waitlist-form');
  const submitBtn = document.getElementById('submit-modal-btn');
  const successToast = document.getElementById('success-toast');

  const openModal = (e) => {
    e.preventDefault();
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'all';
    modalContainer.style.transform = 'translateY(0)';
  };

  const hideModal = () => {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    modalContainer.style.transform = 'translateY(20px)';
  };

  // Bind clicks
  buttonsToBind.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  closeModal.addEventListener('click', hideModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });

  // Handle Form Submission
  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Disable submit button and change text to mock sending
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    setTimeout(() => {
      // Clear form & hide modal
      waitlistForm.reset();
      hideModal();
      
      // Reset button
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Request';
      
      // Trigger toast
      successToast.style.opacity = '1';
      successToast.style.transform = 'translateY(0)';
      
      // Hide toast after 4s
      setTimeout(() => {
        successToast.style.opacity = '0';
        successToast.style.transform = 'translateY(100px)';
      }, 4000);
    }, 1200);
  });

  // Highlight inputs on focus
  const inputs = waitlistForm.querySelectorAll('input, select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.style.borderColor = '#0F2F24';
      input.style.boxShadow = '0 0 0 3px rgba(15, 47, 36, 0.1)';
    });
    input.addEventListener('blur', () => {
      input.style.borderColor = '#E5E7EB';
      input.style.boxShadow = 'none';
    });
  });
}
