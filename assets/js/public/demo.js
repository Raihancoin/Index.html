/* ============================================================
   Demo Control Center
   ============================================================ */
Pages['demo'] = function(){
  const content = `
    <div class="flex-between" style="margin-bottom:22px;flex-wrap:wrap;gap:12px">
      <div><h2>Demo Control Center</h2><p class="muted">Test the complete platform. All actions affect local demo data only.</p></div>
      <span class="badge badge-warning">DEMO ONLY</span>
    </div>
    <div class="info-banner">${UI.icon('info')} These controls mutate the demo data stored in your browser. Nothing is sent to a real server. Use "Reset" to restore seed data.</div>

    <div class="grid g3" style="margin-bottom:22px">
      <div class="card card-pad">
        <h4 style="margin-bottom:6px">${UI.icon('user-cog')} Switch demo role</h4>
        <p class="small muted" style="margin-bottom:14px">Instantly log in as a different role.</p>
        <div class="stack">
          <button class="btn btn-outline btn-block" onclick="Pages._quickLogin('investor@demo.com','investor','Md. Rashed Karim','INV-01')">Login as Investor</button>
          <button class="btn btn-outline btn-block" onclick="Pages._quickLogin('entrepreneur@demo.com','entrepreneur','Md. Habibur Rahman','ENT-01')">Login as Entrepreneur</button>
          <button class="btn btn-outline btn-block" onclick="Pages._quickLogin('admin@demo.com','admin','Platform Admin','ADM-01')">Login as Admin</button>
        </div>
      </div>
      <div class="card card-pad">
        <h4 style="margin-bottom:6px">${UI.icon('refresh-cw')} Reset demo</h4>
        <p class="small muted" style="margin-bottom:14px">Restore all seed data and clear your session.</p>
        <button class="btn btn-danger btn-block" onclick="Pages._resetDemo()">Reset all demo data</button>
      </div>
      <div class="card card-pad">
        <h4 style="margin-bottom:6px">${UI.icon('database')} Storage status</h4>
        <p class="small muted" style="margin-bottom:14px">Local demo storage is active.</p>
        <div class="kv"><span class="k">Projects</span><span class="v">${Store.state.projects.length}</span></div>
        <div class="kv"><span class="k">Investments</span><span class="v">${Store.state.investments.length}</span></div>
        <div class="kv"><span class="k">Transactions</span><span class="v">${Store.state.transactions.length}</span></div>
        <div class="kv"><span class="k">Applications</span><span class="v">${Store.state.applications.length}</span></div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head"><h3>Simulation actions</h3></div>
      <div class="grid g3" style="gap:14px">
        <button class="card card-pad card-hover" style="text-align:left" onclick="Pages._simInvite()">
          <div class="flex-center" style="margin-bottom:8px"><div class="feature-icon" style="width:36px;height:36px;margin-bottom:0">${UI.icon('plus')}</div></div>
          <div class="strong">Simulate new investment</div>
          <p class="small muted">Add a demo investment to a random project.</p>
        </button>
        <button class="card card-pad card-hover" style="text-align:left" onclick="Pages._simPayment()">
          <div class="flex-center" style="margin-bottom:8px"><div class="feature-icon" style="width:36px;height:36px;margin-bottom:0">${UI.icon('credit-card')}</div></div>
          <div class="strong">Simulate a payment</div>
          <p class="small muted">Record a completed rental-income payment.</p>
        </button>
        <button class="card card-pad card-hover" style="text-align:left" onclick="Pages._simMissed()">
          <div class="flex-center" style="margin-bottom:8px"><div class="feature-icon" style="width:36px;height:36px;margin-bottom:0">${UI.icon('alert-triangle')}</div></div>
          <div class="strong">Simulate missed payment</div>
          <p class="small muted">Mark an upcoming payment as pending/overdue.</p>
        </button>
        <button class="card card-pad card-hover" style="text-align:left" onclick="Pages._simBreakdown()">
          <div class="flex-center" style="margin-bottom:8px"><div class="feature-icon" style="width:36px;height:36px;margin-bottom:0">${UI.icon('wrench')}</div></div>
          <div class="strong">Simulate breakdown</div>
          <p class="small muted">Add a maintenance event to a project.</p>
        </button>
        <button class="card card-pad card-hover" style="text-align:left" onclick="UI.toast('Early settlement simulated (demo)','success')">
          <div class="flex-center" style="margin-bottom:8px"><div class="feature-icon" style="width:36px;height:36px;margin-bottom:0">${UI.icon('check-circle-2')}</div></div>
          <div class="strong">Early settlement</div>
          <p class="small muted">Simulate a borrower settling early.</p>
        </button>
        <button class="card card-pad card-hover" style="text-align:left" onclick="UI.toast('Ownership transfer simulated (demo)','success')">
          <div class="flex-center" style="margin-bottom:8px"><div class="feature-icon" style="width:36px;height:36px;margin-bottom:0">${UI.icon('repeat')}</div></div>
          <div class="strong">Ownership transfer</div>
          <p class="small muted">Simulate a permitted transfer.</p>
        </button>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head"><h3>Complete demo user journeys</h3></div>
      <div class="grid g2" style="gap:14px">
        <div class="card card-pad">
          <h4>Investor journey</h4>
          <p class="small muted">Register → Browse → Review → Invest → Track income.</p>
          <a href="#/projects" class="btn btn-outline btn-sm" style="margin-top:12px">Start as investor</a>
        </div>
        <div class="card card-pad">
          <h4>Entrepreneur journey</h4>
          <p class="small muted">Apply → Verification → Approval → Operate → Gain ownership.</p>
          <a href="#/ent/apply" class="btn btn-outline btn-sm" style="margin-top:12px">Start application</a>
        </div>
        <div class="card card-pad">
          <h4>Admin journey</h4>
          <p class="small muted">Review → Verify → Approve → Monitor → Close project.</p>
          <a href="#/admin/applications" class="btn btn-outline btn-sm" style="margin-top:12px">Start review</a>
        </div>
        <div class="card card-pad">
          <h4>Shariah governance</h4>
          <p class="small muted">Contract register, advisors, audits, principle review.</p>
          <a href="#/shariah-governance" class="btn btn-outline btn-sm" style="margin-top:12px">Open center</a>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head"><h3>Live financial calculations</h3></div>
      <p class="small muted" style="margin-bottom:12px">All calculators update live as you adjust inputs.</p>
      <a href="#/calculator" class="btn btn-primary">${UI.icon('calculator')} Open financing calculator</a>
    </div>

    <div class="panel">
      <div class="panel-head"><h3>Demo credentials</h3></div>
      <div class="tbl-wrap"><table>
        <thead><tr><th>Role</th><th>Email</th><th>Password</th></tr></thead>
        <tbody>
          <tr><td>Investor</td><td class="mono">investor@demo.com</td><td class="mono">demo123</td></tr>
          <tr><td>Entrepreneur</td><td class="mono">entrepreneur@demo.com</td><td class="mono">demo123</td></tr>
          <tr><td>Admin</td><td class="mono">admin@demo.com</td><td class="mono">demo123</td></tr>
        </tbody></table></div>
      <p class="tiny muted" style="margin-top:12px">Never use these credentials in production. This is a client-side prototype only.</p>
    </div>`;
  setTimeout(()=>{UI.refreshIcons(); document.querySelector('.topbar h1').textContent = 'Demo Control Center';},100);
  return appShell(content, 'demo', 'admin');
};

