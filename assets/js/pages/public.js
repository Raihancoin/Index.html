/* ============================================================
   Public pages — Home, About, How It Works, Projects, Details,
   Calculator, Shariah, FAQ, Contact, Login, Register, Marketplace
   ============================================================ */
window.Pages = window.Pages || {};

function publicShell(content, active){
  const user = Store.session.user;
  return `
  <div class="pub-header">
    <nav class="pub-nav">
      <a href="#/" class="brand"><div class="brand-mark">A</div>Amanah<span>Capital</span></a>
      <div class="pub-links">
        <a href="#/" class="${active==='home'?'active':''}">Home</a>
        <a href="#/how-it-works" class="${active==='how'?'active':''}">How It Works</a>
        <a href="#/projects" class="${active==='projects'?'active':''}">Projects</a>
        <a href="#/calculator" class="${active==='calc'?'active':''}">Calculator</a>
        <a href="#/shariah" class="${active==='shariah'?'active':''}">Shariah</a>
        <a href="#/about" class="${active==='about'?'active':''}">About</a>
      </div>
      <div class="pub-actions">
        ${user ? `<a href="#/app" class="btn btn-outline btn-sm">Dashboard</a><button class="btn btn-ghost btn-sm" onclick="App.logout()">Logout</button>`
               : `<a href="#/login" class="btn btn-outline btn-sm">Login</a><a href="#/register" class="btn btn-primary btn-sm">Get Started</a>`}
        <button class="menu-btn" onclick="App.openDrawer()">${UI.icon('menu')}</button>
      </div>
    </nav>
  </div>

  <div class="drawer" id="drawer" onclick="App.closeDrawer(event)">
    <div class="drawer-panel">
      <a href="#/">Home</a>
      <a href="#/how-it-works">How It Works</a>
      <a href="#/projects">Projects</a>
      <a href="#/calculator">Calculator</a>
      <a href="#/shariah">Shariah</a>
      <a href="#/about">About</a>
      <a href="#/login">Login</a>
      <a href="#/register">Register</a>
    </div>
  </div>

  <main>${content}</main>

  <footer class="pub-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="brand"><div class="brand-mark">A</div>Amanah<span>Capital</span></div>
          <p style="margin-top:14px;max-width:340px;color:#a9b8c4;font-size:.88rem">
            A Shariah-compliant asset financing platform connecting verified investors with entrepreneurs in Bangladesh.
            <span class="badge badge-warning" style="margin-top:10px">DEMO PROTOTYPE</span>
          </p>
        </div>
        <div>
          <h5>Platform</h5>
          <a href="#/projects">Investment Opportunities</a>
          <a href="#/calculator">Financing Calculator</a>
          <a href="#/how-it-works">How It Works</a>
          <a href="#/shariah">Shariah Principles</a>
        </div>
        <div>
          <h5>Company</h5>
          <a href="#/about">About Us</a>
          <a href="#/contact">Contact</a>
          <a href="#/faq">FAQ</a>
          <a href="#/demo">Demo Control Center</a>
        </div>
        <div>
          <h5>Legal</h5>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Risk Disclosure</a>
          <a href="#">Shariah Governance</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2025 Amanah Capital — Demo Prototype. All data fictional.</div>
        <div>Made for Bangladesh 🇧🇩 · BDT ৳</div>
      </div>
    </div>
  </footer>`;
}

function projectCard(p){
  const pct = Math.round((p.funded / p.fundingTarget) * 100);
  const isFull = p.funded >= p.fundingTarget;
  return `
  <a href="#/project/${p.id}" class="proj-card card-hover">
    ${UI.projectIconBg(p.icon)}
    <div class="proj-body">
      <div class="flex-between">
        <span class="badge badge-${p.model==='Murabaha'?'gold':p.model==='Ijarah'?'info':'emerald'}">${p.model}</span>
        ${UI.statusBadge(p.status)}
      </div>
      <div class="proj-title">${p.title}</div>
      <div class="proj-meta"><span>${UI.icon('map-pin')} ${p.location}</span><span>${p.duration} mo</span></div>
      <div>
        <div class="proj-progress"><div class="proj-progress-bar" style="width:${pct}%"></div></div>
        <div class="flex-between tiny muted" style="margin-top:6px"><span>${UI.money(p.funded)} funded</span><span>${pct}%</span></div>
      </div>
      <div class="proj-foot">
        <div><div class="proj-amount">${UI.money(p.assetCost)}</div><div class="tiny muted">Asset purchase price</div></div>
        <div class="badge ${p.riskLevel==='Low'?'badge-success':p.riskLevel==='Medium'?'badge-warning':'badge-danger'}">${p.riskLevel} risk</div>
      </div>
    </div>
  </a>`;
}

