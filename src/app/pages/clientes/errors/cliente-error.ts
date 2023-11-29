export class ClienteError extends Error {}

export class ClienteFormularioInvalido extends ClienteError {}

export class ClienteNotFound extends ClienteError {}

export class ClienteError400 extends ClienteError {}

export class ClienteError500 extends ClienteError {}