Pages._resetDemo = function(){
  UI.confirm('Reset all demo data?', 'This will erase all local changes and restore the seed data. You will be logged out.', () => {
    Store.reset();
    UI.toast('Demo data reset', 'success');
    setTimeout(()=>location.hash = '#/', 400);
  });
};

Pages._simInvite = function(){
  const user = Store.session.user;
  if(!user){ UI.toast('Login as investor first','error'); return; }
  const p = Store.state.projects[Math.floor(Math.random()*Store.state.projects.length)];
  const amt = 20000 + Math.floor(Math.random()*30000);
  Store.addInvestment({ id:'IV-SIM'+(Date.now()%10000), investorId:user.id||'INV-01', projectId:p.id, amount:amt, shares:Math.round(amt/2000), joined:new Date().toISOString().slice(0,10) });
  UI.toast(`Simulated ৳${amt.toLocaleString()} into ${p.id}`, 'success');
  setTimeout(()=>location.reload(), 400);
};

Pages._simPayment = function(){
  const t = Store.state.transactions.find(x=>x.status==='Pending');
  if(t){ t.status='Completed'; Store.save(); UI.toast('Payment marked completed', 'success'); Router.render(); }
  else { UI.toast('No pending payments to complete','info'); }
};

Pages._simMissed = function(){
  const user = Store.session.user;
  Store.state.transactions.unshift({
    id:'TX-SIM'+(Date.now()%10000), date:new Date().toISOString().slice(0,10),
    projectId:'PRJ-001', investorId:user?user.id:'INV-01', type:'Rental Income', amount:850, status:'Pending'
  });
  Store.save();
  Store.log(user?user.email:'demo', 'Simulated missed payment');
  UI.toast('Missed payment event recorded (demo)', 'info');
  Router.render();
};

Pages._simBreakdown = function(){
  Store.log('demo', 'Simulated vehicle breakdown on PRJ-001');
  UI.toast('Breakdown event recorded (demo)','info');
  UI.modal({
    title:'Maintenance Event Logged',
    body:`<p class="small">A simulated breakdown event has been recorded against <strong>PRJ-001</strong>. In a real deployment this would:</p>
      <ul style="padding-left:18px;margin-top:10px;font-size:.9rem;line-height:1.8;color:var(--gray-600)">
        <li>Trigger a maintenance request</li>
        <li>Adjust income distribution if the asset is unavailable</li>
        <li>Notify the lessor/owner about their repair obligation (Ijarah)</li>
        <li>Update investor income projections</li>
      </ul>`,
    actions:`<button class="btn btn-primary" onclick="this.closest('.modal-bg').remove()">Got it</button>`
  });
};
