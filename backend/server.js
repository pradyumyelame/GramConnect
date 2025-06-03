import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';



import authRoutes from './routes/authRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import schemeRoutes from './routes/schemeRoutes.js';
import grievanceRoutes from './routes/grievanceRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// i18n middleware


app.get('/api/welcome', (req, res) => {
  res.json({ message: req.t('welcome') });
});

app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/notices', noticeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
