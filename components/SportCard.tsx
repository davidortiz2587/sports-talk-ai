import React from 'react';
import { Sport } from '../types';

interface SportCardProps {
  sport: Sport;
  onSelect: (sport: Sport) => void;
  disabled?: boolean;
}

const SportCard: React.FC<SportCardProps> = ({ sport, onSelect, disabled }) => {
  const getIcon = () => {
    switch (sport) {
      case Sport.BASKETBALL:
        return <img src="/basketball.png" alt="Basketball" style={{ width: 30, height: 30 }} />;
      case Sport.HOCKEY:
        return <img src="/hockey.png" alt="Hockey" style={{ width: 30, height: 30 }} />;
      case Sport.FOOTBALL:
        return <img src="/americanfootball.png" alt="Football" style={{ width: 30, height: 30 }} />;
    }
  };

  const getDescription = () => {
    switch (sport) {
      case Sport.BASKETBALL:
        return "On-court action and off-court stories for the NBA.";
      case Sport.HOCKEY:
        return "NHL highlights, player stats, and game analysis.";
      case Sport.FOOTBALL:
        return "Latest NFL news, scores, and player updates.";
    }
  };

  const getColors = () => {
    switch (sport) {
      case Sport.BASKETBALL:
        return { bg: '#fff7e6', accent: '#cc6600' };
      case Sport.HOCKEY:
        return { bg: '#e6f7f7', accent: '#008b8b' };
      case Sport.FOOTBALL:
        return { bg: '#e9f7ee', accent: '#2e8b57' };
    }
  };

  const colors = getColors();

  return (
    <button
      onClick={() => onSelect(sport)}
      disabled={disabled}
      style={{
        border: `2px solid ${colors.accent}`,
        background: colors.bg,
        padding: 24,
        textAlign: 'left',
        minWidth: 260,
        minHeight: 140,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <div style={{ padding: 10, background: '#ffffff', border: `1px solid ${colors.accent}` }}>
          {getIcon()}
        </div>
        <h3 style={{ fontSize: 24, margin: 0, color: '#000' }}>{sport}</h3>
      </div>

      <p style={{ color: '#333', fontSize: 14, margin: 0 }}>{getDescription()}</p>
    </button>
  );
};

export default SportCard;