Pages.home = function(){
  const stats = { assets:8, investors:10, entrepreneurs:5, active:6 };
  const featured = Store.state.projects.filter(p=>p.featured).slice(0,3);
  const html = `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <div class="hero-eyebrow">${UI.icon('shield-check')} Shariah-Compliant · Bangladesh</div>
          <h1>Own real assets. <span class="hl">Earn real income.</span> Fully halal.</h1>
          <p class="hero-sub">Amanah Capital connects verified investors with entrepreneurs who need financing for real, income-generating assets — auto-rickshaws, tractors, vehicles, machinery. No interest. No uncertainty. No hidden tricks.</p>
          <div class="hero-ctas">
            <a href="#/projects" class="btn btn-primary btn-lg">${UI.icon('trending-up')} Invest Now</a>
            <a href="#/calculator" class="btn btn-outline btn-lg">${UI.icon('calculator')} Financing Calculator</a>
          </div>
          <div class="hero-stats">
            <div class="hero-stat"><div class="num">${stats.assets}</div><div class="lbl">Demo Assets</div></div>
            <div class="hero-stat"><div class="num">${stats.investors}</div><div class="lbl">Demo Investors</div></div>
            <div class="hero-stat"><div class="num">${stats.entrepreneurs}</div><div class="lbl">Demo Entrepreneurs</div></div>
            <div class="hero-stat"><div class="num">${stats.active}</div><div class="lbl">Active Projects</div></div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-card hero-card-a">
            <div class="flex-between" style="margin-bottom:10px"><span class="tiny muted">PORTFOLIO VALUE</span><span class="badge badge-success">DEMO</span></div>
            <div style="font-size:1.5rem;font-weight:800;color:var(--navy)">৳3,45,000</div>
            <div class="tiny" style="color:var(--success);font-weight:600">↑ Illustrative estimate</div>
            <canvas class="mini-chart" id="hero-chart-a" style="margin-top:8px"></canvas>
          </div>
          <div class="hero-card hero-card-b">
            <div class="tiny muted" style="margin-bottom:6px">MONTHLY INCOME (ILLUSTRATIVE)</div>
            <div style="font-size:1.35rem;font-weight:800;color:var(--emerald)">৳4,650</div>
            <div class="tiny muted" style="margin-top:4px">From 4 active assets</div>
            <div style="display:flex;gap:6px;margin-top:14px">
              <span class="chip emerald">Auto</span><span class="chip">Agri</span><span class="chip gold">Poultry</span>
            </div>
          </div>
          <div class="hero-card hero-card-c">
            <div class="tiny muted">SHARIAH STATUS</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:8px;font-weight:700;color:var(--emerald)">${UI.icon('check-circle-2')} Compliant</div>
            <div class="tiny muted" style="margin-top:6px">Reviewed by scholars</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>Why Amanah Capital</h2>
          <p>We finance real assets — not cash loans. Every project is Shariah-structured, asset-backed, and independently reviewed.</p>
        </div>
        <div class="grid g3">
          <div class="feature">${featureIcon('shield-check')}<h4>Genuine Asset Ownership</h4><p>Every financing is backed by a real, verified asset purchased and owned by the platform structure before any agreement begins.</p></div>
          <div class="feature">${featureIcon('scale')}<h4>Shariah Review</h4><p>Each contract is reviewed by qualified scholars. Murabaha, Ijarah, and HPSM are documented explicitly — no disguised interest.</p></div>
          <div class="feature">${featureIcon('users')}<h4>Verified Entrepreneurs</h4><p>Entrepreneurs pass identity, address, business background, and field inspection before any financing is approved.</p></div>
          <div class="feature">${featureIcon('line-chart')}<h4>Transparent Projections</h4><p>All return estimates are illustrative. Actual income depends on contract terms, asset performance, and applicable risks.</p></div>
          <div class="feature">${featureIcon('lock')}<h4>Segregated Project Ledgers</h4><p>Every project has a separate financial ledger. Investor funds are never mixed with company operating cash.</p></div>
          <div class="feature">${featureIcon('handshake')}<h4>Ethical Exit Rules</h4><p>Investment transfers are permitted only when Shariah and legal conditions allow. No trading of debt claims.</p></div>
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--gray-100)">
      <div class="container">
        <div class="section-title">
          <h2>Featured Opportunities</h2>
          <p>Hand-picked asset financing projects — demo data for exploration.</p>
        </div>
        <div class="grid g3">${featured.map(projectCard).join('')}</div>
        <div class="center" style="margin-top:32px"><a href="#/projects" class="btn btn-outline">View all projects ${UI.icon('arrow-right')}</a></div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-title">
          <h2>How It Works</h2>
          <p>Three steps — for investors and entrepreneurs alike.</p>
        </div>
        <div class="grid g2" style="gap:40px">
          <div>
            <span class="badge badge-emerald" style="margin-bottom:14px">FOR INVESTORS</span>
            <h3 style="margin-bottom:20px">Put capital to work — ethically.</h3>
            <div class="stack">
              <div class="flex-center" style="align-items:flex-start;gap:14px"><div class="avatar emerald" style="width:32px;height:32px">1</div><div><h4>Browse verified projects</h4><p class="small">Review asset details, contract type, entrepreneur profile, and risk disclosures.</p></div></div>
              <div class="flex-center" style="align-items:flex-start;gap:14px"><div class="avatar emerald" style="width:32px;height:32px">2</div><div><h4>Contribute to a project</h4><p class="small">Your capital is applied to the specific asset purchase — with documented ownership structure.</p></div></div>
              <div class="flex-center" style="align-items:flex-start;gap:14px"><div class="avatar emerald" style="width:32px;height:32px">3</div><div><h4>Receive income</h4><p class="small">Contract-based income distributed per the agreement. Actual income varies; not guaranteed.</p></div></div>
            </div>
          </div>
          <div>
            <span class="badge badge-gold" style="margin-bottom:14px">FOR ENTREPRENEURS</span>
            <h3 style="margin-bottom:20px">Own the asset you use — gradually.</h3>
            <div class="stack">
              <div class="flex-center" style="align-items:flex-start;gap:14px"><div class="avatar" style="width:32px;height:32px">1</div><div><h4>Apply for financing</h4><p class="small">Tell us what asset you need and how you'll operate the business.</p></div></div>
              <div class="flex-center" style="align-items:flex-start;gap:14px"><div class="avatar" style="width:32px;height:32px">2</div><div><h4>We buy the asset</h4><p class="small">The asset is purchased from a verified supplier and legally owned by the financing structure.</p></div></div>
              <div class="flex-center" style="align-items:flex-start;gap:14px"><div class="avatar" style="width:32px;height:32px">3</div><div><h4>Operate & acquire</h4><p class="small">Pay scheduled amounts to use the asset and gradually acquire full ownership.</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background:linear-gradient(135deg,var(--navy),var(--emerald-dark));color:#fff">
      <div class="container center">
        <h2 style="color:#fff;margin-bottom:14px">Ready to explore?</h2>
        <p style="color:rgba(255,255,255,.8);max-width:600px;margin:0 auto 28px">Use the demo control center to test the complete platform experience as an investor, entrepreneur, or admin.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a href="#/login" class="btn btn-gold btn-lg">Open Demo</a>
          <a href="#/demo" class="btn btn-outline btn-lg" style="background:transparent;color:#fff;border-color:rgba(255,255,255,.3)">Demo Control Center</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-title"><h2>Frequently Asked</h2></div>
        <div class="grid g2" style="gap:16px">
          ${[
            ['Is this real money?','No. This is a fully interactive demo prototype. All figures, projects, and users are fictional demonstration data.'],
            ['What is HPSM?','Diminishing Musharakah — joint ownership where you gradually purchase the financier\'s share while paying rent only on the outstanding portion.'],
            ['What happens if a payment is missed?','Contract terms apply. In Ijarah/HPSM, rent applies only to outstanding ownership. Late payment charges (if any) go to charity, not to the investor pool.'],
            ['Can I sell my investment?','Only when the underlying asset and contract permit it, and only through the platform\'s transfer marketplace. Debt claims cannot be freely traded.'],
            ['Is the income guaranteed?','No. All income shown is an illustrative estimate. Actual income depends on asset performance and contract terms.']
          ].map(([q,a])=>`<div class="card card-pad"><h4 style="margin-bottom:8px">${q}</h4><p class="small">${a}</p></div>`).join('')}
        </div>
      </div>
    </section>`;
  setTimeout(()=>{
    UI.refreshIcons();
    UI.lineChart('hero-chart-a', ['Jan','Feb','Mar','Apr','May'], [280000, 300000, 315000, 335000, 345000]);
  }, 100);
  return publicShell(html, 'home');
};

