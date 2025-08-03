# InmobiliariaCoderCraft

Monorepo basado en Nx que agrupa varios microservicios Nest.js:

- **auth**
- **properties**
- **payments**
- **gateway**

El gateway expone rutas HTTP (`/auth`, `/properties`, `/payments`) que redirigen a cada microservicio correspondiente.

## Comandos básicos

Instalar dependencias:

```bash
npm install
```

Ejecutar pruebas:

```bash
npm test
```

Iniciar un servicio (ejemplo, gateway):

```bash
npx nx serve gateway
```
