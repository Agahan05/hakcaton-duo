import React, { useContext, useState } from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { AdminContext } from "../contexts/AdminProvider";

function AdminAddPages() {
  const { sendNewPhones } = useContext(AdminContext);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [picture, setPicture] = useState("");

  const handleSubmit = () => {
    const newPhons = {
      name: name.trim(),
      brand: brand.trim(),
      price,
      year: year.trim(),
      picture: picture.trim(),
    };
    for (let i in newPhons) {
      if (!newPhons[i]) {
        alert("Заполни шшсгн");
        return;
      }
    }
    sendNewPhones(newPhons);
    setName("");
    setBrand("");
    setPrice("");
    setYear("");
    setPicture("");
  };

  return (
    <div className="admin-add-pages">
      <Container>
        <h2>Add item</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Name"
            variant="standard"
          />
          <TextField
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            label="Brand"
            variant="standard"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            label="Price"
            variant="standard"
            type="number"
          />
          <TextField
            value={year}
            onChange={(e) => setYear(e.target.value)}
            variant="standard"
            type="date"
          />
          <TextField
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
            label="Picture"
            variant="standard"
          />
          <Button variant="outlined" type="submit">
            Save
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminAddPages;
