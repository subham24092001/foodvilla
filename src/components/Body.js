import React, { useEffect, useState } from "react";
import useRestaurantData from "../utils/useRestaurantData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import FoodCarousel from "./FoodCarousel";
import RestaurantCarousel from "./RestaurantCarousel";
import ItemCarousel from "./ItemCarousel";
import ButtonList from "./ButtonList";
import ShimmerCursor from "./ShimmerCursor";

const Body = () => {
  const [searchText, setSearchText] = useState("");
  const [Loading, setLoading] = useState(false);
  const [page, setPage] = useState(10);
  const {
    carousel,
    allRestaurants,
    filteredRestaurants,
    setFilteredRestaurants,
    setAllRestaurants,
    restaurantCarousel,
    itemCarousel,
  } = useRestaurantData();
  

  async function getRestaurantMore() {
    setLoading(true);
    try {
      const response = await fetch(
        "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/update",
        {
          // Use POST to fetching more restaurants
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lat: 12.9715987,
            lng: 77.5945627,
            // Use the correct nextOffset value
            nextOffset: "COVCELQ4KID4ruup+9+KczCnEzgD",
            // Other payload parameters if needed
            seoParams: {
              apiName: "FoodHomePage",
              pageType: "FOOD_HOMEPAGE",
              seoUrl: "https://www.swiggy.com/",
            },
            widgetOffset: {
              // Include your widgetOffset values here
              NewListingView_Topical_Fullbleed: "",
              NewListingView_category_bar_chicletranking_TwoRows: "",
              NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
              collectionV5RestaurantListWidget_SimRestoRelevance_food_seo:
                String(page),
            },
          }),
        }
      );
      const data = await response.json();

      if (allRestaurants) {
        let newRestaurants =
          data.data.cards[0].card.card.gridElements.infoWithStyle.restaurants;

        setFilteredRestaurants((prevRestaurants) => [
          ...prevRestaurants,
          ...newRestaurants,
        ]);
        setAllRestaurants((prevRestaurants) => [
          ...prevRestaurants,
          ...newRestaurants,
        ]);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (page > 10) {
      getRestaurantMore();
    }
  }, [page]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 15);
      }
    } catch (error) {}
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  if (!allRestaurants) {
    return (
      <div>
        <ShimmerCursor />
        <Shimmer />
      </div>
    );
  }
  return allRestaurants.length === 0 ? (
    <div>
      <ShimmerCursor />
      <Shimmer />
    </div>
  ) : (
    <>
      <div className="mx-8 sm:mx-14 md:mx-24 lg:mx-44 pb-4">
        {carousel && <FoodCarousel data={carousel} />}
      </div>

      <div className="mx-8 sm:mx-14 md:mx-24 lg:mx-44 pb-4">
        <ItemCarousel data={itemCarousel} />
      </div>

      <hr className="mx-8 sm:mx-14 md:mx-24 lg:mx-44 border-1 border-solid border-gray-300 my-8" />

      <div className="mx-8 sm:mx-14 md:mx-24 lg:mx-40 p-4">
        <RestaurantCarousel data={restaurantCarousel} />
      </div>

      <hr className="mx-8 sm:mx-14 md:mx-24 lg:mx-44 border-1 border-solid border-gray-300 my-8" />

      <div className="mx-8 sm:mx-14 md:mx-24 lg:mx-44 ">
        <h1 className="font-bold text-2xl pb-4">
          Restaurants which provide online food delivery
        </h1>
        <div>
          <ButtonList />
        </div>
        <div
          className="grid grid-cols-1 mx-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-8 mt-8"
          data-testid="res-list"
        >
          {filteredRestaurants &&
            filteredRestaurants.map((restaurant) => {
              return (
                <Link
                  to={"/restaurant/" + restaurant.info.id}
                  key={restaurant.info.id}
                  className="pr-4"
                >
                  <RestaurantCard {...restaurant.info} />
                </Link>
              );
            })}
        </div>
      </div>
      {Loading && <Shimmer />}
    </>
  );
};

export default Body;

