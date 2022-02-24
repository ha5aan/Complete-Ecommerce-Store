import React, { useEffect, useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
import useStyles from './styles'
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
const steps = ['Shipping Address', 'Payment Details']
const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    let navigate = useNavigate();
    let classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const [isFinished, setIsFinished] = useState(false)
    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }



    const Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'> Thank you for your purchase, {order.customer.firstname} {order.customer.lastname} </Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2' > order ref :{order.customer_reference}</Typography>
            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'> Back to Home</Button>
        </>
    ) : isFinished ? (<>
        <div>
            <Typography variant='h5'> Thank you for your purchase </Typography>
            <Divider className={classes.divider} />
        </div>
        <br />
        <Button component={Link} to='/' variant='outlined' type='button'> Back to Home</Button>
    </>) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )
    if (error) {
        <>
            <Typography variant='h5' > Error : {error}</Typography>
            <Button component={Link} to='/' variant='outlined' type='button'> Back to Home</Button>

            <br />
        </>
    }

    useEffect(() => {
        const generateToken = async () => {
            try {
                console.log("Printing cart")
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                console.log(token)

                console.log("#############")
                setCheckoutToken(token)
            } catch (error) {
                navigate('/')
            }


        }
        generateToken()
    }, [cart])

    const Form = () => {
        if (activeStep === 0) {
            return (<AddressForm checkoutToken={checkoutToken} next={next} />)
        } else {
            return (<PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />)
        }
    }

    const next = (data) => {
        setShippingData(data)
        console.log("Test from next")
        nextStep()
    }
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    return (
        <>
            <CssBaseline />
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
                        {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                    </Paper>
                </main>

            </div>

        </>
    )
}

export default Checkout