function featureIcon(name){
  return `<div class="feature-icon">${UI.icon(name)}</div>`;
}

// ============ About
Pages.about = function(){
  return publicShell(`
    <section class="section-sm">
      <div class="container" style="max-width:800px">
        <h1>About Amanah Capital</h1>
        <p style="font-size:1.1rem;margin-top:14px">Amanah Capital is a demo prototype of a Bangladesh-focused Islamic asset financing and investment platform. Our mission: make ethical, asset-backed capital accessible to small entrepreneurs and everyday investors.</p>
        <div class="info-banner" style="margin-top:24px">${UI.icon('info')} This is a demonstration prototype. All personal data, project information, financial calculations, and "verified" statuses are fictional and for demonstration only.</div>
        <div class="grid g3" style="margin-top:40px">
          <div class="card card-pad"><h3 style="color:var(--emerald)">Transparency</h3><p class="small" style="margin-top:8px">Every project has a disclosed contract type, purchase price, markup or rental structure, and ownership history.</p></div>
          <div class="card card-pad"><h3 style="color:var(--emerald)">Fairness</h3><p class="small" style="margin-top:8px">Affordable entrepreneur payments. Clear investor rights. No hidden penalties. No prohibited business activities.</p></div>
          <div class="card card-pad"><h3 style="color:var(--emerald)">Compliance</h3><p class="small" style="margin-top:8px">Reviewed by independent Shariah scholars. Governance center tracks contract approvals, audits, and reviews.</p></div>
        </div>
      </div>
    </section>`, 'about');
};

// ============ How it works
Pages['how-it-works'] = function(){
  return publicShell(`
    <section class="section-sm">
      <div class="container">
        <h1>How It Works</h1>
        <p style="max-width:640px;margin-top:12px">A complete walkthrough of the platform — from application to ownership to income distribution.</p>
        <div class="grid g2" style="margin-top:40px">
          <div class="card card-pad"><div class="badge badge-emerald">STEP 1</div><h3 style="margin-top:12px">Asset Verification</h3><p>Entrepreneur applies. We verify identity, business, supplier, and affordability. The asset is purchased from a verified supplier.</p></div>
          <div class="card card-pad"><div class="badge badge-emerald">STEP 2</div><h3 style="margin-top:12px">Shariah Contract</h3><p>The asset is financed via Murabaha (fixed deferred sale), Ijarah (lease), or HPSM (diminishing ownership). Contract terms are disclosed in full.</p></div>
          <div class="card card-pad"><div class="badge badge-emerald">STEP 3</div><h3 style="margin-top:12px">Investor Participation</h3><p>Investors contribute to the asset purchase. Each investor's share and income entitlement is recorded in the project ledger.</p></div>
          <div class="card card-pad"><div class="badge badge-emerald">STEP 4</div><h3 style="margin-top:12px">Income Distribution</h3><p>Entrepreneur pays scheduled amounts. Contract income is distributed to investors per their ownership share.</p></div>
        </div>
      </div>
    </section>`, 'how');
};

// ============ Projects
Pages.projects = function(){
  const state = Store.state;
  return publicShell(`
    <section class="section-sm">
      <div class="container">
        <div class="flex-between" style="margin-bottom:24px;flex-wrap:wrap;gap:12px">
          <div><h1>Investment Opportunities</h1><p style="margin-top:6px">Explore Shariah-compliant asset financing projects.</p></div>
          <span class="badge badge-warning">DEMO DATA</span>
        </div>
        <div class="filter-bar">
          <input type="text" id="f-search" placeholder="Search by title or location…">
          <select id="f-cat"><option value="">All categories</option>${DATA.categories.map(c=>`<option>${c}</option>`).join('')}</select>
          <select id="f-model"><option value="">All models</option><option>Murabaha</option><option>Ijarah</option><option>HPSM</option></select>
          <select id="f-status"><option value="">All statuses</option><option>Active</option><option>Funding</option><option>Completed</option></select>
        </div>
        <div id="projects-grid" class="grid g3"></div>
      </div>
    </section>`, 'projects');
};

