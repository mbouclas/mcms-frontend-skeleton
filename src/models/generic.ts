export interface IGate {
    uuid?: string;
    gate: string;
    level: number;
    name: string;
    description?: string;
    provider: string;
}

export interface IBaseNamedModel {
    uuid: string;
    name: string;
}

export interface ILanguage extends IBaseNamedModel{
    code: string;
}

export interface IGenericObject<T = any> {
    [key: string]: T;
}
