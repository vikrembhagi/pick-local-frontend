import { getStrapiURL } from "./utils";

export function getStrapiMedia(media) {
  console.log(media);
  const imageUrl = media.url ? getStrapiURL(media.url) : media.url;
  return imageUrl;
}
