import React from "react";
import { Link, LinkProps } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button, { ButtonProps } from "@material-ui/core/Button";

const ButtonLink = React.forwardRef<HTMLLinkElement, ButtonProps & LinkProps>(
  (props, ref): React.ReactElement => (
    <Button component={Link} ref={ref} {...props} />
  )
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

const NotFound: React.FC = (): React.ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h1">
        Страница не найдена!
      </Typography>

      <ButtonLink to="/" color="primary">
        Вернуться на главную
      </ButtonLink>
    </div>
  );
};

export default NotFound;
