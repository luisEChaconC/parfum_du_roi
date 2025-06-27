import { DataSource } from 'typeorm';
import { Seeder, runSeeder, SeederFactoryManager } from 'typeorm-extension';
import { Product } from '../../../domain/entities/product.entity';

export class ProductSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const productRepository = dataSource.getRepository(Product);

    const productsToSeed = [
      {
        name: 'Luxury Smartwatch',
        description: 'A high-end smartwatch with advanced health tracking and communication features.',
        price: 499.99,
        imageUrl: 'https://example.com/images/smartwatch.jpg',
        isActive: true,
      },
      {
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Immersive audio experience with industry-leading noise cancellation.',
        price: 299.99,
        imageUrl: 'https://example.com/images/headphones.jpg',
        isActive: true,
      },
      {
        name: 'Portable Bluetooth Speaker',
        description: 'Compact and powerful speaker with rich bass and long battery life.',
        price: 129.99,
        imageUrl: 'https://example.com/images/speaker.jpg',
        isActive: true,
      },
      {
        name: '4K Ultra HD Smart TV',
        description: 'Stunning visuals and smart features for an ultimate home entertainment.',
        price: 799.00,
        imageUrl: 'https://example.com/images/tv.jpg',
        isActive: true,
      },
      {
        name: 'Ergonomic Office Chair',
        description: 'Designed for maximum comfort and support during long working hours.',
        price: 349.50,
        imageUrl: 'https://example.com/images/chair.jpg',
        isActive: true,
      },
    ];

    await productRepository.save(productsToSeed);
    console.log('Predefined products seeded successfully!');
  }
} 