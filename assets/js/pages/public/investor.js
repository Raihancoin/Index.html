/* ============================================================
   Investor dashboard pages
   ============================================================ */
function appShell(content, active, role){
  const user = Store.session.user;
  const navs = {
    investor: [
      {g:'Overview'},
      {href:'#/app', icon:'layout-dashboard', label:'Dashboard', id:'dash'},
      {g:'Invest'},
      {href:'#/app/marketplace', icon:'search', label:'Marketplace', id:'market'},
      {href:'#/app/portfolio', icon:'briefcase', label:'My Portfolio', id:'portfolio'},
      {href:'#/app/income', icon:'trending-up', label:'Income', id:'income'},
      {href:'#/app/transfers', icon:'repeat', label:'Transfers', id:'transfers'},
      {g:'Account'},
      {href:'#/app/messages', icon:'message-circle', label:'Messages', id:'messages'}
    ],
    entrepreneur: [
      {g:'Overview'},
      {href:'#/ent', icon:'layout-dashboard', label:'Dashboard', id:'dash'},
      {href:'#/ent/apply', icon:'plus-circle', label:'Apply for Financing', id:'apply'},
      {href:'#/ent/applications', icon:'file-text', label:'My Applications', id:'apps'},
      {g:'Manage'},
      {href:'#/ent/payments', icon:'credit-card', label:'Payments', id:'payments'},
      {href:'#/ent/ownership', icon:'key', label:'Ownership', id:'ownership'},
      {href:'#/ent/maintenance', icon:'wrench', label:'Maintenance', id:'maint'},
      {g:'Account'},
      {href:'#/ent/messages', icon:'message-circle', label:'Messages', id:'messages'}
    ],
    admin: [
      {g:'Overview'},
      {href:'#/admin', icon:'layout-dashboard', label:'Admin Home', id:'dash'},
      {g:'Operations'},
      {href:'#/admin/applications', icon:'inbox', label:'Applications', id:'apps'},
      {href:'#/admin/projects', icon:'package', label:'Projects', id:'projects'},
      {href:'#/admin/payments', icon:'credit-card', label:'Payments', id:'payments'},
      {href:'#/admin/kyc', icon:'user-check', label:'KYC Review', id:'kyc'},
      {href:'#/admin/transfers', icon:'repeat', label:'Transfers', id:'transfers'},
      {g:'Governance'},
      {href:'#/shariah-governance', icon:'scale', label:'Shariah Center', id:'shariah'},
      {href:'#/admin/audit', icon:'scroll', label:'Audit Log', id:'audit'},
      {g:'System'},
      {href:'#/demo', icon:'settings-2', label:'Demo Center', id:'demo'}
    ]
  };
  const links = navs[role] || [];
  const homeHref = role==='admin'?'#/admin':role==='entrepreneur'?'#/ent':'#/app';
  const bottomNavs = links.filter(l=>l.href).slice(0,5);
  const userInit = user ? (user.initials || 'U') : 'U';
  return `
  <div class="app">
    <aside class="sidebar" id="sidebar">
      <a href="${homeHref}" class="sidebar-brand"><div class="brand-mark">A</div>Amanah<span>Capital</span></a>
      <nav class="sidebar-nav">
        ${links.map(l=>l.g ? `<div class="group">${l.g}</div>` : `<a href="${l.href}" class="${active===l.id?'active':''}">${UI.icon(l.icon)}<span>${l.label}</span></a>`).join('')}
      </nav>
      <div class="sidebar-user">
        <div class="avatar emerald">${userInit}</div>
        <div class="info"><div class="name">${user?user.name:'Guest'}</div><div class="role">${role}</div></div>
        <button class="icon-btn" style="color:#a9b8c4" onclick="App.logout()" title="Logout">${UI.icon('log-out')}</button>
      </div>
    </aside>
    <div class="overlay-sidebar" id="sidebar-overlay" onclick="App.toggleSidebar()"></div>
    <div class="main">
      <div class="topbar">
        <div class="flex-center">
          <button class="icon-btn menu-btn" style="display:none" onclick="App.toggleSidebar()" id="sb-toggle">${UI.icon('menu')}</button>
          <h1>${active==='dash'?'Dashboard':''}</h1>
        </div>
        <div class="topbar-actions">
          <a href="#/" class="btn btn-ghost btn-sm" title="View public site">Public site</a>
          <button class="icon-btn" onclick="UI.toast('Notifications demo: 3 new events','info')">${UI.icon('bell')}<span class="dot"></span></button>
          <div class="avatar emerald" style="width:32px;height:32px;font-size:.75rem">${userInit}</div>
        </div>
      </div>
      <div class="content">${content}</div>
    </div>
    <div class="mobile-nav">
      <div class="mobile-nav-inner">
        ${bottomNavs.map(l=>`<a href="${l.href}" class="${active===l.id?'active':''}">${UI.icon(l.icon)}<span>${l.label.split(' ')[0]}</span></a>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ============================================================
   INVESTOR DASHBOARD
   ============================================================ */
Pages['app'] = Pages['app'] = function(){
  const user = Store.session.user;
  const investorId = user.id || 'INV-01';
  const invs = Store.state.investments.filter(i=>i.investorId===investorId);
  const totalInvested = invs.reduce((s,i)=>s+i.amount,0);
  const txs = Store.state.transactions.filter(t=>t.investorId===investorId);
  const income = txs.filter(t=>t.type==='Rental Income' && t.status==='Completed').reduce((s,t)=>s+t.amount,0);
  const pending = txs.filter(t=>t.type==='Rental Income' && t.status==='Pending').reduce((s,t)=>s+t.amount,0);

  const activeProjs = invs.map(i=>Store.getProject(i.projectId)).filter(p=>p && p.status==='Active');
  const completedProjs = invs.map(i=>Store.getProject(i.projectId)).filter(p=>p && p.status==='Completed');

  const projectBreakdown = invs.map(i=>{
    const p = Store.getProject(i.projectId);
    return p ? {label:p.title.split('—')[0].trim(), value:i.amount} : null;
  }).filter(Boolean);

  const monthly = (() => {
    const months = ['Jan','Feb','Mar','Apr','May'];
    const data = months.map((_,i)=> income*(0.6 + i*0.1)); // illustrative growth
    return { labels:months, data };
  })();

  const html = `
    <div class="flex-between" style="margin-bottom:22px;flex-wrap:wrap;gap:12px">
      <div>
        <h2>Welcome, ${user.name.split(' ')[0]}</h2>
        <p class="muted">Here is a snapshot of your demo portfolio.</p>
      </div>
      <span class="badge badge-warning">DEMO DATA</span>
    </div>

    <div class="stat-grid">
      <div class="stat-card"><div class="label">${UI.icon('wallet')} Total contributed</div><div class="value">${UI.money(totalInvested)}</div><div class="delta up">Across ${invs.length} projects</div></div>
      <div class="stat-card"><div class="label">${UI.icon('trending-up')} Income received</div><div class="value">${UI.money(income)}</div><div class="delta up">Actual (demo) to date</div></div>
      <div class="stat-card"><div class="label">${UI.icon('clock')} Pending income</div><div class="value">${UI.money(pending)}</div><div class="delta">Expected distributions</div></div>
      <div class="stat-card"><div class="label">${UI.icon('briefcase')} Active positions</div><div class="value">${activeProjs.length} <small>/ ${invs.length}</small></div><div class="delta up">${completedProjs.length} completed</div></div>
    </div>

    <div class="grid-2">
      <div class="panel">
        <div class="panel-head"><h3>Portfolio value over time (illustrative)</h3></div>
        <div class="chart-box"><canvas id="chart-portfolio"></canvas></div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Allocation</h3></div>
        <div class="chart-box"><canvas id="chart-alloc"></canvas></div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head"><h3>Active Investments</h3><a href="#/app/portfolio" class="btn btn-outline btn-sm">View portfolio</a></div>
      ${activeProjs.length ? `
      <div class="tbl-wrap"><table>
        <thead><tr><th>Project</th><th>Model</th><th>My contribution</th><th>Ownership share</th><th>Status</th><th></th></tr></thead>
        <tbody>${invs.map(i=>{
          const p = Store.getProject(i.projectId);
          if(!p) return '';
          return `<tr><td><strong>${p.title}</strong><div class="tiny muted">${p.location}</div></td>
            <td><span class="badge badge-emerald">${p.model}</span></td>
            <td><strong>${UI.money(i.amount)}</strong></td>
            <td>${((i.amount/p.fundingTarget)*100).toFixed(1)}%</td>
            <td>${UI.statusBadge(p.status)}</td>
            <td><a href="#/project/${p.id}" class="btn btn-sm btn-ghost">Details →</a></td></tr>`;
        }).join('')}</tbody>
      </table></div>` : `<div class="empty">${UI.icon('briefcase')}<h4>No investments yet</h4><p>Explore the marketplace to start.</p><a href="#/app/marketplace" class="btn btn-primary" style="margin-top:14px">Browse projects</a></div>`}
    </div>

    <div class="grid-2-equal">
      <div class="panel">
        <div class="panel-head"><h3>Recent transactions</h3></div>
        ${txs.slice(0,6).length ? `<div class="stack">${txs.slice(0,6).map(t=>{
          const p = Store.getProject(t.projectId);
          return `<div class="kv"><span class="k">${t.type}<div class="tiny">${t.date} · ${p?p.title.split('—')[0]:''}</div></span><span class="v">${t.type==='Investment'?'-':'+'} ${UI.money(t.amount)}</span></div>`;
        }).join('')}</div>` : `<div class="empty">${UI.icon('inbox')}<p>No transactions yet.</p></div>`}
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Upcoming expected payments</h3></div>
        <div class="stack">
          ${[
            ['Next rental income — PRJ-001', '৳850', 'Expected 2025-06-01'],
            ['Next rental income — PRJ-002', '৳1,100', 'Expected 2025-06-01'],
            ['Next rental income — PRJ-003', '৳1,200', 'Expected 2025-06-01'],
            ['Next rental income — PRJ-005', '৳1,500', 'Expected 2025-06-03']
          ].map(([t,v,d])=>`<div class="kv"><span class="k">${t}<div class="tiny">${d}</div></span><span class="v">${v}</span></div>`).join('')}
        </div>
        <div class="info-banner" style="margin-top:16px">${UI.icon('info')} Illustrative estimates only. Actual income depends on contract and asset performance.</div>
      </div>
    </div>`;
  setTimeout(()=>{
    UI.refreshIcons();
    UI.lineChart('chart-portfolio', monthly.labels, monthly.data, {label:'Illustrative portfolio'});
    if(projectBreakdown.length){
      UI.doughnutChart('chart-alloc', projectBreakdown.map(p=>p.label), projectBreakdown.map(p=>p.value));
    }
    document.querySelector('.topbar h1').textContent = 'Investor Dashboard';
  }, 100);
  return appShell(html, 'dash', 'investor');
};

Pages['app/marketplace'] = function(){
  const html = `
    <div class="flex-between" style="margin-bottom:22px;flex-wrap:wrap;gap:12px">
      <div><h2>Marketplace</h2><p class="muted">Discover Shariah-compliant projects.</p></div>
      <span class="badge badge-warning">DEMO DATA</span>
    </div>
    <div class="filter-bar">
      <input type="text" id="m-search" placeholder="Search…">
      <select id="m-cat"><option value="">All categories</option>${DATA.categories.map(c=>`<option>${c}</option>`).join('')}</select>
      <select id="m-model"><option value="">All models</option><option>Murabaha</option><option>Ijarah</option><option>HPSM</option></select>
    </div>
    <div id="m-grid" class="grid g3"></div>`;
  setTimeout(()=>{
    UI.refreshIcons();
    const grid = document.getElementById('m-grid');
    const render = () => {
      const q = document.getElementById('m-search').value.toLowerCase();
      const cat = document.getElementById('m-cat').value;
      const model = document.getElementById('m-model').value;
      const items = Store.state.projects.filter(p =>
        (!q || p.title.toLowerCase().includes(q)) &&
        (!cat || p.category===cat) && (!model || p.model===model)
      );
      grid.innerHTML = items.map(projectCard).join('');
      UI.refreshIcons();
    };
    ['m-search','m-cat','m-model'].forEach(id=>document.getElementById(id).addEventListener('input', render));
    render();
    document.querySelector('.topbar h1').textContent = 'Marketplace';
  }, 100);
  return appShell(html, 'market', 'investor');
};

Pages['app/portfolio'] = function(){
  const user = Store.session.user;
  const investorId = user.id || 'INV-01';
  const invs = Store.state.investments.filter(i=>i.investorId===investorId);
  const html = `
    <h2 style="margin-bottom:6px">My Portfolio</h2>
    <p class="muted" style="margin-bottom:22px">Breakdown of all your contributions and ownership shares.</p>
    <div class="panel">
      ${invs.length ? `<div class="tbl-wrap"><table>
        <thead><tr><th>Project</th><th>Model</th><th>Contributed</th><th>Ownership %</th><th>Joined</th><th>Status</th></tr></thead>
        <tbody>${invs.map(i=>{
          const p = Store.getProject(i.projectId);
          if(!p) return '';
          return `<tr><td><strong>${p.title}</strong></td><td><span class="badge badge-emerald">${p.model}</span></td>
            <td><strong>${UI.money(i.amount)}</strong></td>
            <td>${((i.amount/p.fundingTarget)*100).toFixed(2)}%</td>
            <td>${i.joined}</td>
            <td>${UI.statusBadge(p.status)}</td></tr>`;
        }).join('')}</tbody></table></div>` : `<div class="empty">${UI.icon('briefcase')}<h4>Empty portfolio</h4></div>`}
    </div>

    <div class="panel">
      <div class="panel-head"><h3>Investment transfer requests</h3><a href="#/app/transfers" class="btn btn-outline btn-sm">Open transfer market</a></div>
      <p class="small muted">Transfers are permitted only when Shariah and legal conditions allow, and are reviewed by the platform. Not all interests are transferable.</p>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'My Portfolio';},100);
  return appShell(html, 'portfolio', 'investor');
};

Pages['app/income'] = function(){
  const user = Store.session.user;
  const investorId = user.id || 'INV-01';
  const txs = Store.state.transactions.filter(t=>t.investorId===investorId && t.type==='Rental Income');
  const total = txs.filter(t=>t.status==='Completed').reduce((s,t)=>s+t.amount,0);
  const html = `
    <h2 style="margin-bottom:6px">Income</h2>
    <p class="muted" style="margin-bottom:22px">Illustrative income received. Actual income varies; not guaranteed.</p>
    <div class="stat-grid">
      <div class="stat-card"><div class="label">Received</div><div class="value">${UI.money(total)}</div></div>
      <div class="stat-card"><div class="label">Pending</div><div class="value">${UI.money(txs.filter(t=>t.status==='Pending').reduce((s,t)=>s+t.amount,0))}</div></div>
      <div class="stat-card"><div class="label">Distributions</div><div class="value">${txs.length}</div></div>
      <div class="stat-card"><div class="label">Avg per month</div><div class="value">${UI.money(total/Math.max(3,new Set(txs.map(t=>t.date.slice(0,7))).size))}</div></div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Income history</h3></div>
      <div class="chart-box"><canvas id="chart-income"></canvas></div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Records</h3></div>
      <div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Project</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>${txs.map(t=>{
          const p = Store.getProject(t.projectId);
          return `<tr><td>${t.date}</td><td>${p?p.title.split('—')[0]:'—'}</td><td>${t.type}</td><td><strong>${UI.money(t.amount)}</strong></td><td>${UI.statusBadge(t.status)}</td></tr>`;
        }).join('')}</tbody></table></div>
    </div>`;
  setTimeout(()=>{
    UI.refreshIcons();
    const labels = ['Jan','Feb','Mar','Apr','May'];
    const data = labels.map((_,i)=> total*(0.5+i*0.12));
    UI.lineChart('chart-income', labels, data, {label:'Income'});
    document.querySelector('.topbar h1').textContent = 'Income';
  }, 100);
  return appShell(html, 'income', 'investor');
};

Pages['app/transfers'] = function(){
  const transfers = Store.state.transfers;
  const html = `
    <h2 style="margin-bottom:6px">Transfer Marketplace</h2>
    <p class="muted" style="margin-bottom:22px">Buy or sell eligible investment interests. Debt claims cannot be traded freely — each transfer is reviewed.</p>
    <div class="info-banner">${UI.icon('info')} Not all investment interests are transferable. The platform verifies ownership, contract, and Shariah conditions before approval.</div>
    <div class="panel">
      <div class="panel-head"><h3>Open transfer offers</h3></div>
      ${transfers.length ? `<div class="tbl-wrap"><table>
        <thead><tr><th>ID</th><th>Project</th><th>Seller</th><th>Shares</th><th>Ask price</th><th>Listed</th><th></th></tr></thead>
        <tbody>${transfers.map(t=>{
          const p = Store.getProject(t.projectId);
          return `<tr><td>${t.id}</td><td>${p?p.title.split('—')[0]:'—'}</td><td>${t.seller}</td><td>${t.shares}</td><td>${UI.money(t.askPrice)}</td><td>${t.listed}</td>
            <td><button class="btn btn-sm btn-outline" onclick="Pages._buyTransfer('${t.id}')">Buy (demo)</button></td></tr>`;
        }).join('')}</tbody></table></div>` : `<div class="empty">${UI.icon('repeat')}<h4>No open offers</h4></div>`}
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Submit a transfer request</h3></div>
      <div class="field-row">
        <div class="field"><label>Project</label><select>${Store.state.projects.filter(p=>p.status==='Active').map(p=>`<option>${p.title}</option>`).join('')}</select></div>
        <div class="field"><label>Shares</label><input type="number" value="1" min="1"></div>
      </div>
      <div class="field"><label>Asking price (BDT)</label><input type="number" value="10000" step="1000"></div>
      <button class="btn btn-primary" onclick="UI.toast('Transfer request submitted (demo)','success')">Submit request</button>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Transfers';},100);
  return appShell(html, 'transfers', 'investor');
};

Pages._buyTransfer = function(id){
  UI.confirm('Confirm transfer purchase',
    'This will simulate purchasing this transfer offer. Ownership records would be updated in a real system after Shariah and legal review. Continue?',
    ()=>{ UI.toast('Transfer recorded (demo). Awaiting approvals.', 'success'); });
};

Pages['app/messages'] = function(){
  const html = `
    <h2 style="margin-bottom:6px">Messages</h2>
    <p class="muted" style="margin-bottom:22px">Demo chat. Messages are stored in your browser only.</p>
    <div class="chat-wrap">
      <div class="chat-list">
        <div class="chat-list-item active"><div class="strong small">Support Team</div><div class="tiny muted">Welcome message…</div></div>
        <div class="chat-list-item"><div class="strong small">PRJ-001 Discussion</div><div class="tiny muted">Auto-rickshaw project room</div></div>
        <div class="chat-list-item"><div class="strong small">PRJ-002 Discussion</div><div class="tiny muted">Agri project room</div></div>
      </div>
      <div class="chat-main">
        <div class="chat-head">Support Team</div>
        <div class="chat-body" id="chat-body">
          ${Store.state.messages.map(m=>`<div class="msg ${m.from==='You'?'out':'in'}">${m.text}</div>`).join('')}
        </div>
        <div class="chat-input">
          <input type="text" id="chat-msg" placeholder="Type a message…">
          <button class="btn btn-primary" onclick="Pages._sendMsg()">${UI.icon('send')}</button>
        </div>
      </div>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Messages';},100);
  return appShell(html, 'messages', 'investor');
};

Pages._sendMsg = function(){
  const el = document.getElementById('chat-msg');
  const text = el.value.trim();
  if(!text) return;
  const body = document.getElementById('chat-body');
  body.insertAdjacentHTML('beforeend', `<div class="msg out">${text}</div>`);
  el.value = '';
  body.scrollTop = body.scrollHeight;
  setTimeout(()=>{
    body.insertAdjacentHTML('beforeend', `<div class="msg in">Thanks for your message. This is a demo response.</div>`);
    body.scrollTop = body.scrollHeight;
  }, 700);
};
