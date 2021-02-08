import React, { Component } from 'react'
import dvdService from '../services/dvdService';
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Container, Button, ButtonGroup, Avatar, CssBaseline, Paper } from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarMUI from '../components/SnackbarMUI'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
            width: theme.spacing("auto"),
            height: theme.spacing("auto"),
        },
        justifyContent: 'center'
    },
    paper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
})

export class AddPage extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeImgURL = this.onChangeImgURL.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.saveDvd = this.saveDvd.bind(this);
        this.newDvd = this.newDvd.bind(this);

        this.state = {
            id: null,
            title: "",
            price: 0,
            description: "",
            imgURL: "",
            status: false,
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangePrice(e) {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            this.setState({ price: e.target.value })
        } else {
            alert('Number Only')
        }
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeImgURL(e) {
        this.setState({
            imgURL: e.target.value
        })
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        })
    }

    saveDvd() {
        var data = {
            title: this.state.title,
            price: this.state.price,
            description: this.state.description,
            imgURL: this.state.imgURL,
            status: this.state.status,
        }

        dvdService.create(data)
            .then((response) => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    price: response.data.price,
                    description: response.data.description,
                    imgURL: response.data.imgURL,
                    status: response.data.status,

                    submitted: true
                });
                setTimeout(() => {
                    this.props.history.goBack();
                }, 3000);
            }).catch((err) => {
                console.log(err);
            });
    }

    updateStatus(status) {
        var data = {
            title: this.state.title,
            price: this.state.price,
            description: this.state.description,
            imgURL: this.state.imgURL,
            status: status
        };

        dvdService.update(this.state.id, data)
            .then((response) => {
                this.setState(() => ({
                    status: status
                }))
                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    newDvd() {
        this.setState({
            id: null,
            title: "",
            price: 0,
            description: "",
            imgUrl: "",
            status: false,
        })
    }

    goBack() {
        this.props.history.goBack()
    }

    render() {

        const { classes } = this.props;
        const disabled = this.state.title < 1 || this.state.description < 1 || this.state.imgURL < 1 || this.state.price < 1

        return (
            <div className={classes.root}>
                <Paper elevation={4}>
                    <Container component="main" maxWidth="sm" >
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <AddIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Add Page
                                    </Typography>
                            <form className={classes.form} autoComplete="off" >
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    autoFocus
                                    label="Title"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    required
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    type="text"
                                    value={this.state.price}
                                    onChange={this.onChangePrice}
                                    required
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    required
                                    multiline
                                    rows="3"
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    label="Image URL"
                                    name="imgURL"
                                    value={this.state.imgURL}
                                    onChange={this.onChangeImgURL}
                                    required
                                    multiline
                                    rows="3"
                                />

                                {this.state.status ? (
                                    <IconButton variant="outlined" value={this.state.status} onClick={() => this.updateStatus(false)} >
                                        <Visibility />
                                    </IconButton>
                                ) : (
                                        <IconButton variant="outlined" value={this.state.status} onClick={() => this.updateStatus(true)} >
                                            <VisibilityOff />
                                        </IconButton>
                                    )}
                                <br /> <br />
                                <Typography>
                                    <strong>Status: </strong>
                                    {this.state.status ? "Available" : "Unavailable"}
                                </Typography>
                                <br />
                                <ButtonGroup size="medium" className={classes.submit}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<DoneIcon />}
                                        onClick={this.saveDvd}
                                        disabled={disabled}
                                    >
                                        <SnackbarMUI
                                            message={'Submit Successs! Please wait, You\'ll be redirecting to List Page'}
                                            messageButton={"Submit"} />
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<CloseIcon />}
                                        onClick={() => this.goBack()}
                                    >
                                        Cancel
                                            </Button>
                                </ButtonGroup>
                            </form>
                        </div>
                    </Container>
                </Paper>
            </div>
        )
    }
}

export default withStyles(useStyles)(AddPage)
