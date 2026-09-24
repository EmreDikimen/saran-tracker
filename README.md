# Track App

> Çalışma adı. Ürünün gerçek ismi henüz belirlenmedi.

Kültür ve sanat alanında günlük mikro alışkanlık kazandıran bir mobil uygulama. Kullanıcı günde 90 saniye ile 2 dakika arasında bir içerik tüketir: bir şiir, bir tablo, bir film karesi.

## Problem

Bugün bir hobiyi telefondan yapan kişi, onu takip etmek için başka bir uygulamaya geçmek zorunda. Şiirini okuyup uygulamadan çıkıyor, alışkanlık takip uygulamasını açıyor, tik atıyor. Bu geçiş odağı dağıtıyor ve süreci aksatıyor.

Bu uygulamada **içeriği tükettiğin yer ile "yaptım" dediğin yer aynı ekran.**

## Kime

Dikkat süresi kısa olan ve alışkanlık takibinde zorlanan kullanıcılar, özellikle DEHB'li bireyler. Bu kitle için uygulama değiştirmek en büyük engel.

## Nasıl çalışır

İki ana kol var:

**1. Günlük Ritim.** Ekranın üst köşesinde en fazla 3 kahve fincanı durur. Bir kategoriye girmek 1 fincan harcar; o oturum boyunca kullanıcı istediği kadar içerikle vakit geçirebilir. Ana sayfaya dönünce oturum kapanır. Fincanlar 3 saatte bir yenilenir, hiç kalmayınca uygulama tamamen kapanır. Amaç, ilk gün hevesi tüketmeyi engellemek.

**2. Büyük Resim.** Günün ilk tamamlanan içeriği, sisli bir silüet halinde duran bir tablonun rastgele bir parçasını açar. 100 parça bitince tablo tamamlanır ve yenisi başlar. Açılan parçalar hiçbir koşulda geri alınmaz.

Ayrıntılar: [mekanik-tasarimi.md](mekanik-tasarimi.md)

## İçerik kategorileri

Şiir, tablo, animasyon, film karesi, müzik, günün kelimesi.

MVP'de hepsi olmayacak. Telifi en temiz olanlarla başlanacak: tablo, kamu malı şiir ve günün kelimesi.

## Durum

Fikir ve tasarım aşaması. Henüz kod yok.

## Dokümanlar

| Dosya | İçerik |
| --- | --- |
| [proje-tanımı.md](proje-tanımı.md) | Ürünün genel tanımı, kategoriler, ekranlar, sonraya bırakılanlar |
| [mekanik-tasarimi.md](mekanik-tasarimi.md) | İki ana mekaniğin kuralları ve ekran akışı |

## Sıradaki adımlar

1. DEHB'li kullanıcılarla görüşerek temel varsayımı doğrulamak
2. MVP kategorilerini ve içerik havuzunu netleştirmek
3. Şiir ve müzik için telif yolunu araştırmak
4. Ana ekran ve tüketim ekranı için tasarım prototipi
