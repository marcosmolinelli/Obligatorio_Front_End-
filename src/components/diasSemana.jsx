// Obtener la fecha actual
const fechaActual = new Date();

// Obtener el día de la semana (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
const diaDeLaSemana = fechaActual.getDay();

// Crear un array con los nombres de los días de la semana
const diasDeLaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Obtener el nombre del día de la semana actual
const nombreDelDia = diasDeLaSemana[diaDeLaSemana];

console.log(`Hoy es ${nombreDelDia}.`);

// Supongamos que tienes un conjunto de datos con valores por día
const datosPorDia = {
    Domingo: 10,
    Lunes: 20,
    Martes: 30,
    Miércoles: 40,
    Jueves: 50,
    Viernes: 60,
    Sábado: 70,
};

// Sumar los datos por día
const sumaDeDatosPorDia = datosPorDia[nombreDelDia];

console.log(`La suma de datos para ${nombreDelDia} es: ${sumaDeDatosPorDia}`);
