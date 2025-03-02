# Mi Tienda E-commerce

Este proyecto es una aplicación de e-commerce desarrollada con React y Firebase.

## Características

- Catálogo de productos con filtrado por categorías
- Vista detallada de productos
- Carrito de compras
- Proceso de checkout
- Integración con Firebase para almacenamiento de datos

## Tecnologías utilizadas

- React
- TypeScript
- React Router
- Firebase/Firestore
- Tailwind CSS
- Lucide React (iconos)

## Estructura de componentes

- **App**: Componente principal que contiene el enrutamiento y el proveedor del contexto del carrito.
- **NavBar**: Barra de navegación con enlaces a las diferentes secciones y el widget del carrito.
- **CartWidget**: Icono del carrito con indicador de cantidad de productos.
- **ItemListContainer**: Contenedor para mostrar la lista de productos.
- **ItemList**: Componente de presentación para renderizar la lista de productos.
- **Item**: Componente de presentación para mostrar un producto individual en la lista.
- **ItemDetailContainer**: Contenedor para mostrar el detalle de un producto.
- **ItemDetail**: Componente de presentación para mostrar el detalle de un producto.
- **ItemCount**: Componente para seleccionar la cantidad de un producto a agregar al carrito.
- **Cart**: Componente para mostrar el contenido del carrito.
- **CartItem**: Componente de presentación para mostrar un item del carrito.
- **Checkout**: Componente para el proceso de finalización de compra.
- **CheckoutForm**: Formulario para ingresar los datos del comprador.

## Contexto

- **CartContext**: Contexto para manejar el estado del carrito de compras.

## Firebase

- Colección de productos en Firestore
- Colección de órdenes en Firestore
- Actualización de stock en tiempo real

## Instalación y uso

1. Clona este repositorio
2. Instala las dependencias con `npm install`
3. Configura Firebase con tus credenciales en `src/firebase/config.ts`
4. Ejecuta el proyecto con `npm run dev`

## Estructura de la base de datos

### Colección "products"
```
{
  id: string,
  name: string,
  description: string,
  price: number,
  imageUrl: string,
  category: string,
  stock: number
}
```

### Colección "orders"
```
{
  buyer: {
    name: string,
    phone: string,
    email: string
  },
  items: [
    {
      id: string,
      name: string,
      price: number,
      quantity: number
    }
  ],
  total: number,
  date: timestamp
}
```