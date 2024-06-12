export class Match {
  equipos: MatchTeams;
  datetime: Date;
  fase: string;
  jornada: number;
  prediccion?: MatchPrediction;

  constructor({ equipos, datetime, fase, jornada, prediccion }: {
    equipos: MatchTeams,
    datetime: Date,
    fase: string,
    jornada: number,
    prediccion?: MatchPrediction
  }) {
    this.equipos = equipos;
    this.datetime = datetime;
    this.fase = fase;
    this.jornada = jornada;
    this.prediccion = prediccion;
  }
}

export class PlayedMatch extends Match {
  resultado: MatchResult;


  constructor({ equipos, datetime, fase, jornada, prediccion, resultado }: {
    equipos: MatchTeams,
    datetime: Date,
    fase: string,
    jornada: number,
    prediccion?: MatchPrediction,
    resultado: MatchResult
  }) {
    super({ equipos, datetime, fase, jornada, prediccion });
    
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