export enum Sport {
  BASKETBALL = 'Basketball',
  HOCKEY = 'Hockey',
  FOOTBALL = 'Football'
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface ConversationResponse {
  text: string;
  sources: GroundingChunk[];
}
