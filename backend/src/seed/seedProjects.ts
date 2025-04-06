import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project';

// Load environment variables
dotenv.config();

// Sample project data
const sampleProjects = [
  {
    title: 'Milli Eğitim Bakanlığı CBS',
    description: "Milli Eğitim Bakanlığı'nın bütün okullarının CBS ortamında yönetilmesi amacıyla geliştirilmiş bir projedir. Angular ve ASP.NET Core kullanılarak geliştirilmiştir.",
    imageUrl: '/assets/images/meb.png',
    technologies: ['Angular', 'Node.js', 'ASP.NET Core', 'PostgreSQL', 'TypeScript', 'Bootstrap', 'ArcGIS Server'],
    githubUrl: '',
    liveUrl: '',
    featured: true,
    order: 1,
    completionDate: new Date('2024-03-31'),
    features: [
      'Kullanıcı kimlik doğrulaması ve profil yönetimi',
      'Okul ve eğitim kurumlarının harita üzerinde görüntülenmesi',
      'Gelişmiş arama ve filtreleme özellikleri',
      'Okul detayları ve istatistiklerinin raporlanması',
      'Bölgesel eğitim analizleri',
      'Yönetici paneli ile veri yönetimi'
    ],
    challenges: [
      {
        title: 'Büyük Veri Yönetimi',
        description: 'Türkiye genelindeki binlerce okulun verilerini verimli bir şekilde yönetmek için özel veritabanı optimizasyonları geliştirdik.'
      },
      {
        title: 'Harita Entegrasyonu',
        description: 'ArcGIS Server ile entegrasyon sağlayarak, karmaşık coğrafi verileri kullanıcı dostu bir arayüzde sunmayı başardık.'
      },
      {
        title: 'Performans Optimizasyonu',
        description: 'Büyük veri setleriyle çalışırken bile hızlı yanıt süreleri sağlamak için önbellek mekanizmaları ve lazy loading teknikleri uyguladık.'
      }
    ],
    images: []
  },
  {
    title: 'Görüntü Tabanlı Bilgi Yönetim Sistemi (Karayolu varlık yönetim ve bakım onarım sistemi)',
    description: "KGM, Görüntü Tabanlı Bilgi Yönetim Sistemi (GTBYS) projesiyle karayolları ağında bulunan envanterlerin kurumun ihtiyaçlarını karşılayacak şekilde hızlı ve güvenilir olarak toplanıp uygulama kullanıcılarına sunulmasını amaçlıyor.",
    imageUrl: '/assets/images/gtbys.jpg',
    technologies: ['Angular', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Bootstrap', 'Geoserver'],
    githubUrl: '',
    liveUrl: '',
    featured: true,
    order: 2,
    completionDate: new Date('2025-03-31'),
    features: [
      'Kullanıcı kimlik doğrulaması ve ekip yönetimi',
      'Karayolu envanterlerinin harita üzerinde görüntülenmesi',
      'Yol durumu ve bakım ihtiyaçlarının raporlanması',
      'Gerçek zamanlı veri güncelleme ve bildirimler',
      'Görüntü tabanlı varlık tespiti ve analizi',
      'Bakım-onarım planlaması ve takibi',
      'İlerleme takibi ve raporlama'
    ],
    challenges: [
      {
        title: 'Gerçek Zamanlı Veri İşleme',
        description: 'Yüksek çözünürlüklü yol görüntülerinin işlenmesi ve analizi için özel algoritmalar geliştirdik.'
      },
      {
        title: 'Coğrafi Veri Entegrasyonu',
        description: 'Geoserver kullanarak karmaşık coğrafi verileri entegre ettik ve kullanıcı dostu harita arayüzleri oluşturduk.'
      },
      {
        title: 'Mobil Uyumluluk',
        description: 'Saha ekiplerinin mobil cihazlardan sisteme erişebilmesi için responsive tasarım ve offline çalışma özellikleri ekledik.'
      }
    ],
    images: []
  },
  {
    title: 'Arnavutköy Belediyesi Açık Veri Portalı',
    description: 'Bu projeyle Belediyeye ve kurumlara ait verilerin açık ve erişilebilir hale getirilmesi amaçlanmıştır. Proje geliştirme aşamasında CKAN açık kaynak yazılımı kullanılmıştır.',
    imageUrl: '/assets/images/arnavutkoy.png',
    technologies: ['Python', 'Flask', 'Jinja2', 'PostgreSQL', 'Solr', 'Redis', 'Docker'],
    githubUrl: '',
    liveUrl: 'https://acikveri.arnavutkoy.bel.tr',
    featured: false,
    order: 3,
    completionDate: new Date('2024-06-30'),
    features: [
      'Belediye verilerinin kategorilere ayrılmış şekilde sunulması',
      'Veri setlerinin CSV, JSON, XML formatlarında indirilebilmesi',
      'Gelişmiş arama ve filtreleme özellikleri',
      'Veri görselleştirme araçları ve grafikler',
      'API erişimi ile verilerin programatik kullanımı',
      'Kullanıcı hesapları ve veri abonelikleri',
      'Mobil uyumlu tasarım'
    ],
    challenges: [
      {
        title: 'Veri Standardizasyonu',
        description: 'Farklı kaynaklardan gelen verilerin standart bir formatta sunulması için ETL süreçleri geliştirdik.'
      },
      {
        title: 'Performans Optimizasyonu',
        description: 'Büyük veri setlerinin hızlı bir şekilde sorgulanabilmesi için Solr arama motoru entegrasyonu yaptık.'
      },
      {
        title: 'Kullanıcı Deneyimi',
        description: 'Teknik olmayan kullanıcıların da kolayca anlayabileceği bir arayüz tasarımı geliştirdik.'
      }
    ],
    images: []
  },
  {
    title: 'Yemek Tarifi Uygulaması',
    description: "TheMealDB API'sini kullanarak geliştirdiğim kapsamlı bir yemek tarifi uygulaması. Kullanıcılar kategorilere, mutfaklara ve içeriklere göre tarifleri arayabilir, favori tariflerini kaydedebilir ve kendi tariflerini ekleyebilir.",
    imageUrl: '/assets/images/recipe.png',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Redux', 'Bootstrap', 'TheMealDB API'],
    githubUrl: 'https://github.com/temurtas17/Recipe-App',
    liveUrl: '',
    featured: true,
    order: 4,
    completionDate: new Date('2025-02-02'),
    features: [
      'Kategorilere göre yemek tarifleri listeleme',
      'Mutfaklara göre filtreleme (Türk, İtalyan, Meksika vb.)',
      'İçeriklere göre arama yapabilme',
      'Kullanıcı hesapları ve profil yönetimi',
      'Favori tarifleri kaydetme ve koleksiyon oluşturma',
      'Kullanıcıların kendi tariflerini ekleyebilmesi',
      'Detaylı tarif sayfaları ve adım adım yapılış talimatları',
      'Responsive tasarım ile mobil uyumluluk'
    ],
    challenges: [
      {
        title: 'API Entegrasyonu',
        description: 'TheMealDB API ile farklı endpoint\'leri etkin bir şekilde kullanarak zengin bir veri kaynağı oluşturdum ve kendi veritabanımızla senkronize ettim.'
      },
      {
        title: 'Dinamik Filtreleme Sistemi',
        description: 'Kullanıcıların birden fazla kritere göre (kategori, mutfak, içerik) aynı anda arama yapabilmesini sağlayan esnek bir filtreleme sistemi geliştirdim.'
      },
      {
        title: 'Kullanıcı İçeriği Yönetimi',
        description: 'Kullanıcıların kendi tariflerini ekleyebilmesi için güvenli bir içerik doğrulama ve onaylama mekanizması oluşturdum.'
      }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        caption: 'Ana sayfa ve kategoriler'
      },
      {
        url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        caption: 'Tarif detay sayfası'
      },
      {
        url: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        caption: 'Favori tarifler koleksiyonu'
      }
    ]
  }
];

// Connect to MongoDB
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert sample projects
    const result = await Project.insertMany(sampleProjects);
    console.log(`Added ${result.length} sample projects to the database`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Run the seed function
seedDatabase(); 