import db from '../config/database';

type Notification = {
    id_partido: number,
    documento_alumno: string,
    fecha_envio?: Date,
    mensaje: string
}

const insertNotifications = (notifications: Notification[]): Promise<void> => {
    const insertPromises = notifications.map(notif => {
        return new Promise<boolean>((resolve, reject) => {
            db.query(
                'INSERT IGNORE INTO notifica(id_partido, documento_alumno, mensaje) VALUES (?,?,?)',
                [notif.id_partido, notif.documento_alumno, notif.mensaje],
                (err) => {
                    if (err) { return resolve(false); }
                    resolve(true);
                }
            );
        }).then((success) => {
            if (!success) {
                console.error(`Error al guardar la notificación para ${notif.documento_alumno} - ${notif.id_partido}`);
            }
        })
    });

    return Promise.all(insertPromises).then();
}

const getUnsent = (): Promise<(Notification & {email: string, nombre: string})[]> => {
    return new Promise((resolve, reject) => {
        db.query(`
            SELECT n.*, email, nombre
            FROM notifica n
            INNER JOIN alumno a ON a.documento_usuario = n.documento_alumno 
            INNER JOIN usuario u ON u.documento = a.documento_usuario
            WHERE fecha_envio IS NULL;
           `,
            (err, result) => {
                if (err) { return reject(err); }
                resolve(result as (Notification & {email: string, nombre: string})[]);
            }
        );
    });
}

const markAsSent = (notification: Notification) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE notifica SET fecha_envio = NOW() WHERE id_partido = ? AND documento_alumno = ?',
            [notification.id_partido, notification.documento_alumno],
            (err, result) => {
                if (err) { return reject(err); }
                resolve(result as Notification[]);
            }
        );
    });
}

export { insertNotifications, getUnsent, markAsSent }