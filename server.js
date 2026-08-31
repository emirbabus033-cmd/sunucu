const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
    host: 'frostbiteadventures268.mcsh.io',
    port: 25565,
    username: 'ahmetbabapro',
    version: '1.19.1'
});

let isInitialized = false;

bot.on('spawn', () => {
    if (isInitialized) return;
    isInitialized = true;

    console.log('Bot oyuna girdi, kayıt ve giriş işlemleri başlatılıyor...');

    // 1. Adım: Register komutu
    setTimeout(() => {
        bot.chat('/register botcuk123 botcuk123');
        console.log('/register komutu gönderildi.');
    }, 1000);

    // 2. Adım: Login komutu
    setTimeout(() => {
        bot.chat('/login botcuk123');
        console.log('/login komutu gönderildi.');
    }, 2500);

    // 3. Adım: Giriş işlemlerinden sonra durmadan koşma/yürüme modunu başlat
    setTimeout(() => {
        console.log('Durmadan koşma/yürüme modu aktif.');
        bot.setControlState('forward', true); // İleri tuşunu sürekli basılı tutar
        
        // Ara sıra zıplayarak takılmayı önle
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 7000);
    }, 4000);
});

bot.on('error', (err) => {
    console.log('Bağlantı hatası:', err);
});

bot.on('kicked', (reason) => {
    console.log('Sunucudan atıldı:', reason);
    isInitialized = false;
});
