import React from "react";
import { ClientContext } from "../contexts/ClientProvider";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Slider,
  Pagination,
} from "@mui/material";

function MainPage() {
  const { phones, getPhones } = React.useContext(ClientContext);

  React.useEffect(() => {
    getPhones();
  }, []);
  return (
    <div className="main-page">
      <Container>
        <h2>Entire Catalog</h2>
        <div className="filter-block">
          <h4>Filtration by price</h4>
          <Slider />
        </div>
        <div className="products">
          {phones.map((item) => (
            <Card key={item.id} className="product-card">
              <CardMedia component="img" height={140} image={item.picture} />
              <CardContent>
                <Typography
                  className="product-card-title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {item.name}
                </Typography>
                <ul className="product-card-ul">
                  <li>
                    <span>Brand:</span>
                    <span>{item.brand}</span>
                  </li>
                  <li>
                    <span>Price:</span>
                    <span>{item.price}</span>
                  </li>
                  <li>
                    <span>Release date:</span>
                    <span>{item.year}</span>
                  </li>
                </ul>
                <Button>Add to Basket</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
