# Metal y Concreto - Landing Page

Landing page moderna para constructora especializada en estructuras de acero, diseño y planificación de proyectos.

## 🚀 Tecnologías

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos modernos y responsivos
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos modernos

## 📦 Instalación

1. Instala las dependencias:

```bash
npm install
```

2. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
metalyconcreto/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal
│   │   ├── page.tsx            # Página principal
│   │   └── globals.css         # Estilos globales
│   ├── components/
│   │   ├── Header.tsx          # Header con navegación
│   │   ├── Hero.tsx            # Hero section con carrusel
│   │   ├── Services.tsx        # Sección de servicios
│   │   ├── About.tsx           # Sección acerca de nosotros
│   │   ├── Footer.tsx          # Footer con logo y redes
│   │   └── WhatsAppButton.tsx  # Botón flotante de WhatsApp
│   └── lib/
│       └── config.ts           # Configuración del sitio
├── public/
│   └── logo.png                # Logo de la empresa (agregar imagen)
└── ...
```

## 🎨 Características

- ✅ Diseño moderno con arquetipos redondeados
- ✅ Completamente responsivo
- ✅ Header fijo con navegación suave
- ✅ Hero section con carrusel de imágenes
- ✅ Sección de servicios destacada
- ✅ Footer completo con logo, contacto y redes sociales
- ✅ Botón flotante de WhatsApp
- ✅ Animaciones y transiciones suaves

## 📝 Configuración

### Imágenes

Agrega las siguientes imágenes en la carpeta `public/`:

- `logo.png` - Logo de la empresa
- `hero-1.jpg` - Imagen 1 del carrusel
- `hero-2.jpg` - Imagen 2 del carrusel
- `hero-3.jpg` - Imagen 3 del carrusel

### WhatsApp

Edita el número de teléfono en `components/WhatsAppButton.tsx`:

```typescript
const phoneNumber = '1234567890'; // Reemplazar con el número real
```

### Información de Contacto

Actualiza la información de contacto en `components/Footer.tsx`:
- Número de teléfono
- Email
- Enlaces de redes sociales

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📱 Responsive Design

El sitio está optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 🎯 Próximos Pasos

- [ ] Agregar imágenes reales
- [ ] Configurar número de WhatsApp
- [ ] Actualizar información de contacto
- [ ] Agregar sección "Acerca de Nosotros"
- [ ] Implementar formulario de cotización
- [ ] Agregar más animaciones
- [ ] Optimizar imágenes
- [ ] Agregar SEO meta tags

