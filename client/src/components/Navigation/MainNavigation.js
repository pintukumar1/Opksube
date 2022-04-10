import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MainHeader from './MainHeader'
import classes from './MainNavigation.module.css'
import Navlinks from './Navlinks'

function MainNavigation() {
    return (
        <React.Fragment>
            <MainHeader>
                <nav className={classes['main-navigation__header-nav']}>
                    <Navlinks />
                </nav>
            </MainHeader>
        </React.Fragment>

    )
}

export default MainNavigation