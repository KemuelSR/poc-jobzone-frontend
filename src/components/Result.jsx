import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography } from '@mui/material';
import BarChart from './BarChart';

export const Result = ({ answerGlobal, emailUser }) => {
    const [result, setResult] = useState([]);

    useEffect(() => {
        const formatData = {
            answers: answerGlobal.answers,
            email: emailUser.email
        }
        const fetchData = async () => {
            try {
                const response = await axios.post('https://fobi-app-cms7.onrender.com/api/jobzone/', formatData);

                const formattedResult = response.data.result.map(item => ({
                    profile: item.area,
                    score: item.score,
                    description: item.description
                }));

                setResult(formattedResult);
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        };

        fetchData();
    }, [answerGlobal]);

    return <>
        <Grid container spacing={2}>
            <Grid item xs={5} style={{ paddingTop: 0 }}>
                <BarChart data={result} />
            </Grid>
            <Grid item xs={7} style={{ paddingTop: 0 }}>
                <Typography variant="h4" gutterBottom>
                    Aqui estão os resultados do seu perfil de interesse!
                </Typography>
                <Paper elevation={3} style={{ padding: '16px', overflowY: 'auto', height: '450px' }}>
                    {result.map((item) => (
                        <div key={item.area} style={{ marginBottom: '20px' }}>
                            <Typography variant="h6" gutterBottom>
                                {item.area}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {item.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Pontuação: {item.score}
                            </Typography>
                            <hr style={{ margin: '8px 0' }} />
                        </div>
                    ))}
                </Paper>
            </Grid>
        </Grid>
    </>
};