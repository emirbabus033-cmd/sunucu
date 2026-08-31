const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
    host: 'frostbiteadventures268.mcsh.io',
    port: 25565,
    username: 'anti_afk_bot',
    version: '1.19.1'
});

bot.on('spawn', () => {
    console.log('Bot oyuna girdi, kayıt ve giriş işlemleri başlatılıyor...');

    // 1. Saniye: Register komutu
    setTimeout(() => {
        bot.chat('/register Sifre123! Sifre123!');
        console.log('/register komutu gönderildi.');
    }, 500);

    // 2. Saniye: Login komutu (1.5 saniye sonra)
    setTimeout(() => {
        bot.chat('/login Sifre123!');
        console.log('/login komutu gönderildi.');
    }, 2000);
});

// Durmadan koşmak yerine düzenli aralıklarla yürüy Döngüsü
let isWalking = false;

bot.on('spawn', () => {
    // İlk girişten bir süre sonra hareket döngüsünü başlat
    setTimeout(() => {
        setInterval(() => {
            // İleri tuşuna basılı tutma süresini simüle etmek için yürütme mantığı
            isWalking = !isWalking;
            bot.setControlState('forward', isWalking);
            
            // Yön değiştirme veya arada zıplama ekleyerek anti-afk taktiği
            if (isWalking) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 5000); // Her 5 saniyede bir yürüyüş durumunu değiştirir (durmadan koşmaz)
    }, 4000);
});

bot.on('error', (err) => {
    console.log('Bir hata oluştu:', err);
});

bot.on('kicked', (reason) => {
    console.log('Bot sunucudan atıldı:', reason);
});
