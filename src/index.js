import getProductList from "./mock/data.js";
import renderGoodsList from "./showcase.js";
import "./style/style.scss";

const productList = getProductList(20);

renderGoodsList(productList);