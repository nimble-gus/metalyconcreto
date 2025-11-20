# Instrucciones de Configuración

## 📸 Imágenes Requeridas

Agrega las siguientes imágenes en la carpeta `public/`:

1. **logo.png** - Logo de la empresa (recomendado: 200x200px o más, formato PNG con fondo transparente)
2. **hero-1.jpg** - Primera imagen del carrusel (recomendado: 1920x1080px o más)
3. **hero-2.jpg** - Segunda imagen del carrusel (recomendado: 1920x1080px o más)
4. **hero-3.jpg** - Tercera imagen del carrusel (recomendado: 1920x1080px o más)

### Nota sobre las imágenes del Hero
Si las imágenes no están disponibles, el carrusel mostrará un gradiente de fondo azul como placeholder. Las imágenes se cargarán automáticamente cuando las agregues a la carpeta `public/`.

## 📱 Configuración de WhatsApp

1. Abre el archivo `components/WhatsAppButton.tsx`
2. Busca la línea con `phoneNumber`
3. Reemplaza `'1234567890'` con tu número de WhatsApp real (sin + ni espacios)
   - Ejemplo: Si tu número es +52 55 1234 5678, escribe: `'525512345678'`

## 📞 Información de Contacto

Actualiza la información de contacto en `components/Footer.tsx`:

1. **Teléfono**: Busca `tel:+1234567890` y reemplázalo con tu número real
2. **Email**: Busca `contacto@metalyconcreto.com` y reemplázalo con tu email real
3. **Redes Sociales**: Actualiza los enlaces en el array `socialLinks`

## 🎨 Personalización de Colores

Los colores principales están definidos en `tailwind.config.ts`. Puedes modificar la paleta de colores `primary` según tu marca.

## 🚀 Primeros Pasos

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Agrega las imágenes a la carpeta `public/`

3. Configura el número de WhatsApp y la información de contacto

4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## ✅ Checklist de Configuración

- [ ] Agregar logo.png a la carpeta public/
- [ ] Agregar hero-1.jpg, hero-2.jpg, hero-3.jpg a la carpeta public/
- [ ] Configurar número de WhatsApp en WhatsAppButton.tsx
- [ ] Actualizar teléfono en Footer.tsx
- [ ] Actualizar email en Footer.tsx
- [ ] Actualizar enlaces de redes sociales en Footer.tsx
- [ ] Personalizar colores si es necesario (tailwind.config.ts)
- [ ] Revisar y ajustar textos según necesidad

## 📝 Notas Adicionales

- El sitio está completamente responsivo y funcionará en todos los dispositivos
- Las animaciones y transiciones están optimizadas para una experiencia fluida
- El diseño utiliza arquetipos redondeados como solicitaste
- El botón de WhatsApp es flotante y siempre visible en la esquina inferior derecha


