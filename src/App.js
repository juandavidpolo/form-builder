import React from "react";

import { Container } from 'reactstrap';

import 'src/assets/styles/index.scss';

import Builder from "src/components/builder";
import NotificationsManager from "src/components/notifications";


function App() {
  return (
    <>
      <Container className="main--container" fluid>
        <Builder/>
      </Container>
      <NotificationsManager/>
    </>
  );
}

export default App;