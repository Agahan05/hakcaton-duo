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
  const {
    phones,
    getPhones,
    filterByPrice,
    setFilterByPrice,
    minMax,
    pagesCount,
    setCurrentPage,
    currentPage,
  } = React.useContext(ClientContext);

  React.useEffect(() => {
    getPhones();
  }, [filterByPrice, currentPage]);

  return (
    <div className="main-page">
      <Container>
        <h2>Entire Catalog</h2>
        <div className="filter-block">
          <h4>Filtration by price</h4>
          <Slider
            sx={{
              width: 400,
              color: "black",
            }}
            max={minMax[1]}
            min={minMax[0]}
            valueLabelDisplay="auto"
            value={filterByPrice}
            onChange={(e, newValue) => setFilterByPrice(newValue)}
          />
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
        <div className="pagination-block">
          <Pagination
            count={pagesCount}
            variant="outlined"
            shape="rounded"
            onChange={(_, newValue) => setCurrentPage(newValue)}
          />
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
