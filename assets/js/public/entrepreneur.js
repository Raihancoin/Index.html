/* ============================================================
   Entrepreneur dashboard pages
   ============================================================ */
Pages['ent'] = function(){
  const user = Store.session.user;
  const html = `
    <div class="flex-between" style="margin-bottom:22px;flex-wrap:wrap;gap:12px">
      <div><h2>Welcome, ${user.name.split(' ')[0]}</h2><p class="muted">Manage your financing and asset ownership.</p></div>
      <span class="badge badge-warning">DEMO DATA</span>
    </div>
    <div class="stat-grid">
      <div class="stat-card"><div class="label">Active financing</div><div class="value">1</div><div class="delta up">PRJ-001</div></div>
      <div class="stat-card"><div class="label">Outstanding amount</div><div class="value">৳88,400</div><div class="delta">Remaining ownership</div></div>
      <div class="stat-card"><div class="label">Ownership acquired</div><div class="value">62%</div><div class="delta up">Illustrative</div></div>
      <div class="stat-card"><div class="label">Next payment due</div><div class="value">৳4,800</div><div class="delta">Expected 2025-06-01</div></div>
    </div>

    <div class="grid-2">
      <div class="panel">
        <div class="panel-head"><h3>My active asset</h3><a href="#/ent/ownership" class="btn btn-outline btn-sm">Ownership details</a></div>
        <div class="flex-center" style="gap:14px;padding:14px;background:var(--gray-50);border-radius:12px;margin-bottom:16px">
          <div class="avatar emerald" style="width:48px;height:48px">🚗</div>
          <div style="flex:1"><div class="strong">Electric Auto-rickshaw — Mirpur</div><div class="tiny muted">PRJ-001 · HPSM · 36 months</div></div>
          <span class="badge badge-emerald">Active</span>
        </div>
        <div class="proj-progress" style="margin-bottom:6px"><div class="proj-progress-bar" style="width:62%"></div></div>
        <div class="flex-between small" style="margin-bottom:16px"><span>62% ownership acquired</span><span class="muted">14 of 36 months</span></div>
        <div class="result-row"><span class="label">Monthly payment</span><span class="val">৳4,800</span></div>
        <div class="result-row"><span class="label">Next due</span><span class="val">2025-06-01</span></div>
        <a href="#/ent/payments" class="btn btn-primary btn-block" style="margin-top:14px">Make a payment</a>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>Application status</h3></div>
        <div class="stack">
          <div class="kv"><span class="k">Application received</span><span class="v">✓ Complete</span></div>
          <div class="kv"><span class="k">Identity verified</span><span class="v">✓ Complete</span></div>
          <div class="kv"><span class="k">Field verification</span><span class="v">✓ Complete</span></div>
          <div class="kv"><span class="k">Shariah review</span><span class="v">✓ Complete</span></div>
          <div class="kv"><span class="k">Asset purchased</span><span class="v">✓ Complete</span></div>
          <div class="kv"><span class="k">Agreement active</span><span class="v">✓ Complete</span></div>
        </div>
        <a href="#/ent/applications" class="btn btn-outline btn-block" style="margin-top:16px">View all applications</a>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head"><h3>Recent payments</h3><a href="#/ent/payments" class="btn btn-outline btn-sm">All payments</a></div>
      <div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Project</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>2025-05-01</td><td>PRJ-001</td><td>Rent + Acquisition</td><td>৳4,800</td><td>${UI.statusBadge('Completed')}</td></tr>
          <tr><td>2025-04-01</td><td>PRJ-001</td><td>Rent + Acquisition</td><td>৳4,800</td><td>${UI.statusBadge('Completed')}</td></tr>
          <tr><td>2025-03-01</td><td>PRJ-001</td><td>Rent + Acquisition</td><td>৳4,800</td><td>${UI.statusBadge('Completed')}</td></tr>
        </tbody></table></div>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Entrepreneur Dashboard';},100);
  return appShell(html, 'dash', 'entrepreneur');
};

Pages['ent/apply'] = function(){
  const html = `
    <h2 style="margin-bottom:6px">Apply for Asset Financing</h2>
    <p class="muted" style="margin-bottom:22px">Complete all steps. This is a demo — no real KYC.</p>
    <div class="steps" id="apply-steps">
      <div class="step active" data-s="1"><div class="num">1</div><div class="lbl">Personal</div></div>
      <div class="step" data-s="2"><div class="num">2</div><div class="lbl">Business</div></div>
      <div class="step" data-s="3"><div class="num">3</div><div class="lbl">Asset</div></div>
      <div class="step" data-s="4"><div class="num">4</div><div class="lbl">Review</div></div>
    </div>
    <div class="panel" id="apply-panel"></div>`;
  setTimeout(()=>{UI.refreshIcons(); renderApplyStep(1); document.querySelector('.topbar h1').textContent = 'Apply for Financing';},100);
  return appShell(html, 'apply', 'entrepreneur');
};

function renderApplyStep(step){
  const panel = document.getElementById('apply-panel');
  document.querySelectorAll('#apply-steps .step').forEach(el=>{
    el.classList.toggle('active', +el.dataset.s === step);
    el.classList.toggle('done', +el.dataset.s < step);
  });
  if(step===1){
    panel.innerHTML = `
      <h3 style="margin-bottom:16px">Step 1 — Personal information</h3>
      <div class="field-row"><div class="field"><label>Full name</label><input id="a-name" value="Md. Habibur Rahman"></div>
      <div class="field"><label>Mobile number</label><input id="a-phone" value="+880 1XXX-XXXXXX"></div></div>
      <div class="field-row"><div class="field"><label>District</label><select id="a-district">${DATA.districts.map(d=>`<option>${d}</option>`).join('')}</select></div>
      <div class="field"><label>Upazila</label><input value="Mirpur"></div></div>
      <div class="field"><label>Address</label><input value="Mirpur 10, Dhaka"></div>
      <div class="field"><label>NID number (demo only)</label><input placeholder="— demo placeholder —"></div>
      <div class="info-banner">${UI.icon('info')} Do not enter real NID or sensitive identity information in this demo.</div>
      <div class="flex-between" style="margin-top:16px"><span></span><button class="btn btn-primary" onclick="renderApplyStep(2)">Continue ${UI.icon('arrow-right')}</button></div>`;
  } else if(step===2){
    panel.innerHTML = `
      <h3 style="margin-bottom:16px">Step 2 — Business & income</h3>
      <div class="field-row"><div class="field"><label>Current occupation</label><input value="Auto-rickshaw driver"></div>
      <div class="field"><label>Business experience (years)</label><input type="number" value="5"></div></div>
      <div class="field"><label>Business description</label><textarea rows="3">Operating electric auto-rickshaw on Mirpur–Agargaon corridor.</textarea></div>
      <div class="field-row"><div class="field"><label>Monthly income estimate (BDT)</label><input type="number" value="28000"></div>
      <div class="field"><label>Monthly expense estimate (BDT)</label><input type="number" value="12000"></div></div>
      <div class="flex-between" style="margin-top:16px"><button class="btn btn-ghost" onclick="renderApplyStep(1)">← Back</button><button class="btn btn-primary" onclick="renderApplyStep(3)">Continue ${UI.icon('arrow-right')}</button></div>`;
  } else if(step===3){
    panel.innerHTML = `
      <h3 style="margin-bottom:16px">Step 3 — Asset & duration</h3>
      <div class="field-row"><div class="field"><label>Asset category</label><select>${DATA.categories.map(c=>`<option>${c}</option>`).join('')}</select></div>
      <div class="field"><label>Estimated asset cost (BDT)</label><input type="number" id="a-cost" value="200000"></div></div>
      <div class="field-row"><div class="field"><label>Requested duration</label>
        <select id="a-duration">${[12,24,36,48,60].map(m=>`<option value="${m}" ${m===36?'selected':''}>${m} months</option>`).join('')}</select></div>
      <div class="field"><label>Repayment frequency</label><select><option>Monthly</option><option>Weekly</option><option>Daily (working days)</option></select></div></div>
      <div class="field"><label>Guarantor information (if applicable)</label><input placeholder="Name, relationship, contact"></div>
      <div class="field"><label>Supporting document (demo)</label><input type="file"></div>
      <div class="flex-between" style="margin-top:16px"><button class="btn btn-ghost" onclick="renderApplyStep(2)">← Back</button><button class="btn btn-primary" onclick="renderApplyStep(4)">Review ${UI.icon('arrow-right')}</button></div>`;
  } else {
    panel.innerHTML = `
      <h3 style="margin-bottom:16px">Step 4 — Review & submit</h3>
      <div class="info-banner success-banner">${UI.icon('check-circle-2')} All fields look good. Submit your demo application.</div>
      <div class="kv"><span class="k">Applicant</span><span class="v">Md. Habibur Rahman</span></div>
      <div class="kv"><span class="k">Asset</span><span class="v">Electric Auto-rickshaw</span></div>
      <div class="kv"><span class="k">Estimated cost</span><span class="v">৳200,000</span></div>
      <div class="kv"><span class="k">Duration</span><span class="v">36 months</span></div>
      <div class="kv"><span class="k">Frequency</span><span class="v">Monthly</span></div>
      <div class="flex-between" style="margin-top:20px"><button class="btn btn-ghost" onclick="renderApplyStep(3)">← Back</button><button class="btn btn-primary" onclick="Pages._submitApplication()">Submit application</button></div>`;
  }
  UI.refreshIcons();
}

Pages._submitApplication = function(){
  const user = Store.session.user;
  const app = {
    id:'APP-'+(2000 + Math.floor(Math.random()*900)),
    applicant: user.name, district:'Dhaka', asset:'Electric Auto-rickshaw',
    assetCost:200000, duration:36, submitted:new Date().toISOString().slice(0,10),
    status:'Submitted', step:1
  };
  Store.addApplication(app);
  UI.toast('Application submitted (demo)', 'success');
  setTimeout(()=>location.hash = '#/ent/applications', 400);
};

Pages['ent/applications'] = function(){
  const html = `
    <h2 style="margin-bottom:6px">My Applications</h2>
    <p class="muted" style="margin-bottom:22px">Track your financing applications.</p>
    <div class="panel">
      <div class="tbl-wrap"><table>
        <thead><tr><th>ID</th><th>Asset</th><th>Cost</th><th>Duration</th><th>Submitted</th><th>Status</th></tr></thead>
        <tbody>${Store.state.applications.map(a=>`<tr>
          <td>${a.id}</td><td>${a.asset}</td><td>${UI.money(a.assetCost)}</td><td>${a.duration} mo</td><td>${a.submitted}</td><td>${UI.statusBadge(a.status)}</td>
        </tr>`).join('')}</tbody></table></div>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Applications';},100);
  return appShell(html, 'apps', 'entrepreneur');
};

