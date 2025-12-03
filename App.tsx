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
    <div style={{ paddingTop: 32 }}>
      {!loading && !response && (
        <header style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 48, fontWeight: 700, color: '#000', margin: 0 }}>I want to talk about sports</h1>
          <p style={{ fontSize: 14, color: '#333' }}>
            Select a sport to get instant conversation starters based on the latest news and events, powered by Google Gemini.
          </p>
        </header>
      )}

      <main>
        {error && (
          <div style={{
            marginBottom: 16,
            padding: 12,
            border: '1px solid #dd0000',
            background: '#ffeeee',
            color: '#990000',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={{
            padding: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 10, height: 10, background: '#0000cc', animation: 'blink 1s infinite' }} />
              <div style={{ width: 10, height: 10, background: '#2e8b57', animation: 'blink 1s infinite 0.2s' }} />
              <div style={{ width: 10, height: 10, background: '#cc6600', animation: 'blink 1s infinite 0.4s' }} />
              <div style={{ width: 10, height: 10, background: '#008b8b', animation: 'blink 1s infinite 0.6s' }} />
            </div>
            <p style={{ color: '#333', fontSize: 14 }}>Loading results for {selectedSport}...</p>
            <style>{`@keyframes blink { 50% { opacity: 0.3; } }`}</style>
          </div>
        )}

        {!selectedSport && !loading && (
          <div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <SportCard sport={Sport.BASKETBALL} onSelect={handleSportSelect} />
              <SportCard sport={Sport.HOCKEY} onSelect={handleSportSelect} />
              <SportCard sport={Sport.FOOTBALL} onSelect={handleSportSelect} />
            </div>
          </div>
        )}

        {!loading && response && selectedSport && (
          <ResultsView sport={selectedSport} data={response} onReset={handleReset} />
        )}
      </main>

      <footer className="footer">
        <p>Powered by Google Gemini 2.5 Flash & Grounding with Google Search</p>
      </footer>
    </div>
  );
};

export default App;
