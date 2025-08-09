import { Helmet } from "react-helmet-async";
import { siteConfig } from "@/config/site-config";

const GTM = () => {
  const containerId = siteConfig.integrations.gtm?.containerId;
  const dataLayerName = siteConfig.integrations.gtm?.dataLayerName || "dataLayer";
  if (!containerId) return null;

  const script = `
  (function(w,d,s,l,i){
    w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
    var f=d.getElementsByTagName(s)[0], j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:''; 
    j.async=true; j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; 
    f.parentNode.insertBefore(j,f); 
  })(window,document,'script','${dataLayerName}','${containerId}');`;

  const noscript = `<iframe src="https://www.googletagmanager.com/ns.html?id=${containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

  return (
    <>
      <Helmet>
        <script>{`window.${dataLayerName} = window.${dataLayerName} || [];`}</script>
        <script type="text/javascript">{script}</script>
        <noscript>{noscript}</noscript>
      </Helmet>
    </>
  );
};

export default GTM;
