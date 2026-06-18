import emailjs from '@emailjs/browser';

export const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

export async function sendAppointmentEmail(params) {
  if (!EMAILJS.serviceId || !EMAILJS.publicKey) {
    console.warn('EmailJS env eksik — e-posta atılmadı.');
    return;
  }
  return emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, params, EMAILJS.publicKey);
}
