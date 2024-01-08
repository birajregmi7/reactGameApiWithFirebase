import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { database } from "../../firebase";
import { set, ref, update, get } from "firebase/database";

export default function RecipeReviewCard({ data }) {
  const [favorites, setFavorites] = useState({});
  const [arr, setArr] = useState([]);
  // localStorage.setItem("user", user);
  let locDat = localStorage.getItem("user");
  console.log("LocalStorage:", locDat);

  const toggleFavorite = (cardId, cardData) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [cardId]: !prevFavorites[cardId],
    }));

    const uid = localStorage.getItem("user");
    const userFavPath = `user/${uid}/fav`;

    if (!favorites[cardId]) {
      // Add the cardData to the array
      const newArr = [...arr, cardData];
      setArr(newArr);
      // Update the database with the new array
      update(ref(database, userFavPath), { arr: newArr });
    } else {
      // Remove the cardData from the array
      const newArr = arr.filter((item) => item.id !== cardId);
      setArr(newArr);
      // Update the database with the new array
      update(ref(database, userFavPath), { arr: newArr });
    }
  };

  const fetchFavorites = async () => {
    try {
      const uid = localStorage.getItem("user");
      const userFavPath = `user/${uid}/fav`;

      const snapshot = await get(ref(database, userFavPath));

      if (snapshot.exists()) {
        const favoritesData = snapshot.val();
        const favoritesArray = favoritesData.arr || [];
        setArr(favoritesArray);

        const favoritesMap = {};
        favoritesArray.forEach((item) => {
          favoritesMap[item.id] = true;
        });

        setFavorites(favoritesMap);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []); // Fetch favorites on component mount

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="flex flex-row flex-wrap justify-center">
        {data.map((list) => (
          <Card
            sx={{
              maxWidth: 345,
              width: "20rem",
              backgroundColor: "#F5F2F0",
              margin: "10px", // Add margin for spacing between cards
            }}
            key={list.id}
          >
            <CardHeader
              title={
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  {list.name}
                </Typography>
              }
              sx={{ textAlign: "center" }}
            />
            <CardMedia
              component="img"
              height="194"
              width="auto"
              image={list.background_image}
              sx={{
                width: "auto",
                height: 400,
              }}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Release Date: {list.released}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Updated Date: {list.updated.toString()}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="add to favorites"
                onClick={() => toggleFavorite(list.id, list)}
              >
                {favorites[list.id] ? (
                  <FavoriteIcon className="text-red-700" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}
