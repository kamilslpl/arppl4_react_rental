import React from 'react';
import classes from '../notification/Notification.module.css';
const Notification = (props) => {
    return (
        <div className={classes.NotificationContainer}>
            <div className={classes.NotificationBody}>
                {props.children}
            </div>
        </div>
    );
};

export default Notification;