Pages._projectsMount = function(){
  const grid = document.getElementById('projects-grid');
  const render = () => {
    const q = document.getElementById('f-search').value.toLowerCase();
    const cat = document.getElementById('f-cat').value;
    const model = document.getElementById('f-model').value;
    const status = document.getElementById('f-status').value;
    const items = Store.state.projects.filter(p =>
      (!q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)) &&
      (!cat || p.category===cat) && (!model || p.model===model) && (!status || p.status===status)
    );
    grid.innerHTML = items.length ? items.map(projectCard).join('') : `<div class="empty" style="grid-column:1/-1">${UI.icon('search')}<h4>No projects match</h4><p>Try clearing filters.</p></div>`;
    UI.refreshIcons();
  };
  ['f-search','f-cat','f-model','f-status'].forEach(id => document.getElementById(id).addEventListener('input', render));
  render();
};

// ============ Project details
Pages['project/:id'] = function(params){
  const p = Store.getProject(params.id);
  if(!p) return publicShell(`<div class="container section"><div class="empty">${UI.icon('alert-circle')}<h4>Project not found</h4></div></div>`, '');
  const pct = Math.round(p.funded / p.fundingTarget * 100);
  const inv = p.model==='Murabaha' ? Calc.murabaha({price:p.assetCost, markupRate:p.markupRate, months:p.duration})
    : p.model==='Ijarah' ? Calc.ijarah({price:p.assetCost, rentRate:p.rentRate, months:p.duration})
    : Calc.hpsm({price:p.assetCost, initialShare:p.initialShare||0.1, months:p.duration, rentRate:p.rentRate||0.10});

  const ent = DATA.entrepreneurs.find(e=>e.id===p.entrepreneurId);
  const html = `
  <section class="section-sm">
    <div class="container">
      <a href="#/projects" class="small" style="color:var(--emerald);font-weight:600">← Back to projects</a>
      <div class="grid" style="grid-template-columns:2fr 1fr;gap:28px;margin-top:18px">
        <div>
          <div class="card" style="overflow:hidden">
            <div class="proj-img icon-only" style="height:240px"><i data-lucide="${p.icon}" style="width:90px;height:90px"></i>
              <div class="proj-badges"><span class="badge badge-emerald">${p.model}</span>${UI.statusBadge(p.status)}</div>
            </div>
            <div class="card-pad">
              <h1>${p.title}</h1>
              <p class="muted" style="margin:8px 0 20px">${UI.icon('map-pin')} ${p.location} · Duration ${p.duration} months · ${p.riskLevel} risk</p>
              <p>${p.description}</p>
            </div>
          </div>

          <div class="card card-pad" style="margin-top:20px">
            <h3 style="margin-bottom:16px">Contract Structure — ${p.model}</h3>
            <div class="result-row"><span class="label">Asset purchase price</span><span class="val">${UI.money(p.assetCost)}</span></div>
            ${p.model==='Murabaha'?`
              <div class="result-row"><span class="label">Agreed markup (${Math.round(p.markupRate*100)}%)</span><span class="val">${UI.money(inv.markup)}</span></div>
              <div class="result-row"><span class="label">Total fixed sale price</span><span class="val">${UI.money(inv.total)}</span></div>
              <div class="result-row highlight"><span class="label">Monthly installment</span><span class="val">${UI.money(inv.installment)}</span></div>
              <div class="result-row"><span class="label">Contract duration</span><span class="val">${p.duration} months</span></div>
            `:''}
            ${p.model==='Ijarah'?`
              <div class="result-row"><span class="label">Monthly rental</span><span class="val">${UI.money(inv.monthlyRent)}</span></div>
              <div class="result-row highlight"><span class="label">Total lease payments</span><span class="val">${UI.money(inv.total)}</span></div>
              <div class="result-row"><span class="label">Ownership</span><span class="val">Remains with lessor</span></div>
              <div class="result-row"><span class="label">End-of-lease</span><span class="val">Separate sale / gift</span></div>
            `:''}
            ${p.model==='HPSM'?`
              <div class="result-row"><span class="label">Initial entrepreneur share</span><span class="val">${Math.round((p.initialShare||0.1)*100)}%</span></div>
              <div class="result-row"><span class="label">Financier initial share</span><span class="val">${100-Math.round((p.initialShare||0.1)*100)}%</span></div>
              <div class="result-row"><span class="label">Monthly acquisition</span><span class="val">${UI.money(inv.acquisitionPerMonth)}</span></div>
              <div class="result-row"><span class="label">Total rent over term</span><span class="val">${UI.money(inv.totalRent)}</span></div>
              <div class="result-row highlight"><span class="label">First-month payment</span><span class="val">${UI.money(inv.firstPayment)}</span></div>
            `:''}
          </div>

          <div class="card card-pad" style="margin-top:20px">
            <h3 style="margin-bottom:16px">Entrepreneur</h3>
            <div class="flex-center" style="gap:14px">
              <div class="avatar emerald" style="width:48px;height:48px">${ent?ent.name[0]:'E'}</div>
              <div><div class="strong">${ent?ent.name:'Demo Entrepreneur'}</div><div class="small muted">${ent?ent.business:''} · ${ent?ent.district:''}</div></div>
              ${ent&&ent.verified?`<span class="badge badge-success" style="margin-left:auto">${UI.icon('check-circle-2')} Verified (demo)</span>`:''}
            </div>
          </div>

          <div class="card card-pad" style="margin-top:20px">
            <h3 style="margin-bottom:16px">Risks & Disclosures</h3>
            <ul style="padding-left:20px;color:var(--gray-600);font-size:.9rem;line-height:1.8">
              <li>Income shown is illustrative; actual income depends on asset performance and contract terms.</li>
              <li>Asset availability, maintenance, and insurance obligations matter.</li>
              <li>Default and recovery policies apply per contract.</li>
              <li>Investment transfers only permitted when Shariah and legal conditions allow.</li>
              <li>This project is a DEMO — no money is transferred and no contract is legally binding.</li>
            </ul>
          </div>

          <div class="card card-pad" style="margin-top:20px">
            <h3 style="margin-bottom:16px">Documents (demo)</h3>
            ${p.documents.map(d=>`<div class="doc-item"><div class="icon">${UI.icon('file-text')}</div><div><div class="strong small">${d}</div><div class="tiny muted">Demo document — not legally binding</div></div></div>`).join('')}
          </div>
        </div>

        <div>
          <div class="card card-pad" style="position:sticky;top:90px">
            <div class="tiny muted">FUNDING PROGRESS</div>
            <div style="font-size:1.8rem;font-weight:800;color:var(--navy);margin:6px 0">${pct}%</div>
            <div class="proj-progress" style="margin-bottom:12px"><div class="proj-progress-bar" style="width:${pct}%"></div></div>
            <div class="flex-between small" style="margin-bottom:16px"><span>${UI.money(p.funded)}</span><span class="muted">of ${UI.money(p.fundingTarget)}</span></div>
            <div class="divider"></div>
            <div class="result-row"><span class="label">Contract model</span><span class="val">${p.model}</span></div>
            <div class="result-row"><span class="label">Duration</span><span class="val">${p.duration} months</span></div>
            <div class="result-row"><span class="label">Risk level</span><span class="val">${p.riskLevel}</span></div>
            <div class="result-row"><span class="label">Supplier</span><span class="val small">${p.supplier}</span></div>
            ${Store.session.isRole('investor')?`
              <button class="btn btn-primary btn-block" style="margin-top:18px" onclick="Pages._joinProject('${p.id}')">${UI.icon('plus')} Simulate Investment</button>
            `:`<a href="#/login" class="btn btn-primary btn-block" style="margin-top:18px">Login to invest</a>`}
            <div class="tiny muted center" style="margin-top:10px">This is a DEMO. No real money is transferred.</div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
  setTimeout(()=>UI.refreshIcons(), 100);
  return publicShell(html, 'projects');
};

Pages._joinProject = function(projectId){
  const m = UI.modal({
    title:'Simulate Investment',
    body:`
      <p class="small muted" style="margin-bottom:16px">This is a demo. Amounts, ownership shares, and income are illustrative.</p>
      <div class="field"><label>Investment amount (BDT)</label><input type="number" id="inv-amount" value="50000" min="5000" step="5000"></div>
      <div class="info-banner">${UI.icon('info')} Demo only. No real transfer occurs.</div>
      <div class="tiny muted">Your contribution will be recorded against this project's demo ledger.</div>`,
    actions:`<button class="btn btn-outline" onclick="this.closest('.modal-bg').remove()">Cancel</button><button class="btn btn-primary" id="inv-confirm">Confirm</button>`
  });
  document.getElementById('inv-confirm').onclick = () => {
    const amt = parseInt(document.getElementById('inv-amount').value,10);
    if(!amt || amt < 1000){ UI.toast('Enter a valid amount', 'error'); return; }
    const user = Store.session.user;
    const invId = 'IV-' + (Date.now()%100000);
    Store.addInvestment({ id:invId, investorId:user.id||'INV-01', projectId, amount:amt, shares:Math.round(amt/2000), joined:new Date().toISOString().slice(0,10) });
    m.close();
    UI.toast('Investment recorded (demo)', 'success');
    setTimeout(()=>location.hash = '#/app/portfolio', 400);
  };
};

