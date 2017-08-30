export interface IOrganization {
  _id?: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  url: string;
  address: string;
  city: string;
  postalCode: string;
  description: string;
  image: string;
  standardPrice: number;
  reducedPrice: number;
}
