import React, { useState } from 'react'
import MainHeader from './MainHeader'
import classes from './MainNavigation.module.css'
import Navlinks from './Navlinks'

function MainNavigation() {
    return (
        <React.Fragment>
            <MainHeader>
                <div className={classes['main-navigation__menu-btn']}>
                    <span />
                    <span />
                    <span />
                </div>
                <nav className={classes['main-navigation__header-nav']}>
                    <Navlinks />
                </nav>
            </MainHeader>
        </React.Fragment>

    )
}

export default MainNavigation