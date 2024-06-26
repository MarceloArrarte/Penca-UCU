import { CronJob } from "cron";
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';
import { getUnsent, markAsSent } from "../models/notificationModel";


const emailClient = new MailerSend({
    apiKey: process.env.EMAIL_APIKEY!
});

const sentFrom = new Sender(`${process.env.EMAIL_FROM}`, 'PencaUCU');

export const notificationSenderJob = CronJob.from({
    cronTime: '*/5 * * * *',
    onTick: async function() {
        if (!process.env.SEND_EMAIL) {
            console.warn(`[CRON-SEND] Envío de notificaciones deshabilitado. ¡Saltando!`);
            return;
        }

        const notificationsToSend = await getUnsent();
        console.log(`[CRON-SEND] Iniciando envío de notificaciones...`);

        const processPromises = notificationsToSend.map(async (notif) => {
            const recipients = [new Recipient(notif.email, notif.nombre)];
            const emailParams = new EmailParams()
                .setFrom(sentFrom)
                .setTo(recipients)
                .setReplyTo(sentFrom)
                .setSubject('Ingresa tus predicciones para la penca')
                .setText(notif.mensaje);

            let success = false;
            try {
                await emailClient.email.send(emailParams);
                console.log(`[CRON-SEND] Recordatorio del partido ${notif.id_partido} enviado a alumno ${notif.documento_alumno}.`);
                success = true;
            }
            catch (error) {
                console.error(`[CRON-SEND] Error al enviar recordatorio del partido ${notif.id_partido} a alumno ${notif.documento_alumno}.`);
                console.error(error);
            }
            finally {
                if (success) {
                    await markAsSent(notif);
                }
            }
        });

        await Promise.all(processPromises).then(() => console.log(`[CRON-SEND] Envío de notificaciones finalizado.`));
    },
    start: true,
    runOnInit: true,
    timeZone: 'America/Montevideo'
});