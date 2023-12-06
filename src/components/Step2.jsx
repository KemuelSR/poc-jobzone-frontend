import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, FormLabel, Radio, Button, Grid, Typography } from '@mui/material';
import Icon from '@mui/material/Icon';
import StronglyDislikeIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import DislikeIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';
import UnsureIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import LikeIcon from '@mui/icons-material/MoodOutlined';
import StronglyLikeIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';

const ColorRadioButtons = ({ selectedValue, handleChange }) => {
    const controlProps = (item) => ({
        checked: selectedValue === item,
        onChange: handleChange,
        value: item,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': item },
    });

    return (
        <div>
            <Radio {...controlProps('1')} color='error' />
            <Radio {...controlProps('2')} color="secondary" />
            <Radio {...controlProps('3')} color="default" />
            <Radio {...controlProps('4')} />
            <Radio {...controlProps('5')} color='success' />
        </div>
    );
};

const Step2 = ({ setAnswerGlobal }) => {
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios({
                    method: 'options',
                    url: 'https://fobi-app-cms7.onrender.com/api/fobi-form-entry/form2/',
                });

                const newQuestions = Object.keys(response.data.actions.PUT).map((key) => ({
                    id: key,
                    text: response.data.actions.PUT[key].label,
                }));

                setQuestions(newQuestions);
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        };

        fetchData();
    }, []);
    const handleQuestionChange = (question, answer) => {
        setAnswers((prevAnswers) => ({ ...prevAnswers, [question]: answer }));
    };

    let questionNumber = 13;

    const validateForm = () => {
        for (const question of questions) {
            if (!answers[question.id]) {
                alert(`Por favor, responda a pergunta: ${question.text}`);
                return false;
            }
        }
        return true;
    }
    const handleSubmit = () => {
        if (validateForm()) {
            axios.put('https://fobi-app-cms7.onrender.com/api/fobi-form-entry/form2/', answers)
                .then(response => {
                    setAnswerGlobal(response.data);
                })
                .catch(error => {
                    console.error('Erro na requisição PUT:', error);
                });
        }
    };

    const iconSpacing = '18px';

    return (
        <Grid container spacing={2} style={{ marginTop: '-25px' }}>
            <Grid item xs={12} style={{ display: 'flex', marginLeft: '75px' }}>
                {[<StronglyDislikeIcon />, <DislikeIcon />, <UnsureIcon />, <LikeIcon />, <StronglyLikeIcon />].map((icon, index) => (
                    <Icon key={index} style={{ marginRight: iconSpacing }}>
                        {icon}
                    </Icon>
                ))}
            </Grid>
            {questions.map((question) => (
                <React.Fragment key={question.id}>
                    <Grid item xs={1} style={{ paddingTop: 0, marginTop: '8px', textAlign: 'right', marginRight: '-10px' }}>
                        <Typography variant="body1">
                            {questionNumber++} -
                        </Typography>
                    </Grid>
                    <Grid item xs={3} style={{ paddingTop: 0 }}>
                        <FormControl component="fieldset" style={{ width: '100%' }}>
                            <ColorRadioButtons
                                selectedValue={answers[question.id] || ''}
                                handleChange={(event) => handleQuestionChange(question.id, event.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={8} style={{ paddingTop: 0 }}>
                        <FormControl component="fieldset" style={{ width: '100%', marginTop: '8px' }}>
                            <FormLabel component="legend">{question.text}</FormLabel>
                        </FormControl>
                    </Grid>
                </React.Fragment>
            ))}

            <Grid item xs={12} style={{ marginTop: '20px' }}>
                <Button variant="contained" color="secondary" onClick={handleSubmit}>
                    Enviar
                </Button>
            </Grid>
        </Grid>
    );
};

export default Step2;
