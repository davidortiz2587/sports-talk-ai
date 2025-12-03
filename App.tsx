import React, { useState, useCallback } from 'react';
import { Sport, ConversationResponse } from './types';
import { fetchConversationTopics } from './services/geminiService';
import SportCard from './components/SportCard';
import ResultsView from './components/ResultsView';
import { Loader2, Flame } from 'lucide-react';

const App: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ConversationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSportSelect = useCallback(async (sport: Sport) => {
    setSelectedSport(sport);
    setLoading(true);
    setError(null);
    try {
      const result = await fetchConversationTopics(sport);
      setResponse(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setSelectedSport(null); // Reset on error to allow retry
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setSelectedSport(null);
    setResponse(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center py-12 px-4 sm:px-6">
      {/* Header */}
      <header className="mb-12 text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-blue-500/10 mb-4">
          <Flame className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          Sports Talk GenAI
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Select a sport to get instant conversation starters based on the latest news and events, powered by Google Gemini.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-5xl">
        {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-center">
              {error}
            </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-6" />
            <h3 className="text-xl font-medium text-slate-300">Checking the latest stats for {selectedSport}...</h3>
            <p className="text-slate-500 mt-2">Connecting to live search results</p>
          </div>
        )}

        {/* Selection State */}
        {!selectedSport && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            <SportCard 
              sport={Sport.BASKETBALL} 
              onSelect={handleSportSelect} 
            />
            <SportCard 
              sport={Sport.HOCKEY} 
              onSelect={handleSportSelect} 
            />
            <SportCard 
              sport={Sport.FOOTBALL} 
              onSelect={handleSportSelect} 
            />
          </div>
        )}

        {/* Result State */}
        {!loading && response && selectedSport && (
          <ResultsView 
            sport={selectedSport} 
            data={response} 
            onReset={handleReset} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto pt-12 text-slate-600 text-sm">
        <p>Powered by Google Gemini 2.5 Flash & Grounding with Google Search</p>
      </footer>
    </div>
  );
};

export default App;
