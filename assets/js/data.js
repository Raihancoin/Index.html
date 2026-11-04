/* ============================================================
   Amanah Capital — Mock Data (all fictional demo data)
   ============================================================ */
window.DATA = {
  brand: { name: 'Amanah Capital', tagline: 'Shariah-compliant asset finance' },

  projects: [
    { id:'PRJ-001', title:'Electric Auto-rickshaw — Mirpur Route', category:'Auto Rickshaw',
      location:'Mirpur, Dhaka', district:'Dhaka', icon:'car',
      assetCost:200000, fundingTarget:200000, funded:140000, duration:36,
      model:'HPSM', riskLevel:'Medium', status:'Active',
      entrepreneurId:'ENT-01', supplier:'Green Wheels BD Ltd.', supplierVerified:true,
      description:'A verified electric auto-rickshaw deployed on the Mirpur–Agargaon corridor under a Diminishing Musharakah (HPSM) structure. The entrepreneur acquires the financiers\' ownership share in monthly steps while paying rent on the outstanding share only.',
      initialShare:0.15, markupRate:0.22, rentRate:0.10, monthlyReturn:0.135,
      monthsElapsed:8, featured:true,
      documents:['Purchase invoice (demo)','Supplier verification (demo)','Shariah approval memo (demo)'] },

    { id:'PRJ-002', title:'Agricultural Tractor — Mymensingh', category:'Agricultural Equipment',
      location:'Trishal, Mymensingh', district:'Mymensingh', icon:'tractor',
      assetCost:850000, fundingTarget:850000, funded:610000, duration:48,
      model:'Murabaha', riskLevel:'Low', status:'Active',
      entrepreneurId:'ENT-02', supplier:'Agro Power Ltd.', supplierVerified:true,
      description:'A power tiller/tractor asset sold to the farmer at a disclosed fixed deferred sale price under Murabaha. Full ownership transfers on sale with security arrangements in place.',
      markupRate:0.28, monthlyReturn:0.118, monthsElapsed:14, featured:true,
      documents:['Purchase invoice (demo)','Supplier verification (demo)','Shariah approval memo (demo)'] },

    { id:'PRJ-003', title:'Poultry Equipment — Gazipur Farm', category:'Poultry Equipment',
      location:'Sreepur, Gazipur', district:'Gazipur', icon:'bird',
      assetCost:450000, fundingTarget:450000, funded:450000, duration:24,
      model:'Ijarah', riskLevel:'Medium', status:'Active',
      entrepreneurId:'ENT-03', supplier:'PoultryTech BD', supplierVerified:true,
      description:'Poultry housing equipment and automated feeding lines leased under Ijarah. The company retains ownership; the entrepreneur pays rent for use. End-of-lease option may include a gift or sale at market value.',
      rentRate:0.14, monthlyReturn:0.130, monthsElapsed:20, featured:false,
      documents:['Purchase invoice (demo)','Lease deed (demo)','Shariah approval memo (demo)'] },

    { id:'PRJ-004', title:'Small Retail Shop — Chattogram', category:'Shop Equipment',
      location:'Agrabad, Chattogram', district:'Chattogram', icon:'store',
      assetCost:300000, fundingTarget:300000, funded:180000, duration:30,
      model:'Murabaha', riskLevel:'Low', status:'Funding',
      entrepreneurId:'ENT-04', supplier:'Retail Fit BD', supplierVerified:true,
      description:'Shop fixtures, refrigeration, and display systems sold at a fixed deferred sale price under Murabaha. Ownership transfers at sale; entrepreneur operates the business.',
      markupRate:0.24, monthlyReturn:0.115, monthsElapsed:0, featured:true,
      documents:['Purchase invoice (demo)','Supplier verification (demo)'] },

    { id:'PRJ-005', title:'Delivery Van — Sylhet District', category:'Commercial Vehicle',
      location:'Zindabazar, Sylhet', district:'Sylhet', icon:'truck',
      assetCost:750000, fundingTarget:750000, funded:520000, duration:36,
      model:'Ijarah', riskLevel:'Medium', status:'Active',
      entrepreneurId:'ENT-05', supplier:'Sylhet Motors', supplierVerified:true,
      description:'A commercial delivery van leased under Ijarah for last-mile logistics. Ownership remains with the financing entity; entrepreneur pays rent for use.',
      rentRate:0.135, monthlyReturn:0.126, monthsElapsed:11, featured:false,
      documents:['Purchase invoice (demo)','Lease deed (demo)','Insurance placeholder (demo)'] },

    { id:'PRJ-006', title:'Tailoring Machine Set — Khulna', category:'Small Manufacturing',
      location:'Khalishpur, Khulna', district:'Khulna', icon:'scissors',
      assetCost:180000, fundingTarget:180000, funded:180000, duration:24,
      model:'HPSM', riskLevel:'Medium', status:'Active',
      entrepreneurId:'ENT-01', supplier:'SewTech BD', supplierVerified:true,
      description:'Industrial sewing machine set financed under Diminishing Musharakah. Rent applies only to the financier\'s outstanding ownership share.',
      initialShare:0.2, markupRate:0.20, rentRate:0.09, monthlyReturn:0.128, monthsElapsed:18, featured:false,
      documents:['Purchase invoice (demo)','Shariah approval memo (demo)'] },

    { id:'PRJ-007', title:'Cold Storage Unit — Rajshahi', category:'Small Manufacturing',
      location:'Boalia, Rajshahi', district:'Rajshahi', icon:'snowflake',
      assetCost:1200000, fundingTarget:1200000, funded:430000, duration:60,
      model:'Diminishing Musharakah', riskLevel:'Medium', status:'Funding',
      entrepreneurId:'ENT-02', supplier:'CoolChain BD', supplierVerified:true,
      description:'A modular cold storage unit under a Diminishing Musharakah structure. Both parties hold ownership shares that diminish as the entrepreneur acquires the financier\'s share in steps.',
      initialShare:0.1, markupRate:0.25, rentRate:0.09, monthlyReturn:0.112, monthsElapsed:0, featured:true,
      documents:['Purchase invoice (demo)','Site survey (demo)'] },

    { id:'PRJ-008', title:'Solar Irrigation Pump — Barishal', category:'Agricultural Equipment',
      location:'Babuganj, Barishal', district:'Barishal', icon:'sun',
      assetCost:550000, fundingTarget:550000, funded:550000, duration:48,
      model:'Ijarah', riskLevel:'Low', status:'Completed',
      entrepreneurId:'ENT-04', supplier:'SolarAgro Ltd.', supplierVerified:true,
      description:'A solar-powered irrigation pump leased under Ijarah. Completed successfully — end-of-lease ownership transferred via separate sale.',
      rentRate:0.12, monthlyReturn:0.108, monthsElapsed:48, featured:false,
      documents:['Purchase invoice (demo)','Completion certificate (demo)'] }
  ],

  investors: [
    { id:'INV-01', name:'Md. Rashed Karim', email:'investor@demo.com', district:'Dhaka', joined:'2024-02-14' },
    { id:'INV-02', name:'Fatima Akter', email:'fatima@demo.com', district:'Chattogram', joined:'2024-04-02' },
    { id:'INV-03', name:'Shahidul Islam', email:'shahid@demo.com', district:'Sylhet', joined:'2024-05-19' },
    { id:'INV-04', name:'Nasrin Sultana', email:'nasrin@demo.com', district:'Rajshahi', joined:'2024-06-30' },
    { id:'INV-05', name:'Abdul Mannan', email:'mannan@demo.com', district:'Khulna', joined:'2024-08-11' },
    { id:'INV-06', name:'Rehana Parvin', email:'rehana@demo.com', district:'Dhaka', joined:'2024-09-08' },
    { id:'INV-07', name:'Tariqul Alam', email:'tariq@demo.com', district:'Barishal', joined:'2024-10-21' },
    { id:'INV-08', name:'Sumaiya Rahman', email:'sumaiya@demo.com', district:'Dhaka', joined:'2024-11-05' },
    { id:'INV-09', name:'Kamrul Hasan', email:'kamrul@demo.com', district:'Mymensingh', joined:'2024-12-01' },
    { id:'INV-10', name:'Mehedi Hasan', email:'mehedi@demo.com', district:'Gazipur', joined:'2025-01-17' }
  ],

  entrepreneurs: [
    { id:'ENT-01', name:'Md. Habibur Rahman', email:'entrepreneur@demo.com', phone:'+8801XXXXXXXXX', district:'Dhaka', business:'Auto-rickshaw operation', verified:true },
    { id:'ENT-02', name:'Md. Asadul Haque', email:'asad@demo.com', phone:'+8801XXXXXXXXX', district:'Mymensingh', business:'Agri equipment rental', verified:true },
    { id:'ENT-03', name:'Rokeya Begum', email:'rokeya@demo.com', phone:'+8801XXXXXXXXX', district:'Gazipur', business:'Poultry farming', verified:true },
    { id:'ENT-04', name:'Md. Shahjahan Ali', email:'shahjahan@demo.com', phone:'+8801XXXXXXXXX', district:'Chattogram', business:'Retail shop', verified:true },
    { id:'ENT-05', name:'Md. Nurul Amin', email:'nurul@demo.com', phone:'+8801XXXXXXXXX', district:'Sylhet', business:'Logistics delivery', verified:true }
  ],

  investments: [
    { id:'IV-001', investorId:'INV-01', projectId:'PRJ-001', amount:50000, shares:25, joined:'2024-11-15' },
    { id:'IV-002', investorId:'INV-01', projectId:'PRJ-002', amount:100000, shares:11, joined:'2024-12-02' },
    { id:'IV-003', investorId:'INV-01', projectId:'PRJ-003', amount:75000, shares:16, joined:'2025-01-08' },
    { id:'IV-004', investorId:'INV-01', projectId:'PRJ-005', amount:120000, shares:16, joined:'2025-02-20' },
    { id:'IV-005', investorId:'INV-02', projectId:'PRJ-001', amount:40000, shares:20, joined:'2024-12-10' },
    { id:'IV-006', investorId:'INV-02', projectId:'PRJ-004', amount:60000, shares:20, joined:'2025-01-22' },
    { id:'IV-007', investorId:'INV-03', projectId:'PRJ-002', amount:85000, shares:10, joined:'2025-02-05' },
    { id:'IV-008', investorId:'INV-04', projectId:'PRJ-005', amount:90000, shares:12, joined:'2025-02-28' },
    { id:'IV-009', investorId:'INV-05', projectId:'PRJ-003', amount:50000, shares:11, joined:'2025-03-03' },
    { id:'IV-010', investorId:'INV-06', projectId:'PRJ-001', amount:30000, shares:15, joined:'2025-03-15' }
  ],

  transactions: [
    { id:'TX-1001', date:'2025-03-01', projectId:'PRJ-001', investorId:'INV-01', type:'Rental Income', amount:850, status:'Completed' },
    { id:'TX-1002', date:'2025-03-01', projectId:'PRJ-002', investorId:'INV-01', type:'Rental Income', amount:1100, status:'Completed' },
    { id:'TX-1003', date:'2025-03-01', projectId:'PRJ-003', investorId:'INV-01', type:'Rental Income', amount:1200, status:'Completed' },
    { id:'TX-1004', date:'2025-03-03', projectId:'PRJ-005', investorId:'INV-01', type:'Rental Income', amount:1500, status:'Completed' },
    { id:'TX-1005', date:'2025-04-01', projectId:'PRJ-001', investorId:'INV-01', type:'Rental Income', amount:850, status:'Completed' },
    { id:'TX-1006', date:'2025-04-01', projectId:'PRJ-002', investorId:'INV-01', type:'Rental Income', amount:1100, status:'Completed' },
    { id:'TX-1007', date:'2025-04-01', projectId:'PRJ-003', investorId:'INV-01', type:'Rental Income', amount:1200, status:'Completed' },
    { id:'TX-1008', date:'2025-05-01', projectId:'PRJ-005', investorId:'INV-01', type:'Rental Income', amount:1500, status:'Pending' },
    { id:'TX-1009', date:'2025-05-01', projectId:'PRJ-001', investorId:'INV-01', type:'Rental Income', amount:850, status:'Pending' },
    { id:'TX-1010', date:'2025-02-15', projectId:'PRJ-001', investorId:'INV-01', type:'Investment', amount:50000, status:'Completed' },
    { id:'TX-1011', date:'2025-03-10', projectId:'PRJ-002', investorId:'INV-01', type:'Ownership Acquisition', amount:1500, status:'Completed' },
    { id:'TX-1012', date:'2025-03-15', projectId:'PRJ-003', investorId:'INV-02', type:'Rental Income', amount:400, status:'Completed' },
    { id:'TX-1013', date:'2025-04-15', projectId:'PRJ-003', investorId:'INV-02', type:'Rental Income', amount:400, status:'Completed' },
    { id:'TX-1014', date:'2025-02-20', projectId:'PRJ-004', investorId:'INV-02', type:'Investment', amount:60000, status:'Completed' },
    { id:'TX-1015', date:'2025-03-05', projectId:'PRJ-002', investorId:'INV-03', type:'Rental Income', amount:750, status:'Completed' },
    { id:'TX-1016', date:'2025-04-05', projectId:'PRJ-002', investorId:'INV-03', type:'Rental Income', amount:750, status:'Completed' },
    { id:'TX-1017', date:'2025-03-08', projectId:'PRJ-005', investorId:'INV-04', type:'Rental Income', amount:900, status:'Completed' },
    { id:'TX-1018', date:'2025-04-08', projectId:'PRJ-005', investorId:'INV-04', type:'Rental Income', amount:900, status:'Pending' },
    { id:'TX-1019', date:'2025-03-12', projectId:'PRJ-003', investorId:'INV-05', type:'Rental Income', amount:550, status:'Completed' },
    { id:'TX-1020', date:'2025-04-12', projectId:'PRJ-003', investorId:'INV-05', type:'Rental Income', amount:550, status:'Completed' },
    { id:'TX-1021', date:'2025-03-20', projectId:'PRJ-001', investorId:'INV-06', type:'Rental Income', amount:500, status:'Completed' },
    { id:'TX-1022', date:'2025-04-20', projectId:'PRJ-001', investorId:'INV-06', type:'Rental Income', amount:500, status:'Completed' },
    { id:'TX-1023', date:'2025-01-01', projectId:'PRJ-001', investorId:'INV-01', type:'Rental Income', amount:850, status:'Completed' },
    { id:'TX-1024', date:'2025-01-01', projectId:'PRJ-001', investorId:'INV-01', type:'Rental Income', amount:850, status:'Completed' },
    { id:'TX-1025', date:'2025-02-01', projectId:'PRJ-001', investorId:'INV-01', type:'Rental Income', amount:850, status:'Completed' },
    { id:'TX-1026', date:'2025-02-01', projectId:'PRJ-002', investorId:'INV-01', type:'Rental Income', amount:1100, status:'Completed' },
    { id:'TX-1027', date:'2025-02-01', projectId:'PRJ-003', investorId:'INV-01', type:'Rental Income', amount:1200, status:'Completed' },
    { id:'TX-1028', date:'2025-01-15', projectId:'PRJ-003', investorId:'INV-01', type:'Investment', amount:75000, status:'Completed' },
    { id:'TX-1029', date:'2025-02-20', projectId:'PRJ-005', investorId:'INV-01', type:'Investment', amount:120000, status:'Completed' },
    { id:'TX-1030', date:'2025-03-25', projectId:'PRJ-004', investorId:'INV-02', type:'Investment', amount:60000, status:'Completed' }
  ],

  applications: [
    { id:'APP-2001', applicant:'Md. Rafiqul Islam', district:'Cumilla', asset:'Electric Auto-rickshaw', assetCost:210000, duration:36, submitted:'2025-04-28', status:'Under Review', step:2 },
    { id:'APP-2002', applicant:'Ms. Salma Begum', district:'Bogura', asset:'Sewing Machine Set', assetCost:150000, duration:24, submitted:'2025-04-25', status:'Document Required', step:1 },
    { id:'APP-2003', applicant:'Md. Kamal Hossain', district:'Noakhali', asset:'Delivery Motorcycle', assetCost:180000, duration:30, submitted:'2025-04-20', status:'Field Verification', step:3 },
    { id:'APP-2004', applicant:'Ms. Sharmin Akter', district:'Jashore', asset:'Poultry Equipment', assetCost:420000, duration:36, submitted:'2025-04-15', status:'Shariah Review', step:4 },
    { id:'APP-2005', applicant:'Md. Anwar Hossain', district:'Rangpur', asset:'Tractor', assetCost:900000, duration:48, submitted:'2025-04-10', status:'Approved', step:5 }
  ],

  transfers: [
    { id:'TRF-01', projectId:'PRJ-002', seller:'INV-03', shares:5, askPrice:42000, status:'Open', listed:'2025-04-20' },
    { id:'TRF-02', projectId:'PRJ-005', seller:'INV-04', shares:6, askPrice:55000, status:'Open', listed:'2025-04-22' }
  ],

  shariah_advisors: [
    { name:'Mufti Abdul Kader', qualification:'Darul Ifta, Dhaka', expertise:'Murabaha & Ijarah' },
    { name:'Mufti Rafiq Ahmed', qualification:'Al-Azhar University', expertise:'Musharakah & Mudarabah' },
    { name:'Dr. Shahida Parvin', qualification:'IIUC, Chattogram', expertise:'Islamic Fintech' }
  ],

  shariah_contracts: [
    { name:'Murabaha', status:'Approved', description:'Cost-plus sale with disclosed markup. Fixed deferred sale price agreed at contract; no increase for late payment.', risks:'Ownership must be genuine before sale. Late payment penalties (if any) go to charity, not income.' },
    { name:'Ijarah', status:'Approved', description:'Lease of an owned asset for a defined rental period. Ownership-related risks stay with lessor.', risks:'Maintenance obligations, insurance, and asset availability must be clearly allocated.' },
    { name:'Diminishing Musharakah (HPSM)', status:'Approved', description:'Joint ownership with gradual acquisition of the financier\'s share by the customer. Rent applies only on the outstanding share.', risks:'Do not double-charge rent and capital. Ownership and rental recalc must be transparent.' },
    { name:'Mudarabah', status:'Approved (limited use)', description:'Profit-sharing between capital provider and entrepreneur-manager with agreed ratios.', risks:'No fixed returns. Losses shared. Negligence/misconduct exceptions apply.' },
    { name:'Salam / Istisna', status:'Pending Review', description:'Forward purchase / manufacturing contracts.', risks:'Requires Shariah-board approval before use.' }
  ],

  audit_log: [
    { ts:'2025-05-01 10:14', actor:'admin@demo.com', action:'Approved project PRJ-004', ip:'192.168.1.X' },
    { ts:'2025-04-30 16:22', actor:'admin@demo.com', action:'Reviewed application APP-2001', ip:'192.168.1.X' },
    { ts:'2025-04-29 09:05', actor:'investor@demo.com', action:'Joined project PRJ-005 (৳120,000)', ip:'10.0.0.X' },
    { ts:'2025-04-28 14:47', actor:'entrepreneur@demo.com', action:'Submitted payment ৳4,800 for PRJ-001', ip:'10.0.0.X' },
    { ts:'2025-04-27 11:30', actor:'admin@demo.com', action:'Marked KYC verified for ENT-05', ip:'192.168.1.X' }
  ],

  categories: ['Auto Rickshaw','Agricultural Equipment','Poultry Equipment','Shop Equipment','Commercial Vehicle','Small Manufacturing'],

  districts: ['Dhaka','Chattogram','Sylhet','Rajshahi','Khulna','Barishal','Rangpur','Mymensingh','Gazipur','Cumilla','Bogura','Noakhali','Jashore']
};
