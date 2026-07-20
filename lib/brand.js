/** Brand constants — Logic Code Spot */
export const LCS_URL = "https://logic-codespot-com.vercel.app/";
export const LCS_LOGO = "/brand/lcs-logo.png";
export const LCS_NAME = "Logic Code Spot Software Solutions";

const WA_NUMBER = "18294737963";
const WA_DEFAULT_MSG =
  "Hola Dostin, vi tu portfolio y quisiera cotizar un proyecto.";

export function whatsappHref(message = WA_DEFAULT_MSG) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SOCIAL = {
  github: "https://github.com/dostinsantana8",
  linkedin: "https://www.linkedin.com/in/dostin-santana-0138b6245",
  whatsapp: whatsappHref(),
  email: "mailto:dostinsantana7@hotmail.com",
};
