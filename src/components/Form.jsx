import React, { useState } from 'react';
import { Button, Stepper, Step, StepLabel } from '@mui/material';
import { Start } from './Start';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import { Result } from './Result';
import { JobZone } from './JobZone';
import Careers from './Careers';

const steps = ['Start', 'Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Result', 'Job Zone', 'Careers'];

const Form = () => {
    const [answersGlobal, setAnswerGlobal] = useState({ answers: "" });
    const [activeStep, setActiveStep] = useState(0);
    const [jobZone, setJobZone] = useState("");

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            alert('Obrigado!');
        } else {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSetAnswerGlobal = (answer) => {
        const newValues = Object.values(answer).join('');
        setAnswerGlobal((prevAnswers) => ({ ...prevAnswers, answers: prevAnswers.answers + newValues }));
    };

    const handleSetJobZone = (selectedJobZone) => {
        setJobZone(selectedJobZone);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '900px',
            height: '700px',
            margin: 'auto',
            marginTop: '50px',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px'
        }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div style={{ marginTop: '60px', width: '100%' }}>
                {activeStep === 0 && <Start />}
                {activeStep === 1 && <Step1 setAnswerGlobal={handleSetAnswerGlobal} />}
                {activeStep === 2 && <Step2 setAnswerGlobal={handleSetAnswerGlobal} />}
                {activeStep === 3 && <Step3 setAnswerGlobal={handleSetAnswerGlobal} />}
                {activeStep === 4 && <Step4 setAnswerGlobal={handleSetAnswerGlobal} />}
                {activeStep === 5 && <Step5 setAnswerGlobal={handleSetAnswerGlobal} />}
                {activeStep === 6 && <Result answerGlobal={answersGlobal} />}
                {activeStep === 7 && <JobZone setJobZone={handleSetJobZone} />}
                {activeStep === 8 && <Careers jobZone={jobZone} answerGlobal={answersGlobal} />}
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
    );
};

export default Form;
