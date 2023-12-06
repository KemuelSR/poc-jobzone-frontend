import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import StronglyDislikeIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import DislikeIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import UnsureIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import LikeIcon from '@mui/icons-material/MoodOutlined';
import StronglyLikeIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';


export const Start = ({ setEmailUser }) => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const formatEmail = {
        email: email,
    }

    const handleSubmit = () => {
        axios.put('https://fobi-app-cms7.onrender.com/api/fobi-form-entry/form-email/', formatEmail)
            .then(response => {
                setEmailUser(formatEmail);
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.email) {
                    console.error('Erro na requisição PUT:', error.response.data.email);
                    alert(error.response.data.email[0]);
                } else {
                    console.error('Erro na requisição PUT:', error);
                }
            });
    };

    const icons = [
        { icon: <StronglyDislikeIcon />, description: 'Não Gosto Muito' },
        { icon: <DislikeIcon />, description: 'Não Gosto' },
        { icon: <UnsureIcon />, description: 'Incerto' },
        { icon: <LikeIcon />, description: 'Gosto' },
        { icon: <StronglyLikeIcon />, description: 'Gosto Muito' },
    ];
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Bem-vindo ao perfil de interesse O*NET!
            </Typography>

            <Typography variant="body1" paragraph>
                O ONET Interest Profiler pode ajudar você a descobrir quais são seus interesses e como eles se relacionam com o mundo do trabalho.
                Você pode descobrir o que gosta de fazer. O ONET Interest Profiler ajuda você a decidir que tipos de carreiras pode querer explorar.
                Em cada tela, clique no botão Avançar na parte inferior para continuar.
            </Typography>

            <Typography variant="overline" paragraph>
                O formulário é de múltipla escolha e as opções disponíveis são as seguintes:
            </Typography>

            {icons.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    {item.icon}
                    <Typography variant="body1" style={{ marginLeft: '8px' }}>{item.description}</Typography>
                </div>
            ))}

            <Typography variant="overline" paragraph style={{ marginTop: '20px' }}>
                Informe seu email!
            </Typography>
            <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                style={{ marginTop: '-15px' }}
            />

            <Grid item xs={12} style={{ marginTop: '20px' }}>
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    Enviar
                </Button>
            </Grid>
        </Container>
    );
};
