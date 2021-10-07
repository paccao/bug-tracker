import React from 'react'

import CardItem from "../components/CardItem/CardItem"

import { Typography, Grid, Container } from "@mui/material"

export default function CardsContainer() {
  return (
    <Container>
      <Typography variant="h2">Cards</Typography>
      <Grid container spacing={1.5} marginTop={2}>
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </Grid>
    </Container>
  )
}
