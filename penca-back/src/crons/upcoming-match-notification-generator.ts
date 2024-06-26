import { CronJob } from "cron";
import { MissingPredictionNotificationData, getUsersMissingPredictions } from "../models/predictionModel";
import { insertNotifications } from "../models/notificationModel";
import { notificationSenderJob } from "./notification-sender";
import { format } from "date-fns";

const trimLineLeadingSpaces = (str: string) => str.replace(/^[ \t]*/gm, '');


const buildMissingPredictionMessage = (data: MissingPredictionNotificationData) => {
    return trimLineLeadingSpaces(`
        ¡Hola ${data.nombre}!

        Faltan menos de 24 horas para el partido ${data.equipos} de la ${data.fase} y todavía no has ingresado tu predicción.

        El partido comenzará el ${format(data.fecha_hora, "dd/MM 'a las' HH:mm")}. Recuerda que puedes predecir el resultado hasta una hora antes de que comience ingresando a ${process.env.FRONTEND_URL}/matches/${data.id_partido}/prediction.

        ¡Mucha suerte!
        El Equipo de PencaUCU
    `);
}

export const upcomingMatchNotificationGeneratorJob = CronJob.from({
    cronTime: '0 10 * * *',
    onTick: async function() {
        console.log('[CRON-GEN] Buscando participantes que falten ingresar predicciones...');
        const data = await getUsersMissingPredictions();
        console.log(`[CRON-GEN] Faltan ingresar ${data.length} predicciones. Generando notificaciones...`);

         await insertNotifications(data.map((singleNotif) => ({
            id_partido: singleNotif.id_partido,
            documento_alumno: singleNotif.documento,
            mensaje: buildMissingPredictionMessage(singleNotif)
        })));

        console.log(`[CRON-GEN] ¡Notificaciones generadas! Procesando envíos...`);
        notificationSenderJob.fireOnTick();
    },
    start: true,
    runOnInit: true,
    timeZone: 'America/Montevideo'
});