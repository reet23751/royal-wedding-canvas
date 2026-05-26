import { useState, useEffect } from "react";
import { RsvpField } from "@/hooks/useRsvpConfig";
import { useLanguage } from "@/hooks/useLanguage";
import { motion } from "framer-motion";

interface RsvpFormProps {
  fields: RsvpField[];
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
  onCancel?: () => void;
}

export function RsvpForm({ fields, initialData, onSubmit, onCancel }: RsvpFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-4 text-left">
      {fields.map((field) => (
        <div key={field.id} className="flex flex-col space-y-1.5">
          <label htmlFor={field.id} className="text-sm font-medium text-foreground">
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </label>

          {field.type === "select" || field.type === "dropdown" ? (
            <select
              id={field.id}
              required={field.required}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full rounded-xl border border-gold/40 bg-background/50 px-3 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
            >
              <option value="" disabled>
                {field.placeholder || "Select..."}
              </option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={field.id}
              type={field.type === "short text" ? "text" : field.type}
              required={field.required}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full rounded-xl border border-gold/40 bg-background/50 px-3 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-1 focus:ring-gold"
            />
          )}
        </div>
      ))}

      <div className="pt-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-gold/40 px-5 py-2.5 text-sm font-medium hover:bg-secondary transition"
          >
            {t("rsvp.cancel") || "Cancel"}
          </button>
        )}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-xl bg-vermillion px-6 py-2.5 text-sm font-medium text-ivory shadow-royal transition hover:bg-vermillion/90"
        >
          <span className="shimmer absolute inset-0" />
          <span className="relative">{t("rsvp.submitRsvp") || "Submit RSVP"}</span>
        </motion.button>
      </div>
    </form>
  );
}
