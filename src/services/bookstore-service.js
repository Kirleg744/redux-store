export default class BookstoreService {
    data = [
        {
            id: 1,
            title: "Триста поезій",
            author: "Ліна Костенко",
            price: 350,
            isInStock: true,
            coverImage:
                "https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/i/m/img_0239_6.jpg",
        },
        {
            id: 2,
            title: "Ілларіон Павлюк",
            author: "Ілларіон Павлюк",
            price: 500,
            isInStock: true,
            coverImage:
                "https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/i/m/img_67892.jpg",
        },
        {
            id: 3,
            title: "Нові Темні Віки. Книга 1. Колонія",
            author: "Макс Кідрук",
            price: 700,
            isInStock: false,
            coverImage:
                "https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/1/_/1_1_27.png",
        },
        {
            id: 4,
            title: "1984",
            author: "Джордж Орвелл",
            price: 200,
            isInStock: true,
            coverImage:
                "https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/i/m/img335_8.jpg",
        },
        {
            id: 5,
            title: "Місто дівчат",
            author: "Елізабет Ґілберт",
            price: 350,
            isInStock: true,
            coverImage:
                "https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/m/i/misto_divchat_face_ean1_1.jpg",
        },
        {
            id: 6,
            title: "Мавка. Лісова пісня",
            author: "Леся Українка",
            price: 1000,
            isInStock: false,
            coverImage:
                "https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/_/9/_902214_-943-650.jpg",
        },
        {
            id: 7,
            title: "Найдовша подорож",
            author: "Оксана Забужко",
            price: 112,
            isInStock: true,
            coverImage:
                "https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/c/o/cover_14_251.jpg",
        },
        {
            id: 8,
            title: "Кафе на краю світу",
            author: "Кафе на краю світу",
            price: 165,
            isInStock: true,
            coverImage:
                "https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/i/m/img_5185.jpg",
        },
        {
            id: 9,
            title: "Драбина",
            author: "Євгенія Кузнєцова",
            price: 300,
            isInStock: false,
            coverImage:
                "https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/9/7/978-966-448-097-7_2.png",
        },
        {
            id: 10,
            title: "Полум’яний бог",
            author: "Полум’яний бог",
            price: 500,
            isInStock: false,
            coverImage:
                "https://static.yakaboo.ua/media/cloudflare/product/webp/352x340/f/i/file_6_40.jpg",
        },
    ];

    getBooks() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.data);
            }, 700);
        });
    }
}
