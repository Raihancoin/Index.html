/* ============================================================
   Amanah Capital — Store (localStorage persistence)
   ============================================================ */
window.Store = (function(){
  const KEY = 'amanah_demo_v1';
  const SESSION_KEY = 'amanah_session_v1';

  function seed(){
    return {
      projects: JSON.parse(JSON.stringify(DATA.projects)),
      investments: JSON.parse(JSON.stringify(DATA.investments)),
      transactions: JSON.parse(JSON.stringify(DATA.transactions)),
      applications: JSON.parse(JSON.stringify(DATA.applications)),
      transfers: JSON.parse(JSON.stringify(DATA.transfers)),
      audit: JSON.parse(JSON.stringify(DATA.audit_log)),
      messages: [
        { from:'Support', text:'Welcome to Amanah Capital demo. Ask us anything about Shariah-compliant financing.', ts:Date.now()-3600000, room:'general' }
      ]
    };
  }

  let state;
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? JSON.parse(raw) : seed();
  } catch(e){ state = seed(); }

  function save(){
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e){}
  }

  const session = {
    get user(){
      try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch(e){ return null; }
    },
    login(user){
      const u = { email:user.email, role:user.role, name:user.name, id:user.id, initials:user.initials };
      localStorage.setItem(SESSION_KEY, JSON.stringify(u));
      log(u.email, 'Signed in as ' + u.role);
      return u;
    },
    logout(){ localStorage.removeItem(SESSION_KEY); },
    isRole(r){ const u = this.user; return u && u.role === r; }
  };

  function log(actor, action){
    state.audit.unshift({ ts:new Date().toISOString().slice(0,16).replace('T',' '), actor, action, ip:'10.0.0.X' });
    state.audit = state.audit.slice(0, 100);
    save();
  }

  return {
    state,
    save,
    session,
    log,
    reset(){ state = seed(); save(); localStorage.removeItem(SESSION_KEY); },
    // --- Projects
    getProject(id){ return state.projects.find(p=>p.id===id); },
    addProject(p){ state.projects.unshift(p); save(); },
    // --- Investments
    investmentsFor(investorId){ return state.investments.filter(i=>i.investorId===investorId); },
    addInvestment(inv){
      state.investments.push(inv);
      const p = state.projects.find(x=>x.id===inv.projectId);
      if(p) p.funded = Math.min(p.fundingTarget, (p.funded||0) + inv.amount);
      state.transactions.unshift({ id:'TX-'+(Date.now()%100000), date:new Date().toISOString().slice(0,10), projectId:inv.projectId, investorId:inv.investorId, type:'Investment', amount:inv.amount, status:'Completed' });
      save();
    },
    // --- Transactions
    transactionsFor(investorId){ return state.transactions.filter(t=>t.investorId===investorId); },
    // --- Applications
    addApplication(app){ state.applications.unshift(app); save(); },
    updateApplication(id, patch){
      const a = state.applications.find(x=>x.id===id);
      if(a){ Object.assign(a, patch); save(); }
    },
    // --- Transfers
    getTransfer(id){ return state.transfers.find(t=>t.id===id); },
    addTransfer(t){ state.transfers.unshift(t); save(); }
  };
})();
