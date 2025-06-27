import { setSeederFactory } from 'typeorm-extension';
import { Product } from '@entity/product.entity';
import { Image } from '@entity/image.entity';
import { faker } from '@faker-js/faker';
import { Gender } from '@domain/enums/gender.enum';

setSeederFactory(Product, () => {
  const genderValues = Object.values(Gender);
  const randomGender = genderValues[Math.floor(Math.random() * genderValues.length)];

  const product = new Product(
    faker.string.uuid(),
    faker.commerce.productName(),
    faker.commerce.productDescription(),
    faker.company.name(),
    parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
    faker.number.int({ min: 0, max: 1000 }),
    randomGender,
    [new Image(faker.string.uuid(), faker.image.urlLoremFlickr({ category: 'technics' }))], // Assuming one image for now
    faker.date.past()
  );
  return product;
}); 