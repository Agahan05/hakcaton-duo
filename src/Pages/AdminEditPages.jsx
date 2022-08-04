import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";
import { Container, TextField, Button } from "@mui/material";

function AdminEditPages() {
  const { getPhonsEdit, phonsEdit, saveEditPhons } = useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [picture, setPicture] = useState("");

  const handleSubmit = () => {
    const editedPhons = {
      name,
      brand,
      price,
      year,
      picture,
      id,
    };
    for (let i in editedPhons) {
      if (typeof editedPhons[i] === "string") {
        if (!editedPhons[i].trim()) {
          alert("Не Оставляйте пустыми ");
          return;
        }
      }
    }
    saveEditPhons(editedPhons);
    navigate("/admin");
  };

  useEffect(() => {
    getPhonsEdit(id);
  }, []);

  useEffect(() => {
    if (phonsEdit) {
      setName(phonsEdit.name);
      setBrand(phonsEdit.brand);
      setPrice(phonsEdit.price);
      setYear(phonsEdit.year);
      setPicture(phonsEdit.picture);
    }
  }, [phonsEdit]);

  return (
    <div className="admin-edit-pages">
      <Container>
        <h2>Edit</h2>
        <form>
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

export default AdminEditPages;
