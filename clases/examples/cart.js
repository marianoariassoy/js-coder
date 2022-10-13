class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
  mostrarProducto() {
    return this.nombre + " " + "$" + this.precio;
  }
}

let p1 = new Producto("Pizza Muzzarella", 1020);
let p2 = new Producto("Sandwich de Bondiola", 900);
let p3 = new Producto("Papas Chedar", 700);

class DetallePedido {
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }
  mostrarDetalle() {
    return this.cantidad + "x " + this.producto.nombre + " ($" + this.calcularMontoDetalle() + ")";
  }
  calcularMontoDetalle() {
    return this.cantidad * this.producto.precio;
  }
}

let detalle1 = new DetallePedido(p1, 2);
let detalle2 = new DetallePedido(p2, 1);
let detalle3 = new DetallePedido(p3, 3);

class Pedido {
  constructor(fecha, detalles) {
    this.fecha = fecha;
    this.detalles = detalles;
  }
  calcularTotal() {
    let resultado = 0;
    for (let i = 0; i < this.detalles.length; i++) {
      let dp = this.detalles[i];
      resultado = resultado + dp.calcularMontoDetalle();
    }
    return resultado;
  }
  mostrarPedido() {
    let resultado = "";
    for (const dp of this.detalles) {
      resultado += dp.mostrarDetalle() + "\n";
    }
    resultado += "TOTAL: $" + this.calcularTotal();
    return resultado;
  }
}

let detalles1 = [];
detalles1.push(detalle1);
detalles1.push(detalle2);
detalles1.push(detalle3);

let pedido1 = new Pedido(new Date(), detalles1);
console.log(pedido1.mostrarPedido());
