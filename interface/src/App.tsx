import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/mainLayout/MainLayout';
import ClientRequest from './pages/client-request/ClientRequest';
import NoLayout from './layout/noLayout/NoLayout';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<ClientRequest />} />
          </Route>
          <Route element={<NoLayout />}>
            {/* <Route path="/login" element={<LoginPage />} /> */}
          </Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
