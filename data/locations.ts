export type LocationRecord = {
  slug: string;
  name: string;
  role: string;
  address: string;
  lat: number;
  lng: number;
  embed: string;
  mapUrl: string;
};
export const LOCATIONS: LocationRecord[] = [
  {
    slug: "factory",
    name: "Aqua PPRC factory",
    role: "MANUFACTURING & FACTORY INQUIRIES",
    address: "Chak 117 JB, Millat Road, Faisalabad, Punjab, Pakistan",
    lat: 31.5004234,
    lng: 73.1084974,
    mapUrl:
      "https://www.google.com/maps/place/Galaxy+PPRC/data=!4m2!3m1!1s0x39226a184ccd6e7d:0x221fdf9b92167cf2",
    embed:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3401.86394313931!2d73.1084974!3d31.5004234!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39226a184ccd6e7d%3A0x221fdf9b92167cf2!2sGalaxy%20PPRC!5e0!3m2!1sen!2s!4v1790196891511!5m2!1sen!2s",
  },
  {
    slug: "asia-pipe-store",
    name: "Asia Pipe Store",
    role: "FLAGSHIP RETAIL & DISTRIBUTION OUTLET",
    address: "C38P+V77, Railway Road, Sadiq Market, Faisalabad, Pakistan",
    lat: 31.4171743,
    lng: 73.0856842,
    mapUrl:
      "https://www.google.com/maps/place/Asia+Pipe+Store/data=!4m2!3m1!1s0x392242a0c3030679:0xa6e9a662d6c53303",
    embed:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3404.8893588699007!2d73.0856842!3d31.4171743!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242a0c3030679%3A0xa6e9a662d6c53303!2sAsia%20Pipe%20Store!5e0!3m2!1sen!2s!4v1790196917778!5m2!1sen!2s",
  },
];
