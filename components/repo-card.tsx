import * as React from "react";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";

import styles from "@/components/repo-card.module.css";

type Edge = {
  createdAt: string;
  description: string;
  name: string;
  id: string;
  stargazers: {
    totalCount: number;
  };
  url: string;
};

export default function RepoCard({
  name,
  description,
  id,
  url,
  stargazers,
}: Edge) {
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
      </CardActions>
    </Card>
  );
}
