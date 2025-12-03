import React from 'react';
import { ConversationResponse, Sport } from '../types';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ExternalLink, MessageSquare } from 'lucide-react';

interface ResultsViewProps {
  sport: Sport;
  data: ConversationResponse;
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ sport, data, onReset }) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fadeIn">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onReset}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Back to selection"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-400" />
          Talking {sport}
        </h2>
      </div>

      <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 md:p-8 shadow-2xl mb-6">
        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
             components={{
                ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-4 my-4" {...props} />,
                li: ({node, ...props}) => <li className="text-slate-200" {...props} />,
                strong: ({node, ...props}) => <span className="font-bold text-blue-300" {...props} />,
                p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-slate-300" {...props} />
             }}
          >
            {data.text}
          </ReactMarkdown>
        </div>
      </div>

      {data.sources.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider ml-1">Sources & News Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.sources.map((source, idx) => (
              source.web && (
                <a
                  key={idx}
                  href={source.web.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-xl transition-all group"
                >
                  <span className="text-sm text-slate-300 font-medium truncate pr-4">
                    {source.web.title || source.web.uri}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400 flex-shrink-0" />
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsView;
