import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { useLanguage, Language } from "@/hooks/useLanguage";

interface ContactMember {
  name: string;
  relation: string;
  phone: string;
}

interface SideDetails {
  title: string;
  members: ContactMember[];
}

export function Contact() {
  const { t, language } = useLanguage();

  // Localized data mapping based on language choice for pristine, exact typography
  const data: Record<Language, { sub: string; title: string; bride: SideDetails; groom: SideDetails }> = {
    en: {
      sub: "Family Contacts",
      title: "Who to reach",
      bride: {
        title: "Bride's Family",
        members: [
          { name: "Samar Sen", relation: "Father", phone: "+91 98300 12345" },
          { name: "Sunanda Sen", relation: "Mother", phone: "+91 98300 67890" },
        ],
      },
      groom: {
        title: "Groom's Family",
        members: [
          { name: "Dipak Roy", relation: "Father", phone: "+91 98311 54321" },
          { name: "Krishna Roy", relation: "Mother", phone: "+91 98311 98765" },
        ],
      },
    },
    bn: {
      sub: "পারিবারিক যোগাযোগ",
      title: "যোগাযোগের বিবরণী",
      bride: {
        title: "কনের পরিবার",
        members: [
          { name: "সমর সেন", relation: "বাবা", phone: "+91 98300 12345" },
          { name: "সুনন্দা সেন", relation: "মা", phone: "+91 98300 67890" },
        ],
      },
      groom: {
        title: "বরের পরিবার",
        members: [
          { name: "দীপক রায়", relation: "বাবা", phone: "+91 98311 54321" },
          { name: "কৃষ্ণা রায়", relation: "মা", phone: "+91 98311 98765" },
        ],
      },
    },
    hi: {
      sub: "पारिवारिक संपर्क",
      title: "संपर्क सूत्र",
      bride: {
        title: "दुल्हन का परिवार",
        members: [
          { name: "समर सेन", relation: "पिता", phone: "+91 98300 12345" },
          { name: "सुनंदा सेन", relation: "माता", phone: "+91 98300 67890" },
        ],
      },
      groom: {
        title: "दूल्हे का परिवार",
        members: [
          { name: "दीपक रॉय", relation: "पिता", phone: "+91 98311 54321" },
          { name: "कृष्णा रॉय", relation: "माता", phone: "+91 98311 98765" },
        ],
      },
    },
    mix: {
      sub: "Family Contacts",
      title: "Contact Details",
      bride: {
        title: "Bride's Family",
        members: [
          { name: "Samar Sen", relation: "Father / Papa", phone: "+91 98300 12345" },
          { name: "Sunanda Sen", relation: "Mother / Mummy", phone: "+91 98300 67890" },
        ],
      },
      groom: {
        title: "Groom's Family",
        members: [
          { name: "Dipak Roy", relation: "Father / Papa", phone: "+91 98311 54321" },
          { name: "Krishna Roy", relation: "Mother / Mummy", phone: "+91 98311 98765" },
        ],
      },
    },
  };

  const active = data[language] || data.en;

  const renderSide = (side: SideDetails, delayOffset: number) => (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-bold text-gold tracking-wide border-b border-gold/20 pb-1 text-center sm:text-left">
        {side.title}
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {side.members.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delayOffset + i * 0.15 }}
            className="relative overflow-hidden rounded-2xl border border-gold/30 bg-card p-4 shadow-soft hover:border-gold/50 transition-colors"
          >
            {/* Top Right Relation Badge */}
            <span className="absolute right-3 top-3 rounded-full bg-vermillion/10 px-2 py-0.5 text-[9px] font-semibold text-vermillion">
              {m.relation}
            </span>

            {/* Name */}
            <h4 className="font-display text-base font-bold text-foreground pr-12">
              {m.name}
            </h4>

            {/* Call and WhatsApp Buttons */}
            <div className="mt-4 flex items-center justify-between gap-2 border-t border-gold/10 pt-3">
              <a
                href={`tel:${m.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-1.5 text-xs font-semibold text-vermillion hover:text-gold transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>{m.phone}</span>
              </a>

              {/* Clickable WhatsApp Shortcut */}
              <a
                href={`https://wa.me/${m.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all active:scale-95"
                title="Message on WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="px-5 py-12">
      <p className="text-center font-bengali text-sm text-vermillion">
        {active.sub}
      </p>
      <h2 className="mt-1 text-center font-display text-3xl">
        {active.title}
      </h2>
      <div className="alpana-border mx-auto mt-4 h-px w-1/2 opacity-60" />

      <div className="mx-auto mt-10 max-w-xl space-y-8">
        {/* Bride Side Family */}
        {renderSide(active.bride, 0)}

        {/* Groom Side Family */}
        {renderSide(active.groom, 0.3)}
      </div>
    </section>
  );
}
