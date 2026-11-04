/* ============================================================
   Amanah Capital — Financing Calculators
   ============================================================ */
window.Calc = (function(){

  const fmt = n => '৳' + Math.round(n).toLocaleString('en-IN');

  // Murabaha — fixed deferred sale price, constant installment
  function murabaha({price, markupRate, months}){
    const total = price * (1 + markupRate);
    const installment = total / months;
    return {
      model:'Murabaha', price, markup: total - price, total,
      months, installment,
      schedule: Array.from({length:months}, (_,i)=>({
        month:i+1, payment:installment,
        balance: total - installment*(i+1)
      }))
    };
  }

  // Ijarah — monthly rental, ownership stays with lessor
  function ijarah({price, rentRate, months}){
    const monthlyRent = price * rentRate / 12;
    const total = monthlyRent * months;
    return {
      model:'Ijarah', price, months, monthlyRent, total,
      schedule: Array.from({length:months}, (_,i)=>({
        month:i+1, rent:monthlyRent, cumulative: monthlyRent*(i+1)
      }))
    };
  }

  // Diminishing Musharakah — acquisition + rent on remaining financier share
  function hpsm({price, initialShare, months, rentRate}){
    const financierShare0 = 1 - initialShare;
    const acquisitionPerMonth = (price * financierShare0) / months;
    const schedule = [];
    let remainingFinancier = price * financierShare0;
    let cumRent = 0, cumAcq = 0;
    for(let i=1;i<=months;i++){
      const rentThisMonth = remainingFinancier * rentRate / 12;
      const acqThisMonth = acquisitionPerMonth;
      remainingFinancier -= acqThisMonth;
      cumRent += rentThisMonth;
      cumAcq += acqThisMonth;
      schedule.push({
        month:i,
        rent: rentThisMonth,
        acquisition: acqThisMonth,
        payment: rentThisMonth + acqThisMonth,
        remaining: remainingFinancier,
        ownershipPct: ((price - remainingFinancier)/price)*100
      });
    }
    const totalRent = cumRent;
    const totalAcq = cumAcq;
    const total = price * initialShare + totalRent + totalAcq;
    return {
      model:'HPSM', price, months, initialShare,
      acquisitionPerMonth, totalRent, totalAcq, total,
      firstPayment: schedule[0].payment,
      lastPayment: schedule[schedule.length-1].payment,
      schedule
    };
  }

  // Daily payment simulator
  function daily({monthlyPayment, daysPerMonth=26, rentPortion, acqPortion}){
    const dailyTotal = monthlyPayment / daysPerMonth;
    const dailyRent = rentPortion/daysPerMonth;
    const dailyAcq = acqPortion/daysPerMonth;
    return { dailyTotal, dailyRent, dailyAcq, monthlyPayment, daysPerMonth };
  }

  return { fmt, murabaha, ijarah, hpsm, daily };
})();
