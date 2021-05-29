import { Motorista } from "../motorista/motorista.model";
import { Veiculo } from "../veiculo/veiculo.model";

export class Carga {
    id?: number;
    motorista: Motorista;
    veiculo: Veiculo;
    descricao: string;
    cidadeOrigem: string;
    cidadeDestino: string;
    dataSaida: Date;
    dataChegada: Date;
}
