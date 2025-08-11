import React, { useState } from 'react';

const Analytics = ({ onBack }) => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const handleActionClick = () => {
    setShowDisclaimer(true);
    setTimeout(() => setShowDisclaimer(false), 3000);
  };

  // Mock data for key metrics (August 2024)
  const keyMetrics = {
    onTimePayments: 72, // percentage
    avgDaysToPayment: 4.2,
    reviewRate: 85, // percentage
    lastMonthOnTime: 68,
    lastMonthAvgDays: 5.1,
    lastMonthReview: 78
  };

  // Calculate changes from last month
  const onTimeChange = {
    change: keyMetrics.onTimePayments - keyMetrics.lastMonthOnTime,
    isPositive: keyMetrics.onTimePayments > keyMetrics.lastMonthOnTime
  };

  const avgDaysChange = {
    change: Math.round(Math.abs(keyMetrics.avgDaysToPayment - keyMetrics.lastMonthAvgDays) * 10) / 10, // Round to 1 decimal
    isPositive: keyMetrics.avgDaysToPayment < keyMetrics.lastMonthAvgDays // Lower days is positive
  };

  const reviewChange = {
    change: keyMetrics.reviewRate - keyMetrics.lastMonthReview,
    isPositive: keyMetrics.reviewRate > keyMetrics.lastMonthReview
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
      actionText: "Customize Messages",
      actionIcon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      )
    },
    {
      icon: (
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      title: "Early reminders are gold",
      description: "Customers who get reminders 2 days before due pay on time 85% more often",
      actionText: "Set Auto-Reminders",
      actionIcon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      icon: (
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      ),
      title: "Reviews are improving",
      description: "Your review rate jumped from 78% to 85% since using review requests",
      actionText: "Auto-Request Reviews",
      actionIcon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      )
    },
    {
      icon: (
        <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5a2.25 2.25 0 0 1 21 9v7.5m-9-6h.008v.008H12V15.75Z" />
        </svg>
      ),
      title: "December pattern detected",
      description: "Holiday season payments average 2.3 days slower - plan accordingly",
      actionText: "Set Holiday Schedule",
      actionIcon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 0121 9v7.5m-9-6h.008v.008H12V15.75z" />
        </svg>
      )
    }
  ];

  // 6-month data for charts
  const monthlyData = [
    { month: 'Mar', onTime: 65, late: 35, avgDays: 5.8 },
    { month: 'Apr', onTime: 68, late: 32, avgDays: 5.2 },
    { month: 'May', onTime: 71, late: 29, avgDays: 4.9 },
    { month: 'Jun', onTime: 69, late: 31, avgDays: 5.1 },
    { month: 'Jul', onTime: 68, late: 32, avgDays: 5.1 },
    { month: 'Aug', onTime: 72, late: 28, avgDays: 4.2 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 max-w-[390px] mx-auto">
      {/* Header */}
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

      <main className="p-4">
        {/* Key Metrics */}
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
              <div className={`text-xs flex items-center mt-1 ${avgDaysChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <svg className={`w-3 h-3 mr-1 ${avgDaysChange.isPositive ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {avgDaysChange.change}d vs July
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-gray-900">{keyMetrics.reviewRate}%</div>
              <div className="text-sm text-gray-600">Review Rate</div>
              <div className={`text-xs flex items-center mt-1 ${reviewChange.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                <svg className={`w-3 h-3 mr-1 ${reviewChange.isPositive ? '' : 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                {reviewChange.change}% vs July
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
                    <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                    <button
                      onClick={handleActionClick}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-teal-700 border border-teal-700/40 rounded-lg hover:bg-teal-50 hover:border-opacity-30 transition-colors"
                    >
                      {insight.actionIcon}
                      {insight.actionText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer Toast */}
        {showDisclaimer && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50">
            <p className="text-sm">Proof of concept...in research and design</p>
          </div>
        )}

        {/* 6-Month Trends */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">6-Month Trends</h2>
          
          {/* Payment Performance Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Payment Performance</h3>
            <div className="space-y-2">
              {monthlyData.map((month) => (
                <div key={month.month} className="flex items-center gap-2">
                  <span className="w-8 text-xs text-gray-600">{month.month}</span>
                  <div className="flex-1 flex bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-teal-600 h-full"
                      style={{ width: `${month.onTime}%` }}
                    ></div>
                    <div 
                      className="h-full bg-orange-400 relative"
                      style={{ 
                        width: `${month.late}%`,
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.7) 2px, rgba(255,255,255,0.7) 4px)'
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
                  className="w-3 h-3 bg-orange-400 rounded relative"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, rgba(255,255,255,0.7) 1px, rgba(255,255,255,0.7) 2px)'
                  }}
                ></div>
                <span className="text-gray-600">Late</span>
              </div>
            </div>
          </div>

          {/* Average Days to Payment Line Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Average Days to Payment</h3>
            <div className="relative h-32 mb-4">
              <svg width="100%" height="128" viewBox="0 0 320 128" className="overflow-visible">
                {/* Grid lines and Y-axis labels */}
                {[0, 2, 4, 6].map((value) => {
                  const yPos = 128 - 16 - (value / 6) * 96; // 16px bottom margin, 96px chart height
                  return (
                    <g key={value}>
                      <line
                        x1="40"
                        y1={yPos}
                        x2="320"
                        y2={yPos}
                        stroke="#e5e7eb"
                        strokeWidth="1"
                      />
                      <text
                        x="35"
                        y={yPos + 4}
                        fontSize="10"
                        fill="#6b7280"
                        textAnchor="end"
                      >
                        {value}d
                      </text>
                    </g>
                  );
                })}
                
                {/* Line chart */}
                <polyline
                  fill="none"
                  stroke="#0f766e"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={monthlyData.map((month, index) => {
                    const x = 40 + (index / (monthlyData.length - 1)) * 280; // 40px left margin, 280px chart width
                    const y = 128 - 16 - (month.avgDays / 6) * 96; // Same calculation as grid
                    return `${x},${y}`;
                  }).join(' ')}
                />
                
                {/* Data points */}
                {monthlyData.map((month, index) => {
                  const x = 40 + (index / (monthlyData.length - 1)) * 280;
                  const y = 128 - 16 - (month.avgDays / 6) * 96;
                  return (
                    <circle
                      key={month.month}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#0f766e"
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                })}
                
                {/* X-axis labels */}
                {monthlyData.map((month, index) => {
                  const x = 40 + (index / (monthlyData.length - 1)) * 280;
                  return (
                    <text
                      key={month.month}
                      x={x}
                      y={128 - 4}
                      fontSize="10"
                      fill="#6b7280"
                      textAnchor="middle"
                    >
                      {month.month}
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
