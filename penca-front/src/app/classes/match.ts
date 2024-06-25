import { differenceInHours, differenceInMinutes } from "date-fns";

export class Match {
  id: number;
  equipos: MatchTeams;
  datetime: Date;
  fase: string;
  prediccion?: MatchPrediction;

  constructor({ id, equipos, datetime, fase, prediccion }: {
    id: number,
    equipos: MatchTeams,
    datetime: Date,
    fase: string,
    prediccion?: MatchPrediction
  }) {
    this.id = id;
    this.equipos = equipos;
    this.datetime = datetime;
    this.fase = fase;
    this.prediccion = prediccion;
  }

  get newPredictionAllowed(): boolean {
    return this.remainingMinutesToStart >= 60;
  }

  get remainingMinutesToStart(): number {
    return differenceInMinutes(this.datetime, new Date(), { roundingMethod: 'floor' });
  }

  get elapsedMinutes(): number {
    return -differenceInMinutes(this.datetime, new Date(), { roundingMethod: 'ceil' });
  }
}



export class PlayedMatch extends Match {
  resultado: MatchResult;


  constructor({ id, equipos, datetime, fase, prediccion, resultado }: {
    id: number,
    equipos: MatchTeams,
    datetime: Date,
    fase: string,
    prediccion?: MatchPrediction,
    resultado: MatchResult
  }) {
    super({ id, equipos, datetime, fase, prediccion });
    
    this.resultado = resultado;
  }

  isExactPrediction(): this is PlayedMatch & { prediccion: MatchPrediction } {
    return !!this.prediccion && (this.prediccion[0] == this.resultado[0] && this.prediccion[1] == this.resultado[1]);
  }

  isCorrectPrediction(): this is PlayedMatch & { prediccion: MatchPrediction }  {
    return !!this.prediccion && !this.isExactPrediction()
      && (
        // Gana el primero
        (this.prediccion[0] > this.prediccion[1] && this.resultado[0] > this.resultado[1])
        // Gana el segundo
        || (this.prediccion[1] > this.prediccion[0] && this.resultado[1] > this.resultado[0])
        // Empatan
        || (this.prediccion[0] == this.prediccion[1] && this.resultado[0] == this.resultado[1])
      );
  }

  isWrongPrediction(): this is PlayedMatch & { prediccion: MatchPrediction }  {
    return !!this.prediccion
      && ((this.prediccion[0] > this.prediccion[1] && this.resultado[0] < this.resultado[1])
      || (this.prediccion[1] > this.prediccion[0] && this.resultado[1] < this.resultado[0]));
  }
}

export type MatchTeams = [
  { id: number, name: string },
  { id: number, name: string }
];

export type MatchPrediction = MatchResult;

export type MatchResult = [number, number];

export type MatchToBeDetermined = {
  id: number;
  datetime: Date;
  fase: string;
}