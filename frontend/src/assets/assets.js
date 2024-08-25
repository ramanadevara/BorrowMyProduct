import basket_icon from "./basket_icon.png"
import logo from "./logo.png"
import search_icon from "./search_icon.png"
import add_icon_white from "./add_icon_white.png"
import add_icon_green from "./add_icon_green.png"
import remove_icon_red from "./remove_icon_red.png"
import app_store from "./app_store.png"
import play_store from "./play_store.png"
import linkedin_icon from "./linkedin_icon.png"
import facebook_icon from "./facebook_icon.png"
import twitter_icon from "./twitter_icon.png"
import cross_icon from "./cross_icon.png"
import selector_icon from "./selector_icon.png"
import profile_icon from "./profile_icon.png"
import bag_icon from "./bag_icon.png"
import logout_icon from "./logout_icon.png"
import logo_borrow from "./logo_borrow.jpg"
import upload_area from "./upload_area.png"

import product_1 from "./electronics_camera.jpg"
import product_2 from "./electronics_laptop.jpg"
import product_3 from "./electronics_mobile.jpg"
import product_4 from "./electronics_ps5.jpg"
import product_5 from "./electronics_tv.jpg"
import product_6 from "./clothing_graduation.jpg"
import product_7 from "./clothing_handbag.jpg"
import product_8 from "./clothing_skisuite.jpg"
import product_9 from "./clothing_tuxedo.jpg"
import product_10 from "./clothing_wedding.jpg"
import product_11 from "./home_barbecue.jpg"
import product_12 from "./home_chair.jpg"
import product_13 from "./home_table.jpg"
import product_14 from "./home_tent.jpeg"

export const assets = {
  basket_icon,
  search_icon,
  add_icon_green,
  add_icon_white,
  remove_icon_red,
  app_store,
  play_store,
  linkedin_icon,
  facebook_icon,
  twitter_icon,
  cross_icon,
  selector_icon,
  profile_icon,
  logout_icon,
  bag_icon,
  logo_borrow,
  upload_area,
}

export const categories = [
  "Electronics",
  "Clothing",
  "Home",
  "Beauty",
  "Books",
  "Toys",
  "All",
]

export const products_list = [
  {
    _id: "1",
    name: "Nikon Camera",
    image: product_1,
    price: 12,
    category: "Electronics",
  },
  {
    _id: "2",
    name: "Laptop",
    image: product_2,
    price: 18,
    category: "Electronics",
  },
  {
    _id: "3",
    name: "iPhone",
    image: product_3,
    price: 16,
    category: "Electronics",
  },
  {
    _id: "4",
    name: "PS5",
    image: product_4,
    price: 24,
    category: "Electronics",
  },
  {
    _id: "5",
    name: "LG TV",
    image: product_5,
    price: 14,
    category: "Electronics",
  },
  {
    _id: "6",
    name: "Graduation gown",
    image: product_6,
    price: 12,
    category: "Clothing",
  },
  {
    _id: "7",
    name: "Handbag",
    image: product_7,
    price: 20,
    category: "Clothing",
  },
  {
    _id: "8",
    name: "Skisuit",
    image: product_8,
    price: 15,
    category: "Clothing",
  },
  {
    _id: "9",
    name: "Tuxedo",
    image: product_9,
    price: 14,
    category: "Clothing",
  },
  {
    _id: "10",
    name: "Wedding",
    image: product_10,
    price: 22,
    category: "Clothing",
  },
  {
    _id: "11",
    name: "Barbecue grill",
    image: product_11,
    price: 10,
    category: "Home",
  },
  {
    _id: "12",
    name: "Chair",
    image: product_12,
    price: 12,
    category: "Home",
  },
  {
    _id: "13",
    name: "Table",
    image: product_13,
    price: 12,
    category: "Home",
  },
  {
    _id: "14",
    name: "Tent",
    image: product_14,
    price: 18,
    category: "Home",
  },
]
