import { TextField, Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types/product";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getProducts().then((products) => {
            setProducts(products);
        });
    }, []);

    console.log("Products:", products);

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
        <h1>Products</h1>
        <input type="search" placeholder="Search for a Product" value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}></input>
        <TextField id="outlined-basic" label="Outlined" variant="standard" color="secondary" value={searchTerm} 
        placeholder="Search for a Product" onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ backgroundColor: "green", borderRadius: "5px", padding: "10px" }}/>
        <Grid container spacing={2} sx={{ p:2 }}>
            {filteredProducts.map((product) => (
            <Card key={product.id}
            sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <div key={product.id}>
                    <h2>{product.title}</h2>
                    <h3>Description: </h3>
                    <p>{product.description}</p>
                    <h3>Price: </h3>
                    <p>{product.price}€</p>
                    <h3>Category: </h3>
                    <p>{product.category}</p>
                    <h3>Rating: </h3>
                    <p>{product.rating.rate}</p>
                    <h3>Reviews: </h3>
                    <p>{product.rating.count}</p>
                    <h3>Image: </h3>
                    <p><img src={product.image} alt={product.title} /></p>
                </div>
            </Card>
            ))}
        </Grid>
    </div>
  );
};

export default Products;