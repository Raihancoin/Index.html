/* ============================================================
   Amanah Capital — UI Helpers
   ============================================================ */
window.UI = (function(){
  let chartInstances = [];

  function icon(name, cls=''){ return `<i data-lucide="${name}" class="${cls}"></i>`; }

  function refreshIcons(){
    if(window.lucide) lucide.createIcons();
  }

  function toast(msg, type='success'){
    const c = document.getElementById('toast-container');
    const el = document.createElement('div');
    const iconMap = { success:'check-circle-2', error:'alert-circle', info:'info' };
    el.className = 'toast ' + type;
    el.innerHTML = `<i data-lucide="${iconMap[type]||'info'}"></i><span>${msg}</span>`;
    c.appendChild(el);
    refreshIcons();
    setTimeout(()=>{ el.style.opacity = '0'; el.style.transform='translateX(100%)'; setTimeout(()=>el.remove(), 300); }, 3200);
  }

  function modal({ title, body, actions }){
    const root = document.getElementById('modal-root');
    root.innerHTML = `
      <div class="modal-bg">
        <div class="modal">
          <div class="modal-head"><h3>${title}</h3><button class="icon-btn" id="modal-close">${icon('x')}</button></div>
          <div class="modal-body">${body}</div>
          ${actions ? `<div class="modal-foot">${actions}</div>` : ''}
        </div>
      </div>`;
    refreshIcons();
    const close = () => { root.innerHTML=''; };
    document.getElementById('modal-close').onclick = close;
    root.querySelector('.modal-bg').addEventListener('click', e => { if(e.target.classList.contains('modal-bg')) close(); });
    return { close, el: root.querySelector('.modal') };
  }

  function confirm(title, message, onOk){
    const m = modal({
      title,
      body: `<p>${message}</p>`,
      actions: `<button class="btn btn-outline" id="cf-no">Cancel</button><button class="btn btn-primary" id="cf-yes">Confirm</button>`
    });
    document.getElementById('cf-no').onclick = () => m.close();
    document.getElementById('cf-yes').onclick = () => { m.close(); onOk && onOk(); };
  }

  function clearCharts(){
    chartInstances.forEach(c => { try { c.destroy(); } catch(e){} });
    chartInstances = [];
  }

  function lineChart(canvasId, labels, data, opts={}){
    const ctx = document.getElementById(canvasId); if(!ctx) return;
    const c = new Chart(ctx, {
      type:'line',
      data:{ labels, datasets:[{ label:opts.label||'Series', data, borderColor:'#0E5B44', backgroundColor:'rgba(14,91,68,0.10)', fill:true, tension:0.35, borderWidth:2, pointRadius:0, pointHoverRadius:5 }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } },
        scales:{ y:{ beginAtZero:true, grid:{ color:'#eef3f5' } }, x:{ grid:{ display:false } } } }
    });
    chartInstances.push(c);
    return c;
  }

  function doughnutChart(canvasId, labels, data, colors){
    const ctx = document.getElementById(canvasId); if(!ctx) return;
    const c = new Chart(ctx, {
      type:'doughnut',
      data:{ labels, datasets:[{ data, backgroundColor: colors || ['#0E5B44','#C9A961','#0B1F2A','#14a37a','#8c6f3a','#6b7d8c'], borderWidth:2, borderColor:'#fff' }] },
      options:{ responsive:true, maintainAspectRatio:false, cutout:'68%', plugins:{ legend:{ position:'right', labels:{ boxWidth:10, font:{ size:11 }, padding:12 } } } }
    });
    chartInstances.push(c);
    return c;
  }

  function barChart(canvasId, labels, data, label='Value'){
    const ctx = document.getElementById(canvasId); if(!ctx) return;
    const c = new Chart(ctx, {
      type:'bar',
      data:{ labels, datasets:[{ label, data, backgroundColor:'#0E5B44', borderRadius:8, barThickness:26 }] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{ display:false } },
        scales:{ y:{ beginAtZero:true, grid:{ color:'#eef3f5' } }, x:{ grid:{ display:false } } } }
    });
    chartInstances.push(c);
    return c;
  }

  function money(n){ return '৳' + Math.round(n).toLocaleString('en-IN'); }
  function initials(name){ return name.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase(); }
  function statusBadge(status){
    const map = {
      'Active':'badge-emerald','Funding':'badge-info','Completed':'badge-navy',
      'Submitted':'badge-info','Under Review':'badge-warning','Document Required':'badge-warning',
      'Field Verification':'badge-warning','Shariah Review':'badge-warning',
      'Approved':'badge-success','Rejected':'badge-danger',
      'Pending':'badge-warning','Completed_pay':'badge-success','Open':'badge-info','Closed':'badge-navy'
    };
    return `<span class="badge ${map[status]||'badge-outline'}">${status}</span>`;
  }

  function projectIconBg(iconName){
    return `<div class="proj-img icon-only"><i data-lucide="${iconName}"></i>
      <div class="proj-loc">${icon('map-pin')} <span class="bn">Demo</span></div>
    </div>`;
  }

  return { icon, refreshIcons, toast, modal, confirm, clearCharts, lineChart, doughnutChart, barChart, money, initials, statusBadge };
})();
