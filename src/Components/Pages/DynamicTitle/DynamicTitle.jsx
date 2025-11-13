// src/components/DynamicTitle.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const routeTitles = {
  "/": "Home",
  "/about": "About",
  "/my-issues": "My Issues",
  "/contact": "Contact",
  "/dashboard": "Dashboard",
};

export default function DynamicTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const title =
      routeTitles[path] ||
      path
        .split("/")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" - ") ||
      "City Report";

    document.title = `${title} | City Report`;
  }, [location]);

  return null;
}
