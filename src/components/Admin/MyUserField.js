import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    active: {
        color: 'green',
    },
    notActive: {
        color: 'red',
    }
});

const MyUrlField = ({ record = {}, source }) => {
    const classes = useStyles();
    return (
        record[source]==="Active"
        ?<span className={classes.active}>{record[source]}</span> 
        :<span className={classes.notActive}>{record[source]}</span> 

    );
}

export default MyUrlField;