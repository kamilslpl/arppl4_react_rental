import React, {useState} from 'react';
import classes from './CarForm.module.css';
import Card from "../card/Card";
import {Send} from "@mui/icons-material"
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import connection from "../../axios/axios";
import Notification from "../notification/Notification";
import {useNavigate} from 'react-router-dom';

const DEFAULT_CAR_FORM_VALUES = {
    name: "",
    make: "",
    productionDate: "2000-01-01",
    bodyType: "SUV",
    seats: 1,
    carGearBox: "AUTO",
    engineCapacity: 1.0
}

const CarForm = () => {
    const [car, setCar] = useState({...DEFAULT_CAR_FORM_VALUES});
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const updateCarValue = (event, fieldName) => {
        car[fieldName] = event.target.value;

        // stwórz kopię obiektu
        const carCopy = {...car}
        // const carCopy = Object.assign({}, car)

        // zastąp obecny obiekt
        setCar(carCopy)
    }

    const clearForm = () => {
        // stwórz kopię obiektu
        const carCopy = {...DEFAULT_CAR_FORM_VALUES}

        // zastąp obecny obiekt
        setCar(carCopy)
    }

    const sendForm = () => {
        connection.post("/api/car", car)
            .then((response) => {
                if (response.status === 201) {
                    navigate("/cars")
                }
            })
            .catch((errorResponse) => {
                setNotification("Error addding car: " + errorResponse)
            })
    }

    if (notification != null) {
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    }

    return (
        <div className={classes.CarForm}>
            <Card cardTitle={"Add Car Form"}>
                <Grid container>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField
                            onChange={(event) => {
                                updateCarValue(event, "name")
                            }}
                            value={car.name}
                            label={"Name:"}
                            variant={"filled"}/>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField
                            onChange={(event) => {
                                updateCarValue(event, "make")
                            }}
                            value={car.make}
                            label={"Make:"}
                            variant={"filled"}/>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField
                            onChange={(event) => {
                                updateCarValue(event, "productionDate")
                            }}
                            value={car.productionDate}
                            type={"date"}
                            label={"Production date:"}
                            variant={"filled"}/>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <FormControl fullWidth>
                            <InputLabel id={"bodyType"} variant={"filled"}>Body type:</InputLabel>
                            <Select onChange={(event) => {
                                updateCarValue(event, "bodyType")
                            }}
                                    value={car.bodyType}
                                    labelId={"bodyType"}
                                    label={"Body type:"}
                                    variant={"filled"}>
                                <MenuItem value={"SUV"}>SUV</MenuItem>
                                <MenuItem value={"CABRIO"}>Cabrio</MenuItem>
                                <MenuItem value={"SEDAN"}>Sedan</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField onChange={(event) => {
                            updateCarValue(event, "seats")
                        }}
                                   value={car.seats} type={"number"}
                                   inputProps={{min: "1"}}
                                   label={"Seats:"}
                                   variant={"filled"}>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <FormControl fullWidth>
                            <InputLabel id={"gearbox"} variant={"filled"}>Gearbox:</InputLabel>
                            <Select onChange={(event) => {
                                updateCarValue(event, "carGearBox")
                            }}
                                    value={car.carGearBox}
                                    labelId={"gearbox"}
                                    label={"Gearbox:"}
                                    variant={"filled"}>
                                <MenuItem value={"AUTO"}>Automatic</MenuItem>
                                <MenuItem value={"MANUAL"}>Manual</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField onChange={(event) => {
                            updateCarValue(event, "engineCapacity")
                        }}
                                   value={car.engineCapacity} type={"number"}
                                   inputProps={{step: "0.01", min: "0.1"}}
                                   label={"Engine capacity:"}
                                   variant={"filled"}>
                        </TextField>
                    </Grid>
                    <Grid container className={classes.FormButtonPanel}>
                        <Grid item xs={2}>
                            <Button className={classes.FormButtonClear}
                                    variant={"contained"}
                                    onClick={clearForm}>
                                Clear
                            </Button>
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={2}>
                            <Button className={classes.FormButtonSubmit}
                                    variant={"contained"}
                                    onClick={sendForm}
                                    endIcon={<Send/>}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>

            <Notification>{notification}</Notification>
        </div>
    );
};

export default CarForm;