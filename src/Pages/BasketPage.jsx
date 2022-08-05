import React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";

function BasketPage() {
  const { getPhonesFromBasket, basketPhones } = React.useContext(ClientContext);

  React.useEffect(() => {
    getPhonesFromBasket();
  }, []);

  if (!basketPhones) {
    return (
      <div className="basket-page">
        <Container>
          <h2>Basket is empty for now</h2>
        </Container>
      </div>
    );
  }

  return (
    <div className="basket-page">
      <Container>
        <h2>Basket</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name:</TableCell>
              <TableCell>Photo:</TableCell>
              <TableCell>Price:</TableCell>
              <TableCell>Count:</TableCell>
              <TableCell>Amount:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basketPhones.products.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <img width={60} src="{item.photo}" alt="" />
                </TableCell>
                <TableCell>{item.price} $</TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.subPrice} som</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Price:</TableCell>
              <TableCell colSpan={1}>{basketPhones.totalPrice} $</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </div>
  );
}

export default BasketPage;
