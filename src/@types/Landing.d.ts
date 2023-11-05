export interface PricingInterface {
  id: number;
  status: number;
  price: number;
  duration: number;
  title: string;
  feature: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialInterface {
  id: number;
  picture: string;
  status: number;
  title: string;
  designation: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface AuthorInteface {
  id: number;
  name: string;
  display_name: string;
  email: string;
  phone: string;
  address: string;
  departement: string;
  picture?: string;
  description?: string;
}

export interface ArticleInterface {
  id: number;
  title: string;
  slug: string;
  content: string;
  keyword: string;
  category_id: string;
  picture: string;
  status: number;
  user_id: number;
  created_at: string;
  user?: AuthorInteface;
}

export interface ClientInterface {
  id: number;
  picture: string;
  title: string;
}

export interface SolutionInterface {
  id: number;
  picture: string;
  title: string;
  description: string;
}

export interface ServiceInterface {
  id: number;
  picture: string;
  title: string;
  description: string;
}

export interface FaqInterface {
  id: number;
  status: number;
  question: string;
  answer: string;
}

export interface DonationNowInterface {
  donation_id: number;
  name: string;
  email: string;
  amount: string;
  message: string;
  is_anonim?: boolean;
}

export interface ContactInterface {
  id: number;
  title: string;
  content: string;
}

export interface SocialMediaInterface {
  id: number;
  type: string;
  account_name: string;
  link: string;
}

export interface UspInterface {
  id: number;
  picture: string;
  status: number;
  title: string;
  description: string;
}

export interface ArticleCategoryInteface {
  id: number;
  title: string;
}

export interface AuthorWithNewsInteface extends AuthorInteface {
  news: ArticleInterface[];
}

export interface AddOnInterface {
  created_at: string;
  description: string;
  id: number;
  periode: string;
  price: number;
  slug: string;
  status: number;
  title: string;
  updated_at: string;
  user_id: number;
}

export interface OrderTimInterface {
  id: number;
  amount: string;
  jenis_paket: string;
  status: string;
  tanggal_akhir: string;
  tanggal_awal: string;
  order_tim_addon: AddOnInterface[];
}
