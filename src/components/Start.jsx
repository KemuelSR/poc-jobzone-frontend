import React from 'react';
import { Button, Container, Typography } from '@mui/material';

export const Start = () => {
    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Bem-vindo ao perfil de interesse O*NET!
            </Typography>

            <Typography variant="body1" paragraph>
                O ONET Interest Profiler pode ajudar você a descobrir quais são seus interesses e como eles se relacionam com o mundo do trabalho. Você pode descobrir o que gosta de fazer. O ONET Interest Profiler ajuda você a decidir que tipos de carreiras pode querer explorar.
            </Typography>

            <Typography variant="body1" paragraph>
                Em cada tela, clique no botão Avançar na parte inferior para continuar.
            </Typography>
        </Container>
    );
};
