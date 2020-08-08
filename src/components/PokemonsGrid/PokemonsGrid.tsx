import React from "react";
import { Link, LinkProps } from "react-router-dom";
import Grid, { GridProps } from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Pokemon } from "typings";
import PokemonCard from "components/PokemonCard";

export type PokemonGridProps = {
  data: Array<Pokemon>;
};

const GridLink = React.forwardRef<HTMLLinkElement, GridProps & LinkProps>(
  (props, ref) => <Grid ref={ref} component={Link} {...props} />
);

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
  },
});

const PokemonGrid: React.FC<PokemonGridProps> = ({
  data,
}): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {data.map((pokemon: Pokemon) => (
        <GridLink
          className={classes.link}
          to={`/${pokemon.name}`}
          key={pokemon.id}
          item
          xs={12}
          sm={6}
          md={4}
          lg={2}
        >
          <PokemonCard
            name={pokemon.name}
            picture={pokemon.sprites.front_default}
          />
        </GridLink>
      ))}
    </Grid>
  );
};

export default PokemonGrid;
