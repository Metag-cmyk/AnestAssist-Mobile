import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import Footer from './components/layout/Footer';
// HashRouter is used instead of BrowserRouter so that deep links and cold starts
// resolve correctly inside the packaged Capacitor (file/localhost) shell.
import { HashRouter as Router } from 'react-router-dom';
import { PatientProvider } from './contexts/PatientContext';

export default function App() {
  return (
    <PatientProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <MainContent />
          <Footer />
        </div>
      </Router>
    </PatientProvider>
  );
}
