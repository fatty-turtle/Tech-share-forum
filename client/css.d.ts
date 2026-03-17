//Let css file bypass tyscript rules

declare module "*.css" {
  const content: string;
  export default content;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "swiper/css";
declare module "swiper/css/*";
