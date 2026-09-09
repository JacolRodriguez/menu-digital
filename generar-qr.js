import QRCode from 'qrcode';

// La URL definitiva de tu menú digital
const urlMenu = "https://jacolrodriguez.github.io/menu-digital/";

QRCode.toFile('qr_menu_dlucy.png', urlMenu, {
  color: {
    dark: '#020617',  // Color de los puntos (slate-950)
    light: '#FFFFFF'  // Fondo blanco
  },
  width: 1000 // Alta resolución para imprenta
}, function (err) {
  if (err) throw err;
  console.log('¡Listo! Código QR guardado como qr_menu_dlucy.png');
});