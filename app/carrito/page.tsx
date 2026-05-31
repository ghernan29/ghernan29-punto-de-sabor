import { config } from "@/lib/config";
import { getBusinessInfo } from "@/lib/data";
import CartView from "@/components/CartView";

export const metadata = {
  title: "Carrito — Punto de Sabor",
};

export default async function CartPage() {
  const business = await getBusinessInfo();
  const whatsappNumber = business?.whatsapp_number || config.whatsappNumber;

  return <CartView whatsappNumber={whatsappNumber} />;
}
