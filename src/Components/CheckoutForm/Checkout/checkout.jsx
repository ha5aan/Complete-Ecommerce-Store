import React, { useEffect, useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core'

import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
const steps = ['Shipping Address', 'Payment Details']
const Checkout = ({cart}) => {
    let classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken,setCheckoutToken]= useState(null)
const Confirmation =()=>{
    return(
        <div>
            Confirmation!
        </div>
    )
}
useEffect(()=>{
    const generateToken = async()=>{
        try {
            console.log("Printing cart")
            const token = await commerce.checkout.generateToken(cart.id,{type:'cart'})
            console.log(token)

            console.log("#############")
            setCheckoutToken(token)    
        } catch (error) {
            console.log(error)
        }
        

    }
    generateToken()
},[cart])

    const Form=()=>{
        if(activeStep=== 0){
            return(<AddressForm checkoutToken={checkoutToken}/>)
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
{activeStep===steps.length ? <Confirmation/> : checkoutToken && <Form/>}
                    </Paper>
                </main>

            </div>

        </>
    )
}

export default Checkout