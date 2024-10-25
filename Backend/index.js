import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
const port = process.env.PORT || 5000;

const nagerDateAxios = axios.create({
  baseURL: process.env.COUNTRY_API_BASE_URL || 'https://date.nager.at/api/v3',
});

const countriesNowAxios = axios.create({
  baseURL: process.env.POPULATION_API_BASE_URL || 'https://countriesnow.space/api/v0.1/countries',
});

app.get('/api/countries', async (req, res) => {
    try {
        const response = await nagerDateAxios.get('/AvailableCountries');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching countries' });
    }
});

app.get('/api/country/:code', async (req, res) => {
    const { code } = req.params;  

    try {
        // Fetch basic country info
        const countryInfoResponse = await nagerDateAxios.get(`/CountryInfo/${code}`);
        const countryInfo = countryInfoResponse.data;

        // Extract the country name
        const countryName = countryInfo.commonName || countryInfo.officialName;

        // Fetch flag data
        const flagResponse = await countriesNowAxios.post('/flag/images', {
            country: countryName,
        });
        const flagData = flagResponse.data;

        // Send combined data with flag URL
        res.json({
            commonName: countryInfo.commonName,
            officialName: countryInfo.officialName,
            countryCode: countryInfo.countryCode,
            region: countryInfo.region,
            borders: countryInfo.borders,
            flagUrl: flagData.data.flag,
        });
    } catch (error) {
        console.error('Error fetching country info:', error);
        res.status(500).json({ message: 'Error fetching country info' });
    }
});

app.get('/api/country/:code/population', async (req, res) => {
    const { code } = req.params;

    try {
        // Obter o nome do país pelo código
        const countryInfoResponse = await nagerDateAxios.get(`/CountryInfo/${code}`);
        const countryInfo = countryInfoResponse.data;
        const countryName = countryInfo.commonName || countryInfo.officialName;

        // Buscar a população usando o nome do país
        const populationResponse = await countriesNowAxios.post('/population', { country: countryName });
        const populationData = populationResponse.data;

        // Exibir a resposta completa no console
        console.log('Dados completos da população:', JSON.stringify(populationData, null, 2));

        res.json({
            countryCode: countryInfo.countryCode,
            name: countryName,
            population: populationData?.data?.populationCounts?.[0]?.value || 'População indisponível',
            populationHistory: populationData?.data?.populationCounts || []
        });
    } catch (error) {
        console.error('Error fetching population:', error.message);
        res.status(500).json({ message: 'Error fetching population' });
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
