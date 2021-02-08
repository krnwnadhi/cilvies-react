import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import dvdService from '../services/dvdService';
import { fade, withStyles } from "@material-ui/core/styles";
import ShowMoreText from 'react-show-more-text';
import { Button, Card, CardActions, CardContent, Box, Tooltip, CardMedia, Grid, Typography, Container, InputBase, Divider, ButtonGroup, IconButton } from '@material-ui/core';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Aos from "aos"
import "aos/dist/aos.css"
import SlideInDialogMUI from '../components/SlideInDialogMUI'
import SimpleRatingMUI from '../components/SimpleRatingMUI'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.55),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(0),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 94, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '6ch',
            '&:focus': {
                width: '40ch',
            },
        },
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '5px',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
});

export class ListPage extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveDvd = this.retrieveDvd.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.deleteAllDvd = this.deleteAllDvd.bind(this);

        this.state = {
            dvds: [],
            currentDvd: null,
            currentIndex: -1,
            searchTitle: '',
            expand: false,
            is_visible: false
        }
    }

    componentDidMount() {
        this.retrieveDvd();
        Aos.init({ duration: 1000 });
        let scrollComponent = this;
        document.addEventListener("scroll", function (e) {
            scrollComponent.toggleVisibility();
        });
    };

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        })
    };

    retrieveDvd() {
        dvdService.retrieveAll()
            .then((response) => {
                const data = response.data;
                this.setState({
                    dvds: data,
                })
            }).catch((err) => {
                console.log(err);
            });
    }

    refreshList() {
        this.retrieveDvd();
        this.setState({
            currentDvd: null,
            currentIndex: -1
        })
    }

    searchTitle() {
        this.setState({
            currentDvd: null,
            currentIndex: -1
        })

        dvdService.searchByTitle(this.state.searchTitle)
            .then((response) => {
                const data = response.data;
                this.setState({
                    dvds: data
                })
            }).catch((err) => {
                console.log(err);
            });
    }

    deleteAllDvd() {
        dvdService.deleteAll()
            .then((response) => {
                this.refreshList();
            }).catch((err) => {
                console.log(err);
            });
    }

    onClick() {
        this.setState({
            expand: !this.state.expand
        })
    };

    toggleVisibility() {
        if (window.pageYOffset > 300) {
            this.setState({
                is_visible: true
            });
        } else {
            this.setState({
                is_visible: false
            });
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    render() {
        const { searchTitle, dvds, is_visible } = this.state;
        const { classes } = this.props;

        return (
            <div className="scroll-to-top">
                <br />
                <Container maxWidth="md">
                    <Typography variant="h3">
                        <Box color="info.main">DVD List Page</Box>
                    </Typography>
                    <br /> <br />
                    <div className={classes.search}>
                        <Box
                            boxShadow={1}
                            bgcolor="whitesmoke"
                            borderRadius="5px"
                        >
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search By title"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={this.onChangeSearchTitle}
                                onKeyPress={this.searchTitle}
                                value={searchTitle}
                            />
                        </Box>
                    </div>
                </Container>
                <br />
                <Container maxWidth="md">
                    <ButtonGroup>
                        <Link to='/dvd/add' style={{ textDecoration: 'none' }}>
                            <Button size="medium" startIcon={<AddIcon />} color="primary" variant="contained" >
                                New DVD
                            </Button>
                        </Link>
                        <SlideInDialogMUI
                            onClickButton={this.deleteAllDvd}
                            titleButton={"Remove All"}
                            titleMessage={"REMOVE ALL DVD"}
                            dialogMessage={"Are you sure to REMOVE all DVD? This action cannot be undone."}
                        />
                    </ButtonGroup>
                </Container>

                <Container className={classes.cardGrid} maxWidth="md" bgcolor="text.secondary" >
                    <Grid container spacing={8}>
                        {dvds.map((dvd, index) => (
                            <Grid item key={index} xs={12} sm={6} md={4}>
                                <Card raised className={classes.card} data-aos="fade-up">
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={dvd.imgURL}
                                        style={{ height: "30vw", objectFit: "fill" }}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h6" component="h2" gutterBottom>
                                            {dvd.title}
                                        </Typography>
                                        <Typography>
                                            <Typography variant="caption" gutterBottom>
                                                <SimpleRatingMUI />
                                                Rp. {dvd.price}/months
                                           </Typography>
                                            <br /> <br />
                                            <Divider />
                                            <br />
                                            <Typography variant="body2" color="textSecondary" display="block" gutterBottom>
                                                <ShowMoreText
                                                    lines={2}
                                                    more="Show More"
                                                    less="Show Less"
                                                    onClick={() => this.onClick()}
                                                    expanded={false}
                                                >
                                                    {dvd.description}
                                                </ShowMoreText>
                                            </Typography>
                                        </Typography>
                                    </CardContent>
                                    <CardActions >
                                        <Link to={'/dvd/' + dvd.id} style={{ textDecoration: 'none' }}>
                                            <Button size="small" color="primary" >
                                                Edit
                                            </Button>
                                        </Link>
                                        {dvd.status === true
                                            ? (<IconButton>
                                                <Tooltip title="Available"><VisibilityOutlinedIcon /></Tooltip>
                                            </IconButton>)
                                            : (<IconButton>
                                                <Tooltip title="Not Available"><VisibilityOffOutlinedIcon /></Tooltip>
                                            </IconButton>)
                                        }
                                    </CardActions>
                                </Card>
                            </Grid>

                        ))}
                    </Grid>
                </Container>
                <br />
                {is_visible && (
                    <div onClick={() => this.scrollToTop()} style={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton> <ArrowUpwardIcon /></IconButton>
                    </div>
                )}
            </div >
        )
    }
}

export default withStyles(useStyles)(ListPage)
