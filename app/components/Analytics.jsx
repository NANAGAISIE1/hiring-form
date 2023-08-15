"use client";

import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Script from "next/script";

export function Analytics() {
  return (
    <>
      <VercelAnalytics />
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        id="ga-script"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-config" strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_GA_TRACKING_ID}');
            `}
      </Script>
    </>
  );
}
