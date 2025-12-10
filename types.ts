export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Full content for the modal
  date: string;
  image: string;
  tags: string[];
}

export enum Character {
  CHARLIE = '查理·布朗 (Charlie Brown)',
  LUCY = '露西 (Lucy)',
  SNOOPY = '史努比 (Snoopy)',
  LINUS = '莱纳斯 (Linus)',
  PEPPERMINT_PATTY = '薄荷·帕蒂 (Peppermint Patty)'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  character?: Character;
}