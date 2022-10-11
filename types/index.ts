export interface IProduct {
  id: string;
  title: string;
  tags: string;
  category: string;
  description: string;
  brand: string;
  count_in_stock: number;
  price: number;
  rating: number;
  image: string;
  images: string[];
}

export interface ICartProduct extends IProduct {
  quantity: number;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  image_url: string;
  is_admin: boolean;
}

export interface IOrder {
  id: string;
  full_name: string;
  address: string;
  country: string;
  postal_code: number;
  city: string;
  payment_method: string;
  payment_id: string;
  items_price: number;
  shipping_price: number;
  tax_price: number;
  total_price: number;
  user_id: string;
  is_paid: boolean;
  paid_at: Date;
  is_delivered: boolean;
  delivered_at: Date;
  created_at: Date;
  updated_at: Date;
  products: ICartProduct[];
  payment: IPayment;
}

export interface IPayment {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface IMessage {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  is_send: boolean;
  created_at: Date;
  updated_at: Date;
}
