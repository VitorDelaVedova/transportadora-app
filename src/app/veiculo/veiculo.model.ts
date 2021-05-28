import { Tipo } from "./tipo.enum";

export class Veiculo {
    id?: number;
    modelo: string;
    placa: string;
    ano: string;
    tipo: Tipo;
    foto: string;
}
