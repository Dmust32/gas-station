import React from 'react';
import { Grid, Card, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    minWidth: 320,
    maxWidth: 400,
  },
  content: {
    padding: 0
  },
  img: {
    height: 60,
    maxWidth:200,
    fontSize: 60,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#595959',
    color: '#F2F2F2',
  }
});

const GasCard = (props) => {
  const classes = useStyles();
  const {
    station: name,
    address,
    reg_price: price,
    distance
  } = props;

  return (
    <Grid
      item
    >
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <div className={classes.container}>
            <img className={classes.img} src={`//logo.clearbit.com/${name}.com?size=200x200`} alt='Brand' onError={(e) => e.target.src = '/gas_pump.png'} />
          </div>
          <div className={`${classes.details}`}>
            <div className={classes.container}>
              <p>{name}</p>
              <p>{address}</p>
            </div>
            <div className={classes.container}>
              <p>${price}</p>
              <p>{distance}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
    
  );
};

export default GasCard;
