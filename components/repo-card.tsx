import * as React from "react";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import styles from "@/components/repo-card.module.css";

import { Edge } from "data.types";

interface RepoCardProps extends Edge {
  favs: string[];
  setFavs: (favs: string[]) => void;
}

export default function RepoCard({
  name,
  description,
  id,
  url,
  stargazers,
  favs,
  setFavs
}: RepoCardProps) {
  const toggleFav = (id: string) => {
    const favsNew = [...favs];
    const favPos = favs.indexOf(id)

    if (favPos>=0) {
      favsNew.splice(favPos, 1)
    } else {
      favsNew.push(id)
    }

    setFavs(favsNew)
  };

  return (
    <Card className={styles.repoCard} key={`repo-${id}`}>
      <CardContent>
        <Typography variant="h6" component="div">
          <Link href={url}>{name}</Link>
        </Typography>
        <Typography variant="body2">
          {description && description.substring(0, 100)}
          {description && description.length > 200 && <>...</>}
        </Typography>
      </CardContent>
      <CardActions className={styles.repoCardActions}>
        <div className={styles.repoCardStars}>
          <StarBorderOutlinedIcon />{" "}
          <Typography variant="body2">{stargazers.totalCount}</Typography>
        </div>
        <button className={styles.repoCardFav} onClick={() => toggleFav(id)}>
          {favs.includes(id) ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
        </button>
      </CardActions>
    </Card>
  );
}
