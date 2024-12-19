import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HighlightedSolutions } from './components/HighlightedSolutions';
import { TechnicalAreas } from './components/technical-areas/TechnicalAreas';
import { WorldMap } from './components/WorldMap';
import { SolutionForm } from './components/SolutionForm';
import { Footer } from './components/Footer';
import { useProjects } from './hooks/useProjects';
import { Loader2 } from 'lucide-react';

function MainApp() {
  const [showForm, setShowForm] = React.useState(false);
  const { loading, error } = useProjects();

  const handleSubmitClick = () => {
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600 p-8 bg-red-50 rounded-lg max-w-md">
          <h2 className="text-xl font-bold mb-2">Error Loading Application</h2>
          <p className="mb-4">{error}</p>
          <p className="text-sm">Please check your internet connection and try again.</p>
        </div>
      </div>
    );
  }

  if (showForm) {
    return <SolutionForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onSubmitClick={handleSubmitClick} />
      <Hero />
      <main className="container mx-auto px-4 py-12">
        <HighlightedSolutions />
        <TechnicalAreas />
        <WorldMap />
      </main>
      <Footer onSubmitClick={handleSubmitClick} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainApp />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}