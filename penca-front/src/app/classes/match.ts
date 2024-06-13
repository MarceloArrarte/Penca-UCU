export class Match {
  id: number;
  equipos: MatchTeams;
  datetime: Date;
  fase: string;
  jornada: number;
  prediccion?: MatchPrediction;

  constructor({ id, equipos, datetime, fase, jornada, prediccion }: {
    id: number,
    equipos: MatchTeams,
    datetime: Date,
    fase: string,
    jornada: number,
    prediccion?: MatchPrediction
  }) {
    this.id = id;
    this.equipos = equipos;
    this.datetime = datetime;
    this.fase = fase;
    this.jornada = jornada;
    this.prediccion = prediccion;
  }
}

export class PlayedMatch extends Match {
  resultado: MatchResult;


  constructor({ id, equipos, datetime, fase, jornada, prediccion, resultado }: {
    id: number,
    equipos: MatchTeams,
    datetime: Date,
    fase: string,
    jornada: number,
    prediccion?: MatchPrediction,
    resultado: MatchResult
  }) {
    super({ id, equipos, datetime, fase, jornada, prediccion });
    
    this.resultado = resultado;
  }

  get isExactPrediction() {
    return this.prediccion && (this.prediccion[0] == this.resultado[0] && this.prediccion[1] == this.resultado[1]);
  }

  get isCorrectPrediction() {
    return this.prediccion && !this.isExactPrediction
      && ((this.prediccion[0] > this.prediccion[1] && this.resultado[0] > this.resultado[1])
      || (this.prediccion[1] > this.prediccion[0] && this.resultado[1] > this.resultado[0]));
  }

  get isWrongPrediction() {
    return this.prediccion
      && ((this.prediccion[0] > this.prediccion[1] && this.resultado[0] < this.resultado[1])
      || (this.prediccion[1] > this.prediccion[0] && this.resultado[1] < this.resultado[0]));
  }
}

export type MatchTeams = [string, string];

export type MatchPrediction = [number, number];

export type MatchResult = MatchPrediction;