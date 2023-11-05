import { UserInterface } from './User';

export interface FeedInterface {
  id: number;
  foto_feed: string;
  judul_feed: string;
  isi: string;
  created_at: string;
  jml?: number;
}

export interface FeedShareDetailInterface {
  id: number;
  id_feed: number;
  id_user: number;
  jml: number;
  feed: FeedInterface;
  user: UserInterface;
}
