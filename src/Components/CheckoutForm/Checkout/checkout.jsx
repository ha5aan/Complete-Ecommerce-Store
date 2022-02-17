import React, { useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'

import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
const steps = ['Shipping Address', 'Payment Details']
const Checkout = () => {
    let classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
const Confirmation =()=>{
    return(
        <div>
            Confirmation!
        </div>
    )
}


    const Form=()=>{
        if(activeStep=== 0){
            return(<AddressForm/>)
        }else{
            return(<PaymentForm/>)
        }
    }

    return (
        <>
            <div className={classes.toolabar}>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant='h4' align='center' >
                            Checkout
                        </Typography>

                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
{activeStep===steps.length ? <Confirmation/> : <Form/>}
                    </Paper>
                </main>

            </div>

        </>
    )
}

export default Checkout