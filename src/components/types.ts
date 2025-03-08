export interface Purchase {
  id: string;
  eventName: string;
  quantity: number;
  price: number;
  purchaseDate: string;
  purchasedBy: string;  // user DID
  status: 'pending' | 'confirmed' | 'cancelled';
}