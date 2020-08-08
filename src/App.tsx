import React, { Suspense } from "react";
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
        </Switch>
      </Router>
    </Suspense>
  </>
);

export default App;
