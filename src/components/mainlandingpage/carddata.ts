import type { TCountryCode } from "countries-list";
import { Marker } from "./dotted-map";

type CountryCode = Lowercase<TCountryCode>;

export type MyMarker = Marker & {
  overlay: {
    countryCode: CountryCode;
    label: string;
  };
};

export const UPDATES_CARD_DATA = {
  heading: {
    line1: "Stress-free setup and",
    line2: "seamless domain transfer",
  },
  notifications: [
    {
      id: "card-1",
      label: "notification",
      title: "Design & Photos Finalized",
      iconType: "avatar",
      avatarUrl: "/me.jpg",
      avatarSrcSet:
        "/_next/image?url=%2Fme.jpg&w=32&q=75&dpl=dpl_Co7REAcqPw8uCaqm4WqZHLBHKqVY 1x, /_next/image?url=%2Fme.jpg&w=48&q=75&dpl=dpl_Co7REAcqPw8uCaqm4WqZHLBHKqVY 2x",
      topOffset: "0px",
      zIndex: 3,
      animationName: "card-1-bounce",
      animationDelay: "0s",
    },
    {
      id: "card-2",
      label: "notification",
      title: "Booking Software Connected",
      iconType: "slack", // You can change this icon type in your component if needed
      topOffset: "-10px",
      zIndex: 2,
      animationName: "card-2-bounce",
      animationDelay: "0.15s",
    },
    {
      id: "card-3",
      label: "notification",
      title: "Custom Domain Live!",
      iconType: "github", // You can change this icon type in your component if needed
      topOffset: "-20px",
      zIndex: 1,
      animationName: "card-3-bounce",
      animationDelay: "0.30s",
    },
  ],
};

export const HOSTING_CARD_DATA = {
  heading: "Free Global Hosting & Maintenance",
  markers: [
    {
      lat: 20.5937,
      lng: 78.9629,
      size: 2.8,
      overlay: { countryCode: "in", label: "India" },
    },
    {
      lat: -25.2744,
      lng: 133.7751,
      size: 2.8,
      overlay: { countryCode: "au", label: "Australia" },
    },
    {
      lat: 36.7783,
      lng: -119.4179,
      size: 2.8,
      overlay: { countryCode: "us", label: "California" },
    },
    {
      lat: 25.2048,
      lng: 55.2708,
      size: 2.8,
      overlay: { countryCode: "ae", label: "Dubai" },
    },
    {
      lat: 56.1304,
      lng: -106.3468,
      size: 2.8,
      overlay: { countryCode: "ca", label: "Canada" },
    },
    {
      lat: 51.1657,
      lng: 10.4515,
      size: 2.8,
      overlay: { countryCode: "de", label: "Europe" }, // Using Germany coordinates/code as a central European hosting location
    },
  ],
};