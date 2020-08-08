import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import PokemonGrid from "components/PokemonsGrid/PokemonsGrid";
import { PokemonRepoInstance } from "repositories/PokemonRepository";
import { Pageable, Pokemon, Resource } from "typings";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(4),
  },
}));

const Home: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  const [data, setData] = useState<Array<Pokemon>>([]);
  const [error, setError] = useState<boolean>(false);

  const loadData = async (): Promise<void> => {
    try {
      const response: Pageable<Resource> = await PokemonRepoInstance.getAll();

      const promises: Array<Promise<Pokemon>> = response.results.map(
        async (resource: Resource) =>
          await PokemonRepoInstance.getByName(resource.name)
      );

      const data: Array<Pokemon> = await Promise.all(promises);

      setData(data);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCloseError = (): void => {
    setError(false);
  };

  return (
    <Container>
      <Typography
        className={classes.title}
        variant="h3"
        component="h1"
        align="center"
      >
        Самый полный список покемонов
      </Typography>

      <Typography
        className={classes.description}
        variant="subtitle1"
        component="h2"
        align="center"
      >
        Самый полный список покемонов специально для Mobalytics
      </Typography>

      <PokemonGrid data={data} />

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

export default Home;
