import React, { useEffect, useState } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'
import { commerce } from '../../lib/commerce'
import { Link } from 'react-router-dom'
const AddressForm = ({ checkoutToken, next }) => {
    const methods = useForm()
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState()
    const [shippingSubdividions, setShippingSubdividions] = useState([])
    const [shippingSubdividion, setShippingSubdividion] = useState()
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState()

    const countries = Object.entries(shippingCountries).map(([code, name]) => (
        { id: code, label: name }
    ))
    const subdivisions = Object.entries(shippingSubdividions).map(([code, name]) => (
        { id: code, label: name }
    ))

    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - ( ${sO.price.formatted_with_symbol})` }))



    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdividions(subdivisions)
        setShippingOption(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry)

        console.log("change deected")
    }, [shippingCountry])

    useEffect(() => {
        if (shippingSubdividion) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdividion)

    }, [shippingSubdividion])

    return (
        <>
            <Typography variant='h6' gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods} >
                 { console.log( methods)}
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdividion, shippingOption }))}>
                    <Grid container spacing={3}>
                        <FormInput  name='firstName' label='First Name' />
                        <FormInput  name='lastName' label='Last Name' />
                        <FormInput  name='address1' label='Address' />
                        <FormInput  name='email' label='Email' />
                        <FormInput  name='city' label='City' />
                        <FormInput  name='zip' label='ZIP / Postal code' />

                        <Grid item xs={12} sm={6}  >
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((country) => {
                                    return (
                                        <MenuItem key={country.id} value={country.id}>
                                            {country.label}
                                        </MenuItem>
                                    )
                                })}
                            </Select>

                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdividion} fullWidth onChange={(e) => setShippingSubdividion(e.target.value)}>
                                {subdivisions.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((options) => (
                                    <MenuItem key={options.id} value={options.id}>
                                        {options.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>

                    </Grid>

                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button component={Link} to="/cart" variant='outlined'> Back to Cart</Button>
                        <Button type='submit' variant='contained' color='primary'> Next</Button>
                    </div>
                </form>

            </FormProvider>
        </>
    )
}

export default AddressForm