import React from 'react';

const Dashboard = () => {
  // Sample invoice data - in real app this would come from an API/database
  const invoices = [
    {
      id: 1,
      customerName: "Johnson",
      amount: 150,
      status: "overdue",
      daysOverdue: 3,
      jobDescription: "Kitchen sink repair"
    },
    {
      id: 2,
      customerName: "Smith",
      amount: 275,
      status: "due",
      daysDue: 2,
      jobDescription: "Bathroom plumbing"
    },
    {
      id: 3,
      customerName: "Williams",
      amount: 120,
      status: "paid",
      paidDate: "Today",
      jobDescription: "Toilet installation"
    }
  ];

  // Function to get status styling based on invoice status
  const getStatusStyle = (invoice) => {
    switch (invoice.status) {
      case 'overdue':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          label: `${invoice.daysOverdue} days overdue`
        };
      case 'due':
        return {
          bg: 'bg-amber-100',
          text: 'text-amber-800',
          label: `Due in ${invoice.daysDue} days`
        };
      case 'paid':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          label: `Paid ${invoice.paidDate}`
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          label: 'Unknown'
        };
    }
  };

  // Calculate totals for each status
  const calculateTotals = () => {
    const overdue = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);
    const dueSoon = invoices.filter(inv => inv.status === 'due').reduce((sum, inv) => sum + inv.amount, 0);
    const paid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
    
    return { overdue, dueSoon, paid };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-50 max-w-[390px] mx-auto">
      {/* Navigation Header */}
      <header className="bg-gradient-to-r from-teal-700 to-teal-800 px-4 py-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">PayMe</h1>
        <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Summary Stats */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Invoice Status</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-red-600">1</div>
              <div className="text-xs text-gray-600 mb-1">Overdue</div>
              <div className="text-sm font-semibold text-gray-900">${totals.overdue.toLocaleString()}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-amber-600">1</div>
              <div className="text-xs text-gray-600 mb-1">Due Soon</div>
              <div className="text-sm font-semibold text-gray-900">${totals.dueSoon.toLocaleString()}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-center">
              <div className="text-2xl font-bold text-green-600">1</div>
              <div className="text-xs text-gray-600 mb-1">Paid</div>
              <div className="text-sm font-semibold text-gray-900">${totals.paid.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Invoice List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Recent Invoices ({invoices.length})</h3>
          
          {invoices.map((invoice) => {
            const statusStyle = getStatusStyle(invoice);
            
            return (
              <div key={invoice.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{invoice.customerName}</h4>
                    <p className="text-sm text-gray-600">{invoice.jobDescription}</p>
                    <p className="text-lg font-bold text-gray-900">${invoice.amount}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                    {statusStyle.label}
                  </span>
                </div>
                
                {/* Action Button */}
                <button className="w-full bg-teal-600 hover:bg-teal-700 focus:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 text-white font-medium py-3 px-4 rounded-lg min-h-12 transition-colors">
                  Send Text Reminder
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
