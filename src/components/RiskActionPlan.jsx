import React from 'react';

// Utility function to get customer display name from first and last name
const getCustomerDisplayName = (firstName, lastName) => {
  if (!firstName && !lastName) return '';
  if (!firstName) return lastName;
  if (!lastName) return firstName;
  const firstInitial = firstName.charAt(0).toUpperCase();
  return `${firstInitial}. ${lastName}`;
};

const RiskActionPlan = ({ invoice, isOpen, onClose }) => {
  if (!isOpen || !invoice) return null;

  // Sample risk analysis data - in real app this would come from AI/ML analysis
  const getRiskAnalysis = (invoice) => {
    // Different risk profiles for our sample customers
    const riskProfiles = {
      'Smith': {
        riskFactors: [
          'Typically pays 3-5 days late based on payment history',
          'Average payment delay: 4.2 days over last 6 months',
          'Has been late on 60% of previous invoices'
        ],
        automatedActions: [
          { status: 'completed', action: 'Early reminder sent 2 days ago', date: 'Aug 6' },
          { status: 'scheduled', action: 'Follow-up reminder if not paid by due date', date: 'Aug 10' },
          { status: 'planned', action: 'Phone call escalation if 2+ days overdue', date: 'Aug 12' }
        ],
        recommendations: [
          'Consider requesting 50% upfront payment for future jobs',
          'Add 2% late fee clause to next contract',
          'Clearly communicate payment terms during job scheduling',
          'Send payment reminder with invoice details 1 day before due date',
          'Schedule payment discussion at job completion'
        ]
      },
      'Brown': {
        riskFactors: [
          'History shows pattern of late payments',
          'Previous invoices over $150 often delayed',
          'Tends to pay 2-7 days after due date'
        ],
        automatedActions: [
          { status: 'completed', action: 'Proactive reminder sent 3 days ago', date: 'Aug 5' },
          { status: 'scheduled', action: 'Second reminder 1 day before due date', date: 'Aug 12' },
          { status: 'planned', action: 'Text + email combo if overdue', date: 'Aug 14' }
        ],
        recommendations: [
          'Offer 2% discount for payment within 24 hours',
          'Set up automatic payment plan for repeat customer',
          'Send clear payment terms confirmation before starting work',
          'Include expected payment date in job completion text',
          'Consider shorter payment terms (15 days vs 30)'
        ]
      }
    };

    return riskProfiles[invoice.customerLastName] || riskProfiles['Smith'];
  };

  const riskData = getRiskAnalysis(invoice);

  return (
    <div className="fixed inset-0 z-50 flex items-start">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white shadow-xl w-full max-w-[390px] mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="bg-teal-700 px-4 py-4 text-white flex-shrink-0">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Insights & Tips</h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-teal-600 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-teal-100 font-semibold">{getCustomerDisplayName(invoice.customerFirstName, invoice.customerLastName)}</span>
            <span className="text-white font-semibold">${invoice.amount}</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          
          {/* Risk Factors Section */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Analysis: Why This Payment May Be Late
            </h3>
            <ul className="space-y-2">
              {riskData.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-gray-400 leading-5">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Automated Actions Section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Actions Taken
            </h3>
            <div className="relative">
              {riskData.automatedActions.map((action, index) => (
                <div key={index} className="relative flex items-start gap-4 pb-4">
                  {/* Subway Line */}
                  {index < riskData.automatedActions.length - 1 && (
                    <div className="absolute left-3 top-6 w-0.5 h-8 bg-teal-200"></div>
                  )}
                  
                  {/* Station Circle */}
                  <div className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    action.status === 'completed' 
                      ? 'bg-teal-600 border-teal-600' 
                      : 'bg-white border-teal-300'
                  }`}>
                    {action.status === 'completed' && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Action Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium">{action.action}</p>
                    <p className="text-xs text-gray-500">{action.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Next Steps
            </h3>
            <ul className="space-y-2">
              {riskData.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-gray-400 leading-5">•</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskActionPlan;
