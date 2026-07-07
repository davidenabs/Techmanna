"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // Append required Web3Forms fields
      data.access_key = "3d3cc23c-2694-427e-baef-14be9a23cd24";
      data.subject = "New Contact Form Submission from Techmanna Website";
      data.from_name = "Techmanna Website";

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setMessage("Thanks for reaching out! We'll be in touch soon.");
      } else {
        setStatus("error");
        setMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-32 border-b border-slate/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Let&apos;s build something great.</h2>
            <p className="text-lg text-muted mb-8 max-w-md">
              Whether you have a fully formed idea or just a spark, we&apos;d love to hear about it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {status === "success" ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-display font-bold mb-2">Message Sent</h3>
                <p className="text-muted">{message}</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-sm font-medium text-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-midnight">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-300">Name</label>
                    <input 
                      required
                      type="text" 
                      id="name" 
                      name="name" 
                      className="w-full bg-slate/10 border border-slate/30 rounded-lg px-4 py-3 text-paper focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-300">Email</label>
                    <input 
                      required
                      type="email" 
                      id="email" 
                      name="email" 
                      className="w-full bg-slate/10 border border-slate/30 rounded-lg px-4 py-3 text-paper focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-300">Phone (Optional)</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="w-full bg-slate/10 border border-slate/30 rounded-lg px-4 py-3 text-paper focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
                    placeholder="+234 ..."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                  <textarea 
                    required
                    id="message" 
                    name="message" 
                    rows={4}
                    className="w-full bg-slate/10 border border-slate/30 rounded-lg px-4 py-3 text-paper focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-sm">{message}</p>
                )}

                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium bg-gold text-midnight rounded-full hover:bg-gold/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
