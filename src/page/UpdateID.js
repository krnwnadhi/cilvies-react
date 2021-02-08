import React, { Component } from 'react'
import dvdService from '../services/dvdService';
import { withStyles } from "@material-ui/core/styles";
import { TextField, Typography, Container, Button, ButtonGroup, Avatar, CssBaseline, Paper, Divider } from '@material-ui/core/';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarMUI from '../components/SnackbarMUI';
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import IconButton from '@material-ui/core/IconButton'
import SlideInDialogMUI from '../components/SlideInDialogMUI'
import EditIcon from '@material-ui/icons/Edit';

const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            paddingLeft: theme.spacing(5),
            paddingRight: theme.spacing(5),
            width: theme.spacing("auto"),
            height: theme.spacing("auto"),
            // backgroundColor: 'red'
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

export class ListPageID extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeImgURL = this.onChangeImgURL.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.getDvd = this.getDvd.bind(this);
        this.updateDvd = this.updateDvd.bind(this);
        this.deleteDvd = this.deleteDvd.bind(this);
        this.updateStatus = this.updateStatus.bind(this);

        this.state = {
            currentDvd: {
                id: null,
                title: "",
                price: 0,
                description: "",
                imgURL: "",
                status: false,
            },
            message: "",
        }
    }

    componentDidMount() {
        this.getDvd(this.props.match.params.id)
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentDvd: {
                    ...prevState.currentDvd,
                    title: title,
                }
            }
        })
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentDvd: {
                ...prevState.currentDvd,
                description: description,
            }
        }))
    }

    onChangePrice(e) {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === '0' || regex.test(e.target.value)) {
            this.setState((prevState) => ({
                currentDvd: {
                    ...prevState.currentDvd,
                    price: e.target.value
                }
            }))
        }
    }

    onChangeImgURL(e) {
        const imgURL = e.target.value;

        this.setState((prevState) => ({
            currentDvd: {
                ...prevState.currentDvd,
                imgURL: imgURL,
            }
        }))
    }

    onChangeStatus(e) {
        const status = e.target.value;

        this.setState((prevState) => ({
            currentDvd: {
                ...prevState.currentDvd,
                status: status,
            }
        }))
    }

    updateStatus(status) {
        var data = {
            id: this.state.currentDvd.id,
            title: this.state.currentDvd.title,
            price: this.state.currentDvd.price,
            description: this.state.currentDvd.description,
            imgUrl: this.state.currentDvd.imgUrl,
            status: status
        };

        dvdService.update(this.state.currentDvd.id, data)
            .then((response) => {
                this.setState(prevState => ({
                    currentDvd: {
                        ...prevState.currentDvd,
                        status: status
                    }
                }))
                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    getDvd(id) {
        dvdService.retrieveById(id)
            .then((response) => {
                const data = response.data;
                this.setState({
                    currentDvd: data
                })
            }).catch((err) => {
                console.log(err);
            });
    }

    updateDvd() {
        dvdService.update(this.state.currentDvd.id, this.state.currentDvd)

            .then((response) => {
                this.setState({
                    message: ''
                })
                setTimeout(() => {
                    this.props.history.goBack();
                }, 3000);
            }).catch((err) => {
                this.setState({
                    message: "Error" + err
                })
            });
    }

    deleteDvd() {
        dvdService.delete(this.state.currentDvd.id)
            .then((response) => {
                this.props.history.goBack();
            }).catch((err) => {
                this.setState({
                    message: "Error when deleting data" + err
                })
            });
    }

    goBack() {
        this.props.history.goBack()
    }

    render() {
        const { currentDvd } = this.state;
        const { classes } = this.props;
        const disabled = this.state.currentDvd.title < 1 || this.state.currentDvd.description < 1 || this.state.currentDvd.imgURL < 1 || this.state.currentDvd.price < 1

        return (
            <div className={classes.root}>
                <Paper elevation={4}>
                    <Container component="main" maxWidth="sm" >
                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <EditIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Edit Page
                            </Typography>
                            <form className={classes.form} autoComplete="off">
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    autoFocus
                                    id="title"
                                    label="Title"
                                    name="title"
                                    value={currentDvd.title}
                                    onChange={this.onChangeTitle}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="price"
                                    label="Price"
                                    name="price"
                                    type="number"
                                    value={currentDvd.price}
                                    onChange={this.onChangePrice}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    name="description"
                                    value={currentDvd.description}
                                    onChange={this.onChangeDescription}
                                    multiline
                                    rows="3"
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    id="imgURL"
                                    label="Image URL"
                                    name="imgURL"
                                    value={currentDvd.imgURL}
                                    onChange={this.onChangeImgURL}
                                    multiline
                                    rows="3"
                                />
                                {currentDvd.status ? (
                                    <IconButton variant="outlined" value={currentDvd.status} onClick={() => this.updateStatus(false)} >
                                        <Visibility />
                                    </IconButton>
                                ) : (
                                        <IconButton variant="outlined" value={currentDvd.status} onClick={() => this.updateStatus(true)} >
                                            <VisibilityOff />
                                        </IconButton>
                                    )}
                                {/* <br /> <br /> */}
                                <Typography>
                                    <strong>Status: </strong>
                                    {currentDvd.status ? "Available" : "Unavailable"}
                                </Typography>
                                <br />
                                <Divider />
                                <ButtonGroup size="small" className={classes.submit}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<DoneIcon />}
                                        onClick={this.updateDvd}
                                        disabled={disabled}
                                    >
                                        <SnackbarMUI
                                            message={'Update Successs! Please wait, You\'ll be redirecting to List Page'}
                                            messageButton={"Update"} />
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
                                <br />
                                <SlideInDialogMUI
                                    onClickButton={this.deleteDvd}
                                    titleButton={"Delete"}
                                    titleMessage={"Delete DVD"}
                                    dialogMessage={"Are you sure to Delete this DVD? This action cannot be undone."}
                                />
                            </form>
                        </div>
                    </Container>
                </Paper>
            </div>
        )
    }
}

export default withStyles(useStyles)(ListPageID)
