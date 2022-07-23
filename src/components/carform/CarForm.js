import React, {useState} from 'react';
import classes from "./CarForm.module.css";
import Card from "../card/Card"
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";

const DEAFAULT_CAR_FORM_VALUES = {
    name:"",
    make:"",
    productionDate:"2000-01-01",
    bodyType:"SUV",
    seats: 1,
    carGearBox:"AUTO",
    engineCapacity: 1.0
}

const CarForm = () => {
    const [car, setCar] = useState(DEAFAULT_CAR_FORM_VALUES);
    const updateCarValue = (event, fieldName) => {
        car[fieldName] = event.target.value;
        const carCopy = Object.assign({}, car)
        setCar(carCopy)
        //zeby sobie podejrzec
        console.log(carCopy.name)
    }
    return (
        <div className={classes.CarForm}>
            <Card cardTitle={"Add Car Form"}>
                <Grid container>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField onChange={(event)=>{updateCarValue(event, "name")}} defaultValue={car.name} label={"Name:"} variant={"filled"}></TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField onChange={(event)=>{updateCarValue(event, "make")}}defaultValue={car.make} label={"Make:"} variant={"filled"}></TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField onChange={(event)=>{updateCarValue(event, "productionDate")}}defaultValue={car.productionDate} type={"date"} label={"Production date:"} variant={"filled"}></TextField>
                    </Grid>
                    <Grid item xs={12}  className={classes.FormItem}>
                        <FormControl fullWidth>
                            <InputLabel id={"bodyType"} variant={"filled"}>Body type:</InputLabel>
                            <Select onChange={(event)=>{updateCarValue(event, "bodyType")}} defaultValue={car.bodyType} labelId={"bodyType"} label={"BodyType"} variant={"filled"}>
                                <MenuItem value={"SUV"}>Suv</MenuItem>
                                <MenuItem value={"CABRIO"}>Cabrio</MenuItem>
                                <MenuItem value={"SEDAN"}>Sedan</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField onChange={(event)=>{updateCarValue(event, "seats")}} defaultValue={car.seats} type={"number"} inputProps={{step: "1", min: "1"}} label={"Seats:"}
                                   variant={"filled"}></TextField>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <FormControl fullWidth>
                            <InputLabel id={"gearbox"} variant={"filled"}>Gearbox:</InputLabel>
                            <Select onChange={(event)=>{updateCarValue(event, "carGearBox")}} defaultValue={car.carGearBox} labelId={"gearbox"} label={"Gearbox:"} variant={"filled"}>
                                <MenuItem value={"AUTO"}>Auto</MenuItem>
                                <MenuItem value={"MANUAL"}>Manual</MenuItem>
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.FormItem}>
                        <TextField onChange={(event)=>{updateCarValue(event, "engineCapacity")}} defaultValue={car.engineCapacity} type={"number"} inputProps={{step: "0.1", min: "1.0"}} label={"Engine capacity:"}
                                   variant={"filled"}></TextField>
                    </Grid>
                </Grid>
            </Card>
        </div>
    );
};

export default CarForm;