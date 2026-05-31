"use client"

import { FormEvent, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Loader2, MapPin, MessageCircleMore, Minus, Plus, Trash2 } from "lucide-react"

import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/format"
import { buildWhatsappLink, buildWhatsappMessage } from "@/lib/whatsapp"

export function CartPageContent() {
  const {
    items,
    hasHydrated,
    subtotal,
    total,
    deliveryFee,
    minOrderAmount,
    orderType,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    setOrderType,
    getDefaultCheckoutValues,
  } = useCart()
  const [formValues, setFormValues] = useState(getDefaultCheckoutValues)
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const appliedDeliveryFee =
    orderType === "delivery" && items.length > 0 ? deliveryFee : 0
  const minimumOrderMissing =
    orderType === "delivery" && subtotal > 0 && subtotal < minOrderAmount

  const whatsappPreview = useMemo(
    () =>
      buildWhatsappMessage({
        items,
        subtotal,
        deliveryFee: appliedDeliveryFee,
        total,
        orderType,
        customer: {
          name: formValues.name || "Pendiente",
          phone: formValues.phone || "Pendiente",
          address: formValues.address || "Pendiente",
          notes: formValues.notes,
        },
      }),
    [
      appliedDeliveryFee,
      formValues.address,
      formValues.name,
      formValues.notes,
      formValues.phone,
      items,
      orderType,
      subtotal,
      total,
    ],
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage("")

    if (items.length === 0) {
      setErrorMessage("Tu carrito esta vacio.")
      return
    }

    if (!formValues.name || !formValues.phone) {
      setErrorMessage("Completa tu nombre y telefono.")
      return
    }

    if (orderType === "delivery" && !formValues.address) {
      setErrorMessage("Agrega una direccion para el domicilio.")
      return
    }

    if (minimumOrderMissing) {
      setErrorMessage(
        `El pedido minimo para domicilio es ${formatCurrency(minOrderAmount)}.`,
      )
      return
    }

    const whatsappLink = buildWhatsappLink(whatsappPreview)

    if (!whatsappLink) {
      setErrorMessage("Configura el numero de WhatsApp en las variables de entorno.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: formValues.name,
          phone: formValues.phone,
          deliveryAddress:
            orderType === "delivery" ? formValues.address : null,
          notes: formValues.notes || null,
          subtotal,
          deliveryFee: appliedDeliveryFee,
          total,
          orderType,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            category: item.category,
          })),
          whatsappMessage: whatsappPreview,
        }),
      })

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null

        throw new Error(payload?.error ?? "No se pudo guardar el pedido.")
      }

      clearCart()
      window.location.assign(whatsappLink)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "No se pudo enviar tu pedido.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!hasHydrated) {
    return (
      <div className="rounded-[2rem] border border-orange-100 bg-white p-6 shadow-soft">
        <p className="text-sm text-slate-500">Cargando tu carrito...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="space-y-5 rounded-[2rem] border border-dashed border-orange-200 bg-orange-50/80 p-6 text-center shadow-soft">
        <h1 className="text-2xl font-bold text-slate-950">Tu carrito esta vacio</h1>
        <p className="text-sm leading-6 text-slate-600">
          Vuelve al menu para agregar tus platos favoritos y luego confirma el
          pedido por WhatsApp.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Ir al menu
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Tu pedido
          </h1>
          <p className="text-sm leading-6 text-slate-600">
            Ajusta cantidades, elige domicilio o recogida y termina el pedido
            por WhatsApp.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 rounded-[2rem] border border-orange-100 bg-white p-4 shadow-soft sm:grid-cols-[108px_1fr]"
            >
              <div className="relative h-28 overflow-hidden rounded-[1.5rem] bg-orange-100">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="108px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm font-medium text-brand-700">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-base font-semibold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.category}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:text-red-500"
                    aria-label={`Eliminar ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center rounded-full border border-orange-100 bg-orange-50 p-1">
                    <button
                      type="button"
                      onClick={() => decrementItem(item.id)}
                      className="rounded-full p-2 text-slate-700 transition hover:bg-white"
                      aria-label={`Restar ${item.name}`}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-10 text-center text-sm font-semibold text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => incrementItem(item.id)}
                      className="rounded-full p-2 text-slate-700 transition hover:bg-white"
                      aria-label={`Sumar ${item.name}`}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Subtotal
                    </p>
                    <p className="text-base font-semibold text-brand-700">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-orange-100 bg-white p-5 shadow-soft">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-950">
              Datos de entrega
            </h2>

            <div className="grid grid-cols-2 rounded-2xl bg-orange-50 p-1">
              {(["delivery", "pickup"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setOrderType(option)
                    setFormValues((current) => ({ ...current, orderType: option }))
                  }}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    orderType === option
                      ? "bg-white text-brand-700 shadow"
                      : "text-slate-500"
                  }`}
                >
                  {option === "delivery" ? "Domicilio" : "Recoger"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Nombre</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-brand-400"
                value={formValues.name}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Tu nombre"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Telefono</span>
              <input
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-brand-400"
                value={formValues.phone}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
                placeholder="300 123 4567"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Direccion {orderType === "pickup" ? "(opcional)" : ""}
              </span>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400" />
                <input
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-brand-400"
                  value={formValues.address}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      address: event.target.value,
                    }))
                  }
                  placeholder="Calle, barrio, referencia"
                />
              </div>
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">
                Notas adicionales
              </span>
              <textarea
                className="min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-brand-400"
                value={formValues.notes}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    notes: event.target.value,
                  }))
                }
                placeholder="Sin cebolla, salsa aparte, punto de referencia..."
              />
            </label>
          </div>

          <div className="space-y-3 rounded-[1.75rem] bg-orange-50 p-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Domicilio</span>
              <span>
                {appliedDeliveryFee > 0
                  ? formatCurrency(appliedDeliveryFee)
                  : "No aplica"}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-orange-100 pt-3 text-base font-semibold text-slate-950">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <p className="text-xs leading-5 text-slate-500">
              Pedido minimo para domicilio: {formatCurrency(minOrderAmount)}.
            </p>
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-accent-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Guardando pedido...
              </>
            ) : (
              <>
                <MessageCircleMore className="h-4 w-4" />
                Pedir por WhatsApp
              </>
            )}
          </button>
        </form>
      </section>
    </div>
  )
}
