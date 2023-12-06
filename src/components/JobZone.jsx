import React from 'react';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const JobZone = ({setJobZone}) => {
    const handleJobZoneChange = (event) => {
        setJobZone(event.target.value);
    };
    return <>
        <Grid container spacing={2}>
            <Grid item xs={5} style={{ paddingTop: 0 }}>
                <h1>Select a Job Zone</h1>
            </Grid>
            <Grid item xs={7} style={{ paddingTop: 0 }}>
                <p>
                    Agora que você aprendeu sobre cada zona de trabalho, selecione a zona de trabalho atual ou futura certa para você:
                </p>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={handleJobZoneChange}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Job Zone One (Pouca ou nenhuma preparação necessária)" />
                        <FormControlLabel value="2" control={<Radio />} label="Job Zone Two (Alguma preparação necessária)" />
                        <FormControlLabel value="3" control={<Radio />} label="Job Zone Three (Preparação média necessária)" />
                        <FormControlLabel value="4" control={<Radio />} label="Job Zone Four (Alta preparação necessária)" />
                        <FormControlLabel value="5" control={<Radio />} label="Job Zone Five (Preparação extremamente necessária)" />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
    </>
};