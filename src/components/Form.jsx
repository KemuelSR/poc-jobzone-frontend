import React, { useState, useRef } from 'react';
import { Button, Stepper, Step, StepLabel } from '@mui/material';
import { Start } from './Start';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step4 } from './Step4';
import { Step5 } from './Step5';
import { Result } from './Result';
import { JobZone } from './JobZone';
import Careers from './Careers';

const steps = ['Start', 'Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Result', 'Job Zone', 'Careers'];

const Form = () => {
    const [answersGlobal, setAnswerGlobal] = useState({ answers: "" });
    const [activeStep, setActiveStep] = useState(0);
    const [jobZone, setJobZone] = useState("");
    const [emailUser, setEmailUser] = useState("");

    const startRef = useRef();
    const step1Ref = useRef();
    const step2Ref = useRef();
    const step3Ref = useRef();
    const step4Ref = useRef();
    const step5Ref = useRef();

    const handleNext = async () => {
        const stepRefs = [startRef, step1Ref, step2Ref, step3Ref, step4Ref, step5Ref];

        if (activeStep < stepRefs.length) {
            try {
                await stepRefs[activeStep].current.handleSubmit();
            } catch (error) {
                console.error(`Erro no handleSubmit`, error);
                return;
            }
        }

        if (activeStep === 7 && jobZone === '') {
            alert('Selecione uma zona de trabalho');
        } else if (activeStep === steps.length - 1) {
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

    const handleSetEmailUser = (email) => {
        setEmailUser(email);
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
            height: '690px',
            margin: 'auto',
            marginTop: '50px',
            padding: '20px',
            border: '2px solid #ccc',
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
                {activeStep === 0 && <Start setEmailUser={handleSetEmailUser} ref={startRef} />}
                {activeStep === 1 && <Step1 setAnswerGlobal={handleSetAnswerGlobal} ref={step1Ref} />}
                {activeStep === 2 && <Step2 setAnswerGlobal={handleSetAnswerGlobal} ref={step2Ref} />}
                {activeStep === 3 && <Step3 setAnswerGlobal={handleSetAnswerGlobal} ref={step3Ref} />}
                {activeStep === 4 && <Step4 setAnswerGlobal={handleSetAnswerGlobal} ref={step4Ref} />}
                {activeStep === 5 && <Step5 setAnswerGlobal={handleSetAnswerGlobal} ref={step5Ref} />}
                {activeStep === 6 && <Result answerGlobal={answersGlobal} emailUser={emailUser} />}
                {activeStep === 7 && <JobZone setJobZone={handleSetJobZone} />}
                {activeStep === 8 && <Careers jobZone={jobZone} answerGlobal={answersGlobal} emailUser={emailUser} />}
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
                <Button disabled={activeStep === 0 || (activeStep >= 2 && activeStep <= 6)} onClick={handleBack}>
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
