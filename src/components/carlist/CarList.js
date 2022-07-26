import React, {useEffect, useState} from 'react';
import classes from './CarList.module.css';
import {Button, Grid, IconButton} from "@mui/material"
import connection from "../../axios/axios";
import Card from "../card/Card";
import Notification from "../notification/Notification";
import {Link} from "react-router-dom";
import {ControlPoint} from "@mui/icons-material";

const CarList = () => {
    const [carList, setCarList] = useState([]);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        connection.get("/api/car")        // fire and forget
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
        console.log("Wywołano usuń - parametr id: " + paramId)

        connection.delete("/api/car/" + paramId)
            .then((response) => {
                setNotification("Car has been deleted!")

                // 1. carList - znajdz element o id: paramId
                for (var i = 0; i < carList.length; i++) {
                    if (carList[i].carId === paramId) {
                        // 2. usun element o id: paramId z listy carList
                        carList.splice(i, 1)
                    }
                }

                // 3. stwórz kopię listy carList
                const carListCopy = [...carList];

                // 4. zastąp obecną listę
                setCarList(carListCopy);
            })
            .catch((errorResponse) => {
                setNotification("Unable to remove car: " + errorResponse)
            });
    }

    if (notification != null) {
        setTimeout(() => {
            console.log("Timer zakończył pracę!")
            setNotification(null);
        }, 5000);
    }

    return (
        <div className={classes.CarList}>
            <div className={classes.PlusButtonAlignedRight}>
                <Link to={"/cars/form"}>
                    <IconButton className={classes.PlusButtonIcon}>
                        <ControlPoint/>
                    </IconButton>
                </Link>
            </div>
            <Card cardTitle={"Super Cars for Rent"}>
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
                                            functionClickDelete(elementListy.carId);
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
            <Notification>{notification}</Notification>
        </div>
    );
};

export default CarList;