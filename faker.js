
var faker = require('faker')

function generateFake () {

    var blogs = []
    for (var id = 0; id < 20; id++) {
      var Subject = faker.random.word()
      var Title = faker.name.title()
      var Image = faker.image.image()
      var Author = faker.name.firstName()
  
      blogs.push({
        "id": id,
        "Subject":Subject,
        "Title": Title,
        "Image": Image,
        "Author":Author,
      })
    }

  var prod = []
  for (var id = 0; id < 50; id++) {
    var Price = faker.commerce.price()
    var Title = faker.name.title()
    var Image = faker.image.image()
    var Hardware = faker.random.boolean()
    var Accessories = faker.random.boolean()
    var Rating = faker.random.objectElement({one: 1, two: 2, three: 3, four: 4, five: 5, six: 0}); 
    var Description = faker.commerce.productDescription()
    var Onsale = faker.commerce.price()
    prod.push({
      "id": id,
      "Price": Price,
      "Title": Title,
      "Image": Image,
      "Hardware":Hardware,
      "Accessories":Accessories,
      "Rating":Rating,
      "Description":Description,
      "Onsale":Onsale
    })
  }
  return { "prod":prod, "blogs":blogs}
}
module.exports = generateFake