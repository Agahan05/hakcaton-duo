import React, { useContext, useEffect } from "react";
import { AdminContext } from "../contexts/AdminProvider";
import { DeleteSweep, DriveFileRenameOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function AdminPages() {
  const { phones, getPhones, deletePhons } = useContext(AdminContext);

  useEffect(() => {
    getPhones();
  }, []);

  return (
    <div className="admin-pages">
      <Container>
        <h2>Admin panel</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Picture</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {phones.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.price}$</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>
                  <img width={100} src={item.picture} alt="" />
                </TableCell>
                <TableCell>
                  <DeleteSweep onClick={() => deletePhons(item.id)} />
                </TableCell>
                <TableCell>
                  <Link to={`/admin/edit/${item.id}`}>
                    <DriveFileRenameOutline />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
}

export default AdminPages;
