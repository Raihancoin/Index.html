/* ============================================================
   Admin panel pages
   ============================================================ */
Pages['admin'] = function(){
  const html = `
    <div class="flex-between" style="margin-bottom:22px;flex-wrap:wrap;gap:12px">
      <div><h2>Admin Overview</h2><p class="muted">Platform-wide monitoring and controls.</p></div>
      <span class="badge badge-warning">DEMO DATA</span>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="label">Active projects</div><div class="value">${Store.state.projects.filter(p=>p.status==='Active').length}</div></div>
      <div class="stat-card"><div class="label">Pending applications</div><div class="value">${Store.state.applications.filter(a=>a.status!=='Approved'&&a.status!=='Rejected').length}</div></div>
      <div class="stat-card"><div class="label">Total funded</div><div class="value">${UI.money(Store.state.projects.reduce((s,p)=>s+p.funded,0))}</div></div>
      <div class="stat-card"><div class="label">Investors</div><div class="value">${DATA.investors.length}</div></div>
    </div>
    <div class="grid-2">
      <div class="panel">
        <div class="panel-head"><h3>Platform activity</h3></div>
        <div class="chart-box"><canvas id="chart-activity"></canvas></div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Recent audit events</h3></div>
        <div class="stack">${Store.state.audit.slice(0,6).map(a=>`<div class="kv"><span class="k">${a.action}<div class="tiny">${a.ts} · ${a.actor}</div></span></div>`).join('')}</div>
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Applications pending action</h3><a href="#/admin/applications" class="btn btn-outline btn-sm">Review all</a></div>
      <div class="tbl-wrap"><table><thead><tr><th>ID</th><th>Applicant</th><th>Asset</th><th>Cost</th><th>Status</th><th></th></tr></thead>
        <tbody>${Store.state.applications.slice(0,5).map(a=>`<tr>
          <td>${a.id}</td><td>${a.applicant}<div class="tiny muted">${a.district}</div></td><td>${a.asset}</td><td>${UI.money(a.assetCost)}</td><td>${UI.statusBadge(a.status)}</td>
          <td><a href="#/admin/applications" class="btn btn-sm btn-ghost">Review →</a></td>
        </tr>`).join('')}</tbody></table></div>
    </div>`;
  setTimeout(()=>{
    UI.refreshIcons();
    UI.lineChart('chart-activity', ['Week 1','Week 2','Week 3','Week 4'], [12, 18, 15, 22], {label:'Applications'});
    document.querySelector('.topbar h1').textContent = 'Admin Overview';
  },100);
  return appShell(html, 'dash', 'admin');
};

Pages['admin/applications'] = function(){
  const html = `
    <h2 style="margin-bottom:6px">Applications</h2>
    <p class="muted" style="margin-bottom:22px">Review and progress entrepreneur applications.</p>
    <div class="panel">
      <div class="tbl-wrap"><table>
        <thead><tr><th>ID</th><th>Applicant</th><th>Asset</th><th>Cost</th><th>Duration</th><th>Submitted</th><th>Status</th><th></th></tr></thead>
        <tbody>${Store.state.applications.map(a=>`<tr>
          <td>${a.id}</td>
          <td>${a.applicant}<div class="tiny muted">${a.district}</div></td>
          <td>${a.asset}</td><td>${UI.money(a.assetCost)}</td><td>${a.duration} mo</td><td>${a.submitted}</td>
          <td>${UI.statusBadge(a.status)}</td>
          <td><button class="btn btn-sm btn-outline" onclick="Pages._adminAdvance('${a.id}')">Advance</button></td>
        </tr>`).join('')}</tbody></table></div>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Applications';},100);
  return appShell(html, 'apps', 'admin');
};

Pages._adminAdvance = function(id){
  const stages = ['Submitted','Under Review','Document Required','Field Verification','Shariah Review','Approved'];
  const app = Store.state.applications.find(a=>a.id===id);
  if(!app) return;
  const idx = stages.indexOf(app.status);
  const next = stages[Math.min(stages.length-1, idx+1)];
  if(next===app.status){ UI.toast('Application already approved','info'); return; }
  Store.updateApplication(id, { status:next, step:idx+2 });
  Store.log('admin@demo.com', `Advanced ${id} to ${next}`);
  UI.toast(`Application moved to "${next}" (demo)`, 'success');
  Router.render();
};

Pages['admin/projects'] = function(){
  const html = `
    <h2 style="margin-bottom:6px">Projects</h2>
    <p class="muted" style="margin-bottom:22px">Manage all financed assets.</p>
    <div class="panel">
      <div class="tbl-wrap"><table>
        <thead><tr><th>ID</th><th>Title</th><th>Model</th><th>Cost</th><th>Funded</th><th>Status</th><th></th></tr></thead>
        <tbody>${Store.state.projects.map(p=>`<tr>
          <td>${p.id}</td><td>${p.title}<div class="tiny muted">${p.location}</div></td>
          <td><span class="badge badge-emerald">${p.model}</span></td>
          <td>${UI.money(p.assetCost)}</td>
          <td>${UI.money(p.funded)} <span class="muted tiny">(${Math.round(p.funded/p.fundingTarget*100)}%)</span></td>
          <td>${UI.statusBadge(p.status)}</td>
          <td><a href="#/project/${p.id}" class="btn btn-sm btn-ghost">View →</a></td>
        </tr>`).join('')}</tbody></table></div>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Projects';},100);
  return appShell(html, 'projects', 'admin');
};

