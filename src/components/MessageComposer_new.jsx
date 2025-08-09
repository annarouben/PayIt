import React, { useState } from 'react';

const MessageComposer = ({ invoice, messageType, isOpen, onClose, onSent }) => {
  const [phoneNumber, setPhoneNumber] = useState(invoice?.customerPhone || '');
  const [customMessage, setCustomMessage] = useState('');
  const [useCustomMessage, setUseCustomMessage] = useState(false);

  if (!isOpen || !invoice) return null;

  // Message templates
  const getMessageTemplate = () => {
    switch (messageType) {
      case 'payment-reminder':
        if (invoice.notifications && invoice.notifications.length > 0) {
          return `Hi ${invoice.customerName}, following up on your invoice for ${invoice.jobDescription} ($${invoice.amount}) which is ${invoice.status === 'overdue' ? `${invoice.daysOverdue} days overdue` : `due in ${invoice.daysDue} days`}. Please let me know if you have any questions. Thanks!`;
        }
        return `Hi ${invoice.customerName}, friendly reminder that your invoice for ${invoice.jobDescription} ($${invoice.amount}) is ${invoice.status === 'overdue' ? `${invoice.daysOverdue} days overdue` : `due in ${invoice.daysDue} days`}. Thanks!`;
      
      case 'review-request':
        return `Hi ${invoice.customerName}, thanks for your payment on the ${invoice.jobDescription}! Would you mind leaving a quick Google review? It really helps our business: https://g.page/r/your-business-review-link Thanks!`;
      
      default:
        return '';
    }
  };

  const getModalTitle = () => {
    switch (messageType) {
      case 'payment-reminder':
        return invoice.notifications && invoice.notifications.length > 0 ? 'Send Follow-up Text' : 'Send Payment Reminder';
      case 'review-request':
        return 'Request Customer Review';
      default:
        return 'Send Message';
    }
  };

  const getModalIcon = () => {
    if (messageType === 'review-request') {
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
      );
    }
    // Chat bubble icon for payment reminders
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    );
  };

  // Handle checkbox change - populate custom message with template when enabled
  const handleCustomMessageToggle = (checked) => {
    setUseCustomMessage(checked);
    if (checked && !customMessage) {
      setCustomMessage(getMessageTemplate());
    }
  };

  const handleSendMessage = () => {
    const message = useCustomMessage ? customMessage : getMessageTemplate();
    const cleanPhoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digits
    
    // Open native SMS app with pre-filled message
    const smsUrl = `sms:${cleanPhoneNumber}?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
    
    // Call the onSent callback to update the invoice state
    if (onSent) {
      onSent(invoice.id, messageType, phoneNumber);
    }
    
    onClose();
  };

  const currentMessage = useCustomMessage ? customMessage : getMessageTemplate();
  const messageLength = currentMessage.length;
  const isMessageTooLong = messageLength > 1600; // SMS limit with some buffer

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
            <div className="flex items-center gap-2">
              {getModalIcon()}
              <h2 className="text-lg font-semibold">{getModalTitle()}</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-teal-600 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-2 text-teal-100">
            <span className="text-sm">{invoice.customerName}</span>
            <span className="text-white font-semibold">${invoice.amount}</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          
          {/* Phone Number Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Customer Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent"
              autoFocus
              required
            />
          </div>

          {/* Message Preview/Editor */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Message Preview
            </label>
            {useCustomMessage ? (
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-transparent resize-none"
                placeholder="Enter your custom message..."
              />
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 min-h-32">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{getMessageTemplate()}</p>
              </div>
            )}
            
            {/* Character Count and Checkbox Row */}
            <div className="mt-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="customMessage"
                  checked={useCustomMessage}
                  onChange={(e) => handleCustomMessageToggle(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-teal-600 focus:ring-teal-500 focus:ring-2 checked:bg-teal-600 checked:border-teal-600"
                />
                <label htmlFor="customMessage" className="text-sm font-medium text-gray-900">
                  Customize message
                </label>
              </div>
              <span className={`text-xs ${isMessageTooLong ? 'text-red-500' : 'text-gray-500'}`}>
                {messageLength} characters
                {isMessageTooLong && ' (message too long)'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex-shrink-0 px-4 pb-4 pt-2 border-t border-gray-200">
          {/* Info Message */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
              <div>
                <p className="text-sm text-gray-700">
                  This will open your phone's messaging app with the message pre-filled. You can review and edit before sending.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!phoneNumber.trim() || isMessageTooLong}
              className="flex-1 bg-teal-700 hover:bg-teal-800 disabled:bg-gray-300 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              Send Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;
