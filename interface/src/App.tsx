import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/mainLayout/MainLayout';
import ClientRequest from './pages/client-request/ClientRequest';
import NoLayout from './layout/noLayout/NoLayout';
import Signup from './pages/signup-page/Signup';
import Signin from './pages/signin-page/Signin';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/client" element={<ClientRequest />} />
          </Route>
          <Route element={<NoLayout />}>
          <Route  path="/" element={<Signup />} />
          <Route  path="/sign-in" element={<Signin />} />
          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
