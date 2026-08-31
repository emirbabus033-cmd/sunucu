const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
    host: 'frostbiteadventures268.mcsh.io',
    port: 25565,
    username: 'anti_afk_bot',
    version: '1.19.1'
});

let isInitialized = false;

bot.on('spawn', () => {
    if (isInitialized) return;
    isInitialized = true;

    console.log('Bot oyuna girdi, kimlik doğrulama komutları peş peşe gönderiliyor...');

    // Oyuna girer girmez (neredeyse anında) register komutunu gönder
    setTimeout(() => {
        bot.chat('/register botcuk123 botcuk123');
        console.log('/register komutu gönderildi.');
    }, 200); // 0.2 saniye

    // Çok kısa bir süre sonra hemen login komutunu gönder
    setTimeout(() => {
        bot.chat('/login botcuk123');
        console.log('/login komutu gönderildi.');
    }, 800); // 0.8 saniye

    // Giriş tamamlandıktan sonra durmadan koşma modunu başlat
    setTimeout(() => {
        console.log('Durmadan koşma/yürüme modu aktif.');
        bot.setControlState('forward', true); // İleri tuşunu sürekli basılı tutar
        
        // Ara sıra zıplayarak takılmayı önle
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 7000);
    }, 1500);
});

bot.on('error', (err) => {
    console.log('Bağlantı hatası:', err);
});

bot.on('kicked', (reason) => {
    console.log('Sunucudan atıldı:', reason);
    isInitialized = false;
});