// ============ Calculator
Pages.calculator = function(){
  const html = `
  <section class="section-sm">
    <div class="container">
      <div class="flex-between" style="margin-bottom:24px;flex-wrap:wrap;gap:12px">
        <div><h1>Financing Calculator</h1><p style="margin-top:6px">Explore Murabaha, Ijarah, and HPSM under different inputs.</p></div>
        <span class="badge badge-warning">ILLUSTRATIVE</span>
      </div>

      <div class="calc-grid">
        <div class="card card-pad">
          <div class="tabs" id="calc-tabs">
            <button class="tab active" data-m="Murabaha">Murabaha</button>
            <button class="tab" data-m="Ijarah">Ijarah</button>
            <button class="tab" data-m="HPSM">HPSM</button>
            <button class="tab" data-m="Daily">Daily Simulator</button>
          </div>
          <div id="calc-inputs">
            <div class="field"><label>Asset price (BDT)</label><input type="number" id="c-price" value="200000" min="10000" step="5000"></div>
            <div class="field"><label>Duration (months)</label>
              <select id="c-months">
                ${[12,24,36,48,60].map(m=>`<option value="${m}" ${m===36?'selected':''}>${m} months (${m/12} year${m>12?'s':''})</option>`).join('')}
              </select>
            </div>
            <div class="field" id="f-markup"><label>Markup rate (%)</label><input type="number" id="c-markup" value="22" min="0" max="100"></div>
            <div class="field hidden" id="f-rentrate"><label>Annual rental rate (%)</label><input type="number" id="c-rentrate" value="12" min="0" max="100"></div>
            <div class="field hidden" id="f-initial"><label>Initial entrepreneur share (%)</label><input type="number" id="c-initial" value="15" min="0" max="90"></div>
          </div>
          <div class="info-banner">${UI.icon('info')} Numbers are illustrative; final terms depend on Shariah approval and contract.</div>
        </div>

        <div class="card card-pad">
          <h3 style="margin-bottom:16px" id="calc-title">Murabaha Result</h3>
          <div id="calc-results"></div>
        </div>
      </div>

      <div class="card card-pad" style="margin-top:22px">
        <h3 style="margin-bottom:16px">Payment Schedule (first 12 rows)</h3>
        <div class="tbl-wrap"><table><thead id="calc-thead"></thead><tbody id="calc-tbody"></tbody></table></div>
        <div class="tiny muted" style="margin-top:12px">DEMO ONLY — numbers are illustrative estimates.</div>
      </div>
    </div>
  </section>`;
  setTimeout(()=>{ initCalc(); UI.refreshIcons(); }, 100);
  return publicShell(html, 'calc');
};

