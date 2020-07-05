# Özet
Bu projede bizden Socket programlama ile mesajlajma uygulaması gerçekleştirmemiz istenmiştir. Proje Node.js, React JS, MondoDB teknolojileri ve Mongoose, Socket.io kütüphaneleri kullanılarak gerçekleştirilmiştir.

# Geliştirilen Yazılım

Projede bizden istendiği gibi TCP temelli kişilerin mesajlaşmasını sağlayan bir uygulama gerçekleştirilmiştir. Uygulamamızda mesajlar gerçek zamanlı olarak gönderilmektedir.


[![image](https://i.hizliresim.com/qojjU1.png)](https://hizliresim.com/qojjU1)

Yukarıda görülen mimarideki gibi proje üç ana kısımdan oluşmaktadır. Kullanıcı tarafındaki işlemler React’la gerçekleştirilmiş olup, HTML/CSS ve JS ile UI tasarımı yapılmıştır. Socket.io kütüphanesi ile mesajlaşma işlemleri gerçekleştirilmektedir. Socket.io ile taraflar arası yeniden bağlantı kurmadan veri alışverişi rahatça sağlanmıştır. Socket.emit() mesaj yollamaktan sorumludur. Socket.on() ise gelen mesajları dinlemekten sorumludur. Bu yapılar sayesinde gereksiz enerji kaybından kurtulmuş olduk. Bu uygulama ile hem tek bir kullanıcıya, hem odalara katılan bir grup kullanıcıya hem de broasdcast yaparak sunucuya bağlı tüm kullanıcılara mesaj gönderilebilmektedir. Mesajların tamamı veritabanına kaydedilmektedir. Kullanıcı sunucuya bağlı olmasa bile gönderilen mesajları çevrimiçi olduğunda görebilmektedir.

# Projenin Çalıştırılması

Proje klasörü içinde bir terminal açılır. Bu terminalde
**npm install**
**cd client**
**npm install**
komutları ard arda terminale girilerek node modülleri tamamen yüklenmiş olur.
Projeyi çalıştırmak için proje klasörüne gidip
**npm run dev**
komutu çalıştırılır.