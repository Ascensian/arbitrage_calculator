import express, { Request, Response } from 'express';
import axios from 'axios';
require('dotenv').config();

const app: express.Application = express();
const port: number = 3005;

app.use(express.json());

app.get('/api/arbitrage/real-opportunity', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${process.env.RATE_CALCULATOR_API_URL}/real-opportunity`);
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la redirection vers l\'API d\'arbitrage:', error);
    res.status(500).json({ error: 'Problème de communication avec l\'API d\'arbitrage' });
  }
});

app.get('/api/pairs', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${process.env.STRUCTURING_PAIRS_API_URL}/pairs`);
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des pairs:', error);
    res.status(500).json({ error: 'Problème de communication avec l\'API structuring_pairs' });
  }
});

app.get('/api/triangularpairs', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${process.env.STRUCTURING_PAIRS_API_URL}/triangularpairs`);
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des triangular pairs:', error);
    res.status(500).json({ error: 'Problème de communication avec l\'API structuring_pairs' });
  }
});

app.get('/api/prices', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${process.env.STRUCTURING_PAIRS_API_URL}/prices`);
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la récupération des prices:', error);
    res.status(500).json({ error: 'Problème de communication avec l\'API structuring_pairs' });
  }
});

app.listen(port, () => {
  console.log(`API Gateway à l'écoute sur le port ${port}`);
});