Pages['admin/payments'] = function(){
  const html = `
    <h2 style="margin-bottom:6px">Payments</h2>
    <p class="muted" style="margin-bottom:22px">Monitor all platform payments and distributions.</p>
    <div class="panel">
      <div class="tbl-wrap"><table>
        <thead><tr><th>ID</th><th>Date</th><th>Project</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>${Store.state.transactions.slice(0,20).map(t=>`<tr>
          <td>${t.id}</td><td>${t.date}</td><td>${t.projectId}</td><td>${t.type}</td><td>${UI.money(t.amount)}</td><td>${UI.statusBadge(t.status==='Completed'?'Completed':'Pending')}</td>
        </tr>`).join('')}</tbody></table></div>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Payments';},100);
  return appShell(html, 'payments', 'admin');
};

Pages['admin/kyc'] = function(){
  const html = `
    <h2 style="margin-bottom:6px">KYC Review</h2>
    <p class="muted" style="margin-bottom:22px">Demo verification workflow — no real government checks.</p>
    <div class="info-banner">${UI.icon('shield')} Government/police verification is not represented as a functioning service. Real checks require lawful authorization.</div>
    <div class="panel">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Entrepreneur</th><th>District</th><th>Business</th><th>Status</th><th></th></tr></thead>
        <tbody>${DATA.entrepreneurs.map(e=>`<tr>
          <td><strong>${e.name}</strong><div class="tiny muted">${e.email}</div></td>
          <td>${e.district}</td><td>${e.business}</td>
          <td>${UI.statusBadge(e.verified?'Approved':'Under Review')}</td>
          <td><button class="btn btn-sm btn-ghost" onclick="UI.toast('KYC review opened (demo)','info')">Review</button></td>
        </tr>`).join('')}</tbody></table></div>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'KYC Review';},100);
  return appShell(html, 'kyc', 'admin');
};

Pages['admin/transfers'] = function(){
  const html = `
    <h2 style="margin-bottom:6px">Transfer Requests</h2>
    <p class="muted" style="margin-bottom:22px">Review and approve investment interest transfers.</p>
    <div class="panel">
      <div class="tbl-wrap"><table>
        <thead><tr><th>ID</th><th>Project</th><th>Seller</th><th>Shares</th><th>Ask price</th><th>Status</th><th></th></tr></thead>
        <tbody>${Store.state.transfers.map(t=>`<tr>
          <td>${t.id}</td><td>${t.projectId}</td><td>${t.seller}</td><td>${t.shares}</td><td>${UI.money(t.askPrice)}</td>
          <td>${UI.statusBadge(t.status)}</td>
          <td><button class="btn btn-sm btn-outline" onclick="UI.toast('Transfer approved (demo)','success')">Approve</button></td>
        </tr>`).join('')}</tbody></table></div>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Transfers';},100);
  return appShell(html, 'transfers', 'admin');
};

Pages['admin/audit'] = function(){
  const html = `
    <h2 style="margin-bottom:6px">Audit Log</h2>
    <p class="muted" style="margin-bottom:22px">All platform actions for compliance review.</p>
    <div class="panel">
      <div class="tbl-wrap"><table>
        <thead><tr><th>Timestamp</th><th>Actor</th><th>Action</th><th>IP</th></tr></thead>
        <tbody>${Store.state.audit.map(a=>`<tr>
          <td>${a.ts}</td><td>${a.actor}</td><td>${a.action}</td><td class="mono tiny">${a.ip}</td>
        </tr>`).join('')}</tbody></table></div>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Audit Log';},100);
  return appShell(html, 'audit', 'admin');
};
