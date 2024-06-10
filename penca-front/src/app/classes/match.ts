export class PendingMatch {
  equipos: [string, string];
  datetime: Date;
  fase: string;
  jornada: number;
  prediccion?: [number, number];

  constructor({ equipos, datetime, fase, jornada, prediccion }: {
    equipos: [string, string],
    datetime: Date,
    fase: string,
    jornada: number,
    prediccion?: [number, number]
  }) {
    this.equipos = equipos;
    this.datetime = datetime;
    this.fase = fase;
    this.jornada = jornada;
    this.prediccion = prediccion;
  }
}

export class PlayedMatch extends PendingMatch {
  resultado: [number, number];


  constructor({ equipos, datetime, fase, jornada, prediccion, resultado }: {
    equipos: [string, string],
    datetime: Date,
    fase: string,
    jornada: number,
    prediccion?: [number, number],
    resultado: [number, number]
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