function initCalc(){
  let model = 'Murabaha';
  const tabs = document.querySelectorAll('#calc-tabs .tab');
  const run = () => {
    const price = parseInt(document.getElementById('c-price').value)||0;
    const months = parseInt(document.getElementById('c-months').value)||0;
    const markup = parseFloat(document.getElementById('c-markup').value)||0;
    const rentrate = parseFloat(document.getElementById('c-rentrate').value)||0;
    const initial = parseFloat(document.getElementById('c-initial').value)||0;

    const results = document.getElementById('calc-results');
    const thead = document.getElementById('calc-thead');
    const tbody = document.getElementById('calc-tbody');

    if(model==='Murabaha'){
      const r = Calc.murabaha({price, markupRate:markup/100, months});
      document.getElementById('calc-title').textContent = 'Murabaha — Fixed Deferred Sale';
      results.innerHTML = `
        <div class="result-row"><span class="label">Asset cost</span><span class="val">${UI.money(r.price)}</span></div>
        <div class="result-row"><span class="label">Markup (${markup}%)</span><span class="val">${UI.money(r.markup)}</span></div>
        <div class="result-row"><span class="label">Total fixed sale price</span><span class="val">${UI.money(r.total)}</span></div>
        <div class="result-row highlight"><span class="label">Monthly installment</span><span class="val">${UI.money(r.installment)}</span></div>
        <div class="result-row"><span class="label">Duration</span><span class="val">${months} months</span></div>`;
      thead.innerHTML = `<tr><th>Month</th><th>Payment</th><th>Outstanding balance</th></tr>`;
      tbody.innerHTML = r.schedule.slice(0,12).map(s=>`<tr><td>${s.month}</td><td>${UI.money(s.payment)}</td><td>${UI.money(s.balance)}</td></tr>`).join('');
    } else if(model==='Ijarah'){
      const r = Calc.ijarah({price, rentRate:rentrate/100, months});
      document.getElementById('calc-title').textContent = 'Ijarah — Asset Lease';
      results.innerHTML = `
        <div class="result-row"><span class="label">Asset value</span><span class="val">${UI.money(r.price)}</span></div>
        <div class="result-row"><span class="label">Annual rental rate</span><span class="val">${rentrate}%</span></div>
        <div class="result-row highlight"><span class="label">Monthly rental</span><span class="val">${UI.money(r.monthlyRent)}</span></div>
        <div class="result-row"><span class="label">Total over term</span><span class="val">${UI.money(r.total)}</span></div>
        <div class="result-row"><span class="label">Ownership</span><span class="val">Remains with lessor</span></div>`;
      thead.innerHTML = `<tr><th>Month</th><th>Rental</th><th>Cumulative</th></tr>`;
      tbody.innerHTML = r.schedule.slice(0,12).map(s=>`<tr><td>${s.month}</td><td>${UI.money(s.rent)}</td><td>${UI.money(s.cumulative)}</td></tr>`).join('');
    } else if(model==='HPSM'){
      const r = Calc.hpsm({price, initialShare:initial/100, months, rentRate:rentrate/100});
      document.getElementById('calc-title').textContent = 'HPSM — Diminishing Ownership';
      results.innerHTML = `
        <div class="result-row"><span class="label">Initial entrepreneur share</span><span class="val">${initial}%</span></div>
        <div class="result-row"><span class="label">Financier initial share</span><span class="val">${100-initial}%</span></div>
        <div class="result-row"><span class="label">Monthly acquisition</span><span class="val">${UI.money(r.acquisitionPerMonth)}</span></div>
        <div class="result-row"><span class="label">Total rent over term</span><span class="val">${UI.money(r.totalRent)}</span></div>
        <div class="result-row highlight"><span class="label">First-month payment</span><span class="val">${UI.money(r.firstPayment)}</span></div>
        <div class="result-row"><span class="label">Last-month payment</span><span class="val">${UI.money(r.lastPayment)}</span></div>`;
      thead.innerHTML = `<tr><th>Month</th><th>Rent</th><th>Acquisition</th><th>Total</th><th>Ownership %</th></tr>`;
      tbody.innerHTML = r.schedule.slice(0,12).map(s=>`<tr><td>${s.month}</td><td>${UI.money(s.rent)}</td><td>${UI.money(s.acquisition)}</td><td>${UI.money(s.payment)}</td><td>${s.ownershipPct.toFixed(1)}%</td></tr>`).join('');
    } else if(model==='Daily'){
      const monthly = Calc.murabaha({price, markupRate:markup/100, months}).installment;
      const rentP = monthly * 0.5, acqP = monthly * 0.5;
      const d = Calc.daily({ monthlyPayment:monthly, daysPerMonth:26, rentPortion:rentP, acqPortion:acqP });
      document.getElementById('calc-title').textContent = 'Daily Payment Simulator';
      results.innerHTML = `
        <div class="result-row"><span class="label">Monthly payment</span><span class="val">${UI.money(monthly)}</span></div>
        <div class="result-row"><span class="label">Working days / month</span><span class="val">${d.daysPerMonth}</span></div>
        <div class="result-row highlight"><span class="label">Daily total</span><span class="val">${UI.money(d.dailyTotal)}</span></div>
        <div class="result-row"><span class="label">of which rent/day</span><span class="val">${UI.money(d.dailyRent)}</span></div>
        <div class="result-row"><span class="label">of which acquisition/day</span><span class="val">${UI.money(d.dailyAcq)}</span></div>`;
      thead.innerHTML = `<tr><th>Month</th><th>Rent</th><th>Acquisition</th><th>Total</th></tr>`;
      tbody.innerHTML = Array.from({length:12},(_,i)=>`<tr><td>${i+1}</td><td>${UI.money(rentP)}</td><td>${UI.money(acqP)}</td><td>${UI.money(monthly)}</td></tr>`).join('');
    }
  };

  const fieldsFor = m => {
    document.getElementById('f-markup').classList.toggle('hidden', !(m==='Murabaha'||m==='Daily'));
    document.getElementById('f-rentrate').classList.toggle('hidden', !(m==='Ijarah'||m==='HPSM'));
    document.getElementById('f-initial').classList.toggle('hidden', m!=='HPSM');
  };

  tabs.forEach(t => t.onclick = () => {
    tabs.forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    model = t.dataset.m;
    fieldsFor(model);
    run();
  });

  ['c-price','c-months','c-markup','c-rentrate','c-initial'].forEach(id=>{
    const el = document.getElementById(id); if(el) el.addEventListener('input', run);
    if(el) el.addEventListener('change', run);
  });
  fieldsFor(model);
  run();
}

