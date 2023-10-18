import React  from "react";
import Banner from "../components/Banner";
import BestSellerBooks from "./BestSellerBooks";
import FavouriteBooks from "./FavouriteBooks";
import PromoBanner from "./PromoBanner";
import OtherBooks from "./OtherBooks";
import Review from "./Review";

const Home = () =>{
    return (
       <div>
        <Banner />
        <BestSellerBooks />
        <FavouriteBooks />
        <PromoBanner />
        <OtherBooks />
        <Review />
       </div>
    )
}

export default Home;