export enum Sport {
  BASKETBALL = 'Basketball',
  HOCKEY = 'Hockey',
  FOOTBALL = 'American Football'
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
