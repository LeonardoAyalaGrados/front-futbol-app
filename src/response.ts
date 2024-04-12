export interface ResponseData {
    content:          Content[];
    pageable:         Pageable;
    totalPages:       number;
    totalElements:    number;
    last:             boolean;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Content {
    idFutbolista:    number;
    nombres:         string;
    apellidos:       string;
    fechaNacido:     string;
    posicion:        Posicion;
    caracteristicas: string;
}

export interface Posicion {
    idPosicion: number;
    nombre:     string;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    empty:    boolean;
    unsorted: boolean;
    sorted:   boolean;
}
