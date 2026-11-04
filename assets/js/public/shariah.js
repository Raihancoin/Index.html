/* ============================================================
   Shariah Governance Center
   ============================================================ */
Pages['shariah-governance'] = function(){
  const contracts = DATA.shariah_contracts;
  const html = `
    <div class="flex-between" style="margin-bottom:22px;flex-wrap:wrap;gap:12px">
      <div><h2>Shariah Governance Center</h2><p class="muted">Contracts, advisors, and compliance oversight.</p></div>
      <span class="badge badge-warning">DEMO</span>
    </div>
    <div class="info-banner">${UI.icon('scale')} This demo is not a fatwa. Real deployment requires independent Shariah board approval, legal counsel, and regulatory licensing.</div>
    <div class="grid g3" style="margin-bottom:22px">
      ${contracts.map(c=>`<div class="shariah-card">
        <div class="flex-between" style="margin-bottom:8px">
          <h4>${c.name}</h4>
          <span class="badge badge-${c.status==='Approved'?'success':c.status.startsWith('Approved')?'info':'warning'}">${c.status}</span>
        </div>
        <p class="small">${c.description}</p>
        <div class="divider"></div>
        <div class="tiny muted"><strong style="color:var(--navy)">Risk notes:</strong> ${c.risks}</div>
      </div>`).join('')}
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Shariah Advisors (demo)</h3></div>
      <div class="grid g3">
        ${DATA.shariah_advisors.map(a=>`<div class="card card-pad">
          <div class="avatar emerald" style="width:40px;height:40px;margin-bottom:10px">${UI.initials(a.name)}</div>
          <div class="strong">${a.name}</div>
          <div class="small muted">${a.qualification}</div>
          <div class="chip emerald" style="margin-top:10px">${a.expertise}</div>
        </div>`).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Core Principles</h3></div>
      <div class="grid g2" style="gap:14px">
        ${[
          ['No Riba','No interest-based lending. Return comes from real ownership, rental, or profit-share.'],
          ['Genuine ownership','No fictitious or hypothetical asset purchases.'],
          ['No guaranteed profits','Profit-sharing models (Mudarabah) do not guarantee fixed returns.'],
          ['Charity penalties','Late payment charges (if any) go to charity — not investors.'],
          ['Halal sectors only','No alcohol, gambling, tobacco, weapons, adult content, or other prohibited activities.'],
          ['Risk allocation','Ownership responsibilities and risks must be properly allocated.']
        ].map(([t,d])=>`<div class="card card-pad"><h4 style="margin-bottom:6px">${t}</h4><p class="small">${d}</p></div>`).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Recent Shariah Audit</h3></div>
      <div class="tbl-wrap"><table>
        <thead><tr><th>Date</th><th>Contract</th><th>Auditor</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td>2025-04-20</td><td>PRJ-001 (HPSM)</td><td>Mufti Abdul Kader</td><td><span class="badge badge-success">Compliant</span></td></tr>
          <tr><td>2025-04-18</td><td>PRJ-002 (Murabaha)</td><td>Mufti Rafiq Ahmed</td><td><span class="badge badge-success">Compliant</span></td></tr>
          <tr><td>2025-04-15</td><td>PRJ-005 (Ijarah)</td><td>Dr. Shahida Parvin</td><td><span class="badge badge-success">Compliant</span></td></tr>
          <tr><td>2025-04-10</td><td>New Mudarabah template</td><td>Full Board</td><td><span class="badge badge-warning">Pending Review</span></td></tr>
        </tbody></table></div>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Shariah Governance';},100);
  return appShell(html, 'shariah', 'admin');
};
