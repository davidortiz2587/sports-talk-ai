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
    <div style={{ width: '100%', maxWidth: 640, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <button
          onClick={onReset}
          aria-label="Back to selection"
          className="btn"
        >
          Back
        </button>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#000', margin: 0 }}>
          Talking {sport}
        </h2>
      </div>

      <div className="card" style={{ marginBottom: 12 }}>
        <ReactMarkdown
           components={{
              ul: ({node, ...props}) => <ul style={{ paddingLeft: 18, margin: '12px 0' }} {...props} />,
              li: ({node, ...props}) => <li style={{ color: '#000', marginBottom: 16 }} {...props} />,
              strong: ({node, ...props}) => <span style={{ fontWeight: 700 }} {...props} />,
              p: ({node, ...props}) => <p style={{ marginBottom: 12, lineHeight: 1.4, color: '#111' }} {...props} />
           }}
        >
          {data.text}
        </ReactMarkdown>
      </div>

      {data.sources.length > 0 && (
        <div>
          <h3 style={{ fontSize: 12, color: '#333', textTransform: 'uppercase', letterSpacing: 0.5, marginLeft: 4 }}>Sources & News Links</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
            {data.sources.map((source, idx) => (
              source.web && (
                <a
                  key={idx}
                  href={source.web.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    border: '1px solid #dcdcdc',
                    background: '#f9f9f9',
                    padding: '6px 8px',
                    fontSize: 12
                  }}
                >
                  {source.web.title || source.web.uri}
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
