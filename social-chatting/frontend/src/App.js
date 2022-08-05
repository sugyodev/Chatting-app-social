import { Route } from "react-router-dom";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute"
import GuestRoute from "./components/GuestRoute"

import Home from "./features/home/components/Home";
import Login from "./features/auth/components/Login";
import Signup from "./features/auth/components/Signup";
import Receive from "./features/chat/components/Receive";
import Sent from "./features/chat/components/Sent";
import Compose from "./features/chat/components/Compose";
import Trash from "./features/chat/components/Trash";
import Activate from "./features/auth/components/Activate";
import Chat from "./features/chat/components/Chat";
import  './app.css'

function App() {
  
  return (
    <>
      <Layout>
        <PrivateRoute>
          <Route exact path='/' component={Receive} />
          <Route exact path='/sent/' component={Sent} />
          <Route exact path='/compose/' component={Compose} />
          <Route exact path='/trash/' component={Trash} />
          <Route exact path='/chats/:id/' component={Chat} />
        </PrivateRoute>
        <GuestRoute>
          <Route path='/login/' component={Login} />
          <Route path='/signup/' component={Signup} />
          <Route path='/activate/:uid/:token/' component={Activate} />
        </GuestRoute>
      </Layout>
    </>
  );
}

export default App;


