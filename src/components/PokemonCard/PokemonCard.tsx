import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";

export type PokemonCardProps = {
  name: string;
  picture: string;
};

const useStyles = makeStyles({
  name: {
    textTransform: "capitalize",
  },
});

const PokemonCard: React.FC<PokemonCardProps> = ({
  picture,
  name,
}): React.ReactElement => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={name}
          height={192}
          image={picture}
          title={name}
        />
        {name && (
          <CardContent>
            <Typography className={classes.name}>{name}</Typography>
          </CardContent>
        )}
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;
