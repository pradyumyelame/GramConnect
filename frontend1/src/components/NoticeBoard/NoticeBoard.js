import React from 'react';
import { Calendar, MapPin, User, Megaphone, AlertTriangle, Info, MessageCircle } from 'lucide-react';
import './NoticeBoard.css';

const NoticeBoard = () => {
  const notices = [
    {
      id: 1,
      title: 'Village Development Meeting',
      content: 'Monthly village development meeting scheduled for discussion of new road construction project and water supply improvements.',
      date: '2024-01-15',
      author: 'Sarpanch Office',
      type: 'meeting',
      priority: 'high',
      location: 'Village Community Hall'
    },
    {
      id: 2,
      title: 'PM-KISAN Scheme Registration',
      content: 'Last date for PM-KISAN scheme registration is approaching. Farmers are requested to complete their applications with required documents.',
      date: '2024-01-12',
      author: 'Agriculture Department',
      type: 'scheme',
      priority: 'medium',
      location: 'Grampanchayat Office'
    },
    {
      id: 3,
      title: 'Water Supply Maintenance',
      content: 'Water supply will be interrupted tomorrow from 10 AM to 4 PM for pipeline maintenance work in sectors 2 and 3.',
      date: '2024-01-10',
      author: 'Public Works Department',
      type: 'alert',
      priority: 'high',
      location: 'Sectors 2 & 3'
    },
    {
      id: 4,
      title: 'Health Camp Announcement',
      content: 'Free health checkup camp organized by District Health Department. Blood pressure, diabetes screening, and basic health consultation available.',
      date: '2024-01-08',
      author: 'Health Department',
      type: 'health',
      priority: 'medium',
      location: 'Primary Health Center'
    }
  ];

  const getNoticeIcon = (type) => {
    switch (type) {
      case 'meeting': return <User className="notice-icon" />;
      case 'scheme': return <Info className="notice-icon" />;
      case 'alert': return <AlertTriangle className="notice-icon" />;
      case 'health': return <Megaphone className="notice-icon" />;
      default: return <Info className="notice-icon" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  return (
    <div className="noticeboard-container">
      {/* Header would go here */}
      
      <main className="noticeboard-main">
        <div className="noticeboard-header">
          <h1 className="noticeboard-title">
            Notice Board
          </h1>
          <p className="noticeboard-subtitle">
            Stay updated with latest announcements and important information
          </p>
        </div>

        <div className="notices-grid">
          {notices.map((notice) => (
            <div key={notice.id} className="notice-card">
              <div className="notice-card-header">
                <div className="notice-header-content">
                  <div className="notice-icon-section">
                    <div className="notice-icon-wrapper">
                      {getNoticeIcon(notice.type)}
                    </div>
                    <div className="notice-title-section">
                      <h3 className="notice-title">{notice.title}</h3>
                      <div className="notice-meta">
                        <div className="notice-meta-item">
                          <Calendar className="meta-icon" />
                          {new Date(notice.date).toLocaleDateString()}
                        </div>
                        <div className="notice-meta-item">
                          <User className="meta-icon" />
                          {notice.author}
                        </div>
                        <div className="notice-meta-item">
                          <MapPin className="meta-icon" />
                          {notice.location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="notice-actions">
                    <span className={`priority-badge ${getPriorityColor(notice.priority)}`}>
                      {notice.priority.toUpperCase()}
                    </span>
                    <button className="whatsapp-share">
                      <MessageCircle className="share-icon" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="notice-card-content">
                <p className="notice-content">
                  {notice.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3 className="quick-actions-title">Stay Connected</h3>
          <div className="quick-actions-grid">
            <div className="quick-action-item">
              <Megaphone className="quick-action-icon emergency" />
              <h4 className="quick-action-title">Emergency Alerts</h4>
              <p className="quick-action-description">Get instant notifications for urgent announcements</p>
            </div>
            <div className="quick-action-item">
              <MessageCircle className="quick-action-icon whatsapp" />
              <h4 className="quick-action-title">WhatsApp Updates</h4>
              <p className="quick-action-description">Share important notices with your community</p>
            </div>
            <div className="quick-action-item">
              <Calendar className="quick-action-icon calendar" />
              <h4 className="quick-action-title">Event Calendar</h4>
              <p className="quick-action-description">Never miss important village events and meetings</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer would go here */}
    </div>
  );
};

export default NoticeBoard;