import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, CircularProgress } from "@material-ui/core";
import Home from "pages/Home";

const App: React.FC = (): React.ReactElement => (
  <>
    <CssBaseline />
    <Suspense fallback={<CircularProgress />}>
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route
            path="/:name"
            component={lazy(() => import("pages/Detail"))}
            exact
          />
          <Route path="*" component={lazy(() => import("pages/NotFound"))} />
        </Switch>
      </Router>
    </Suspense>
  </>
);

export default App;