// ============ Shariah principles (public)
Pages.shariah = function(){
  return publicShell(`
    <section class="section-sm">
      <div class="container">
        <h1>Shariah Principles</h1>
        <p style="max-width:640px;margin-top:12px">Every contract on Amanah Capital is reviewed by qualified scholars. We do not lend money with interest — we finance real, owned assets.</p>
        <div class="grid g2" style="margin-top:32px">
          ${[
            ['No Interest (Riba)','Money is not rented. Return comes from real asset ownership, rental of owned property, or profit-sharing — never from lending money.'],
            ['Genuine Asset Ownership','The financing structure must own or possess the asset before it is sold or leased. No hypothetical or fictitious purchases.'],
            ['No Uncertainty (Gharar)','Terms, prices, deliverables, and durations must be clear and disclosed.'],
            ['No Gambling (Maysir)','The platform finances productive assets. Speculative or chance-based returns are prohibited.'],
            ['Risk Sharing','Profit comes with responsibility. Losses are allocated according to the contract.'],
            ['No Prohibited Activities','No financing of alcohol, gambling, tobacco, weapons, adult content, or other Shariah-prohibited business.'],
            ['Charity from Penalties','Any late payment charge (if applicable) must go to charity — not to investors as income.'],
            ['Scholar Review','Contracts must be reviewed and approved by qualified Shariah scholars.']
          ].map(([h,b])=>`<div class="shariah-card"><h4>${UI.icon('check-circle-2')} ${h}</h4><p class="small">${b}</p></div>`).join('')}
        </div>
        <div class="info-banner" style="margin-top:32px">${UI.icon('info')} This demo is not a fatwa. Real deployment requires independent Shariah board approval, legal counsel, and licensing.</div>
      </div>
    </section>`, 'shariah');
};

// ============ FAQ
Pages.faq = function(){
  return publicShell(`
    <section class="section-sm">
      <div class="container" style="max-width:800px">
        <h1>Frequently Asked Questions</h1>
        <div class="stack" style="margin-top:32px">
          ${[
            ['Is Amanah Capital real?','No — this is a fully interactive demo prototype. All projects, users, and financial data are fictional.'],
            ['What contract models are used?','Murabaha (fixed deferred sale), Ijarah (lease), Diminishing Musharakah / HPSM (gradual ownership), and Mudarabah (profit-sharing) where appropriate.'],
            ['Are returns guaranteed?','No. All figures shown are illustrative estimates. Actual income depends on contract terms, asset performance, and applicable risks.'],
            ['What if the entrepreneur misses a payment?','Contract terms apply. Penalty charges, if any, go to charity — not to investors as income. Recovery policies are disclosed per contract.'],
            ['Can I sell my investment?','Only when the underlying asset/contract permits it, and only through the platform transfer marketplace. Debt claims cannot be freely traded.'],
            ['Who verifies entrepreneurs?','A multi-step process: identity, address, business background, field inspection, supplier verification, affordability, risk, and Shariah review.'],
            ['Is data secure?','This is a demo. Real deployment would use role-based auth, encryption, KYC/AML, audit logging, and cloud infrastructure.'],
            ['Is it available outside Bangladesh?','The demo is focused on Bangladesh (BDT, districts, names). Real launch requires licensing and regulatory approval.']
          ].map(([q,a])=>`<div class="card card-pad"><h4 style="margin-bottom:8px">${q}</h4><p class="small">${a}</p></div>`).join('')}
        </div>
      </div>
    </section>`, '');
};

