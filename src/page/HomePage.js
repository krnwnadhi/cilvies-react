import React, { Component } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import { Link } from "react-router-dom"
import Preloader from "../components/homepage/countdown/Preloader/Preloader";
import Timer from "../components/homepage/countdown/Timer";

import './styles.css'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © Cilvies '}
            <Link to="/dvd" color="inherit">
                Adhi Kurniawan
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export class HomePage extends Component {
    render() {
        return (
            <div>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Typography variant="h1" align="center" color='primary'>
                        Website
                <br />
                    Coming Soon
                </Typography>
                    <Timer />
                    <Preloader />
                    <Link to={'/dvd'} style={{ textDecoration: 'none' }}>
                        <Button size="small" color="primary" variant="outlined" >
                            GET STARTED
                        </Button>
                    </Link>
                    <br /> <br />
                    <br /> <br />
                    <br /> <br />
                    <Copyright />
                </Grid>

            </div>
        )
    }
}

export default HomePage

