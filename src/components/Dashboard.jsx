import React, { useState } from 'react';
import RiskActionPlan from './RiskActionPlan';
import MessageComposer from './MessageComposer';
import Analytics from './Analytics';
import { 
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  StarIcon 
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    invoice: null,
    messageType: null
  });

  const handleRiskClick = (invoice) => {
    setSelectedInvoice(invoice);
    setIsRiskModalOpen(true);
  };

  const closeRiskModal = () => {
    setIsRiskModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleSendMessage = (invoice, messageType) => {
    setMessageModal({
      isOpen: true,
      invoice,
      messageType
    });
  };

  const closeMessageModal = () => {
    setMessageModal({
      isOpen: false,
      invoice: null,
      messageType: null
    });
  };

  const handleMarkPaid = (invoiceId) => {
    setInvoices(prevInvoices => 
      prevInvoices.map(invoice => {
        if (invoice.id === invoiceId) {
          return {
            ...invoice,
            status: 'paid',
            paidDate: 'Today',
            // Remove overdue/due specific fields when marked as paid
            daysOverdue: undefined,
            daysDue: undefined
          };
        }
        return invoice;
      })
    );
  };

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      customerName: "Johnson",
      customerPhone: "(555) 123-4567",
      amount: 150,
      status: "overdue",
      daysOverdue: 3,
      jobDescription: "Kitchen sink repair",
      reviewRequestSent: false,
      reviewStatus: null
    },
    {
      id: 2,
      customerName: "Davis",
      customerPhone: "(555) 234-5678",
      amount: 320,
      status: "overdue",
      daysOverdue: 7,
      jobDescription: "Water heater replacement",
      reviewRequestSent: false,
      reviewStatus: null
    },
    {
      id: 3,
      customerName: "Smith",
      customerPhone: "(555) 345-6789",
      amount: 275,
      status: "due",
      daysDue: 2,
      jobDescription: "Bathroom plumbing",
      riskLevel: "high",
      notifications: [
        { type: "auto", sent: "2025-08-06", message: "Early reminder sent (customer typically pays 3-5 days late)" }
      ],
      reviewRequestSent: false,
      reviewStatus: null
    },
    {
      id: 4,
      customerName: "Brown",
      customerPhone: "(555) 456-7890",
      amount: 185,
      status: "due",
      daysDue: 5,
      jobDescription: "Pipe leak repair",
      riskLevel: "high",
      notifications: [
        { type: "auto", sent: "2025-08-05", message: "Proactive reminder sent (history of late payments)" }
      ],
      reviewRequestSent: false,
      reviewStatus: null
    },
    {
      id: 5,
      customerName: "Miller",
      customerPhone: "(555) 567-8901",
      amount: 95,
      status: "due",
      daysDue: 1,
      jobDescription: "Faucet replacement",
      reviewRequestSent: false,
      reviewStatus: null
    },
    {
      id: 6,
      customerName: "Williams",
      customerPhone: "(555) 678-9012",
      amount: 120,
      status: "paid",
      paidDate: "Today",
      jobDescription: "Toilet installation",
      reviewRequestSent: false,
      reviewStatus: null
    },
    {
      id: 7,
      customerName: "Wilson",
      customerPhone: "(555) 789-0123",
      amount: 450,
      status: "paid",
      paidDate: "Yesterday",
      jobDescription: "Full bathroom renovation",
      reviewRequestSent: true,
      reviewStatus: "pending",
      reviewRequestDate: "2024-12-06"
    },
    {
      id: 8,
      customerName: "Garcia",
      customerPhone: "(555) 890-1234",
      amount: 85,
      status: "paid",
      paidDate: "2 days ago",
      jobDescription: "Garbage disposal fix",
      reviewRequestSent: false,
      reviewStatus: null
    },
    {
      id: 9,
      customerName: "Martinez",
      customerPhone: "(555) 901-2345",
      amount: 225,
      status: "paid",
      paidDate: "3 days ago",
      jobDescription: "Shower installation",
      reviewRequestSent: true,
      reviewStatus: "completed",
      reviewRequestDate: "2024-12-04",
      reviewRating: 4.5
    }
  ]);

  const handleMessageSent = (invoiceId, messageType, phoneNumber) => {
    setInvoices(prevInvoices => 
      prevInvoices.map(invoice => {
        if (invoice.id === invoiceId) {
          const updatedInvoice = { ...invoice };
          const today = new Date().toISOString().split('T')[0];
          
          if (messageType === 'payment-reminder') {
            // Add to notifications array
            if (!updatedInvoice.notifications) {
              updatedInvoice.notifications = [];
            }
            updatedInvoice.notifications.push({
              type: "manual",
              sent: today,
              message: "Payment reminder sent via text"
            });
            // Update phone number if changed
            updatedInvoice.customerPhone = phoneNumber;
          } else if (messageType === 'review-request') {
            updatedInvoice.reviewRequestSent = true;
            updatedInvoice.reviewStatus = "pending";
            updatedInvoice.reviewRequestDate = today;
            updatedInvoice.customerPhone = phoneNumber;
          }
          
          return updatedInvoice;
        }
        return invoice;
      })
    );
  };

  // Sample invoice data - in real app this would come from an API/database
  const invoicesOld = [
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
      customerName: "Davis",
      amount: 320,
      status: "overdue",
      daysOverdue: 7,
      jobDescription: "Water heater replacement"
    },
    {
      id: 3,
      customerName: "Smith",
      amount: 275,
      status: "due",
      daysDue: 2,
      jobDescription: "Bathroom plumbing",
      riskLevel: "high",
      notifications: [
        { type: "auto", sent: "2025-08-06", message: "Early reminder sent (customer typically pays 3-5 days late)" }
      ]
    },
    {
      id: 4,
      customerName: "Brown",
      amount: 185,
      status: "due",
      daysDue: 5,
      jobDescription: "Pipe leak repair",
      riskLevel: "high",
      notifications: [
        { type: "auto", sent: "2025-08-05", message: "Proactive reminder sent (history of late payments)" }
      ]
    },
    {
      id: 5,
      customerName: "Miller",
      amount: 95,
      status: "due",
      daysDue: 1,
      jobDescription: "Faucet replacement"
    },
    {
      id: 6,
      customerName: "Williams",
      amount: 120,
      status: "paid",
      paidDate: "Today",
      jobDescription: "Toilet installation"
    },
    {
      id: 7,
      customerName: "Wilson",
      amount: 450,
      status: "paid",
      paidDate: "Yesterday",
      jobDescription: "Full bathroom renovation"
    },
    {
      id: 8,
      customerName: "Garcia",
      amount: 85,
      status: "paid",
      paidDate: "2 days ago",
      jobDescription: "Garbage disposal fix"
    },
    {
      id: 9,
      customerName: "Martinez",
      amount: 225,
      status: "paid",
      paidDate: "3 days ago",
      jobDescription: "Shower installation"
    }
  ];

  // Function to get status styling based on invoice status
  const getStatusStyle = (invoice) => {
    switch (invoice.status) {
      case 'overdue':
        return {
          border: 'border-l-4 border-red-500',
          bg: 'bg-red-50',
          text: 'text-gray-700',
          label: `${invoice.daysOverdue} days overdue`,
          riskLabel: invoice.riskLevel === 'high' ? 'Late often' : null
        };
      case 'due':
        return {
          border: 'border-l-4 border-amber-500',
          bg: 'bg-amber-50',
          text: 'text-gray-700',
          label: `Due in ${invoice.daysDue} days`,
          riskLabel: invoice.riskLevel === 'high' ? 'Late often' : null
        };
      case 'paid':
        return {
          border: 'border-l-4 border-green-500',
          bg: 'bg-green-50',
          text: 'text-gray-700',
          label: `Paid ${invoice.paidDate}`,
          riskLabel: null
        };
      default:
        return {
          border: 'border-l-4 border-gray-500',
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          label: 'Unknown',
          riskLabel: null
        };
    }
  };

  // Function to calculate days since last notification
  const getDaysSinceNotification = (notifications) => {
    if (!notifications || notifications.length === 0) return null;
    
    const lastNotification = notifications[notifications.length - 1];
    const lastSent = new Date(lastNotification.sent);
    const today = new Date('2025-08-08'); // Using current date
    const diffTime = Math.abs(today - lastSent);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Function to calculate days since review request was sent
  const getDaysSinceReviewRequest = (reviewRequestDate) => {
    if (!reviewRequestDate) return null;
    
    const requestSent = new Date(reviewRequestDate);
    const today = new Date('2025-08-08'); // Using current date
    const diffTime = Math.abs(today - requestSent);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Calculate totals for each status
  const calculateTotals = () => {
    const overdue = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);
    const dueSoon = invoices.filter(inv => inv.status === 'due').reduce((sum, inv) => sum + inv.amount, 0);
    const paid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
    
    return { overdue, dueSoon, paid };
  };

  const totals = calculateTotals();

  // Sort invoices - overdue by most overdue first, then by status
  const sortedInvoices = [...invoices].sort((a, b) => {
    // First, sort by status priority: overdue > due > paid
    const statusOrder = { 'overdue': 0, 'due': 1, 'paid': 2 };
    const statusDiff = statusOrder[a.status] - statusOrder[b.status];
    
    if (statusDiff !== 0) return statusDiff;
    
    // Within overdue invoices, sort by most overdue first (highest daysOverdue)
    if (a.status === 'overdue' && b.status === 'overdue') {
      return b.daysOverdue - a.daysOverdue;
    }
    
    // Within due invoices, sort by due date (lowest daysDue first - most urgent)
    if (a.status === 'due' && b.status === 'due') {
      return a.daysDue - b.daysDue;
    }
    
    // Within paid invoices, prioritize those that can have review requests sent
    if (a.status === 'paid' && b.status === 'paid') {
      // Priority order: no review request sent > pending review > completed review
      const getReviewPriority = (invoice) => {
        if (!invoice.reviewRequestSent) return 0; // Highest priority - can ask for review
        if (invoice.reviewStatus === 'pending') return 1; // Medium priority - pending
        if (invoice.reviewStatus === 'completed') return 2; // Lowest priority - completed
        return 1; // Default to pending priority
      };
      
      return getReviewPriority(a) - getReviewPriority(b);
    }
    
    return 0;
  });

  // Show Analytics page if requested
  if (showAnalytics) {
    return <Analytics onBack={() => setShowAnalytics(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-[390px] mx-auto">
      {/* Navigation Header */}
      <header className="bg-gradient-to-r from-teal-700 to-teal-800 px-4 py-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">PayMe</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAnalytics(true)}
            className="p-2 text-white hover:bg-teal-600 rounded transition-colors"
            title="View Analytics"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
            </svg>
          </button>
          <div className="w-8 h-8 bg-teal-700 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Summary Stats */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Invoice Status</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-lg shadow-sm text-center border-l-4 border-red-500">
              <div className="text-2xl font-bold text-gray-900">2</div>
              <div className="text-xs text-gray-600 mb-1">Overdue</div>
              <div className="text-sm font-semibold text-gray-900">${totals.overdue.toLocaleString()}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-center border-l-4 border-amber-500">
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-xs text-gray-600 mb-1">Due Soon</div>
              <div className="text-sm font-semibold text-gray-900">${totals.dueSoon.toLocaleString()}</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm text-center border-l-4 border-green-500">
              <div className="text-2xl font-bold text-gray-900">4</div>
              <div className="text-xs text-gray-600 mb-1">Paid</div>
              <div className="text-sm font-semibold text-gray-900">${totals.paid.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Invoice List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Recent Invoices ({sortedInvoices.length})</h3>
          
          {sortedInvoices.map((invoice) => {
            const statusStyle = getStatusStyle(invoice);
            const daysSinceNotification = getDaysSinceNotification(invoice.notifications);
            const daysSinceReviewRequest = getDaysSinceReviewRequest(invoice.reviewRequestDate);
            
            return (
              <div key={invoice.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{invoice.customerName}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{invoice.jobDescription}</p>
                    <p className="text-lg font-bold text-gray-900">${invoice.amount}</p>
                    {/* Star Rating Display */}
                    {invoice.reviewRating && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => {
                            const starValue = i + 1;
                            const isFilled = starValue <= Math.floor(invoice.reviewRating);
                            const isHalf = !isFilled && starValue - 0.5 <= invoice.reviewRating;
                            
                            return (
                              <svg key={i} className="w-3 h-3 text-teal-600" fill={isFilled || isHalf ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                {isHalf ? (
                                  <defs>
                                    <linearGradient id={`half-${invoice.id}-${i}`}>
                                      <stop offset="50%" stopColor="currentColor" />
                                      <stop offset="50%" stopColor="transparent" />
                                    </linearGradient>
                                  </defs>
                                ) : null}
                                <path 
                                  fill={isHalf ? `url(#half-${invoice.id}-${i})` : (isFilled ? "currentColor" : "none")}
                                  stroke="currentColor" 
                                  strokeWidth={1.5} 
                                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" 
                                />
                              </svg>
                            );
                          })}
                        </div>
                        <span className="text-xs text-gray-600 ml-1">{invoice.reviewRating}/5</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className={`px-3 py-1 rounded text-xs font-medium w-32 text-left ${statusStyle.border} ${statusStyle.bg} ${statusStyle.text}`}>
                      <div>{statusStyle.label}</div>
                      {statusStyle.riskLabel && (
                        <div className="mt-0.5 text-red-600 font-medium">{statusStyle.riskLabel}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Notification History - Full Width */}
                {invoice.notifications && invoice.notifications.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                      </svg>
                      <span>Auto reminder sent {daysSinceNotification} days ago</span>
                    </p>
                    {/* Educational Link for Late Risk customers */}
                    {invoice.riskLevel === 'high' && (
                      <button
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setIsRiskModalOpen(true);
                        }}
                        className="text-xs text-teal-700 hover:text-teal-800 ml-5 mt-1 block"
                        title="Learn payment collection strategies"
                      >
                        How to avoid late payments
                      </button>
                    )}
                  </div>
                )}

                {/* Review Request History - Full Width (only show for pending reviews, not completed) */}
                {invoice.reviewRequestSent && daysSinceReviewRequest && invoice.reviewStatus !== 'completed' && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                      </svg>
                      <span>Review request sent {daysSinceReviewRequest} days ago</span>
                    </p>
                  </div>
                )}
                
                {/* Action Button - Different based on invoice status and review status */}
                {invoice.status === 'paid' ? (
                  // Paid invoices - show review request buttons
                  invoice.reviewRequestSent ? (
                    invoice.reviewStatus === 'completed' ? null : null // No action button for completed or pending review requests
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleSendMessage(invoice, 'review-request')}
                        className="flex-1 flex flex-col items-center justify-center gap-1 bg-teal-700 hover:bg-teal-800 focus:bg-teal-800 text-white px-4 py-2 rounded-lg min-h-10 transition-colors"
                      >
                        <StarIcon className="w-4 h-4" />
                        <span className="text-xs font-medium">Ask for Review</span>
                      </button>
                      <button 
                        onClick={() => handleSendMessage(invoice, 'follow-up')}
                        className="flex-1 flex flex-col items-center justify-center gap-1 bg-transparent hover:bg-teal-50 focus:bg-teal-50 text-teal-700 hover:text-teal-800 border border-teal-700 hover:border-teal-800 px-4 py-2 rounded-lg min-h-10 transition-colors"
                      >
                        <ChatBubbleLeftRightIcon className="w-4 h-4" />
                        <span className="text-xs font-medium">Follow Up</span>
                      </button>
                    </div>
                  )
                ) : (
                  // Unpaid invoices - show payment reminder buttons and mark paid
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleSendMessage(invoice, 'payment-reminder')}
                      className="flex-1 flex flex-col items-center justify-center gap-1 bg-teal-700 hover:bg-teal-800 focus:bg-teal-800 text-white px-4 py-2 rounded-lg min-h-10 transition-colors"
                    >
                      <ChatBubbleLeftRightIcon className="w-4 h-4" />
                      <span className="text-xs font-medium text-center">
                        Remind
                      </span>
                    </button>
                    <button 
                      onClick={() => handleMarkPaid(invoice.id)}
                      className="flex-1 flex flex-col items-center justify-center gap-1 bg-transparent hover:bg-teal-50 focus:bg-teal-50 text-teal-700 hover:text-teal-800 border border-teal-700 hover:border-teal-800 px-4 py-2 rounded-lg min-h-10 transition-colors"
                      title="Mark as Paid"
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      <span className="text-xs font-medium">Mark Paid</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Risk Action Plan Modal */}
      <RiskActionPlan 
        invoice={selectedInvoice}
        isOpen={isRiskModalOpen}
        onClose={() => {
          setIsRiskModalOpen(false);
          setSelectedInvoice(null);
        }}
      />

      {/* Message Composer Modal */}
      <MessageComposer
        invoice={messageModal.invoice}
        messageType={messageModal.messageType}
        isOpen={messageModal.isOpen}
        onClose={closeMessageModal}
        onSent={handleMessageSent}
      />
    </div>
  );
};

export default Dashboard;