// ============ Contact
Pages.contact = function(){
  return publicShell(`
    <section class="section-sm">
      <div class="container" style="max-width:700px">
        <h1>Contact</h1>
        <p style="margin-top:12px">Reach out — this is a demo form.</p>
        <div class="card card-pad" style="margin-top:24px">
          <div class="field"><label>Name</label><input type="text" placeholder="Your name"></div>
          <div class="field"><label>Email</label><input type="email" placeholder="you@example.com"></div>
          <div class="field"><label>Message</label><textarea rows="4" placeholder="Your message"></textarea></div>
          <button class="btn btn-primary" onclick="UI.toast('Message sent (demo only)','success')">Send message</button>
        </div>
      </div>
    </section>`, '');
};

// ============ Login
Pages.login = function(){
  return `
  <div class="auth-wrap">
    <div class="auth-visual">
      <a href="#/" class="brand" style="color:#fff"><div class="brand-mark" style="background:rgba(255,255,255,.15)">A</div>Amanah<span style="color:var(--gold)">Capital</span></a>
      <div>
        <h2>Welcome back to ethical capital.</h2>
        <p>Sign in to access your investor, entrepreneur, or admin dashboard. Demo accounts are provided below.</p>
      </div>
      <div class="small" style="color:rgba(255,255,255,.6)">© 2025 Amanah Capital — Demo Prototype</div>
    </div>
    <div class="auth-form">
      <div class="auth-form-inner">
        <h2>Login</h2>
        <p class="muted small" style="margin-bottom:24px">Demo credentials below. Password: <code class="mono">demo123</code></p>
        <div class="demo-creds">
          <div class="title">Quick demo login</div>
          <div class="demo-cred-row"><span>Investor — investor@demo.com</span><button onclick="Pages._quickLogin('investor@demo.com','investor','Md. Rashed Karim','INV-01')">Use</button></div>
          <div class="demo-cred-row"><span>Entrepreneur — entrepreneur@demo.com</span><button onclick="Pages._quickLogin('entrepreneur@demo.com','entrepreneur','Md. Habibur Rahman','ENT-01')">Use</button></div>
          <div class="demo-cred-row"><span>Admin — admin@demo.com</span><button onclick="Pages._quickLogin('admin@demo.com','admin','Platform Admin','ADM-01')">Use</button></div>
        </div>
        <form id="login-form">
          <div class="field"><label>Email</label><input type="email" id="li-email" placeholder="you@example.com" required></div>
          <div class="field"><label>Password</label><input type="password" id="li-pass" placeholder="demo123" required></div>
          <button type="submit" class="btn btn-primary btn-block">Sign in</button>
        </form>
        <p class="small muted center" style="margin-top:16px">No account? <a href="#/register" style="color:var(--emerald);font-weight:600">Register</a></p>
      </div>
    </div>
  </div>`;
};

Pages._quickLogin = function(email, role, name, id){
  Store.session.login({ email, role, name, id, initials: name.split(' ').map(x=>x[0]).slice(0,2).join('') });
  UI.toast('Logged in as ' + role, 'success');
  location.hash = role==='admin' ? '#/admin' : (role==='investor' ? '#/app' : '#/ent');
};

Pages._loginMount = function(){
  document.getElementById('login-form').onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('li-email').value.trim();
    const pass = document.getElementById('li-pass').value;
    const known = { 'investor@demo.com':['investor','Md. Rashed Karim','INV-01'],
                    'entrepreneur@demo.com':['entrepreneur','Md. Habibur Rahman','ENT-01'],
                    'admin@demo.com':['admin','Platform Admin','ADM-01'] };
    if(!known[email]){ UI.toast('Use one of the demo accounts (see above)', 'error'); return; }
    if(pass !== 'demo123'){ UI.toast('Password must be demo123', 'error'); return; }
    const [role, name, id] = known[email];
    Pages._quickLogin(email, role, name, id);
  };
};

// ============ Register
Pages.register = function(){
  return `
  <div class="auth-wrap">
    <div class="auth-visual">
      <a href="#/" class="brand" style="color:#fff"><div class="brand-mark" style="background:rgba(255,255,255,.15)">A</div>Amanah<span style="color:var(--gold)">Capital</span></a>
      <div><h2>Join the ethical economy.</h2><p>Register as an investor or entrepreneur. Demo only — no real KYC.</p></div>
      <div class="small" style="color:rgba(255,255,255,.6)">© 2025 Amanah Capital — Demo Prototype</div>
    </div>
    <div class="auth-form">
      <div class="auth-form-inner">
        <h2>Create account</h2>
        <div class="info-banner" style="margin-top:16px">${UI.icon('info')} Demo registration. For real platform access use demo credentials.</div>
        <form id="reg-form">
          <div class="field"><label>Full name</label><input type="text" id="r-name" required placeholder="Your name"></div>
          <div class="field"><label>Email</label><input type="email" id="r-email" required placeholder="you@example.com"></div>
          <div class="field"><label>Role</label>
            <select id="r-role"><option value="investor">Investor</option><option value="entrepreneur">Entrepreneur</option></select>
          </div>
          <div class="field"><label>Password</label><input type="password" id="r-pass" required placeholder="Create password"></div>
          <button type="submit" class="btn btn-primary btn-block">Create account (demo)</button>
        </form>
        <p class="small muted center" style="margin-top:16px">Already have an account? <a href="#/login" style="color:var(--emerald);font-weight:600">Login</a></p>
      </div>
    </div>
  </div>`;
};

Pages._registerMount = function(){
  document.getElementById('reg-form').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('r-name').value.trim();
    const email = document.getElementById('r-email').value.trim();
    const role = document.getElementById('r-role').value;
    const id = (role==='investor'?'INV-':'ENT-') + (Date.now()%1000);
    Store.session.login({ email, role, name, id, initials:name.split(' ').map(x=>x[0]).slice(0,2).join('') });
    UI.toast('Demo account created', 'success');
    location.hash = role==='investor' ? '#/app' : '#/ent';
  };
};
