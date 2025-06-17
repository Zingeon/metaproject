import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from 'typeorm';
import { Category } from '../categories/entities/categories.entity';
import { Label } from '../labels/entities/labels.entity';
import { Item } from '../items/entities/items.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async seed() {
    await this.seedCategories();
    await this.seedLabels();
    await this.seedItems();
  }

  async run() {
    await this.seed();
  }

  private async seedCategories() {
    const electronics = await this.categoryRepository.save({
      name: 'Electronics',
      description: 'Electronic devices and accessories'
    });

    const clothing = await this.categoryRepository.save({
      name: 'Clothing',
      description: 'Fashion and apparel'
    });

    const books = await this.categoryRepository.save({
      name: 'Books',
      description: 'Books and publications'
    });

    await this.categoryRepository.save([
      {
        name: 'Smartphones',
        description: 'Mobile phones and accessories',
        parent: electronics
      },
      {
        name: 'Laptops',
        description: 'Portable computers',
        parent: electronics
      },
      {
        name: "Men's Clothing",
        description: 'Clothing for men',
        parent: clothing
      },
      {
        name: "Women's Clothing",
        description: 'Clothing for women',
        parent: clothing
      },
      {
        name: 'Fiction',
        description: 'Fiction books',
        parent: books
      },
      {
        name: 'Non-Fiction',
        description: 'Non-fiction books',
        parent: books
      }
    ]);
  }

  private async seedLabels() {
    await this.labelRepository.save([
      {
        name: 'Seasonal',
        description: 'Items available during specific seasons'
      },
      {
        name: 'Top 100',
        description: 'Most popular items'
      },
      {
        name: 'Top 1000',
        description: 'Widely popular items'
      },
      {
        name: 'New Arrival',
        description: 'Recently added items'
      },
      {
        name: 'Best Seller',
        description: 'Best selling items'
      }
    ]);
  }

  private async seedItems() {
    const smartphones = await this.categoryRepository.findOne({ where: { name: 'Smartphones' } });
    const laptops = await this.categoryRepository.findOne({ where: { name: 'Laptops' } });
    const mensClothing = await this.categoryRepository.findOne({ where: { name: "Men's Clothing" } });
    const womensClothing = await this.categoryRepository.findOne({ where: { name: "Women's Clothing" } });
    const fiction = await this.categoryRepository.findOne({ where: { name: 'Fiction' } });

    const seasonal = await this.labelRepository.findOne({ where: { name: 'Seasonal' } });
    const top100 = await this.labelRepository.findOne({ where: { name: 'Top 100' } });
    const top1000 = await this.labelRepository.findOne({ where: { name: 'Top 1000' } });
    const newArrival = await this.labelRepository.findOne({ where: { name: 'New Arrival' } });
    const bestSeller = await this.labelRepository.findOne({ where: { name: 'Best Seller' } });

    const items: DeepPartial<Item>[] = [
      {
        name: { en: 'iPhone 15 Pro', fr: 'iPhone 15 Pro', ar: 'آيفون 15 برو', uk: 'iPhone 15 Pro' },
        description: { en: 'Latest Apple flagship', fr: 'Dernier fleuron Apple', ar: 'أحدث هاتف آبل', uk: 'Останній флагман Apple' },
        images: ['https://example.com/iphone15.jpg'],
        category: smartphones as Category,
        price: 999.99,
        labels: [top100, bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Samsung Galaxy S24', ar: 'سامسونج جالكسي S24', uk: 'Samsung Galaxy S24' },
        description: { en: 'Latest Samsung flagship', fr: 'Dernier fleuron Samsung', ar: 'أحدث هاتف سامسونج', uk: 'Останній флагман Samsung' },
        images: ['https://example.com/s24.jpg'],
        category: smartphones as Category,
        price: 899.99,
        labels: [top1000, newArrival].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Google Pixel 8', fr: 'Google Pixel 8', ar: 'جوجل بكسل 8', uk: 'Google Pixel 8' },
        description: { en: 'AI-focused smartphone', fr: 'Smartphone axé sur l\'IA', ar: 'هاتف ذكي يركز على الذكاء الاصطناعي', uk: 'Смартфон з акцентом на ШІ' },
        images: ['https://example.com/pixel8.jpg'],
        category: smartphones as Category,
        price: 699.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'MacBook Pro M3', ar: 'ماك بوك برو M3', uk: 'MacBook Pro M3' },
        description: { en: 'Professional laptop', fr: 'Ordinateur portable professionnel', ar: 'كمبيوتر محمول احترافي', uk: 'Професійний ноутбук' },
        images: ['https://example.com/macbook.jpg'],
        category: laptops as Category,
        price: 1999.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Dell XPS 15', fr: 'Dell XPS 15', ar: 'ديل اكس بي اس 15', uk: 'Dell XPS 15' },
        description: { en: 'Premium laptop', fr: 'Ordinateur portable premium', ar: 'كمبيوتر محمول فاخر', uk: 'Преміум ноутбук' },
        images: ['https://example.com/xps.jpg'],
        category: laptops as Category,
        price: 1499.99,
        labels: [bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Lenovo ThinkPad', ar: 'لينوفو ثينك باد', uk: 'Lenovo ThinkPad' },
        description: { en: 'Business laptop', fr: 'Ordinateur portable professionnel', ar: 'كمبيوتر محمول للأعمال', uk: 'Бізнес ноутбук' },
        images: ['https://example.com/thinkpad.jpg'],
        category: laptops as Category,
        price: 1299.99,
        labels: [top1000].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Men\'s T-Shirt', fr: 'T-shirt Homme', ar: 'تي شيرت رجالي', uk: 'Чоловіча футболка' },
        description: { en: 'Cotton t-shirt', fr: 'T-shirt en coton', ar: 'تي شيرت قطني', uk: 'Бавовняна футболка' },
        images: ['https://example.com/tshirt.jpg'],
        category: mensClothing as Category,
        price: 29.99,
        labels: [newArrival].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Men\'s Jeans', ar: 'جينز رجالي', uk: 'Чоловічі джинси' },
        description: { en: 'Classic denim', fr: 'Denim classique', ar: 'دينيم كلاسيكي', uk: 'Класичні джинси' },
        images: ['https://example.com/jeans.jpg'],
        category: mensClothing as Category,
        price: 79.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Women\'s Dress', fr: 'Robe Femme', ar: 'فستان نسائي', uk: 'Жіноча сукня' },
        description: { en: 'Summer dress', fr: 'Robe d\'été', ar: 'فستان صيفي', uk: 'Літня сукня' },
        images: ['https://example.com/dress.jpg'],
        category: womensClothing as Category,
        price: 89.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Women\'s Blouse', ar: 'بلوزة نسائية', uk: 'Жіноча блузка' },
        description: { en: 'Elegant blouse', fr: 'Blouse élégante', ar: 'بلوزة أنيقة', uk: 'Елегантна блузка' },
        images: ['https://example.com/blouse.jpg'],
        category: womensClothing as Category,
        price: 59.99,
        labels: [bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: '1984', fr: '1984', ar: '1984', uk: '1984' },
        description: { en: 'Dystopian classic', fr: 'Classique dystopique', ar: 'كلاسيكي ديستوبي', uk: 'Дистопічна класика' },
        images: ['https://example.com/1984.jpg'],
        category: fiction as Category,
        price: 12.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'OnePlus 12', fr: 'OnePlus 12', ar: 'ون بلس 12', uk: 'OnePlus 12' },
        description: { en: 'Flagship killer', fr: 'Tueur de fleuron', ar: 'قاتل الفئة العليا', uk: 'Вбивця флагманів' },
        images: ['https://example.com/oneplus1.jpg'],
        category: smartphones as Category,
        price: 699.99,
        labels: [top1000].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Xiaomi 14', ar: 'شاومي 14', uk: 'Xiaomi 14' },
        description: { en: 'Chinese flagship', fr: 'Fleuron chinois', ar: 'هاتف صيني فاخر', uk: 'Китайський флагман' },
        images: ['https://example.com/xiaomi1.jpg'],
        category: smartphones as Category,
        price: 649.99,
        labels: [newArrival].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Nothing Phone 2', fr: 'Nothing Phone 2', ar: 'ناثينج فون 2', uk: 'Nothing Phone 2' },
        description: { en: 'Unique design phone', fr: 'Téléphone design unique', ar: 'هاتف بتصميم فريد', uk: 'Телефон з унікальним дизайном' },
        images: ['https://example.com/nothing1.jpg'],
        category: smartphones as Category,
        price: 599.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'ASUS ROG Phone', ar: 'آسوس روغ فون', uk: 'ASUS ROG Phone' },
        description: { en: 'Gaming smartphone', fr: 'Smartphone gaming', ar: 'هاتف للألعاب', uk: 'Ігровий смартфон' },
        images: ['https://example.com/rog1.jpg'],
        category: smartphones as Category,
        price: 899.99,
        labels: [bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Motorola Edge', fr: 'Motorola Edge', ar: 'موتورولا إيدج', uk: 'Motorola Edge' },
        description: { en: 'Curved display phone', fr: 'Téléphone à écran incurvé', ar: 'هاتف بشاشة منحنية', uk: 'Телефон з вигнутим екраном' },
        images: ['https://example.com/moto1.jpg'],
        category: smartphones as Category,
        price: 549.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Sony Xperia', ar: 'سوني اكسبيريا', uk: 'Sony Xperia' },
        description: { en: 'Camera-focused phone', fr: 'Téléphone orienté photo', ar: 'هاتف موجه للكاميرا', uk: 'Телефон з акцентом на камеру' },
        images: ['https://example.com/sony1.jpg'],
        category: smartphones as Category,
        price: 799.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Vivo X100', fr: 'Vivo X100', ar: 'فيفو X100', uk: 'Vivo X100' },
        description: { en: 'Chinese premium phone', fr: 'Téléphone premium chinois', ar: 'هاتف صيني فاخر', uk: 'Китайський преміум телефон' },
        images: ['https://example.com/vivo1.jpg'],
        category: smartphones as Category,
        price: 699.99,
        labels: [newArrival].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'OPPO Find X7', ar: 'أوبو فايند X7', uk: 'OPPO Find X7' },
        description: { en: 'Innovative design', fr: 'Design innovant', ar: 'تصميم مبتكر', uk: 'Інноваційний дизайн' },
        images: ['https://example.com/oppo1.jpg'],
        category: smartphones as Category,
        price: 749.99,
        labels: [top1000].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Realme GT5', fr: 'Realme GT5', ar: 'ريلمي GT5', uk: 'Realme GT5' },
        description: { en: 'Performance focused', fr: 'Axé sur les performances', ar: 'موجه للأداء', uk: 'Орієнтований на продуктивність' },
        images: ['https://example.com/realme1.jpg'],
        category: smartphones as Category,
        price: 499.99,
        labels: [bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'iQOO 12', ar: 'آيكو 12', uk: 'iQOO 12' },
        description: { en: 'Gaming performance', fr: 'Performance gaming', ar: 'أداء للألعاب', uk: 'Ігрова продуктивність' },
        images: ['https://example.com/iqoo1.jpg'],
        category: smartphones as Category,
        price: 599.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'ASUS ROG Zephyrus', fr: 'ASUS ROG Zephyrus', ar: 'آسوس روغ زيفيروس', uk: 'ASUS ROG Zephyrus' },
        description: { en: 'Gaming laptop', fr: 'Ordinateur portable gaming', ar: 'كمبيوتر محمول للألعاب', uk: 'Ігровий ноутбук' },
        images: ['https://example.com/zephyrus1.jpg'],
        category: laptops as Category,
        price: 1999.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'MSI Stealth', ar: 'ام اس اي ستيلث', uk: 'MSI Stealth' },
        description: { en: 'Slim gaming laptop', fr: 'Ordinateur portable gaming fin', ar: 'كمبيوتر محمول للألعاب نحيف', uk: 'Тонкий ігровий ноутбук' },
        images: ['https://example.com/msi1.jpg'],
        category: laptops as Category,
        price: 1799.99,
        labels: [bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Razer Blade', fr: 'Razer Blade', ar: 'رازر بليد', uk: 'Razer Blade' },
        description: { en: 'Premium gaming laptop', fr: 'Ordinateur portable gaming premium', ar: 'كمبيوتر محمول للألعاب فاخر', uk: 'Преміум ігровий ноутбук' },
        images: ['https://example.com/razer1.jpg'],
        category: laptops as Category,
        price: 2499.99,
        labels: [top1000].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'HP Spectre', ar: 'اتش بي سبيكتر', uk: 'HP Spectre' },
        description: { en: 'Premium ultrabook', fr: 'Ultrabook premium', ar: 'كمبيوتر محمول فاخر', uk: 'Преміум ультрабук' },
        images: ['https://example.com/hp1.jpg'],
        category: laptops as Category,
        price: 1299.99,
        labels: [newArrival].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Microsoft Surface Laptop', fr: 'Microsoft Surface Laptop', uk: 'Microsoft Surface Laptop' },
        description: { en: 'Premium Windows laptop', fr: 'Ordinateur portable Windows premium', uk: 'Преміум ноутбук Windows' },
        images: ['https://example.com/surface1.jpg'],
        category: laptops as Category,
        price: 1599.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Acer Swift', uk: 'Acer Swift' },
        description: { en: 'Lightweight laptop', fr: 'Ordinateur portable léger', uk: 'Легкий ноутбук' },
        images: ['https://example.com/acer1.jpg'],
        category: laptops as Category,
        price: 899.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'ASUS ZenBook', fr: 'ASUS ZenBook', uk: 'ASUS ZenBook' },
        description: { en: 'Ultra-slim laptop', fr: 'Ordinateur portable ultra-fin', uk: 'Ультратонкий ноутбук' },
        images: ['https://example.com/zenbook1.jpg'],
        category: laptops as Category,
        price: 1199.99,
        labels: [bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'LG Gram', uk: 'LG Gram' },
        description: { en: 'Ultra-light laptop', fr: 'Ordinateur portable ultra-léger', uk: 'Ультралегкий ноутбук' },
        images: ['https://example.com/lg1.jpg'],
        category: laptops as Category,
        price: 1099.99,
        labels: [top1000].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Alienware x17', fr: 'Alienware x17', uk: 'Alienware x17' },
        description: { en: 'High-end gaming laptop', fr: 'Ordinateur portable gaming haut de gamme', uk: 'Висококласний ігровий ноутбук' },
        images: ['https://example.com/alienware1.jpg'],
        category: laptops as Category,
        price: 2999.99,
        labels: [newArrival].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Framework Laptop', uk: 'Framework Laptop' },
        description: { en: 'Modular laptop', fr: 'Ordinateur portable modulaire', uk: 'Модульний ноутбук' },
        images: ['https://example.com/framework1.jpg'],
        category: laptops as Category,
        price: 999.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Men\'s Sweater', fr: 'Pull Homme', uk: 'Чоловічий светр' },
        description: { en: 'Wool sweater', fr: 'Pull en laine', uk: 'Вовняний светр' },
        images: ['https://example.com/sweater1.jpg'],
        category: mensClothing as Category,
        price: 89.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Men\'s Polo Shirt', uk: 'Чоловіча поло сорочка' },
        description: { en: 'Cotton polo', fr: 'Polo en coton', uk: 'Бавовняна поло сорочка' },
        images: ['https://example.com/polo1.jpg'],
        category: mensClothing as Category,
        price: 45.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Men\'s Chinos', fr: 'Chino Homme', uk: 'Чоловічі чінос' },
        description: { en: 'Casual pants', fr: 'Pantalon décontracté', uk: 'Повсякденні штани' },
        images: ['https://example.com/chinos1.jpg'],
        category: mensClothing as Category,
        price: 69.99,
        labels: [bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Men\'s Hoodie', uk: 'Чоловічий худі' },
        description: { en: 'Casual hoodie', fr: 'Sweat à capuche décontracté', uk: 'Повсякденний худі' },
        images: ['https://example.com/hoodie1.jpg'],
        category: mensClothing as Category,
        price: 59.99,
        labels: [newArrival].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Men\'s Formal Shirt', fr: 'Chemise formelle Homme', uk: 'Чоловіча формальна сорочка' },
        description: { en: 'Business shirt', fr: 'Chemise professionnelle', uk: 'Ділова сорочка' },
        images: ['https://example.com/formalshirt1.jpg'],
        category: mensClothing as Category,
        price: 79.99,
        labels: [top1000].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Men\'s Shorts', uk: 'Чоловічі шорти' },
        description: { en: 'Summer shorts', fr: 'Short d\'été', uk: 'Літні шорти' },
        images: ['https://example.com/shorts1.jpg'],
        category: mensClothing as Category,
        price: 39.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Men\'s Cardigan', fr: 'Cardigan Homme', uk: 'Чоловічий кардиган' },
        description: { en: 'Knit cardigan', fr: 'Cardigan tricoté', uk: 'В\'язаний кардиган' },
        images: ['https://example.com/cardigan1.jpg'],
        category: mensClothing as Category,
        price: 89.99,
        labels: [bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Men\'s Vest', uk: 'Чоловічий жилет' },
        description: { en: 'Casual vest', fr: 'Gilet décontracté', uk: 'Повсякденний жилет' },
        images: ['https://example.com/vest1.jpg'],
        category: mensClothing as Category,
        price: 49.99,
        labels: [newArrival].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Men\'s Sweatpants', fr: 'Jogging Homme', uk: 'Чоловічі спортивні штани' },
        description: { en: 'Comfortable sweatpants', fr: 'Jogging confortable', uk: 'Зручні спортивні штани' },
        images: ['https://example.com/sweatpants1.jpg'],
        category: mensClothing as Category,
        price: 54.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Men\'s Tank Top', uk: 'Чоловіча майка' },
        description: { en: 'Summer tank top', fr: 'Débardeur d\'été', uk: 'Літня майка' },
        images: ['https://example.com/tanktop1.jpg'],
        category: mensClothing as Category,
        price: 24.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Women\'s Cardigan', fr: 'Cardigan Femme', uk: 'Жіночий кардиган' },
        description: { en: 'Knit cardigan', fr: 'Cardigan tricoté', uk: 'В\'язаний кардиган' },
        images: ['https://example.com/wcardigan1.jpg'],
        category: womensClothing as Category,
        price: 69.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Women\'s Jeans', uk: 'Жіночі джинси' },
        description: { en: 'Slim fit jeans', fr: 'Jean slim', uk: 'Вузькі джинси' },
        images: ['https://example.com/wjeans1.jpg'],
        category: womensClothing as Category,
        price: 79.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Women\'s Sweater', fr: 'Pull Femme', uk: 'Жіночий светр' },
        description: { en: 'Wool sweater', fr: 'Pull en laine', uk: 'Вовняний светр' },
        images: ['https://example.com/wsweater1.jpg'],
        category: womensClothing as Category,
        price: 89.99,
        labels: [bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Women\'s T-Shirt', uk: 'Жіноча футболка' },
        description: { en: 'Cotton t-shirt', fr: 'T-shirt en coton', uk: 'Бавовняна футболка' },
        images: ['https://example.com/wtshirt1.jpg'],
        category: womensClothing as Category,
        price: 29.99,
        labels: [newArrival].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Women\'s Shorts', fr: 'Short Femme', uk: 'Жіночі шорти' },
        description: { en: 'Summer shorts', fr: 'Short d\'été', uk: 'Літні шорти' },
        images: ['https://example.com/wshorts1.jpg'],
        category: womensClothing as Category,
        price: 39.99,
        labels: [top1000].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Women\'s Hoodie', uk: 'Жіночий худі' },
        description: { en: 'Casual hoodie', fr: 'Sweat à capuche décontracté', uk: 'Повсякденний худі' },
        images: ['https://example.com/whoodie1.jpg'],
        category: womensClothing as Category,
        price: 59.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Women\'s Pants', fr: 'Pantalon Femme', uk: 'Жіночі штани' },
        description: { en: 'Casual pants', fr: 'Pantalon décontracté', uk: 'Повсякденні штани' },
        images: ['https://example.com/wpants1.jpg'],
        category: womensClothing as Category,
        price: 69.99,
        labels: [bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Women\'s Tank Top', uk: 'Жіноча майка' },
        description: { en: 'Summer tank top', fr: 'Débardeur d\'été', uk: 'Літня майка' },
        images: ['https://example.com/wtanktop1.jpg'],
        category: womensClothing as Category,
        price: 24.99,
        labels: [newArrival].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Women\'s Jacket', fr: 'Veste Femme', uk: 'Жіноча куртка' },
        description: { en: 'Light jacket', fr: 'Veste légère', uk: 'Легка куртка' },
        images: ['https://example.com/wjacket1.jpg'],
        category: womensClothing as Category,
        price: 99.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Women\'s Sweatpants', uk: 'Жіночі спортивні штани' },
        description: { en: 'Comfortable sweatpants', fr: 'Jogging confortable', uk: 'Зручні спортивні штани' },
        images: ['https://example.com/wsweatpants1.jpg'],
        category: womensClothing as Category,
        price: 54.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'The Catcher in the Rye', fr: 'L\'Attrape-cœurs', uk: 'Ловець у житі' },
        description: { en: 'Coming of age novel', fr: 'Roman d\'apprentissage', uk: 'Роман про дорослішання' },
        images: ['https://example.com/catcher.jpg'],
        category: fiction as Category,
        price: 13.99,
        labels: [bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'Pride and Prejudice', uk: 'Гордість і упередження' },
        description: { en: 'Classic romance', fr: 'Romance classique', uk: 'Класична романтика' },
        images: ['https://example.com/pride.jpg'],
        category: fiction as Category,
        price: 11.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'The Hobbit', fr: 'Le Hobbit', uk: 'Гобіт' },
        description: { en: 'Fantasy adventure', fr: 'Aventure fantastique', uk: 'Фентезійна пригода' },
        images: ['https://example.com/hobbit.jpg'],
        category: fiction as Category,
        price: 15.99,
        labels: [top1000].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'The Alchemist', uk: 'Алхімік' },
        description: { en: 'Philosophical novel', fr: 'Roman philosophique', uk: 'Філософський роман' },
        images: ['https://example.com/alchemist.jpg'],
        category: fiction as Category,
        price: 14.99,
        labels: [newArrival].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'The Little Prince', fr: 'Le Petit Prince', uk: 'Маленький принц' },
        description: { en: 'Children\'s classic', fr: 'Classique pour enfants', uk: 'Дитяча класика' },
        images: ['https://example.com/prince.jpg'],
        category: fiction as Category,
        price: 9.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'The Lord of the Rings', uk: 'Володар перснів' },
        description: { en: 'Epic fantasy', fr: 'Fantasy épique', uk: 'Епічне фентезі' },
        images: ['https://example.com/lotr.jpg'],
        category: fiction as Category,
        price: 19.99,
        labels: [bestSeller].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'The Kite Runner', fr: 'Les Cerfs-volants de Kaboul', uk: 'Бігун з повітряним змієм' },
        description: { en: 'Contemporary fiction', fr: 'Fiction contemporaine', uk: 'Сучасна проза' },
        images: ['https://example.com/kite.jpg'],
        category: fiction as Category,
        price: 12.99,
        labels: [top100].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'The Book Thief', uk: 'Книжкова злодійка' },
        description: { en: 'Historical fiction', fr: 'Fiction historique', uk: 'Історична проза' },
        images: ['https://example.com/thief.jpg'],
        category: fiction as Category,
        price: 13.99,
        labels: [newArrival].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'The Giver', fr: 'Le Passeur', uk: 'Дарувальник' },
        description: { en: 'Dystopian novel', fr: 'Roman dystopique', uk: 'Дистопічний роман' },
        images: ['https://example.com/giver.jpg'],
        category: fiction as Category,
        price: 10.99,
        labels: [top1000].filter((label): label is Label => label !== null)
      },
      {
        name: { en: 'The Fault in Our Stars', uk: 'Винні зірки' },
        description: { en: 'Young adult novel', fr: 'Roman jeunesse', uk: 'Роман для молоді' },
        images: ['https://example.com/stars.jpg'],
        category: fiction as Category,
        price: 11.99,
        labels: [seasonal].filter((label): label is Label => label !== null)
      }
    ];

    await this.itemRepository.save(items);
  }
}
