import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import Footer from './components/layout/Footer';
import { NavigationProvider } from './contexts/NavigationContext';

export default function App() {
  return (
    <NavigationProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </NavigationProvider>
  );
}
