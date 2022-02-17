import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'
const FormInput = ({ name, label, required }) => {
    console.log("Test")
    const { control } = useFormContext()
    
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                as={TextField}
                control={control}
                fullwidth
                name={name}
                label={label}
                required={required}
            />
        </Grid>
    )
}

export default FormInput