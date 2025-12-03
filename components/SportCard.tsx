import React from 'react';
import { Sport } from '../types';
import { Target, Trophy, Activity } from 'lucide-react';

interface SportCardProps {
  sport: Sport;
  onSelect: (sport: Sport) => void;
  disabled?: boolean;
}

const SportCard: React.FC<SportCardProps> = ({ sport, onSelect, disabled }) => {
  const getIcon = () => {
    switch (sport) {
      case Sport.BASKETBALL:
        return <Trophy className="w-8 h-8 text-orange-400" />;
      case Sport.HOCKEY:
        return <Activity className="w-8 h-8 text-cyan-400" />;
      case Sport.FOOTBALL:
        return <Target className="w-8 h-8 text-green-400" />;
    }
  };

  const getDescription = () => {
    switch (sport) {
      case Sport.BASKETBALL:
        return "Hoops, dunks, and court drama.";
      case Sport.HOCKEY:
        return "Ice, pucks, and power plays.";
      case Sport.FOOTBALL:
        return "Touchdowns, tackles, and strategy.";
    }
  };

  return (
    <button
      onClick={() => onSelect(sport)}
      disabled={disabled}
      className={`
        group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-300
        bg-slate-800 border border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'}
      `}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {getIcon()}
      </div>
      
      <div className="flex items-center gap-4 mb-3">
        <div className="p-3 bg-slate-700 rounded-xl group-hover:bg-slate-600 transition-colors">
          {getIcon()}
        </div>
        <h3 className="text-xl font-bold text-white">{sport}</h3>
      </div>
      
      <p className="text-slate-400 text-sm">{getDescription()}</p>
    </button>
  );
};

export default SportCard;
