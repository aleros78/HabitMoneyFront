import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        try {
          window.adsbygoogle.push({});
          clearInterval(interval);
        } catch (e) {
          console.error("Adsense error", e);
        }
      }
    }, 300); // controlla ogni 300ms

    return () => clearInterval(interval);
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-6826998190046950"
      data-ad-slot="1188020202"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
