import React, { useEffect, useState } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './CustomTextField'
import { commerce } from '../../lib/commerce'
const AddressForm = ({ checkoutToken }) => {
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

    console.log(countries)

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log(countries)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions =async (countryCode)=>{
        const {subdivisions} = await commerce.services.localeListShippingSubdivisions(countryCode)
        setShippingSubdividions(subdivisions)
        setShippingOption(Object.keys(subdivisions)[0])
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(()=>{
if(shippingCountry) fetchSubdivisions(shippingCountry)
    },[shippingCountry])
    return (
        <>
            <Typography variant='h6' gutterBottom>
                Shipping Address
            </Typography>
            <FormProvider {...methods} >
                <from onSubmit=''>
                    <Grid container spacing={3}>
                        <FormInput required name='firstName' label='First Name' />
                        <FormInput required name='lastName' label='Last Name' />
                        <FormInput required name='address' label='Address' />
                        <FormInput required name='email' label='Email' />
                        <FormInput required name='city' label='City' />
                        <FormInput required name='zip' label='ZIP / Postal code' />
                    </Grid>
                    <Grid item xs={12} sm={6}  >
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {countries.map((country) => {return(
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>
                            )})}
                        </Select>
                       
                    </Grid>
                    {/* <Grid item xs={12} sm={6}  >
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select value={shippingSubdividion} fullWidth onChange={(e) => setShippingSubdividion(e.target.value)}>
                            {subdivisions.map((subdivision) => {return(
                                <MenuItem key={subdivision.id} value={subdivision.id}>
                                    {subdivision.label}
                                </MenuItem>
                            )})}
                        </Select>
                       
                    </Grid> */}
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


                </from>
            </FormProvider>
        </>
    )
}

export default AddressForm