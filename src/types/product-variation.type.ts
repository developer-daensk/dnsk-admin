export interface ProductVariationType {
  id?: string;
  type: string;
  name: string;
  uI_Type: string;
  aliases: string[];
  items: Array<{
    name: string;
    image: string;
    icon: string;
    value: string;
  }>;
}
