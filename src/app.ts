import express from 'express';
import cors from 'cors';
import routes from './routes';
import topicRoutes from './routes/topicRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.get('/', (_req, res) => {
  res.send('🚀 Server is running!');
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/topics', topicRoutes);

export default app;
