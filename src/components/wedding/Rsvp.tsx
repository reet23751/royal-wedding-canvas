import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Countdown } from "./Countdown";
import { useRsvpConfig, ScreenState } from "@/hooks/useRsvpConfig";
import { RsvpForm } from "./RsvpForm";
import { CheckCircle2 } from "lucide-react";

interface RsvpProps {
  guestName: string;
  accepted?: boolean;
  onAccept?: () => void;
}

export function Rsvp({ guestName, accepted = false, onAccept }: RsvpProps) {
  const { t } = useLanguage();
  const { config, initialScreen } = useRsvpConfig();

  // Determine initial state based on URL preview params or props
  const [screen, setScreen] = useState<ScreenState | "editing">(
    initialScreen || (accepted ? "accepted" : "not_responded")
  );
  
  // Temporary storage for form data in memory
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Sync with prop if it changes externally (and no preview param active)
  useEffect(() => {
    if (!initialScreen && accepted && screen === "not_responded") {
      setScreen("accepted");
    }
  }, [accepted, screen, initialScreen]);

  const handleAccept = () => {
    setScreen("accepted");
    if (onAccept) onAccept();
  };

  const handleSubmit = (data: Record<string, any>) => {
    setFormData(data);
    setScreen("submitted");
  };

  const handleEdit = () => {
    setScreen("editing");
  };

  const handleCancelEdit = () => {
    setScreen("submitted");
  };

  // Render logic based on state and config
  const renderContent = () => {
    if (screen === "not_responded") {
      return (
        <motion.button
          key="cta"
          exit={{ opacity: 0, y: -10 }}
          onClick={handleAccept}
          className="relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-vermillion px-8 py-4 font-display text-lg text-ivory shadow-royal transition active:scale-[0.98]"
        >
          <span className="shimmer absolute inset-0" />
          <span className="relative">{t("rsvp.accept")}</span>
        </motion.button>
      );
    }

    if (screen === "accepted" && config.rsvpType === "detailed") {
      return (
        <motion.div
          key="form"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <div className="mt-6 rounded-2xl border border-gold/20 bg-secondary/20 p-5">
            <RsvpForm fields={config.form.fields} onSubmit={handleSubmit} />
          </div>
        </motion.div>
      );
    }

    if (screen === "editing") {
      return (
        <motion.div
          key="form-edit"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mt-6 rounded-2xl border border-gold/20 bg-secondary/20 p-5">
            <RsvpForm 
              fields={config.form.fields} 
              initialData={formData} 
              onSubmit={handleSubmit} 
              onCancel={handleCancelEdit} 
            />
          </div>
        </motion.div>
      );
    }

    // "accepted" (simple) OR "submitted" (detailed)
    return (
      <motion.div
        key="thanks"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-6 rounded-2xl border border-gold/40 bg-secondary/40 p-5"
      >
        <div className="flex justify-center mb-2">
          <CheckCircle2 className="w-8 h-8 text-gold" />
        </div>
        <p className="font-bengali text-base text-vermillion">
          {t("rsvp.thanks", { guestName: guestName || t("boardingPass.honouredGuest") })}
        </p>
        <p className="mt-2 font-bengali text-sm text-muted-foreground">
          {screen === "submitted" ? (t("rsvp.submittedMessage") || "Your details have been saved.") : t("rsvp.thanksDesc")}
        </p>
        
        {screen === "submitted" && config.allowEditRsvp && (
          <div className="mt-4">
            <button
              onClick={handleEdit}
              className="rounded-xl border border-gold/40 px-5 py-2 text-sm font-medium text-foreground hover:bg-gold/10 transition"
            >
              {t("rsvp.editRsvp") || "Edit RSVP"}
            </button>
          </div>
        )}

        <div className="mt-5 border-t border-gold/20 pt-4">
          <Countdown compact={true} />
        </div>
      </motion.div>
    );
  };

  return (
    <section className="px-5 py-14">
      <div className="mx-auto max-w-md rounded-3xl bg-gradient-royal p-[1px] shadow-royal">
        <div className="rounded-3xl bg-background/95 px-6 py-8 text-center">
          <p className="font-bengali text-sm text-vermillion">
            {t("rsvp.sub")}
          </p>
          <h2 className="mt-1 font-display text-3xl">
            {t("rsvp.title")}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("rsvp.desc")}
          </p>

          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>

          <div className="alpana-border mx-auto my-6 h-px w-2/3 opacity-60" />

          <div className="grid grid-cols-2 gap-3 text-sm">
            <a
              href="https://wa.me/?text=Join%20us%20at%20Arnab%20weds%20Rohini"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-gold/40 px-3 py-2 font-medium text-foreground hover:bg-secondary"
            >
              {t("rsvp.whatsapp")}
            </a>
            <a
              href="https://maps.google.com/?q=Jorasanko+Thakur+Bari+Kolkata"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-gold/40 px-3 py-2 font-medium text-foreground hover:bg-secondary"
            >
              {t("rsvp.openVenue")}
            </a>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center font-bengali text-xs text-muted-foreground">
        {t("rsvp.footer")}
      </p>
    </section>
  );
}
