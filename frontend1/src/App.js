import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Services from './components/Services/Services';
import Schemes from './components/Schemes/Schemes';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Documents from './components/Documents/Documents';
import DocumentApplication from './components/Documents/DocumentApplication';
import DocumentStatus from './components/Documents/DocumentStatus';
import NoticeBoard from './components/NoticeBoard/NoticeBoard';

import AdminDashboard from './components/Admin/AdminDashboard';
import AdminDocuments from './components/Admin/AdminDocuments';
import AdminGrievances from './components/Admin/AdminGrievances';
import AdminSchemes from './components/Admin/AdminSchemes';
import AdminCommunity from './components/Admin/AdminCommunity';
import Grievances from './components/Grievances/Grievances';
import ContactPage from './components/Contact/ContactPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />

         <Route path='/admin/admindashboard' element={<AdminDashboard/>} />
         <Route path="/admin/admindocuments" element={<AdminDocuments />} />
         <Route path="/admin/AdminGrievances" element={<AdminGrievances />} />
         <Route path="/admin/AdminCommunity" element={<AdminCommunity />} />
         <Route path="/admin/AdminSchemes" element={<AdminSchemes />} />
         
        <Route path="/services" element={<Services />} />
         <Route path="/documents" element={<Documents />} />
         <Route path="/documents/documentstatus" element={<DocumentStatus />} />
         <Route path="/documents/apply/:documentId" element={<DocumentApplication />} />

        <Route path='/grievances' element={<Grievances/>} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/notice-board" element={<NoticeBoard/>} />
        <Route path="/contact" element={<ContactPage/>} />
        
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
