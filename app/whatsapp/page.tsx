import { config } from "@/lib/config";
import { getBusinessInfo } from "@/lib/data";
import WhatsAppContact from "@/components/WhatsAppContact";

export const metadata = {
  title: "WhatsApp — Punto de Sabor",
};

export default async function WhatsAppPage() {
  const business = await getBusinessInfo();
  const whatsappNumber = business?.whatsapp_number || config.whatsappNumber;

  return <WhatsAppContact whatsappNumber={whatsappNumber} />;
}
