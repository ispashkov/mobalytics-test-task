import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import cn from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { Pokemon, Stat, Type } from "typings";
import { PokemonRepoInstance } from "repositories/PokemonRepository";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
  rootLoading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: theme.spacing(2),
    textTransform: "capitalize",
  },
  description: {
    marginBottom: theme.spacing(4),
  },
  tableLabel: {
    fontWeight: theme.typography.fontWeightBold,
    textTransform: "capitalize",
  },
  tableValue: {
    color: theme.palette.grey.A200,
    textTransform: "capitalize",
  },
}));

const Detail: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const { name } = useParams<Pick<Pokemon, "name">>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const types = useMemo((): string => {
    if (pokemon) {
      return pokemon.types.map((type: Type) => type.type.name).join(", ");
    }

    return "";
  }, [pokemon]);

  const loadData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const pokemon: Pokemon = await PokemonRepoInstance.getByName(name);

      setPokemon(pokemon);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCloseError = (): void => {
    setError(false);
  };

  return (
    <Container
      className={cn(classes.root, {
        [classes.rootLoading]: loading,
      })}
    >
      {loading && <CircularProgress />}

      {!loading && pokemon && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              className={classes.title}
              variant="h3"
              component="h1"
              align="center"
            >
              {pokemon.name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              title={pokemon.name}
              width="100%"
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Typography className={classes.description} align="center">
              Параметры {pokemon.name}
            </Typography>

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tableLabel}>Type</TableCell>
                  <TableCell className={classes.tableValue}>{types}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableLabel}>Height</TableCell>
                  <TableCell className={classes.tableValue}>
                    {pokemon.height}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className={classes.tableLabel}>Weight</TableCell>
                  <TableCell className={classes.tableValue}>
                    {pokemon.weight}
                  </TableCell>
                </TableRow>

                {pokemon.stats.map((stat: Stat) => (
                  <TableRow key={stat.stat.name}>
                    <TableCell className={classes.tableLabel}>
                      {stat.stat.name}
                    </TableCell>
                    <TableCell className={classes.tableValue}>
                      {stat.base_stat}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      )}

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={error}
        onClose={handleCloseError}
        message="Произошла ошибка"
      />
    </Container>
  );
};

export default Detail;
