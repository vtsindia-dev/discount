import isEmpty from "lodash/isEmpty";

// interface Item {
//   id: string | number;
//   name: string;
//   slug: string;
//   image: {
//     thumbnail: string;
//     [key: string]: unknown;
//   };
//   gallery: [{
//     thumbnail: string;
//     [key: string]: unknown;
//   }];
//   price: number;
//   sale_price?: number;
//   [key: string]: unknown;
// }
export function generateCartItem(item: any, attributes: object) {
  const { id, name, slug, image, price, sale_price, gallery, unique_id } = item;
  return {
    id: !isEmpty(attributes)
      ? `${id}.${Object.values(attributes).join(".")}`
      : id,
    name,
    slug,
    image: image ? image.thumbnail : gallery ? gallery?.[0]?.thumbnail : '',
    price: sale_price ? sale_price : price,
    attributes,
    unique_id
  };
}
