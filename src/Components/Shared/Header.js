import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import TopHeader from './TopHeader';
import headerStyle from '../../css/header.module.css'
import { fetchLogoUrl } from '../../store/Reducers/actions'
import { connect } from 'react-redux';
import SegmentIcon from '@mui/icons-material/Segment';

class Header extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = async () => {
        const { dispatch } = this.props;
        dispatch(fetchLogoUrl());
    }

    render = () => {
        const { logoUrl, isFetchingLogo } = this.props;
        
        return (
            <div className={headerStyle.header}>
                {/* <TopHeader /> */}
                <Navbar className={headerStyle.menuBg} bg="light" expand="lg">
                    <Navbar.Brand href="/">
                        { !isFetchingLogo ?  <img src={ logoUrl } alt="Follow Me Travel" style={{width: "100px",height: "70px"}} /> : ""}
                    </Navbar.Brand>
                    <Navbar.Toggle className={headerStyle.ToggleBtn} aria-controls="basic-navbar-nav" ><SegmentIcon /></Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="m-auto">
                            <Nav className={headerStyle.navLink}>
                                <Link className="nav-link" to="/">Home</Link>
                            </Nav>
                            <Nav className={headerStyle.navLink}><Link className="nav-link" to="/about">About</Link></Nav>
                            <Nav className={headerStyle.navLink}><Link className="nav-link" to="/contact">Contact</Link></Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { rootReducer } = state;
    const { reducersData } = rootReducer;
    const { logoUrl, isFetchingLogo } = reducersData
    return {
        isFetchingLogo,
        logoUrl
    };
}

export default connect(mapStateToProps)(Header)