Pages['ent/payments'] = function(){
  const html = `
    <h2 style="margin-bottom:6px">Payments</h2>
    <p class="muted" style="margin-bottom:22px">Make scheduled payments (demo).</p>
    <div class="panel">
      <div class="panel-head"><h3>Payment history</h3></div>
      <div class="tbl-wrap"><table>
        <thead><tr><th>Date</th><th>Project</th><th>Rent</th><th>Acquisition</th><th>Total</th><th>Status</th></tr></thead>
        <tbody>
          ${[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(m=>`<tr>
            <td>2025-${String(5-((14-m)%5)).padStart(2,'0')}-01</td><td>PRJ-001</td><td>৳2,400</td><td>৳2,400</td><td>৳4,800</td><td>${UI.statusBadge('Completed')}</td>
          </tr>`).join('')}
        </tbody></table></div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Make a payment (demo)</h3></div>
      <div class="field-row">
        <div class="field"><label>Amount (BDT)</label><input type="number" value="4800"></div>
        <div class="field"><label>Method</label><select><option>bKash (demo)</option><option>Nagad (demo)</option><option>Bank transfer (demo)</option></select></div>
      </div>
      <button class="btn btn-primary" onclick="UI.toast('Payment recorded (demo)','success')">Pay now</button>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Payments';},100);
  return appShell(html, 'payments', 'entrepreneur');
};

Pages['ent/ownership'] = function(){
  const html = `
    <h2 style="margin-bottom:6px">Ownership</h2>
    <p class="muted" style="margin-bottom:22px">Track your gradual ownership acquisition (HPSM).</p>
    <div class="panel">
      <div class="panel-head"><h3>PRJ-001 — Electric Auto-rickshaw</h3></div>
      <div class="flex-center" style="gap:24px;flex-wrap:wrap;padding:18px;background:var(--gray-50);border-radius:12px;margin-bottom:16px">
        <div class="center"><div style="font-size:2rem;font-weight:800;color:var(--emerald)">62%</div><div class="tiny muted">Ownership acquired</div></div>
        <div style="flex:1;min-width:200px">
          <div class="proj-progress"><div class="proj-progress-bar" style="width:62%"></div></div>
          <div class="flex-between tiny muted" style="margin-top:6px"><span>Entrepreneur</span><span>Financier</span></div>
        </div>
      </div>
      <div class="result-row"><span class="label">Initial entrepreneur share</span><span class="val">15%</span></div>
      <div class="result-row"><span class="label">Current entrepreneur share</span><span class="val">62%</span></div>
      <div class="result-row"><span class="label">Current financier share</span><span class="val">38%</span></div>
      <div class="result-row"><span class="label">Remaining acquisition to pay</span><span class="val">৳76,000</span></div>
      <div class="result-row highlight"><span class="label">Estimated final ownership date</span><span class="val">2026-11-01</span></div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Request early settlement</h3></div>
      <p class="small muted">You may request early settlement of the outstanding acquisition amount. Rent stops applying to ownership you have already acquired.</p>
      <button class="btn btn-outline" onclick="UI.toast('Early settlement request submitted (demo)','success')">Request early settlement</button>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Ownership';},100);
  return appShell(html, 'ownership', 'entrepreneur');
};

