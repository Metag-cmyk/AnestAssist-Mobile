import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans antialiased text-slate-900 bg-slate-50">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </Router>
  );
}
