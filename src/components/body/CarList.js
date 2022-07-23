import React, {useEffect, useState} from 'react';
import classes from './CarList.module.css';
import {Button, Grid, IconButton} from "@mui/material"
import connection from "../../axios/axios";
import Card from "../card/Card";
import Notification from "../notification/Notification";
import {ControlPoint} from "@mui/icons-material";
import {Link} from "react-router-dom";



const CarList = () => {
    const [carList, setCarList] = useState([]);
    const [notification, setNotification] = useState(null);


    useEffect(() => {
        connection.get("/api/car/list")        // fire and forget
            .then((response) => {
                console.log("OK! ");
                console.log(response);

                setCarList(response.data);
            })
            .catch((errorResponse) => {
                console.log("ErRoR: " + errorResponse);
            });
    }, []);

    const functionClickDelete = (paramId) => {
        console.log("Wywołano usun parametr id:" + paramId)
        connection.delete("/api/car/delete/" + paramId)        // fire and forget
            .then((response) => {
                setNotification("Car " + paramId + " has been deleted");
                for (var i=0; i<carList.length; i++){
                    if(carList[i].carId===paramId){
                        carList.splice(i,1)
                    }
                }

                const carListCopy = [...carList];
                setCarList(carListCopy);

            })
            .catch((errorResponse) => {
                setNotification("Unable to remove car " + paramId + " " + errorResponse);
            });
    }
    if (notification != null){
        setTimeout(() => {
            console.log("Timer zakonczyl prace!")
            setNotification(null);
        }, 5000)
    }

    console.log("Przeładowuje")
    return (
        <div className={classes.CarList}>
            <Link to={"/cars/form"}>
                <IconButton>
                    <ControlPoint>

                    </ControlPoint>
                </IconButton>

            </Link>

            {/*<div className={classes.BodyContainer}>*/}
            {/*    <div className={classes.ContainerHeader}>*/}
            {/*        Cars for rent*/}
            {/*    </div>*/}
            {/*    <div className={classes.ContainerBody}>*/}

            {/*    </div>*/}
            {/*</div>*/}

            <Card cardTitle={"Cars for rent"}>
                <Grid container direction={"row"}> {/*cała tabela*/}
                    <Grid container className={classes.TableHeader}> {/*wiersz nagłówka*/}
                        <Grid item xs={2}>Id</Grid>
                        <Grid item xs={2}>Name</Grid>
                        <Grid item xs={2}>Make</Grid>
                        <Grid item xs={2}>Body Type</Grid>
                        <Grid item xs={2}>Gearbox</Grid>
                        <Grid item xs={2}></Grid>
                    </Grid>
                    {
                        carList.map((elementListy) => {
                            return (
                                <Grid key={elementListy.carId} container
                                    className={classes.TableRow}> {/*wiersz nagłówka*/}
                                    <Grid item xs={2}>{elementListy.carId}</Grid>
                                    <Grid item xs={2}>{elementListy.name}</Grid>
                                    <Grid item xs={2}>{elementListy.make}</Grid>
                                    <Grid item xs={2}>{elementListy.bodyType}</Grid>
                                    <Grid item xs={2}>{elementListy.carGearBox}</Grid>
                                    <Grid item xs={2}>
                                        <Button variant="contained" color="error" onClick={() => {
                                            functionClickDelete(elementListy.carId)
                                        }}>
                                            Delete
                                        </Button>

                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Grid>

            </Card>

            {
                notification!=null ? (<Notification> {notification}</Notification>) : (<div></div>)
            }
        </div>
    );
};

export default CarList;