Pages['ent/maintenance'] = function(){
  const html = `
    <h2 style="margin-bottom:6px">Maintenance</h2>
    <p class="muted" style="margin-bottom:22px">Report maintenance needs or incidents.</p>
    <div class="panel">
      <div class="field-row"><div class="field"><label>Type</label>
        <select><option>Routine maintenance</option><option>Mechanical breakdown</option><option>Accident</option><option>Natural disaster</option></select></div>
        <div class="field"><label>Project</label><select><option>PRJ-001 — Auto-rickshaw</option></select></div></div>
      <div class="field"><label>Description</label><textarea rows="3" placeholder="Describe the issue…"></textarea></div>
      <button class="btn btn-primary" onclick="UI.toast('Maintenance request submitted (demo)','success')">Submit request</button>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Previous requests</h3></div>
      <div class="tbl-wrap"><table><thead><tr><th>Date</th><th>Type</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>2025-03-15</td><td>Routine maintenance</td><td>${UI.statusBadge('Completed')}</td></tr>
          <tr><td>2025-04-20</td><td>Mechanical breakdown</td><td>${UI.statusBadge('Under Review')}</td></tr>
        </tbody></table></div>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Maintenance';},100);
  return appShell(html, 'maint', 'entrepreneur');
};

Pages['ent/messages'] = Pages['app/messages'];
