import React from 'react';

const Analytics = ({ onBack }) => {
  // Mock data for key metrics (August 2024)
  const keyMetrics = {
    onTimePayments: 72, // percentage
    avgDaysToPayment: 4.2,
    followUpRate: 85, // percentage
    lastMonthOnTime: 68,
    lastMonthAvgDays: 5.1,
    lastMonthFollowUp: 78
  };

  // Smart insights based on Mike's business patterns
  const insights = [
    {
      icon: (
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
      ),
      title: "Friendly messages work better",
      description: "Your casual reminders get paid 40% faster than formal ones",
      action: "Keep using a personal, friendly tone"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      title: "Early reminders are gold",
      description: "Customers who get reminders 2 days before due pay on time 85% more often",
      action: "Send proactive reminders for high-risk customers"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      ),
      title: "Follow-ups are improving",
      description: "Your follow-up rate jumped from 78% to 85% since using review requests",
      action: "Continue requesting reviews for completed jobs"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5a2.25 2.25 0 0 1 21 9v7.5m-9-6h.008v.008H12V15.75Z" />
        </svg>
      ),
      title: "December pattern detected",
      description: "Holiday season payments average 2.3 days slower - plan accordingly",
      action: "Send December reminders 4-5 days early"
    }
  ];

  // Mock data for charts (last 6 months) - most recent first
  const monthlyData = [
    { month: 'Aug', onTime: 72, late: 28, avgDays: 4.2 },
    { month: 'Jul', onTime: 68, late: 32, avgDays: 5.1 },
    { month: 'Jun', onTime: 72, late: 28, avgDays: 4.6 },
    { month: 'May', onTime: 70, late: 30, avgDays: 4.9 },
    { month: 'Apr', onTime: 68, late: 32, avgDays: 5.2 },
    { month: 'Mar', onTime: 65, late: 35, avgDays: 5.8 }
  ];

  const getMetricChange = (current, previous) => {
    const change = ((current - previous) / previous * 100).toFixed(1);
    const isPositive = current > previous;
    return { change, isPositive };
  };

  const onTimeChange = getMetricChange(keyMetrics.onTimePayments, keyMetrics.lastMonthOnTime);
  const avgDaysChange = getMetricChange(keyMetrics.avgDaysToPayment, keyMetrics.lastMonthAvgDays);
  const followUpChange = getMetricChange(keyMetrics.followUpRate, keyMetrics.lastMonthFollowUp);

  return (
    <div className="min-h-screen bg-gray-50 max-w-[390px] mx-auto">
      {/* Navigation Header */}
      <header className="bg-gradient-to-r from-teal-700 to-teal-800 px-4 py-4 flex items-center">
        <button 
          onClick={onBack}
          className="mr-3 p-1 text-white hover:bg-teal-600 rounded transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-white text-xl font-semibold">Analytics</h1>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {/* Key Metrics This Month */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">August Performance</h2>
          <div className="grid grid-cols-1 gap-3 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{keyMetrics.onTimePayments}%</div>
              <div className="text-sm text-gray-600">On-Time Payment Rate</div>
              <div className={`text-xs flex items-center mt-1 ${onTimeChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <svg className={`w-3 h-3 mr-1 ${onTimeChange.isPositive ? '' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {onTimeChange.change}% vs July
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{keyMetrics.avgDaysToPayment}</div>
              <div className="text-sm text-gray-600">Avg Days to Payment</div>
              <div className={`text-xs flex items-center mt-1 ${!avgDaysChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <svg className={`w-3 h-3 mr-1 ${!avgDaysChange.isPositive ? '' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {Math.abs(avgDaysChange.change)}% vs July
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{keyMetrics.followUpRate}%</div>
              <div className="text-sm text-gray-600">Follow-up Rate</div>
              <div className={`text-xs flex items-center mt-1 ${followUpChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <svg className={`w-3 h-3 mr-1 ${followUpChange.isPositive ? '' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {followUpChange.change}% vs July
              </div>
            </div>
          </div>
        </div>

        {/* Smart Insights */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Smart Insights</h2>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-500">
                <div className="flex items-start gap-3">
                  {insight.icon}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    <p className="text-xs text-teal-700 font-medium">{insight.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Charts */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">6-Month Trends</h2>
          
          {/* On-Time vs Late Payments Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Performance</h3>
            <div className="space-y-2">
              {monthlyData.map((month) => (
                <div key={month.month} className="flex items-center gap-2">
                  <span className="w-8 text-xs text-gray-600">{month.month}</span>
                  <div className="flex-1 flex bg-gray-200 rounded-full h-3 overflow-hidden">
                    {/* On-time payments - solid teal */}
                    <div 
                      className="bg-teal-600 h-full"
                      style={{ width: `${month.onTime}%` }}
                    ></div>
                    {/* Late payments - striped gray pattern */}
                    <div 
                      className="h-full bg-gray-400 relative"
                      style={{ 
                        width: `${month.late}%`,
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)'
                      }}
                    ></div>
                  </div>
                  <span className="w-12 text-xs text-gray-600">{month.onTime}%</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-teal-600 rounded"></div>
                <span className="text-gray-600">On-time</span>
              </div>
              <div className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 bg-gray-400 rounded relative"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.3) 1px, rgba(255,255,255,0.3) 2px)'
                  }}
                ></div>
                <span className="text-gray-600">Late</span>
              </div>
            </div>
          </div>

          {/* Average Days to Payment Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Average Days to Payment</h3>
            <div className="space-y-2">
              {monthlyData.map((month) => (
                <div key={month.month} className="flex items-center gap-2">
                  <span className="w-8 text-xs text-gray-600">{month.month}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                    {/* Better performance (lower days) - solid teal */}
                    {month.avgDays <= 4.5 ? (
                      <div 
                        className="bg-teal-600 h-full rounded-full"
                        style={{ width: `${(month.avgDays / 7) * 100}%` }}
                      ></div>
                    ) : (
                      /* Higher days - striped gray pattern */
                      <div 
                        className="bg-gray-400 h-full rounded-full relative"
                        style={{ 
                          width: `${(month.avgDays / 7) * 100}%`,
                          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.3) 1px, rgba(255,255,255,0.3) 2px)'
                        }}
                      ></div>
                    )}
                  </div>
                  <span className="w-12 text-xs text-gray-600">{month.avgDays}d</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-teal-600 rounded"></div>
                <span className="text-gray-600">Good (≤4.5 days)</span>
              </div>
              <div className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 bg-gray-400 rounded relative"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.3) 1px, rgba(255,255,255,0.3) 2px)'
                  }}
                ></div>
                <span className="text-gray-600">Slower (>4.5 days)</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
