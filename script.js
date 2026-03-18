/* Apex Fitness — Interactive JS */
(function() {
  'use strict';

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);

  // SVG Check Icon
  const check = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

  // ── Data ──
  const features = [
    {
      icon: '⊞',
      title: 'World-Class Equipment',
      desc: 'Premium machines and free weights from leading brands, maintained to perfection.'
    },
    {
      icon: '👥',
      title: 'Expert Trainers',
      desc: 'Certified professionals who craft personalized programs for your goals.'
    },
    {
      icon: '🛡',
      title: '24/7 Access',
      desc: 'Train on your schedule. Our facility is open around the clock, every day.'
    },
    {
      icon: '📈',
      title: 'Performance Tracking',
      desc: 'Smart analytics and progress monitoring to keep you on the path to greatness.'
    }
  ];

  const gallery = [
    { src: 'images/gallery-1.png', label: 'Weight Zone' },
    { src: 'images/gallery-2.png', label: 'Cardio Floor' },
    { src: 'images/gallery-3.png', label: 'Strength Area' },
    { src: 'images/gallery-4.png', label: 'Combat Zone' },
    { src: 'images/gallery-5.png', label: 'Recovery Studio' }
  ];

  const plans = [
    {
      name: 'Basic',
      desc: 'Perfect for getting started',
      price: 999,
      feats: ['Full gym access', 'Locker room access', '2 group classes / week', 'Basic fitness tracking']
    },
    {
      name: 'Pro',
      desc: 'For serious athletes',
      price: 1999,
      featured: true,
      feats: ['Everything in Basic', 'Personal trainer (2x/week)', 'Unlimited group classes', 'Nutrition guidance', 'Advanced analytics']
    },
    {
      name: 'Elite',
      desc: 'The ultimate experience',
      price: 2999,
      feats: ['Everything in Pro', 'Daily personal training', 'Custom diet plan', 'Recovery & spa access', 'Priority booking']
    }
  ];

  const testimonials = [
    {
      text: '"Apex Fitness completely transformed my training. The equipment is top-tier, the trainers are phenomenal, and the atmosphere pushes you to be your best."',
      author: 'Arjun Mehta',
      role: 'Member since 2024'
    },
    {
      text: '"I\'ve been to dozens of gyms — nothing comes close. The Pro plan with personal training changed everything. Down 15kg in 6 months."',
      author: 'Priya Sharma',
      role: 'Pro Member'
    },
    {
      text: '"The Elite membership is worth every rupee. Personal training, diet plans, spa access — it\'s a complete lifestyle upgrade."',
      author: 'Rahul Kapoor',
      role: 'Elite Member'
    }
  ];

  // ── Render Templates ──
  $('#featuresGrid').innerHTML = features.map((f, i) => `
    <div class="feature-card reveal tilt-card" style="--i:${i}" data-tilt>
      <div class="feature-icon">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>
  `).join('');

  $('#galleryGrid').innerHTML = gallery.map(g => `
    <div class="gallery-item reveal tilt-card" data-tilt data-tilt-max="5">
      <img src="${g.src}" alt="${g.label}" loading="lazy" />
      <span class="gallery-label">${g.label}</span>
    </div>
  `).join('');

  $('#plansGrid').innerHTML = plans.map((p, i) => `
    <div class="plan-card${p.featured ? ' featured' : ''} reveal tilt-card" style="--i:${i}" data-tilt>
      ${p.featured ? '<div class="plan-badge">Most Popular</div>' : ''}
      <h3 class="plan-name">${p.name}</h3>
      <p class="plan-desc">${p.desc}</p>
      <div class="plan-price">
        <span class="currency">₹</span>
        <span class="amount" data-price="${p.price}">${p.price.toLocaleString('en-IN')}</span>
        <span class="period">/month</span>
      </div>
      <ul class="plan-features">
        ${p.feats.map(f => `<li>${check} ${f}</li>`).join('')}
      </ul>
      <button class="plan-btn" data-magnetic>Choose ${p.name}</button>
    </div>
  `).join('');

  $('#testimonialsTrack').innerHTML = testimonials.map(t => `
    <div class="testimonial-card">
      <div class="testimonial-stars">★★★★★</div>
      <p class="testimonial-text">${t.text}</p>
      <p class="testimonial-author">${t.author}</p>
      <p class="testimonial-role">${t.role}</p>
    </div>
  `).join('');

  $('#testimonialsDots').innerHTML = testimonials.map((_, i) => `
    <button class="dot${i === 0 ? ' active' : ''}" data-slide="${i}"></button>
  `).join('');

  $('#footerGrid').innerHTML = `
    <div class="footer-brand">
      <a href="#" class="nav-logo">APEX FITNESS</a>
      <p>Redefining fitness with premium facilities, expert guidance, and a community that pushes you to achieve greatness.</p>
    </div>
    <div class="footer-col">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="#about">About Us</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#plans">Membership</a></li>
        <li><a href="#join">Join Now</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Programs</h4>
      <ul>
        <li><a href="#">Strength Training</a></li>
        <li><a href="#">HIIT Classes</a></li>
        <li><a href="#">Yoga & Recovery</a></li>
        <li><a href="#">Personal Training</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <ul>
        <li><span class="footer-icon">📍 Near ADYPU , Lohegaon , Pune 412105</span></li>
        <li><span class="footer-icon">📞 +91 1234567890</span></li>
        <li><span class="footer-icon">🕐 Open 24/7</span></li>
      </ul>
    </div>
  `;

  // ── Loading Screen ──
  const loader = $('#loadingScreen');
  const bar = $('#loaderBar');
  let prog = 0;

  function tick() {
    prog += Math.random() * 12 + 3;
    if (prog > 100) prog = 100;
    
    bar.style.width = prog + '%';
    
    if (prog < 100) {
      return setTimeout(tick, 150 + Math.random() * 200);
    }
    
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = '';
      initInteractiveFeatures();
    }, 500);
  }

  document.body.style.overflow = 'hidden';
  addEventListener('load', () => setTimeout(tick, 300));

  // ── Cursor Glow ──
  const glow = $('#cursorGlow');
  
  function cursorLoop() {
    mouse.x += (mouse.tx - mouse.x) * 0.12;
    mouse.y += (mouse.ty - mouse.y) * 0.12;
    glow.style.left = mouse.x + 'px';
    glow.style.top = mouse.y + 'px';
    requestAnimationFrame(cursorLoop);
  }
  cursorLoop();

  document.addEventListener('mousemove', e => {
    mouse.tx = e.clientX;
    mouse.ty = e.clientY;
    glow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    glow.classList.remove('active');
  });

  // ── Particles ──
  const cvs = $('#particles-canvas');
  const ctx = cvs.getContext('2d');
  let pts = [];

  function resize() {
    cvs.width = innerWidth;
    cvs.height = innerHeight;
  }

  class P {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * cvs.width;
      this.y = Math.random() * cvs.height;
      this.s = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.o = Math.random() * 0.4 + 0.1;
      this.h = 270 + Math.random() * 30;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      const dx = this.x - mouse.tx;
      const dy = this.y - mouse.ty;
      const d = Math.hypot(dx, dy);
      
      if (d < 150) {
        const f = (150 - d) / 150;
        this.x += dx / d * f * 1.5;
        this.y += dy / d * f * 1.5;
      }
      
      if (this.x < -10) this.x = cvs.width + 10;
      if (this.x > cvs.width + 10) this.x = -10;
      if (this.y < -10) this.y = cvs.height + 10;
      if (this.y > cvs.height + 10) this.y = -10;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.h},80%,65%,${this.o})`;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.s * 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.h},80%,65%,${this.o * 0.15})`;
      ctx.fill();
    }
  }

  resize();
  for (let i = 0; i < 60; i++) {
    pts.push(new P());
  }

  function drawParticles() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    
    for (let i = 0; i < pts.length; i++) {
      pts[i].update();
      pts[i].draw();
      
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `hsla(275,80%,65%,${0.06 * (1 - d / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  
  drawParticles();
  addEventListener('resize', resize);

  // ── Init Interactive Features ──
  function initInteractiveFeatures() {
    // Scroll Reveal
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    $$('.reveal').forEach(el => obs.observe(el));

    // 3D Tilt Cards
    $$('[data-tilt]').forEach(c => {
      const max = +(c.dataset.tiltMax || 8);
      
      c.addEventListener('mousemove', e => {
        const r = c.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        
        c.style.transform = `perspective(800px) rotateX(${((y - r.height / 2) / r.height * 2) * -max}deg) rotateY(${((x - r.width / 2) / r.width * 2) * max}deg) scale3d(1.02,1.02,1.02)`;
        c.style.background = `radial-gradient(circle at ${x / r.width * 100}% ${y / r.height * 100}%, rgba(123,47,247,0.12) 0%, rgba(18,18,30,0.65) 50%)`;
      });
      
      c.addEventListener('mouseleave', () => {
        c.style.transform = '';
        c.style.background = '';
      });
    });

    // Magnetic Buttons
    $$('[data-magnetic]').forEach(b => {
      b.addEventListener('mousemove', e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      
      b.addEventListener('mouseleave', () => {
        b.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        b.style.transform = '';
        setTimeout(() => b.style.transition = '', 400);
      });
      
      b.addEventListener('click', e => {
        const rip = document.createElement('span');
        rip.classList.add('btn-ripple');
        
        const r = b.getBoundingClientRect();
        rip.style.left = e.clientX - r.left + 'px';
        rip.style.top = e.clientY - r.top + 'px';
        
        b.appendChild(rip);
        setTimeout(() => rip.remove(), 600);
      });
    });

    // Navbar
    const nav = $('#navbar');
    const toggle = $('#navToggle');
    const links = $('#navLinks');
    
    addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', scrollY > 60);
    });
    
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('active');
    });
    
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('active');
      });
    });

    // Smooth Scroll
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const targetElement = $(a.getAttribute('href'));
        if (targetElement) {
          scrollTo({
            top: targetElement.getBoundingClientRect().top + scrollY - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Scroll Progress + Parallax
    const sp = $('#scroll-progress');
    const hbg = $('#heroBg');
    
    addEventListener('scroll', () => {
      sp.style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + '%';
      if (hbg && scrollY < innerHeight) {
        hbg.style.transform = `translateY(${scrollY * 0.35}px) scale(1.05)`;
      }
    });

    // Testimonials
    const track = $('#testimonialsTrack');
    const dots = $$('#testimonialsDots .dot');
    
    if (track && dots.length) {
      let cur = 0;
      let timer = setInterval(() => go((cur + 1) % dots.length), 5000);
      
      function go(i) {
        cur = i;
        track.style.transform = `translateX(-${cur * 100}%)`;
        dots.forEach(d => d.classList.remove('active'));
        dots[cur].classList.add('active');
      }
      
      dots.forEach(d => {
        d.addEventListener('click', () => {
          clearInterval(timer);
          go(+d.dataset.slide);
          timer = setInterval(() => go((cur + 1) % dots.length), 5000);
        });
      });
    }

    // Form submission
    const form = $('#joinForm');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('.form-submit');
        const origText = btn.innerHTML;
        
        btn.innerHTML = '✓ Request Sent!';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        btn.style.boxShadow = '0 4px 25px rgba(34, 197, 94, 0.35)';
        
        setTimeout(() => {
          btn.innerHTML = origText;
          btn.style.background = '';
          btn.style.boxShadow = '';
          form.reset();
        }, 3000);
      });
    }

    // Animated Prices
    const po = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const el = en.target;
          const end = +el.dataset.price;
          const st = performance.now();
          
          function updateCounter(t) {
            const p = Math.min((t - st) / 1200, 1);
            el.textContent = Math.floor(end * (1 - Math.pow(1 - p, 3))).toLocaleString('en-IN');
            if (p < 1) requestAnimationFrame(updateCounter);
          }
          
          updateCounter(st);
          po.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    $$('.plan-price .amount').forEach(el => po.observe(el));

    // Section Glow
    $$('.section').forEach(s => {
      s.addEventListener('mousemove', e => {
        const r = s.getBoundingClientRect();
        s.style.setProperty('--glow-x', (e.clientX - r.left) + 'px');
        s.style.setProperty('--glow-y', (e.clientY - r.top) + 'px');
      });
    });
  }

})();
