"use client";

import { useEffect, useState } from "react";
import { Clock3, ExternalLink, MapPin, Phone } from "lucide-react";

import type { BusinessInfo } from "@/lib/database.types";
import { hasSupabaseConfig, publicConfig } from "@/lib/config";
import { getSupabaseClient } from "@/lib/supabase";

export const BusinessInfoPanel = () => {
  const [info, setInfo] = useState<BusinessInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      if (!hasSupabaseConfig) {
        setErrorMessage("Configura Supabase para cargar la informacion del negocio.");
        setLoading(false);
        return;
      }

      const supabase = getSupabaseClient();
      if (!supabase) {
        setErrorMessage("No fue posible inicializar Supabase.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("business_info")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        setErrorMessage("No pudimos cargar la informacion de la pagina.");
      } else {
        setInfo(data);
      }
      setLoading(false);
    };

    void fetchBusinessInfo();
  }, []);

  if (loading) {
    return (
      <section className="space-y-3">
        <div className="card h-24 animate-pulse bg-orange-100" />
        <div className="card h-56 animate-pulse bg-orange-100" />
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="card border-red-100 bg-red-50 text-sm text-red-700">
        <p>{errorMessage}</p>
      </section>
    );
  }

  if (!info) {
    return (
      <section className="card text-sm text-slate-600">
        No hay datos en <code>business_info</code>. Puedes crear un registro desde Supabase.
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <article className="card space-y-3">
        <h2 className="section-title">{info.business_name || publicConfig.businessName}</h2>
        <p className="text-sm text-slate-700">{info.description}</p>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <Clock3 className="mt-0.5 h-4 w-4 text-orange-600" />
            <span>{info.hours}</span>
          </li>
          <li className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 text-orange-600" />
            <span>{info.address}</span>
          </li>
          <li className="flex items-start gap-2">
            <Phone className="mt-0.5 h-4 w-4 text-orange-600" />
            <span>{info.phone}</span>
          </li>
        </ul>
      </article>

      <article className="card space-y-3">
        <h3 className="text-base font-semibold">Ubicacion</h3>
        {info.map_embed_url ? (
          <iframe
            title="Mapa Punto de Sabor"
            src={info.map_embed_url}
            className="h-56 w-full rounded-xl border border-orange-100"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <p className="text-sm text-slate-600">No hay mapa configurado.</p>
        )}
      </article>

      <article className="card space-y-3">
        <h3 className="text-base font-semibold">Redes sociales</h3>
        <ul className="space-y-2 text-sm">
          {info.instagram_url ? (
            <li>
              <a
                href={info.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-pink-600"
              >
                <ExternalLink className="h-4 w-4" />
                Instagram
              </a>
            </li>
          ) : null}
          {info.facebook_url ? (
            <li>
              <a
                href={info.facebook_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-blue-600"
              >
                <ExternalLink className="h-4 w-4" />
                Facebook
              </a>
            </li>
          ) : null}
          {info.tiktok_url ? (
            <li>
              <a
                href={info.tiktok_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-900"
              >
                <ExternalLink className="h-4 w-4" />
                TikTok
              </a>
            </li>
          ) : null}
          {!info.instagram_url && !info.facebook_url && !info.tiktok_url ? (
            <li className="text-slate-600">Sin redes configuradas.</li>
          ) : null}
        </ul>
      </article>
    </section>
  );
};
