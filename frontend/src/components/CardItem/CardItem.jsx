import React from "react"
import { Card, Grid, Typography } from "@mui/material"

import { functionality } from "./cardItems"

export default function CardItem() {
  return (
    <Grid item xs={12}>
      <Card variant="outlined" sx={{ height: "100%", padding:"0.4rem 0.4rem 0 0.4rem", textAlign:"center"}}>
        <Typography variant="h4">
        {functionality()}
        </Typography>
        <img src="https://picsum.photos/330" alt="Placeholder"/>
      </Card>
    </Grid>
  )
}
